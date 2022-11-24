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