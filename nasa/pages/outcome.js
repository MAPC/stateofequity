Nasa.launch('outcome-page', () => {

  /**
   * Modules
   */

  const makeAccordion = Nasa.land('accordion');
  const arrayFrom = Nasa.land('array-from');


  /**
   * Elements
   */

  const accordions = arrayFrom(document.querySelectorAll('*[data-accordion]'));

  
  /**
   * State
   */

  accordions.forEach(accordion => makeAccordion(null, accordion));

});
