declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.webp"
declare module "*.gif"

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.ttf"
declare module "*.html"
