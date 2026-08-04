import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@/lib/data";
import StarRating from "@/components/StarRating";
import ProductDetailActions from "./ProductDetailActions";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.desc };
}

export default async function ProductPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();
  const product = await getProduct(numericId);
  if (!product) notFound();

  return (
    <div className="container py-4">
      <BackButton />
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title}
               className="img-fluid border rounded" style={{ objectFit: "contain" }} />
          <div className="d-flex gap-2 mt-3">
            {product.listImages.map((img, i) => (
              <img key={i} src={img} alt={`${product.title} ${i + 1}`}
                   width={70} height={70}
                   className="border rounded" style={{ objectFit: "cover" }} />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <StarRating rating={product.rating} />
          <p className="h3 my-3">${product.price.toLocaleString("en-US")}</p>
          <p className="text-muted">{product.desc}</p>
          <ProductDetailActions />
        </div>
      </div>
    </div>
  );
}