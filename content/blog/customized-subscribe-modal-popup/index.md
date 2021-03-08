---
title: "A customized subscribe modal popup"
date: 2021-03-07T16:20:05Z
backgroundColor: "#D9CB9E"
backgroundImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%237575ff' fill-opacity='1' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E"
---
Create a new liquid file in your snippets folder called popup.liquid.
Add the following code to the file:
```
 <script>
  var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
      let fadeIn = {{settings.fadein}} * 1000;
      console.log(`fade in time is set to ${fadeIn}`);
console.log(typeof(fadeIn));
  const modal = document.getElementById("modal-id");
 const overlay = document.getElementById("overlay-id");

  setTimeout(function () {
    modal.classList.add("visible");
 overlay.classList.add("visible");
  }, fadeIn);


  document
    .querySelector(".closeBtn")
    .addEventListener("click", (e) => {
      modal.classList.remove("visible");
    overlay.classList.remove("visible");
    });
 
  document
    .querySelector(".subscribe-overlay")
    .addEventListener("click", (e) => {
      modal.classList.remove("visible");
    overlay.classList.remove("visible");
    });
 
  addEventListener("keydown", escapeFunc);
  function escapeFunc(event) {
    if (event.keyCode === 27) {
      modal.classList.remove("visible");
      overlay.classList.remove("visible");
    }
  }
});

</script>


<div class="subscribe-overlay" id="overlay-id"></div>
<div class="subscribe-modal" id="modal-id">
  <button type="button" class="closeBtn" aria-label="Close"><span aria-hidden="true">Close</span></button>
  <div class="container">
    <h1>{{settings.popup_title}}</h1>
    <p class="message">{{settings.popup_message}}</p>

    <form>
      <input type="email" placeholder="Email Address">
      <input type="submit" value="Subscribe">
    </form>
  </div>
</div>

<style>
    
.subscribe-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
}
.subscribe-modal {
  display: none;
  width: 500px;
  max-width: 100%;
  max-height: 100%;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
}
.container {
  margin-top: 3rem ;
  text-align: center;
  width:100%;
  display: grid;
  grid-template-columns: 1fr;
}
.message {
  line-height: 1.5;
  font-size: 1.2em;
  padding: 1rem;
}
form {
  display: flex;
  flex-wrap: wrap;
}
form > input {
  flex: 1 1 10ch;
  margin: 0.5rem;
}
form > input[type="email"] {
  flex: 3 1 30ch;
}
input {
  border: none;
  background: hsl(0 0% 93%);
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
}
input[type="submit"] {
  background: {{settings.button_color}};
  color: white;
}

.closeBtn {
  position: absolute;
  z-index: 1000;
  top: 0px;
  right: 0px;
  color: darkgray;
  padding: 5px 10px;
  font-size: 1.2em;
  border: none;
  background: rgba(255, 255, 255, 0);
  }

.closeBtn:focus,
.closeBtn:hover {
  outline: none;
  color: black;
}
.visible {
  display: flex;
 
  animation: fade-in 2s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
```
Now you need to edit the code in the settings_schema.json file. It's located in your theme's config folder. The formatting of this file can be difficult, you can find Shopify's guidelines here: https://shopify.dev/docs/themes/settings

Adding this code will make the popup content customizable through the theme editor:
```
 {
    "name": {
      "en": "Subscribe Popup"
    },
    "settings": [  
      {
        "type": "text",
        "id": "popup_title",
        "default": "Sign-up",
        "label": "Title"
      },
      {
        "type": "textarea",
        "id": "popup_message",
        "default": "Subscribe to our newsletter",
        "label": "Message"
      },
      {
         "type": "color",
         "id": "button_color",
         "label": "Button color",
         "default": "#ff4500"
      },   
      {
        "type": "range",
        "id": "fadein",
        "min": 0,
        "max": 10,
        "step": 1,
        "unit": "sec",
        "label": "Time before popup to appear",
        "default": 4
      },
      {
        "type": "checkbox",
        "id": "home_page",
        "default": true,
        "label": "Show only on Home page"
      }
    ]
  },
```
To make the popup content customizable in the theme editor.

Finally add the following code to your theme.liquid file. Place the code before the closing body tag </body>.

The popup should now appear in your customizable theme settings:
![shopify theme settings](images/settings1.png)   

![shopify theme settings](images/settings.png)
