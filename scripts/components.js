import $ from "jquery";

const rupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export function initHeader(data) {
  $("[aria-label='Main navigations']>div").append(
    ...data.categories.map(({ name, icon }) =>
      $("<a>", {
        class: "text-gray-500 hover:text-black",
        href: "",
        text: `${icon} ${name}`,
      }),
    ),
    $("<a>", {
      class: "text-red-600 hover:text-red-900",
      href: "",
      text: `🔥 Promo`,
    }),
  );

  $("[aria-label='Category filter']>ul").append(
    ...data.categories.map(({ name }) =>
      $("<li>").append(
        $("<label>").append(
          $("<input>", { type: "checkbox", value: name }),
          ` ${name}`,
        ),
      ),
    ),
  );
}

export function ProductCard({
  name,
  brand,
  img,
  price,
  originalPrice,
  rating,
  ratingCount,
  tags,
}) {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  const badge = discount
    ? $("<span>", { class: "badge discount" }).text(`-${discount}%`)
    : tags.includes("baru")
      ? $("<span>", { class: "badge new" }).text("Baru")
      : null;

  const stars = Array.from({ length: 5 }, (_, i) =>
    $("<i>", {
      "data-lucide": "star",
      fill: "currentColor",
      "stroke-width": "0",
      class: i < Math.round(rating) ? "text-amber-400" : "text-gray-300",
    }),
  );

  return $("<a>", { href: "" }).append(
    $("<article>", { class: "card" }).append(
      $("<img>", { src: img, alt: name }),
      badge,
      $("<div>", {
        class: "m-4 flex flex-col gap-1 product",
      }).append(
        $("<p>").text(brand),
        $("<h3>").text(name),
        $("<div>", {
          itemprop: "aggregateRating",
          itemscope: "",
          itemtype: "https://schema.org/AggregateRating",
          class: "tabular-nums flex gap-2 items-center",
        }).append(
          $("<output>", { class: "flex" }).append(...stars),
          $("<span>").append(
            $("<span>", { itemprop: "ratingValue" }).text(rating),
            " ",
            "(",
            $("<span>", { itemprop: "reviewCount" }).text(ratingCount),
            ")",
          ),
        ),
        $("<p>", {
          class: "tabular-nums flex gap-2 items-center pt-1 price",
        }).append(
          originalPrice
            ? [
                $("<ins>").text(rupiah(price)),
                $("<del>").text(rupiah(originalPrice)),
              ]
            : $("<span>").text(rupiah(price)),
        ),
      ),
    ),
  );
}

export function SummaryItem({ name, img, quantity = 1 }) {
  return $("<div>", { class: "flex gap-4 items-center" }).append(
    $("<div>", {
      class: "size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100",
    }).append(
      $("<img>", { src: img, alt: name, class: "w-full h-full object-cover" }),
    ),
    $("<div>", { class: "flex-1 text-sm text-gray-600 truncate" }).text(name),
    $("<div>", { class: "text-sm text-gray-900 font-medium" }).text(
      `×${quantity}`,
    ),
  );
}

export function OrderReviewItem({ name, img, price, quantity = 1 }) {
  return $("<div>", {
    class: "flex gap-4 items-center",
  }).append(
    $("<div>", {
      class: "size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100",
    }).append(
      $("<img>", { src: img, alt: name, class: "w-full h-full object-cover" }),
    ),
    $("<div>", { class: "flex-1 flex flex-col justify-center" }).append(
      $("<span>", { class: "text-sm font-medium text-gray-900" }).text(name),
      $("<span>", { class: "text-xs text-gray-500" }).text(`x${quantity}`),
    ),
    $("<div>", { class: "text-sm font-medium text-blue-600" }).text(
      `Rp ${(price * quantity).toLocaleString("id-ID")}`,
    ),
  );
}
