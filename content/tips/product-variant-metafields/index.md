---
title: "Adding Metafields to Product Variants - Dawn Theme"
date: 2021-11-10T16:19:53Z
backgroundColor: "#e5e0c9"
backgroundImage: "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2355245a' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E"
---

By using metafields we can store extra information on products, collections, customers, orders, blogs, pages and your shop. Then, you can use the metafield object to display the information on you website pages using simple Liquid code.

Adding custom Metafields is now built into Shopify. It can be accessed via ***Settings -> Metafields*** in your Dashboard (currently, you can only add metafields to Products and Variants with this method; Collections, Customers and Orders will be added soon). Previously, the easiest way to add metafields was by using an app, such as Metafields Guru. It is also still possible to add metafields without an app using the bulk editor, [here's how](https://www.sunbowlsystems.com/blogs/how-to/metafields-in-shopify-without-using-an-app).

A metafield consists of a namespace, a key, a value, and an optional description. The namespace is used to logically group different metafields.

You can also add metafields to the product variants, but it is a little more complicated to access the variant metafield information on your page. Variant metafields can display different information depending on the selected variant. To achieve this it's necessary to update the information depending on a change to the selected variant. This involves updating the javascript code connected to the selector.

Here is an explanation on how to achieve this with the Dawn theme, it will differ slightly depending the theme you are using.

For example, here's how to display different shipping inforamtion depending on a selected product variant:

- Add some html to the ***main-product.liquid*** file in the Sections folder (position it where you would like to display the shipping information):

```
<p class="variant_shipping_info" style="display: none;"></p>
```

- Below this add some liquid code:

```liquid
{% capture 'meta_data' %}       
    {% for variant in product.variants %}
        {{variant.id}}:{{ variant.metafields.my_fields.shipping | json }}
        {% unless forloop.last %},{% endunless %}           
   {% endfor %}
{% endcapture %}    
```

- Then, add this javascript inside ***script*** tags in the ***main-product.liquid*** file:

```
<script>
  const currentVariantId = {{ product.selected_or_first_available_variant.id }};
  const metaData = { {{ meta_data }} };        
  const shippingInfo = (id) => {
  let selector = document.querySelector('.variant_shipping_info');
    if (metaData[id]) {
     selector.style.display = 'block'
     selector.innerHTML = metaData[id];
    }
    else 
     selector.style.display = 'none'
  }
  shippingInfo(currentVariantId);

</script>
```

Make sure to change the naming to match your metafields. Mine are ***variant.metafields.my_fields.shipping***.

Next, in the case of the Dawn theme, you need to update the ***global.js*** file in the Assets folder. Find the code starting with ___onVariantChange()___ (it should be around line 570). Below, add another method call for ***updateMeta()***:

```
  onVariantChange() {
    	
    this.updateOptions();
    this.updateMasterId();
    this.updateMeta();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();

```

Then add the ***updateMeta*** code further down with the other update methods:

```
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMeta() {
	  shippingInfo(this.currentVariant.id);
  }
  
  updateMedia() { ...
  
```

Now your variant metafield should update as you select different options.
