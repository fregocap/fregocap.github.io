
export interface LocalizedString {
  en: string;
  pt: string;
  fr: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string | LocalizedString;
  excerpt: string | LocalizedString;
  content: string | LocalizedString;
  category: string | LocalizedString;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
}

export interface FireCalculation {
  currentAge: number;
  retirementAge: number;
  monthlySavings: number;
  currentNetWorth: number;
  expectedReturn: number;
  withdrawalRate: number;
  fireNumber: number;
}
