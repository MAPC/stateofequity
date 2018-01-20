Nasa.launch('indicators-page', () => {

  /**
   * Modules
   */

  const tabs = Nasa.land('tabs');
  const MassMap = Nasa.land('mass-map');
  const Candlestick = Nasa.land('candlestick');

  const maps = {
    income: Nasa.land('income-mass-map'),
  };


  /**
   * Setup
   */

  const candlesticks = ['as', 'aa', 'lat', 'whi'].map(raceId => new Candlestick(raceId));
  const municipal = document.querySelector('*[data-municipal]');
  const subHeader = document.querySelector('.sub-header');
  const regionalMap = new MassMap('map');

  tabs('.indicators');


  /**
   * State
   */

  const mouseHandlers = {
    in(d) {
      d3.select(this).raise();

      subHeader.classList.remove('default');
      municipal.innerText = d.properties.municipal;
    },

    out() {
      subHeader.classList.add('default');
    }
  };


  maps.income.load(datasets => {
    regionalMap.setColorRamp(datasets.census.data, datasets.census.columns);

    candlesticks.forEach(candlestick => {
      candlestick.setRange(regionalMap.minimum, regionalMap.maximum);
    });

    regionalMap.renderData('census', datasets.census);
    regionalMap.renderData('muni', datasets.muni, mouseHandlers);

    if ('schoolDistricts' in datasets) {
      regionalMap.renderData('schoolDistricts', datasets.schoolDistricts);
    }
  });

});
