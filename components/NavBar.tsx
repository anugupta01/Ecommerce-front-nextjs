"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import type { Category } from "@/lib/data";

export default function NavBar({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const { isLoggedIn, ready, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const goToCart = () => {
    if (!ready) return;
    router.push(isLoggedIn ? "/cart" : "/signin?redirect=/cart");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img src="/assets/brand.png" alt="Brand" height={32} />
        </Link>
        <div className="d-flex gap-3 align-items-center flex-grow-1 justify-content-center">
          {categories.map((c) => (
            <Link key={c.id} className="nav-link" href={`/category/${c.id}`}>
              {c.title}
            </Link>
          ))}
        </div>
        <div className="d-flex gap-3 align-items-center">
          {ready && !isLoggedIn && (
            <Link className="nav-link" href="/signin">Sign in</Link>
          )}
          {ready && isLoggedIn && (
            <button
                type="button"
                className="nav-link btn btn-link"
                onClick={handleLogout}
              >
                Logout
              </button>
          )}
          <button
            type="button"
            className="nav-link position-relative btn btn-link"
            onClick={goToCart}
            aria-label="Cart"
          >
            🛒
            {count > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}