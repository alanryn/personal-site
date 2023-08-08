---
layout: layouts/base.njk
title: Contact
eleventyNavigation:
  key: Contact
  order: 2
---

  <form id="my-form" class="contact-form" name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <label style="margin-top:0" for="inputName">Name</label>
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
