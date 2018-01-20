Nasa.launch('indicators-page', () => {

  /**
   * Modules
   */

  const MassMap = Nasa.land('mass-map');
  const tabs = Nasa.land('tabs');

  const maps = {
    income: Nasa.land('income-mass-map'),
  };


  /**
   * Setup
   */

  const municipal = document.querySelector('*[data-municipal]');
  const subHeader = document.querySelector('.sub-header');
  const regionalMap = new MassMap('map');

  tabs('.indicators');


  /**
   * State
   */


  maps.income.load(datasets => {
    regionalMap.setColorRamp(datasets.census.data, datasets.census.columns);

    regionalMap.renderData('census', datasets.census);
    regionalMap.renderData('muni', datasets.muni, {
      in(d) {
        d3.select(this).raise();
        subHeader.classList.remove('default');
        municipal.innerText = d.properties.municipal;
      },

      out(d) {
       subHeader.classList.add('default');
      }
    });

    if ('schoolDistricts' in datasets) {
      regionalMap.renderData('schoolDistricts', datasets.schoolDistricts);
    }
  });

});
