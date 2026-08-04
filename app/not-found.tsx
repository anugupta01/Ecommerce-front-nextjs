import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Page not found</p>
      <Link href="/" className="btn btn-primary">Back home</Link>
    </div>
  );
}
