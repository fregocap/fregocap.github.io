
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
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
