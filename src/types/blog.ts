export type ImageKey = "image1" | "image2" | "openDayImage" | "shipbotImage";

export type Images = Record<ImageKey, string>;

export type HoveredCard = number | string | null;

export interface Article {
  id: number;
  title: string;
  category: string;
  tagColor: string;
  author: string;
  date: string;
  readTime?: string;
  excerpt: string;
  imageKey: ImageKey;
  link?: string;
}

