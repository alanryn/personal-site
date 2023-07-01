---
layout: layouts/base.njk
title: Contact
eleventyNavigation:
  key: Contact
  order: 2
---

<div class="contact">
  <div class="postlist-item">
      <h1>{{ title }}</h1>
      <p class="bio">A freelance frontend developer, specializing in Shopify. 
      I am currently working on <a href="https://www.thelocals.cc/">the-locals</a>, a cycling e-commerce start-up.</p>
      <p style="margin-top: 1rem;">Does you Shopify site need some fixing?</p>
      <p>I'm available for hire, on a retainer, for a one off project, or if you just want some free advice.</p> <br />
  </div>

<div class="postlist-item">
  <form id="my-form" class="contact-form" name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <label for="inputName">Name</label>
  <input type="text"   
         name="name" 
         id="inputName" 
         placeholder="Enter your name"
         required="required">
  </input>
  <label for="inputEmail" required="required">Email Address</label>
  <input type="email" 
         name="email"
         id="inputEmail" 
         placeholder="Enter your email address">
  </input>
  <label for="message">Your Message</label>            
  <textarea
          rows="5" 
          name="message" 
          id="message" 
          placeholder="Add your message here" required=""></textarea>
  <button class="contact-btn" type="submit">Send</button>
<p id="my-form-status"></p>
</form>
</div>

</div>



<script>
    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.innerHTML = "Thanks. I will get back to you soon.";
        form.reset()
      }).catch(error => {
        status.innerHTML = "Sorry! There was a problem submitting your form, try again"
      });
    }
    form.addEventListener("submit", handleSubmit)
</script>
