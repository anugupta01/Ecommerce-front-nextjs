import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, getCategories, getProductsByCategory } from "@/lib/data";
import CategoryProducts from "./CategoryProducts";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategory(Number(id));
  return { title: category ? category.title : "Category not found" };
}

export default async function CategoryPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();
  const category = await getCategory(numericId);
  if (!category) notFound();
  const products = await getProductsByCategory(numericId);

  return (
    <div className="container py-4">
      <h2 className="mb-4">{category.title}</h2>
      <CategoryProducts products={products} />
    </div>
  );
}
