---
title: "Adding Metafields to Product Variants"
date: 2021-01-02T16:19:53Z
backgroundColor: "#f5df4d"
backgroundImage: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"
---
By using metaafields we can store extra information for products, collections, customers, orders, blogs, pages and your shop. Then you can use the metafields object to display the information on you website pages using Liquid.

The easiest way to add metafields is by using an app, such as Metafields Guru. It is possible to add metafields without an app using the bulk editor.

A metafield consists of a namespace, a key, a value, and a description (optional). Use the namespace to group different metafields together in a logical way.

You can also add metafields to the product variants. That way you can display some different information depending on the selected variant. Displaying the variant metafield is a little trickier to achieve. We need to update the information depending the selected variant. So the javascript conncted to the selctor needs to be updated.  

Here is an explanation on how to achive this with the Debut theme, it may differ slightly depending the themes you are using.

Add some html like this to the product-template.liquid file (position it where you want the shipping information to appear):

```
<p class="variant_shipping_info" style="display: none;"></p>
```

Below this add some liquid code:
      
```liquid
{% capture 'meta_data' %}
{% for variant in product.variants %}
{{variant.id}}:{{ variant.metafields.shipping.time | json }}{% unless forloop.last %},{% endunless %}
  {% endfor %}
{% endcapture %}
```
  
Then add this javascript:
 
```javascript
<script>
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
</script>
```
 
Change the naming to match your metafields. Mine are variant.metafields.shipping.time 
 
Next you need to update the theme.js file. Find the code for the **Event handler for when a variant input changes** and add these 4 lines near the end.

```javascript
 if (variant) {
	  var id = variant.id 
	  shippingInfo(id);
      }

```
Like this:

```javascript
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
