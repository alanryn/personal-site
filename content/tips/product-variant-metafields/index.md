---
title: "Adding Metafields to Product Variants"
date: 2021-01-02T16:19:53Z
backgroundColor: "#D9CB9E"
backgroundImage: "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237575ff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E"
---
{{< aria-hidden-span >}}{{< drop-cap >}}
B{{< /drop-cap >}}y{{< /aria-hidden-span >}} {{< sr-only-span >}}By{{< /sr-only-span >}} using metaafields we can store extra information on products, collections, customers, orders, blogs, pages and your shop. Then, you can use the metafields object to display the information on you website pages using simple Liquid code.  

The easiest way to add metafields is by using an app, such as Metafields Guru. It is possible to add metafields without an app using the bulk editor, [here's how]().

A metafield consists of a namespace, a key, a value, and an optional description. The namespace is used to logically group different metafields.

You can also add metafields to the product variants, but it is more complcated to access the variant metafield information on your page. Variant metafields can display some different information depending on the selected variant. To achieve this it's necessary to update the information depending on a change to the selected variant. The involves updating the javascript connected to the selctor.  

Here is an explanation on how to achive this with the Debut theme, it may differ slightly depending the themes you are using.  

For example, here's how to display different shipping inforamtion depending on a selected product variant:  

* Add some html like this to the product-template.liquid file (position it where you would like to display the shipping information):

```
<p class="variant_shipping_info" style="display: none;"></p>
```

* Below this add some liquid code:
      
```liquid
{% capture 'meta_data' %}
{% for variant in product.variants %}
{{variant.id}}:{{ variant.metafields.shipping.time | json }}{% unless forloop.last %},{% endunless %}
  {% endfor %}
{% endcapture %}
```
  
* Then, add this javascript inside <script> </script> tags:
 
```
  const currentVariantId = {{ product.selected_or_first_available_variant.id }}; 
  const metaData = { {{ meta_data }} };
  const shippingInfo = (id) => {
  var selector = document.querySelector('.variant_shipping_info');
    if (metaData[id]) {
     selector.style.display = 'block'
     selector.innerHTML = metaData[id];
    } 
  }
  shippingInfo(currentVariantId);  
```
 
Make sure to change the naming to match your metafields. Mine are variant.metafields.shipping.time 
 
Next you need to update the theme.js file. Find the code for the **Event handler for when a variant input changes**, and add these few lines near the end.

```
 if (variant) {
	  var id = variant.id 
	  shippingInfo(id);
      }
```
Like this:

```
 _onSelectChange: function() {
      var variant = this._getVariantFromOptions();
 
      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });
 
      if (!variant) {
        return;
      }
 
      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;
 
      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
      
      
      if (variant) {
	  var id = variant.id 
	  shippingInfo(id);
      }
      
    }, 
 ```
 
 Now your variant metafield should update as you select different options.
 

