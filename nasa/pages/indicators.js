Nasa.launch('indicators-page', () => {

  /**
   * Modules
   */

  const tabs = Nasa.land('tabs');
  const MassMap = Nasa.land('mass-map');
  const Candlestick = Nasa.land('candlestick');

  const visualizations = {
    diversity: {
      type: 'map',
      module: Nasa.land('soe-neigh-income-seg'),
    },
    housing: {
      type: 'map',
      module: Nasa.land('soe-neigh-income-seg'),
    },
    health: {
      type: 'chart',
      module: Nasa.land('health-births-lbw-race-educ'),
    },
    education: {
      type: 'map',
      module: Nasa.land('educ-mcas-gr10-math-by-year'),
    },
    income: {
      type: 'map',
      module: Nasa.land('soe-neigh-income-seg'),
    },
    home_ownership: {
      type: 'map',
      module: Nasa.land('soe-hous-hmda-race'),
    },
    employment: {
      type: 'map',
      module: Nasa.land('c23002-employment-by-race-age-acs'),
    },
    criminal_justice: {
      type: 'map',
      module: Nasa.land('pubsafety-inmate-crimes-race-by-year'),
    },
    seniors: {
      type: 'map',
      module: Nasa.land('b17020-poverty-by-race-age-acs'),
    },
  };


  /**
   * Setup
   */

  const candlesticks = ['as', 'aa', 'lat', 'whi'].map(raceId => new Candlestick(raceId));
  const municipal = document.querySelector('*[data-municipal]');
  const subHeader = document.querySelector('.sub-header');
  const regionalMap = new MassMap('map');


  const renderMap = (datasets) => {
    regionalMap.setFormat(datasets.format || 'number');
    regionalMap.setColorRamp(datasets[datasets.ramp].data, datasets[datasets.ramp].columns);

    regionalMap.unloadData('census');
    regionalMap.unloadData('muni');
    regionalMap.unloadData('schoolDistrict');

    if ('census' in datasets) {
      regionalMap.renderData('census', datasets.census);
    }

    if ('muni' in datasets) {
      regionalMap.renderData('muni', datasets.muni, mouseHandlers);
    }

    if ('schoolDistricts' in datasets) {
      regionalMap.renderData('schoolDistricts', datasets.schoolDistricts, mouseHandlers);
    }

    candlesticks.forEach(candlestick => {
      candlestick.removeTick('regional');

      candlestick.setColumnSuffix(datasets.suffix);
      candlestick.setRange(regionalMap.minimum, regionalMap.maximum);
      candlestick.setFormat(datasets.format || 'number');

      candlestick.renderData(datasets[datasets.bounded]);

      if ('region' in datasets) {
        candlestick.addTick(datasets.region.data, 'Regional Median', 'regional');
      }
    });
  };


  const renderCharts = (datasets) => {
  
  };


  const loadVisualization = (vizId) => {
    const viz = visualizations[vizId];

    viz.module.load(datasets => {
      if (viz.type === 'map') {
        renderMap(datasets);
      }
      else {
        renderCharts(datasets);
      }
    });
  };


  tabs('.indicators', tab => loadVisualization(tab.dataset.vizId));


  /**
   * State
   */

  const mouseHandlers = {
    in(d) {
      d3v4.select(this).raise();

      subHeader.classList.remove('default');
      municipal.innerText = d.properties.municipal;

      candlesticks.forEach(candlestick => {
        candlestick.addTick(d.properties, d.properties.municipal, d.properties.municipal);
      });
    },

    out(d) {
      subHeader.classList.add('default');

      candlesticks.forEach(candlestick => {
        candlestick.removeTick(d.properties.municipal);
      });
    }
  };

});
