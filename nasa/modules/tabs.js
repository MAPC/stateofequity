Nasa.launch('tabs', () => {
  return function(identifier) {

    const container = document.querySelector(identifier);
    const tabs = Array.from(container.querySelectorAll('*[data-tabs] > *'));
    const panels = Array.from(container.querySelectorAll('*[data-tab]'));


    tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.preventDefault();

        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(panel => {
          if (panel.dataset.tab === tab.innerHTML) {
            panel.classList.add('active');
          }
          else {
            panel.classList.remove('active');
          }
        });
      });
    });


    tabs[0].click();

  };
});
