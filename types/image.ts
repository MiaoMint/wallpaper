export enum Source {
  Wallhaven = "wallhaven",
  Konachan = "konachan",
  Gelbooru = "gelbooru",
  Zerochan = "zerochan",
  AnimePictures = "anime-pictures",
}

export enum Purity {
  SFW = "sfw",
  NSFW = "nsfw",
}

export interface Image {
  resolution: string;
  height: number;
  width: number;
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
