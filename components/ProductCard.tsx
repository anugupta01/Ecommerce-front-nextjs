"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const { addToBag } = useCart();
  const [qty, setQty] = useState(1);

  // Floor at 1, matching the original increase/decrease behaviour.
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const increase = () => setQty((q) => q + 1);

  return (
    <div className="card h-100">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: 200, objectFit: "contain", padding: 12 }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link
          href={`/product/${product.id}`}
          className="card-title h6 text-decoration-none text-dark mb-1"
        >
          {product.title}
        </Link>

        {/* Short description — clamped so long text doesn't break the layout */}
        <p
          className="text-muted small mb-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.desc}
        </p>

        <p className="h5 mb-3">${product.price.toLocaleString("en-US")}</p>

        {/* Quantity stepper + ADD TO BAG, pushed to the bottom */}
        <div className="mt-auto d-flex align-items-center gap-2">
          <div className="d-flex align-items-center border rounded-pill px-2 flex-shrink-0">
            <button
              type="button"
              className="btn btn-sm btn-link text-dark text-decoration-none px-2"
              onClick={decrease}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-1" aria-live="polite">{qty}</span>
            <button
              type="button"
              className="btn btn-sm btn-link text-dark text-decoration-none px-2"
              onClick={increase}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary rounded-pill text-uppercase flex-grow-1"
            onClick={() => addToBag(qty)}
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
}