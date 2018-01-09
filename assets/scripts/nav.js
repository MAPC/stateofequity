(function() {
  var button  = document.querySelector('.nav-button'),
      wrapper = document.querySelector('.site-wrapper');


  button.addEventListener('click', function(e) {
    e.preventDefault();
    wrapper.classList.toggle('active');
  });
  

})();
