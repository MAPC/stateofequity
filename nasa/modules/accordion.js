Nasa.launch('accordion', () => {

  function assignValue(trigger) {
    trigger.innerHTML = trigger.parentNode.classList.contains('active') ? '&minus;' : '&plus;';
  }

  return function(identifier, elem) {
    const container = elem || document.querySelector(identifier);
    const triggers = Array.from(container.querySelectorAll('*[data-action="toggle-accordion"]'));

    triggers.forEach(trigger => {
      assignValue(trigger);

      trigger.addEventListener('click', e => {
        e.preventDefault();

        trigger.parentNode.classList.toggle('active');
        assignValue(trigger);
      });
    });
  };
});
