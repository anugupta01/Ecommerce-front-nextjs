"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-5 text-center">
      <h2>Something went wrong</h2>
      <p className="text-muted">{error.message}</p>
      <button className="btn btn-primary" onClick={reset}>Try again</button>
    </div>
  );
}
