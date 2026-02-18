export interface Perk {
  id: string;
  company: string;
  title: string;
  description: string;
  type: 'Cloud Credits' | 'Education' | 'Tools' | 'API' | 'Hardware';
  value: string;
  eligibility: string;
  expires: string;
  link: string;
  logo: string; // URL or ASCII representation
  tags: string[];
  scraped_timestamp?: string;
}
