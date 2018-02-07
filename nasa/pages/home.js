Nasa.launch('home-page', () => {

  /**
   * Setup
   */

  Nasa.land('tabs')('.disparities');
  
  const downloads = Array.from(document.querySelectorAll('*[data-download]'));

  
  /**
   * State
   */

  downloads.forEach(download => {
    download.addEventListener('click', e => {
      e.preventDefault();
    });
  });


});
