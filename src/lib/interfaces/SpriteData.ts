export default interface SpriteData {
  action: string;
  border: number;
  w: number;
  h: number;
  frames: number;
  rate: number;
  src: string;
  steps: number[];
  image: HTMLImageElement | null;
}
