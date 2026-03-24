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

async function generatePost() {
  const prompt = `
You are an expert personal finance and FIRE (Financial Independence, Retire Early) blogger.
Write a high-quality, engaging blog post about a specific, nuanced topic within the FIRE movement, mindset, lifestyle design, or investing.

The post must be formatted as a JSON object strictly adhering to this schema:
{
  "title": "A catchy, compelling title",
  "slug": "url-friendly-slug-based-on-title",
  "excerpt": "A 1-2 sentence summary of the post",
  "category": "One of: Mindset, Lifestyle, Investing, Strategy",
  "readTime": "Estimated read time (e.g. 6 min)",
  "imageUrl": "A main cover image URL. USE EXACTLY THIS FORMAT: https://picsum.photos/seed/UNIQUE_SLUG_HERE-cover/1000/600 (replace UNIQUE_SLUG_HERE with the post's generated slug)",
  "content": "An HTML string containing the full markdown/HTML for the blog post."
}

CRITICAL RULES FOR "content":
1. Write at least 4-5 substantial paragraphs.
2. Include at least two <h2> sections.
3. You MUST INCLUDE AT LEAST ONE INLINE IMAGE in the body of the content using the same picsum format.
   Example inline image:
   <div class="my-10 rounded-3xl overflow-hidden shadow-xl">
     <img src="https://picsum.photos/seed/UNIQUE_SLUG_HERE-inline/800/400" alt="Description" class="w-full h-auto object-cover max-h-96" />
     <p class="text-center text-slate-500 text-sm mt-3 italic">Write an engaging caption here.</p>
   </div>
   This ensures we have at least TWO pertinent images per post (the main imageUrl + the inline image). Replace UNIQUE_SLUG_HERE with the post's generated slug so it doesn't change on reload.
4. Use Tailwind CSS classes for styling text exactly matching this style:
   - Paragraphs: <p class="text-slate-600 leading-relaxed mb-6">
   - Quotes: <p class="text-xl text-slate-600 leading-relaxed mb-8 font-light italic border-l-4 border-emerald-500 pl-6 py-2">
   - Headings: <h2 class="text-3xl font-lexend font-bold text-slate-900 mt-12 mb-6">
   - Info boxes: <div class="bg-slate-50 rounded-3xl p-8 my-10 border border-slate-200">...</div>
`;

  const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
      }
  });

  const text = response.text;
  return JSON.parse(text);
}

async function main() {
  console.log("Generating new blog post via Gemini...");
  const postData = await generatePost();
  console.log("Generated post:", postData.title);

  const constantsPath = path.join(__dirname, '../constants.tsx');
  let content = fs.readFileSync(constantsPath, 'utf-8');
  
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
    author: 'AI',
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
