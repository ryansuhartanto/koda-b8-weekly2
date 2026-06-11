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
