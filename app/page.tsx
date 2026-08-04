import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";

export default async function HomePage() {
  const products = await getProducts(); // fetched on the server, not the client
  return (
    <div className="container py-4">
    <HeroCarousel />
      <h4 className="mb-3">Featured Products</h4>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
