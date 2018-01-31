Nasa.launch('tabs', () => {
  return function(identifier, next) {

    const container = document.querySelector(identifier);
    const tabs = Array.from(container.querySelectorAll('*[data-tabs] > *'));
    const panels = Array.from(container.querySelectorAll('*[data-tab]'));
    const options = [];


    // We need a dropdown for responsive purposes.
    const dropdown = document.createElement('select');
    dropdown.classList.add('tabs-select');


    tabs.forEach(tab => {

      const option = document.createElement('option');
      option.innerText = tab.innerText;
      option.value = tab.innerText;
      dropdown.appendChild(option);
      options.push(option);
      
      tab.addEventListener('click', e => {
        e.preventDefault();

        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
        dropdown.value = tab.innerText;

        panels.forEach(panel => {
          if (panel.dataset.tab === tab.innerText) {
            panel.classList.add('active');
          }
          else {
            panel.classList.remove('active');
          }
        });

        if (next) {
          next(tab);
        }
      });
    });


    dropdown.addEventListener('change', () => {
      tabs.some(tab => {
        const found = (dropdown.value === tab.innerText);
        if (found) tab.click();

        return found;
      });
    });


    container.appendChild(dropdown);
    tabs[0].click();

  };
});
