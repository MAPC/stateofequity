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

  const regionalMap = new MassMap('map');

  tabs('.indicators');


  /**
   * State
   */


  maps.income.load(datasets => {
    regionalMap.setColorRamp(datasets.census.data, datasets.census.columns);

    regionalMap.renderData('census', datasets.census);
    regionalMap.renderData('muni', datasets.muni);

    if ('schoolDistricts' in datasets) {
      regionalMap.renderData('schoolDistricts', datasets.schoolDistricts);
    }
  });

});
