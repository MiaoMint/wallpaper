export type Source = "wallhaven" | "konachan";
export type Purity = "sfw" | "sketchy" | "nsfw";

export interface Image {
  resolution: string;
  source: Source;
  sample: string;
  purity: Purity;
  id: string;
}

export interface ImageDetail extends Image {
  tags: string[];
  url: string;
  fileSize?: number;
  imageSource?: string;
}
