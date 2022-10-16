---
title: Show All Product Color Variants on a Collection Page
description: Display all the color variants for a single product on a collection page.
date: 2022-10-16
tags:
  - color variants
  - collections
layout: layouts/post.njk
---

To display all the color variants of a single product on your collection page, without creating individual products for each color.

These instructions apply to Dawn theme version 5.0.0.

In the Dawn theme code, open the `main-collection-product-grid.liquid` file, it's in the `Sections` folder.

Look for the `<ul>` list tag that displays the product grid.

Update the code between the `<ul> ... </ul>` tags to this:
{% raw %}

```
<ul id="product-grid" data-id="{{ section.id }}" class="
          grid product-grid grid--{{ section.settings.columns_mobile }}-col-tablet-down
          grid--{{ section.settings.columns_desktop }}-col-desktop">
          {%- for product in collection.products -%}

            {% assign lazy_load = false %}
            {%- if forloop.index > 2 -%}
              {%- assign lazy_load = true -%}
            {%- endif -%}


          {% for option in product.options %}
          {% if product.options_by_name['Color'].values == null %}
                <li class="grid__item">
                {% render 'card-product',
                card_product: product,
                product_title: product.title,
                media_aspect_ratio: section.settings.image_ratio,
                show_secondary_image: section.settings.show_secondary_image,
                show_vendor: section.settings.show_vendor,
                show_rating: section.settings.show_rating,
                lazy_load: lazy_load,
                show_quick_add: section.settings.enable_quick_add,
                section_id: section.id
              %}
              </li>
            {% endif %}
      {% if option == 'Color' %}
      {% assign index = forloop.index0 %}
      {% assign colorlist = '' %}
      {% assign color = '' %}
      {% for variant in product.variants %}
      {% capture color %}
      {{ variant.options[index] }}
          {% endcapture %}
          {% unless colorlist contains color %}
            <li class="grid__item">
              {% render 'card-product-variant',
                card_product: variant,
                title: product.title,
                color: color,
                media_aspect_ratio: section.settings.image_ratio,
                show_secondary_image: section.settings.show_secondary_image,
                show_vendor: section.settings.show_vendor,
                show_rating: section.settings.show_rating,
                lazy_load: lazy_load,
                show_quick_add: section.settings.enable_quick_add,
                section_id: section.id

              %}
            </li>
    {% capture tempList %}
      {{colorlist | append: color | append: " " }}
    {% endcapture %}
    {% assign colorlist = tempList %}
    {% endunless %}
    {% endfor %}
  {% endif %}
{% endfor %}
{%- endfor -%}
</ul>
```

{% endraw %}
To correctly display the variant, create another version of the `card-product` snippet file.

In the `Snippets` folder create a new file called `card-product-variant` and add this code:
{% raw %}

