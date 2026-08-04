export default function StarRating({ rating = 0 }: { rating?: number }) {
  const full = Math.round(rating);
  return (
    <span style={{ color: "#f5c518" }} aria-label={`${rating} out of 5`}>
      {"★".repeat(full)}
      <span style={{ color: "#ddd" }}>{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}
