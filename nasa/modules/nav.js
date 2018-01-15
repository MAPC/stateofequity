Nasa.launch('nav', () => {

  const button  = document.querySelector('.nav-button');
  const wrapper = document.querySelector('.site-wrapper');


  button.addEventListener('click', e => {
    e.preventDefault();
    wrapper.classList.toggle('active');
  });

});
