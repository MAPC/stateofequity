Nasa.launch('home-page', () => {

  const arrayFrom = Nasa.land('array-from');


  /**
   * Setup
   */

  Nasa.land('tabs')('.disparities');
  
  const downloads = arrayFrom(document.querySelectorAll('*[data-download]'));

  
  /**
   * State
   */

  downloads.forEach(download => {
    download.addEventListener('click', e => {
      e.preventDefault();
    });
  });


});
