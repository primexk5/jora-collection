# JORA Collection

React + Vite storefront. From the repository root:

```sh
cd frontend
npm ci
npm run dev
```

## Build and verify

Run these commands inside `frontend/`:

```sh
npm run build
npm test
npm run lint
```

The build generates one static HTML document per product in `frontend/dist/product/`, with product-specific Open Graph tags already in the HTML head. JavaScript is not required to read these tags. The React app reads `/product/<id>` to show the correct product. Existing `#bag/<id>` bookmarks remain supported.

## Vercel hosting

Use `frontend` as the Vercel project root, `npm run build` as the build command, and `dist` as the output directory. `frontend/vercel.json` enables clean URLs so `/product/ada-top-handle` serves `dist/product/ada-top-handle.html`. Do not add a catch-all rewrite to the homepage: it would mask the product metadata.

The canonical origin is `https://jora-collection.vercel.app`, configured in `frontend/src/lib/site.js`. Update it and rebuild if the domain changes. Deploy all of `dist`, including `product` and `og`. Preview images in `frontend/public/og` are 800 × 800 JPEGs under 300 KB. When adding products, add a matching optimized preview image; missing or oversized images fail the build.

## WhatsApp orders

The order popup has one green action linking directly to `https://wa.me/2347063374333?text=...`, with the message encoded using `encodeURIComponent`. Each item includes its name, colour, style, size, quantity and prices, without product links. Subtotal and item count follow. The green action copies the selected bag images to the clipboard before opening the chat with prefilled text. Customers paste the image in WhatsApp; multiple bags are combined into one labelled PNG. Clipboard access requires a supported browser and HTTPS. A text-only link remains available if image copying is unsupported or blocked. There is no share menu or download step.

The customer must still paste the copied image and send the prefilled message.

### Phone acceptance check (after deployment)

1. Open a product URL directly on the live domain and refresh it; confirm the correct product loads.
2. Add two different bags with different quantities and colours, then open the order popup.
3. Expand **Review order details** and confirm both products, selections, prices and subtotal, with no product links.
4. Tap **Open JORA chat with order details** on a phone with WhatsApp installed. Confirm the destination is JORA Collection, **0706 337 4333**, and the order text is prefilled after the bag images copy (the browser may ask for clipboard permission). Paste the image in WhatsApp and confirm it contains the selected bags.
5. Confirm the pasted image shows the selected bags and colours, and the order text contains no product links. Test both a single bag and a multi-bag order.

The automated checks validate generated HTML, actual JPEG dimensions and sizes, routing, item details, totals and the encoded WhatsApp destination. They do not simulate WhatsApp or confirm device previews.

## Frontend structure

```text
frontend/src/
  assets/brand/           Brand reference files
  components/
    atoms/               Icons, logo, bag artwork and dividers
    molecules/           Small controls, headings and feedback
    organisms/           Navigation, product displays and order flows
    templates/           Shared page layout and content slots
  pages/                 Route-specific page compositions
  context/               Shared cart actions for product cards
  hooks/                 Shared React state and effects
  data/                  Product catalogue and site content
  lib/                   Routing, search and order logic
  styles/                Global styles and design tokens
  App.jsx                Application state and route composition
  main.jsx               React entry point
```

Place reusable visual primitives in atoms and small combinations in molecules. Organisms compose larger sections and interactive flows. Templates define page structure; pages supply route content. Keep business logic in `lib` or hooks rather than the visual layers. Use direct imports from each component's layer. Static public assets and build scripts stay in `frontend/public/` and `frontend/scripts/`, outside `frontend/src/`.

Mobile tabs link to Home, Shop, New In, Lookbook and Contact. The shopping bag remains available from the header.
