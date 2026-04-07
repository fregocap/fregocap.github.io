import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!GEMINI_API_KEY || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generatePost(existingTitles) {
  const titlesList = existingTitles.map(t => `- ${t}`).join('\n');

  // Alternate strategy: every 3rd post is a philosophical post, the others are SEO-driven Foundation posts
  const totalPosts = existingTitles.length;
  const isFoundationPost = (totalPosts % 3) !== 0;

  const foundationInstructions = isFoundationPost ? `
POST TYPE: "Foundation" — This post MUST target a high-volume Google search keyword to drive organic traffic.
Pick one concept from this list of high-value SEO topics (or choose a similar high-traffic keyword NOT already covered):
- "What is the 4% rule" / "Is the 4% rule still safe"
- "How to calculate your FIRE number"
- "Best index funds for early retirement"
- "How much do I need to retire at [40/45/50]"
- "What is Coast FIRE / Barista FIRE / Lean FIRE"
- "FIRE movement explained for beginners"
- "How to increase savings rate"
- "Tax-efficient investing for early retirement"
- "Best brokerage accounts in Europe / Portugal"
- "How to invest €10,000 / €50,000"
- "Passive income ideas for financial independence"
- "Emergency fund: how much do you really need"

Write the article so it naturally and concisely answers the search query in plain language. Use real numbers, examples, and practical steps. The goal is to rank on Google and introduce readers to the FIRE lifestyle.
The category field MUST be set to "Foundation".
` : `
POST TYPE: "Philosophy" — This post should be a deeper, more nuanced, conceptually rich article about FIRE mindset, lifestyle design, or advanced strategy. Aim for something thought-provoking and distinctive. The category should be one of: Mindset, Lifestyle, Investing, Strategy.
`;

  const prompt = `
You are an expert personal finance and FIRE (Financial Independence, Retire Early) blogger writing for a European audience.
${foundationInstructions}

CRITICAL REQUIREMENT: Do NOT write about any of the following topics or themes, as they have already been covered:
${titlesList}

Pick a completely fresh angle that is NOT on this list.

The post must be formatted as a JSON object strictly adhering to this schema:
{
  "title": "A clear, punchy title — for Foundation posts, match it to what people actually Google",
  "slug": "url-friendly-slug-based-on-title",
  "excerpt": "A 1-2 sentence summary of the post",
  "category": "Foundation | Mindset | Lifestyle | Investing | Strategy (choose based on post type above)",
  "readTime": "Estimated read time (e.g. 6 min)",
  "imageUrl": "A main cover image URL. USE EXACTLY THIS FORMAT: https://picsum.photos/seed/UNIQUE_SLUG_HERE-cover/1000/600 (replace UNIQUE_SLUG_HERE with the post's generated slug)",
  "content": "An HTML string containing the full markdown/HTML for the blog post."
}

CRITICAL RULES FOR "content":
1. Write at least 4-5 substantial paragraphs with real, actionable advice.
2. Include at least two <h2> sections.
3. You MUST INCLUDE AT LEAST ONE INLINE IMAGE in the body of the content using the same picsum format.
   Example inline image:
   <div class="my-10 rounded-3xl overflow-hidden shadow-xl">
     <img src="https://picsum.photos/seed/UNIQUE_SLUG_HERE-inline/800/400" alt="Description" class="w-full h-auto object-cover max-h-96" />
     <p class="text-center text-slate-500 text-sm mt-3 italic">Write an engaging caption here.</p>
   </div>
   Replace UNIQUE_SLUG_HERE with the post's generated slug so it doesn't change on reload.
4. Use Tailwind CSS classes for styling text exactly matching this style:
   - Paragraphs: <p class="text-slate-600 leading-relaxed mb-6">
   - Quotes: <p class="text-xl text-slate-600 leading-relaxed mb-8 font-light italic border-l-4 border-emerald-500 pl-6 py-2">
   - Headings: <h2 class="text-3xl font-lexend font-bold text-slate-900 mt-12 mb-6">
   - Info boxes: <div class="bg-slate-50 rounded-3xl p-8 my-10 border border-slate-200">...</div>
`;

  const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}...`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text);
    } catch (err) {
      const isRetryable = err?.status === 503 || err?.status === 429;
      if (isRetryable && model !== MODELS[MODELS.length - 1]) {
        console.log(`${model} overloaded, falling back to next model...`);
      } else {
        throw err;
      }
    }
  }
}

async function main() {
  const constantsPath = path.join(__dirname, '../constants.tsx');
  let content = fs.readFileSync(constantsPath, 'utf-8');
  
  // Extract existing titles to avoid repetition
  const existingTitles = [...content.matchAll(/title:\s*'([^']+)'/g)].map(m => m[1]);

  console.log("Generating new blog post via Gemini...");
  const postData = await generatePost(existingTitles);
  console.log("Generated post:", postData.title);
  
  const ids = [...content.matchAll(/id:\s*'(\d+)'/g)].map(m => parseInt(m[1]));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = (maxId + 1).toString();

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Escape backticks and dollar signs in content
  const safeContent = postData.content.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const newPostBlock = `  {
    id: '${newId}',
    slug: '${postData.slug}',
    title: '${postData.title.replace(/'/g, "\\'")}',
    excerpt: '${postData.excerpt.replace(/'/g, "\\'")}',
    content: \`
${safeContent}
    \`,
    category: '${postData.category}',
    date: '${dateStr}',
    author: 'Fabio',
    readTime: '${postData.readTime}',
    imageUrl: '${postData.imageUrl}'
  }`;

  const targetStr = 'export const BLOG_POSTS: BlogPost[] = [';
  const insertIndex = content.indexOf(targetStr);
  if (insertIndex === -1) {
    throw new Error("Could not find BLOG_POSTS array in constants.tsx");
  }
  const arrayStart = insertIndex + targetStr.length;

  content = content.slice(0, arrayStart) + '\n' + newPostBlock + ',' + content.slice(arrayStart);
  fs.writeFileSync(constantsPath, content);
  console.log("Updated constants.tsx successfully.");

  // Send Telegram message
  console.log("Sending Telegram notification...");
  const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const tgPayload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: `✅ New FIRE Blog Post Generated!\n\n<b>Title:</b> ${postData.title}\n<b>Category:</b> ${postData.category}\n\nIt has been committed and will be live on your site shortly.`,
    parse_mode: "HTML"
  };

  const tgRes = await fetch(tgUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tgPayload)
  });

  if (!tgRes.ok) {
    console.error("Failed to send Telegram message", await tgRes.text());
    process.exit(1);
  } else {
    console.log("Telegram notification sent.");
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
