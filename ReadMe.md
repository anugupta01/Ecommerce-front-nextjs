#  Electronic Gadgets E-commerce Website using Next.js 16.2.12

**architecture and functionality** to the Next.js, deliberately showcasing Next.js's advanced features. Run
`npm install && npm run build` to verify locally.
 
| Next.js 16 |
| App Router file tree |
|`app/product/[id]`, `app/category/[id]` dynamic segments |
| `ApiServiceService` (hardcoded array) |
| `lib/data.ts` async data layer (Server Component fetch) |
| `ActionHandlerService` (RxJS BehaviorSubject cart badge) | `lib/cart-context.tsx` (React Context, persisted, SSR-safe) |
| `lib/actions.ts` Server Actions with validation |
| `components/NavBar.tsx` (reads cart context) |
| `ProductCard.tsx`, `app/product/[id]` + client actions island |
| `Pagination.tsx` + `CategoryProducts.tsx` filter/paginate island |
|`.map()` / conditional JSX / `<Link>` |

## Advanced Next.js features demonstrated

- **Server Components + server-side data fetching** — home, product, and
  category pages fetch data on the server via `lib/data.ts`.
- **Dynamic routes** — `product/[id]`, `category/[id]`.
- **`generateStaticParams`** — product and category pages are pre-rendered at
  build time (SSG) for every id.
- **`generateMetadata`** — per-product / per-category dynamic SEO titles and
  descriptions.
- **Server Actions** (`"use server"`) + **`useActionState`** — sign-in / sign-up
  forms validated and processed on the server, with pending state.
- **`loading.tsx`** — Suspense/streaming fallback.
- **`error.tsx`** — route error boundary.
- **`not-found.tsx` + `notFound()`** — 404 handling for unknown/invalid ids.
- **Client islands** — only the interactive bits (cart badge, quantity, filter,
  pagination) are Client Components; the rest stay Server Components.
- **Nested layout** — root layout injects NavBar/Footer and the CartProvider.

## Edge cases handled

- Non-numeric or unknown `product/[id]` / `category/[id]` → `notFound()`.
- Cart quantity guards against NaN / negative values; persists across reloads
- Category filter that empties the list → "no products" state; page index
  clamped when filtering shrinks the total page count.
- Pagination hidden when only one page.
- Auth actions validate required fields, email format, password length/match.

## What remains (presentational porting)

The functional core is complete. Components that were decorative
app — `carousel`, `tr-slider`, `tr-card-hor`, `notification-list`, `profile`,
`main` — are not yet ported; their markup can be added as client components.

## Running & verifying

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # confirms SSG params, server actions, and types compile
```

Checklist: home lists products · clicking a product opens its detail with
working quantity + add-to-bag · the nav cart badge increments and survives
reload · `/category/1` filters and paginates · `/product/999` shows 404 ·
sign-in/up validate on the server.
