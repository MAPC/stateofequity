Nasa.launch('outcome-page', () => {

  /**
   * Modules
   */

  const makeAccordion = Nasa.land('accordion');


  /**
   * Elements
   */

  const accordions = Array.from(document.querySelectorAll('*[data-accordion]'));

  
  /**
   * State
   */

  accordions.forEach(accordion => makeAccordion(null, accordion));

});
