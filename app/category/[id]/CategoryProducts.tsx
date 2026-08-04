"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import type { Product } from "@/lib/data";

const PAGE_SIZE = 4;

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? products.filter((p) => p.title.toLowerCase().includes(q)) : products;
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages); // edge case: filter shrinks pages
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
      <input
        className="form-control mb-4"
        placeholder="Filter products…"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
      />
      {pageItems.length === 0 ? (
        <p className="text-muted text-center py-5">No products match your filter.</p>
      ) : (
        <div className="row g-4">
          {pageItems.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
      <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
