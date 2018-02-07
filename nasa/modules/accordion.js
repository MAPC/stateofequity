Nasa.launch('accordion', () => {

  const arrayFrom = Nasa.land('array-from');


  function assignValue(trigger) {
    trigger.innerHTML = trigger.parentNode.classList.contains('active') ? '&minus;' : '&plus;';
  }

  return function(identifier, elem) {
    const container = elem || document.querySelector(identifier);
    const triggers = arrayFrom(container.querySelectorAll('*[data-action="toggle-accordion"]'));

    triggers.forEach(trigger => {
      assignValue(trigger);

      trigger.parentNode.addEventListener('click', e => {
        trigger.parentNode.classList.toggle('active');
        assignValue(trigger);
      });
    });
  };
});