```
{% comment %}
  Renders a product variant card

  Accepts:
  - card_product: {Object} Product Liquid object (optional)
  - media_aspect_ratio: {String} Size of the product image card. Values are "square" and "portrait". Default is "square" (optional)
  - show_secondary_image: {Boolean} Show the secondary image on hover. Default: false (optional)
  - show_vendor: {Boolean} Show the product vendor. Default: false
  - show_rating: {Boolean} Show the product rating. Default: false
  - extend_height: {Boolean} Card height extends to available container space. Default: true (optional)
  - lazy_load: {Boolean} Image should be lazy loaded. Default: true (optional)
  - show_quick_add: {Boolean} Show the quick add button.
  - section_id: {String} The ID of the section that contains this card.
  - horizontal_class: {Boolean} Add a card--horizontal class if set to true. Default: false
  - title: product.title
  Usage:
  {% render 'card-product-variant', show_vendor: section.settings.show_vendor %}
{% endcomment %}

{{ 'component-rating.css' | asset_url | stylesheet_tag }}

{%- if card_product and card_product != empty -%}
  {%- liquid
    assign ratio = 1
    if card_product.featured_media and media_aspect_ratio == 'portrait'
      assign ratio = 0.8
    elsif card_product.featured_media and media_aspect_ratio == 'adapt'
      assign ratio = card_product.featured_media.aspect_ratio
    endif
    if ratio == 0 or ratio == nil
      assign ratio = 1
    endif
  -%}
  <div class="card-wrapper product-card-wrapper underline-links-hover">
    <div
      class="
        card
        card--{{ settings.card_style }}
        {% if card_product.featured_media %} card--media{% else %} card--text{% endif %}
        {% if settings.card_style == 'card' %} color-{{ settings.card_color_scheme }} gradient{% endif %}
        {% if extend_height %} card--extend-height{% endif %}
        {% if card_product.featured_media == nil and settings.card_style == 'card' %} ratio{% endif %}
        {% if horizontal_class %} card--horizontal{% endif %}
      "
      style="--ratio-percent: {{ 1 | divided_by: ratio | times: 100 }}%;"
    >
      <div
        class="card__inner {% if settings.card_style == 'standard' %}color-{{ settings.card_color_scheme }} gradient{% endif %}{% if card_product.featured_media or settings.card_style == 'standard' %} ratio{% endif %}"
        style="--ratio-percent: {{ 1 | divided_by: ratio | times: 100 }}%;"
      >
        {%- if card_product.featured_media -%}
          <div class="card__media">
            <div class="media media--transparent media--hover-effect">
              {% comment %}theme-check-disable ImgLazyLoading{% endcomment %}
              <img
                srcset="
                  {%- if card_product.featured_media.width >= 165 -%}{{ card_product.featured_media | image_url: width: 165 }} 165w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 360 -%}{{ card_product.featured_media | image_url: width: 360 }} 360w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 533 -%}{{ card_product.featured_media | image_url: width: 533 }} 533w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 720 -%}{{ card_product.featured_media | image_url: width: 720 }} 720w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 940 -%}{{ card_product.featured_media | image_url: width: 940 }} 940w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 1066 -%}{{ card_product.featured_media | image_url: width: 1066 }} 1066w,{%- endif -%}
                  {{ card_product.featured_media | image_url }} {{ card_product.featured_media.width }}w
                "
                src="{{ card_product.featured_media | image_url: width: 533 }}"
                sizes="(min-width: {{ settings.page_width }}px) {{ settings.page_width | minus: 130 | divided_by: 4 }}px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                alt="{{ card_product.featured_media.alt | escape }}"
                class="motion-reduce"
                {% unless lazy_load == false %}
                  loading="lazy"
                {% endunless %}
                width="{{ card_product.featured_media.width }}"
                height="{{ card_product.featured_media.height }}"
              >
              {% comment %}theme-check-enable ImgLazyLoading{% endcomment %}

              {%- if card_product.media[1] != nil and show_secondary_image -%}
                <img
                  srcset="
                    {%- if card_product.media[1].width >= 165 -%}{{ card_product.media[1] | image_url: width: 165 }} 165w,{%- endif -%}
                    {%- if card_product.media[1].width >= 360 -%}{{ card_product.media[1] | image_url: width: 360 }} 360w,{%- endif -%}
                    {%- if card_product.media[1].width >= 533 -%}{{ card_product.media[1] | image_url: width: 533 }} 533w,{%- endif -%}
                    {%- if card_product.media[1].width >= 720 -%}{{ card_product.media[1] | image_url: width: 720 }} 720w,{%- endif -%}
                    {%- if card_product.media[1].width >= 940 -%}{{ card_product.media[1] | image_url: width: 940 }} 940w,{%- endif -%}
                    {%- if card_product.media[1].width >= 1066 -%}{{ card_product.media[1] | image_url: width: 1066 }} 1066w,{%- endif -%}
                    {{ card_product.media[1] | image_url }} {{ card_product.media[1].width }}w
                  "
                  src="{{ card_product.media[1] | image_url: width: 533 }}"
                  sizes="(min-width: {{ settings.page_width }}px) {{ settings.page_width | minus: 130 | divided_by: 4 }}px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                  alt=""
                  class="motion-reduce"
                  loading="lazy"
                  width="{{ card_product.media[1].width }}"
                  height="{{ card_product.media[1].height }}"
                >
              {%- endif -%}
            </div>
          </div>
        {%- endif -%}
        <div class="card__content">
          <div class="card__information">
            <h3
              class="card__heading"
              {% if card_product.featured_media == nil and settings.card_style == 'standard' %}
                id="title-{{ section_id }}-{{ card_product.id }}"
              {% endif %}
            >
              <a
                href="{{ card_product.url }}"
                id="StandardCardNoMediaLink-{{ section_id }}-{{ card_product.id }}"
                class="full-unstyled-link"
                aria-labelledby="StandardCardNoMediaLink-{{ section_id }}-{{ card_product.id }} NoMediaStandardBadge-{{ section_id }}-{{ card_product.id }}"
              >
                    {{ title | escape }} - {{color}}
              </a>
            </h3>
          </div>
          <div class="card__badge {{ settings.badge_position }}">
            {%- if card_product.available == false -%}
              <span
                id="NoMediaStandardBadge-{{ section_id }}-{{ card_product.id }}"
                class="badge badge--bottom-left color-{{ settings.sold_out_badge_color_scheme }}"
              >
                {{- 'products.product.sold_out' | t -}}
              </span>
            {%- elsif card_product.compare_at_price > card_product.price and card_product.available -%}
              <span
                id="NoMediaStandardBadge-{{ section_id }}-{{ card_product.id }}"
                class="badge badge--bottom-left color-{{ settings.sale_badge_color_scheme }}"
              >
                {{- 'products.product.on_sale' | t -}}
              </span>
            {%- endif -%}
          </div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3
            class="card__heading{% if card_product.featured_media or settings.card_style == 'standard' %} h5{% endif %}"
            {% if card_product.featured_media or settings.card_style == 'card' %}
              id="title-{{ section_id }}-{{ card_product.id }}"
            {% endif %}
          >
            <a
              href="{{ card_product.url }}"
              id="CardLink-{{ section_id }}-{{ card_product.id }}"
              class="full-unstyled-link"
              aria-labelledby="CardLink-{{ section_id }}-{{ card_product.id }} Badge-{{ section_id }}-{{ card_product.id }}"
            >
                {{ title | escape }} - {{color}}
            </a>
          </h3>
          <div class="card-information">
            {%- if show_vendor -%}
              <span class="visually-hidden">{{ 'accessibility.vendor' | t }}</span>
              <div class="caption-with-letter-spacing light">{{ card_product.vendor }}</div>
            {%- endif -%}

            <span class="caption-large light">{{ block.settings.description | escape }}</span>

            {%- if show_rating and card_product.metafields.reviews.rating.value != blank -%}
              {% liquid
                assign rating_decimal = 0
                assign decimal = card_product.metafields.reviews.rating.value.rating | modulo: 1
                if decimal >= 0.3 and decimal <= 0.7
                  assign rating_decimal = 0.5
                elsif decimal > 0.7
                  assign rating_decimal = 1
                endif
              %}
              <div
                class="rating"
                role="img"
                aria-label="{{ 'accessibility.star_reviews_info' | t: rating_value: card_product.metafields.reviews.rating.value, rating_max: card_product.metafields.reviews.rating.value.scale_max }}"
              >
                <span
                  aria-hidden="true"
                  class="rating-star color-icon-{{ settings.accent_icons }}"
                  style="--rating: {{ card_product.metafields.reviews.rating.value.rating | floor }}; --rating-max: {{ card_product.metafields.reviews.rating.value.scale_max }}; --rating-decimal: {{ rating_decimal }};"
                ></span>
              </div>
              <p class="rating-text caption">
                <span aria-hidden="true">
                  {{- card_product.metafields.reviews.rating.value }} /
                  {{ card_product.metafields.reviews.rating.value.scale_max -}}
                </span>
              </p>
              <p class="rating-count caption">
                <span aria-hidden="true">({{ card_product.metafields.reviews.rating_count }})</span>
                <span class="visually-hidden">
                  {{- card_product.metafields.reviews.rating_count }}
                  {{ "accessibility.total_reviews" | t -}}
                </span>
              </p>
            {%- endif -%}

            {% render 'price', product: card_product, price_class: '' %}
          </div>
        </div>
        {%- if show_quick_add -%}
          <div class="quick-add no-js-hidden">
            {%- assign product_form_id = 'quick-add-' | append: section_id | append: card_product.id -%}
            {%- if card_product.variants.size == 1 -%}
              <product-form>
                {%- form 'product', card_product, id: product_form_id, class: 'form', novalidate: 'novalidate', data-type: 'add-to-cart-form' -%}
                  <input
                    type="hidden"
                    name="id"
                    value="{{ card_product.selected_or_first_available_variant.id }}"
                    disabled
                  >
                  <button
                    id="{{ product_form_id }}-submit"
                    type="submit"
                    name="add"
                    class="quick-add__submit button button--full-width button--secondary"
                    aria-haspopup="dialog"
                    aria-labelledby="{{ product_form_id }}-submit title-{{ section_id }}-{{ card_product.id }}"
                    aria-live="polite"
                    data-sold-out-message="true"
                    {% if card_product.selected_or_first_available_variant.available == false %}
                      disabled
                    {% endif %}
                  >
                    <span>
                      {%- if card_product.selected_or_first_available_variant.available -%}
                        {{ 'products.product.add_to_cart' | t }}
                      {%- else -%}
                        {{ 'products.product.sold_out' | t }}
                      {%- endif -%}
                    </span>
                    <span class="sold-out-message hidden">
                      {{ 'products.product.sold_out' | t }}
                    </span>
                    <div class="loading-overlay__spinner hidden">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        class="spinner"
                        viewBox="0 0 66 66"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                      </svg>
                    </div>
                  </button>
                {%- endform -%}
              </product-form>
            {%- else -%}
              <modal-opener data-modal="#QuickAdd-{{ card_product.id }}">
                <button
                  id="{{ product_form_id }}-submit"
                  type="submit"
                  name="add"
                  class="quick-add__submit button button--full-width button--secondary"
                  aria-haspopup="dialog"
                  aria-labelledby="{{ product_form_id }}-submit title-{{ section_id }}-{{ card_product.id }}"
                  data-product-url="{{ card_product.url }}"
                >
                  {{ 'products.product.choose_options' | t }}
                  <div class="loading-overlay__spinner hidden">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="spinner"
                      viewBox="0 0 66 66"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                    </svg>
                  </div>
                </button>
              </modal-opener>
              <quick-add-modal id="QuickAdd-{{ card_product.id }}" class="quick-add-modal">
                <div
                  role="dialog"
                  aria-label="{{ 'products.product.choose_product_options' | t: product_name: card_product.title | escape }}"
                  aria-modal="true"
                  class="quick-add-modal__content global-settings-popup"
                  tabindex="-1"
                >
                  <button
                    id="ModalClose-{{ card_product.id }}"
                    type="button"
                    class="quick-add-modal__toggle"
                    aria-label="{{ 'accessibility.close' | t }}"
                  >
                    {% render 'icon-close' %}
                  </button>
                  <div id="QuickAddInfo-{{ card_product.id }}" class="quick-add-modal__content-info"></div>
                </div>
              </quick-add-modal>
            {%- endif -%}
          </div>
        {%- endif -%}
        <div class="card__badge {{ settings.badge_position }}">
          {%- if card_product.available == false -%}
            <span
              id="Badge-{{ section_id }}-{{ card_product.id }}"
              class="badge badge--bottom-left color-{{ settings.sold_out_badge_color_scheme }}"
            >
              {{- 'products.product.sold_out' | t -}}
            </span>
          {%- elsif card_product.compare_at_price > card_product.price and card_product.available -%}
            <span
              id="Badge-{{ section_id }}-{{ card_product.id }}"
              class="badge badge--bottom-left color-{{ settings.sale_badge_color_scheme }}"
            >
              {{- 'products.product.on_sale' | t -}}
            </span>
          {%- endif -%}
        </div>
      </div>
    </div>
  </div>
{%- else -%}
  <div class="product-card-wrapper card-wrapper underline-links-hover">
    <div
      class="
        card
        card--{{ settings.card_style }}
        card--text
        {% if extend_height %} card--extend-height{% endif %}
        {% if settings.card_style == 'card' %} color-{{ settings.card_color_scheme }} gradient{% endif %}
        {% if card_product.featured_media == nil and settings.card_style == 'card' %} ratio{% endif %}
        {{ horizontal_class }}
      "
      style="--ratio-percent: 100%;"
    >
      <div
        class="card__inner {% if settings.card_style == 'standard' %}color-{{ settings.card_color_scheme }} gradient{% endif %}{% if settings.card_style == 'standard' %} ratio{% endif %}"
        style="--ratio-percent: 100%;"
      >
        <div class="card__content">
          <div class="card__information">
            <h3 class="card__heading">
              <a role="link" aria-disabled="true" class="full-unstyled-link">
                {{ 'onboarding.product_title' | t }}
              </a>
            </h3>
          </div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3 class="card__heading{% if settings.card_style == 'standard' %} h5{% endif %}">
            <a role="link" aria-disabled="true" class="full-unstyled-link">
              {{ 'onboarding.product_title' | t }}
            </a>
          </h3>
          <div class="card-information">
            {%- if show_vendor -%}
              <span class="visually-hidden">{{ 'accessibility.vendor' | t }}</span>
              <div class="caption-with-letter-spacing light">{{ 'products.product.vendor' | t }}</div>
            {%- endif -%}
            {% render 'price' %}
          </div>
        </div>
      </div>
    </div>
  </div>
{%- endif -%}


```

{% endraw %}
It's basically the same code as the `card-product.liquid` snippet, but with a few changes to correctly display the variant title and color.

Now, all the color variants of a product should be visible on the collection page.
