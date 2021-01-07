---
title: "Adding Swatches"
date: 2020-12-30T16:20:14Z
backgroundColor: "#f5df4d"
backgroundImage: "data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10h10v10H0V10zM10 0h10v10H10V0z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"
---
Adding a size swatch to Venture theme. Add this code to the **product-template.liquid** file:  

```javascript
 {% unless product.has_only_default_variant %}
            {% for option in product.options_with_values %}
              
              <div class="selector-wrapper js product-form__item">
                
                {% if option.name == "Size" %}
                <label>{{ option.name }}</label>
                
                {% assign index = forloop.index %}
               
                <div class="size-swatch">  
                {% for value in option.values %}
       
                    {% assign variant_label_state = true %}
                      {% if product.options.size == 1 %}
                      {% unless product.variants[forloop.index0].available  %}
                      {% assign variant_label_state = false %}
                      {% endunless %}
                      {% endif %}
                         
                	<input class="single-option-selector-{{ section.id }}" 
                           id="size-{{forloop.index}}" 
                           type="radio" 
                           name="size" 
                           value="{{ value | escape }}" 
                           data-index="option{{ index }}" 
                           {% if option.selected_value == value %} checked="checked"{% endif %}
                           {% unless variant_label_state %} disabled="disabled"{% endunless %}
              		/>
                    <label for="size-{{forloop.index}}">
                      
                      {{value}}
                
                    </label>
                                  
                {% endfor %}
                </div>
                
                
                <style>
                  .size-swatch{
                    display: flex;
                   
                  }       
                  .size-swatch input{
                    opacity: 0;
                    width: 0;
                    height: 0;
                  }
                  .size-swatch label{
                    padding:1em;
                    max-height:44px;
                    border: 1px solid lightgray;
                    display: block;
                  

                  }
                 .size-swatch input:disabled + label {
                   opacity: 0.35;           
                   cursor: default;
                   text-decoration: line-through;
                  }
              
                  .size-swatch input:focus + label {
                    box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em green;
                  }
  
                </style>
  
                {% else %}
                <!-- default selector start-->
                <label {% if option.name == 'default' %}class="label--hidden" {% endif %}for="SingleOptionSelector-{{ section.id }}-{{ forloop.index0 }}">{{ option.name }}</label>
                <select class="single-option-selector single-option-selector-{{ section.id }} product-form__input"
                  id="SingleOptionSelector-{{ forloop.index0 }}"
                  data-name="{{ option.name }}"
                  data-index="option{{ forloop.index }}">
                  {% for value in option.values %}
                    <option value="{{ value | escape }}"{% if option.selected_value == value %} 
                            selected="selected"{% endif %}>{{ value }}</option>
                  {% endfor %}
                </select>
                 <!-- default selector end-->
                {% endif %}
                
              </div>
            {% endfor %}
          {% endunless %}
```
