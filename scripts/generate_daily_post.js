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

The post must be formatted as a JSON object strictly adhering to this schema. 
IMPORTANT: You must provide translations for "title", "excerpt", "category", and "content" in English (en), Portuguese (pt - continental), and French (fr).

{
  "title": { "en": "...", "pt": "...", "fr": "..." },
  "slug": "url-friendly-slug-based-on-english-title",
  "excerpt": { "en": "...", "pt": "...", "fr": "..." },
  "category": { "en": "Foundation | Mindset | Lifestyle | Investing | Strategy", "pt": "...", "fr": "..." },
  "readTime": "Estimated read time (e.g. 6 min)",
  "imageUrl": "A main cover image URL. USE EXACTLY THIS FORMAT: https://picsum.photos/seed/UNIQUE_SLUG_HERE-cover/1000/600",
  "content": { "en": "HTML string", "pt": "HTML string", "fr": "HTML string" }
}

CRITICAL RULES FOR "content":
1. Write at least 4-5 substantial paragraphs with real, actionable advice.
2. Include at least two <h2> sections.
3. You MUST INCLUDE AT LEAST ONE INLINE IMAGE in the body of the content using the picsum format.
4. Use Tailwind CSS classes for styling text exactly matching this style:
   - Paragraphs: <p class="text-slate-600 leading-relaxed mb-6">
   - Quotes: <p class="text-xl text-slate-600 leading-relaxed mb-8 font-light italic border-l-4 border-emerald-500 pl-6 py-2">
   - Headings: <h2 class="text-3xl font-lexend font-bold text-slate-900 mt-12 mb-6">
   - Info boxes: <div class="bg-slate-50 rounded-3xl p-8 my-10 border border-slate-200">...</div>
5. Ensure the Portuguese (pt) translation is high-quality Continental Portuguese (not Brazilian).
6. DO NOT include the "Next Steps" or call-to-action links at the end of the content; the script will handle this automatically.
`;

  const MODELS = ['gemini-2.0-flash', 'gemini-1.5-pro'];
  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}...`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { response MimeType: "application/json" }
      });
      return JSON.parse(response.text);
    } catch (err) {
      console.error(`Error with ${model}:`, err);
    }
  }
  throw new Error("Failed to generate content with any model");
}

function getNextStepsHtml(lang) {
  const translations = {
    en: {
      title: 'Next Steps: Take Action',
      tools: 'FI Projector',
      tools_desc: 'Run your numbers.',
      resources: 'Broker Links',
      resources_desc: 'Direct sign-up pages.',
      coaching: 'Setup Review',
      coaching_desc: "I'll audit your setup."
    },
    pt: {
      title: 'Próximos Passos: Entre em Ação',
      tools: 'Projetor FI',
      tools_desc: 'Calcule os seus números.',
      resources: 'Corretoras',
      resources_desc: 'Links diretos de registo.',
      coaching: 'Revisão de Setup',
      coaching_desc: 'Vou auditar o seu setup.'
    },
    fr: {
      title: 'Prochaines étapes : Passez à l\'action',
      tools: 'Projecteur FI',
      tools_desc: 'Calculez vos chiffres.',
      resources: 'Courtiers',
      resources_desc: 'Liens d\'inscription directs.',
      coaching: 'Audit de setup',
      coaching_desc: 'J\'analyserai votre setup.'
    }
  };

  const t = translations[lang] || translations.en;

  return `
<div class="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
  <h3 class="text-xl font-lexend font-bold text-slate-900 mb-4">${t.title}</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <a href="/resources" class="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-all group no-underline">
      <i class="fa-solid fa-toolbox text-emerald-600 text-xl group-hover:scale-110 transition-transform"></i>
      <span class="font-bold text-slate-800">${t.resources}</span>
      <span class="text-xs text-slate-500">${t.resources_desc}</span>
    </a>
    <a href="/tools" class="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-all group no-underline">
      <i class="fa-solid fa-calculator text-emerald-600 text-xl group-hover:scale-110 transition-transform"></i>
      <span class="font-bold text-slate-800">${t.tools}</span>
      <span class="text-xs text-slate-500">${t.tools_desc}</span>
    </a>
    <a href="/coaching" class="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-all group no-underline">
      <i class="fa-solid fa-user-tie text-emerald-600 text-xl group-hover:scale-110 transition-transform"></i>
      <span class="font-bold text-slate-800">${t.coaching}</span>
      <span class="text-xs text-slate-500">${t.coaching_desc}</span>
    </a>
  </div>
</div>`;
}

async function main() {
  const constantsPath = path.join(__dirname, '../constants.tsx');
  let content = fs.readFileSync(constantsPath, 'utf-8');
  
  const existingTitles = [...content.matchAll(/title:\s*({[^}]+}|'[^']+')/g)].map(m => {
      const match = m[1];
      if (match.startsWith('{')) {
          const enMatch = match.match(/en:\s*'([^']+)'/);
          return enMatch ? enMatch[1] : '';
      }
      return match.replace(/'/g, "");
  }).filter(t => t !== '');

  console.log("Generating new multi-language blog post via Gemini...");
  const postData = await generatePost(existingTitles);
  console.log("Generated post:", postData.title.en);
  
  const ids = [...content.matchAll(/id:\s*'(\d+)'/g)].map(m => parseInt(m[1]));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = (maxId + 1).toString();

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const escapeStr = (str) => str.replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/'/g, "\\'");

  // Append next steps to content
  const contentEn = postData.content.en + getNextStepsHtml('en');
  const contentPt = postData.content.pt + getNextStepsHtml('pt');
  const contentFr = postData.content.fr + getNextStepsHtml('fr');

  const newPostBlock = `  {
    id: '${newId}',
    slug: '${postData.slug}',
    title: {
      en: '${escapeStr(postData.title.en)}',
      pt: '${escapeStr(postData.title.pt)}',
      fr: '${escapeStr(postData.title.fr)}'
    },
    excerpt: {
      en: '${escapeStr(postData.excerpt.en)}',
      pt: '${escapeStr(postData.excerpt.pt)}',
      fr: '${escapeStr(postData.excerpt.fr)}'
    },
    content: {
      en: \`${contentEn.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
      pt: \`${contentPt.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
      fr: \`${contentFr.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`
    },
    category: {
      en: '${escapeStr(postData.category.en)}',
      pt: '${escapeStr(postData.category.pt)}',
      fr: '${escapeStr(postData.category.fr)}'
    },
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
  console.log("Updated constants.tsx successfully with multi-language post and CTAs.");

  // Send Telegram message
  console.log("Sending Telegram notification...");
  const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const tgPayload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: `✅ New Multi-Language Post!\n\n<b>EN:</b> ${postData.title.en}\n<b>PT:</b> ${postData.title.pt}\n<b>FR:</b> ${postData.title.fr}\n\nLive shortly on labfab.io`,
    parse_mode: "HTML"
  };

  await fetch(tgUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tgPayload)
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
