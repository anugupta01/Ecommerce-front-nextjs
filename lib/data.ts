export interface Product {
  id: number;
  title: string;
  rating: number;
  desc: string;
  price: number;
  image: string;
  listImages: string[];
}

export interface Category {
  id: number;
  title: string;
  icon: string;
}

// Each product gets its own title, image, and gallery.
// Every path below points at a file that exists in /public/assets.
const PRODUCT_SEED = [
  { title: "Acer Aspire R3", image: "/assets/aspire.png",  gallery: ["/assets/aspire.png", "/assets/think.png", "/assets/5-1.png"] },
  { title: "Apple Mac Pro",  image: "/assets/mac-pro.jpg", gallery: ["/assets/mac-pro.jpg", "/assets/aspire.png", "/assets/think.png"] },
  { title: "Mi Smartphone",  image: "/assets/mi-phone.jpg", gallery: ["/assets/mi-phone.jpg", "/assets/5-1.png", "/assets/aspire.png"] },
  { title: "Lenovo ThinkPad", image: "/assets/think.png",  gallery: ["/assets/think.png", "/assets/mac-pro.jpg", "/assets/mi-phone.jpg"] },
  { title: "Series 5 Watch", image: "/assets/brand.png",     gallery: ["/assets/5-1.png", "/assets/mi-phone.jpg", "/assets/aspire.png"] },
  { title: "Online Store Kit", image: "/assets/online-store.png", gallery: ["/assets/online-store.png", "/assets/mac-pro.jpg", "/assets/think.png"] },
];

const PRODUCTS: Product[] = PRODUCT_SEED.map((seed, i) => ({
  id: i + 1,
  title: seed.title,
  rating: ((i % 5) + 1),                 // varied ratings 1–5
  desc: `Reliable ${seed.title} — dummy data to test the product works.`,
  price: 8000 + i * 500,
  image: seed.image,
  listImages: seed.gallery,
}));

const CATEGORIES: Category[] = [
  { id: 1, title: "Computer", icon: "desktop_mac" },
  { id: 2, title: "Phones", icon: "smartphone" },
  { id: 3, title: "Audio", icon: "headset" },
  { id: 4, title: "Gaming", icon: "sports_esports" },
  { id: 5, title: "Wearables", icon: "watch" },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

/** Returns undefined for unknown ids so callers can trigger notFound(). */
export async function getProduct(id: number): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategory(id: number): Promise<Category | undefined> {
  return CATEGORIES.find((c) => c.id === id);
}

/** Products for a category — dummy source returns all; real API would filter. */
export async function getProductsByCategory(_categoryId: number): Promise<Product[]> {
  return PRODUCTS;
}