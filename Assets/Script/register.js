    /**
     * dark mode button
     */
     const toggle = document.getElementById("dark-body");
 
     function move() {
         if (document.body.classList.contains('dark')) {
             document.body.classList.remove('dark');
             sessionStorage.setItem('dark', 0);
         } else {
             document.body.classList.add('dark');
             sessionStorage.setItem('dark', 1);
         }
     }
 
     window.addEventListener('load', function() {
         if (sessionStorage.getItem('dark') == 1) {
             document.body.classList.add('dark');
         }
     });

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".containerww");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();