"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailActions() {
  const { addToBag } = useCart();
  const [qty, setQty] = useState(1);

  // Ported increase/decrease with the original's qty>1 floor.
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const increase = () => setQty((q) => q + 1);

  return (
    <div className="d-flex align-items-center gap-3">
      <div className="btn-group" role="group">
        <button className="btn btn-outline-secondary" onClick={decrease}
                disabled={qty <= 1} aria-label="Decrease">−</button>
        <span className="btn btn-light disabled">{qty}</span>
        <button className="btn btn-outline-secondary" onClick={increase}
                aria-label="Increase">+</button>
      </div>
      <button className="btn btn-primary" onClick={() => addToBag(qty)}>
        Add to bag
      </button>
    </div>
  );
}
