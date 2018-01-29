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
      module: Nasa.land('demo-pop-race-00-10'),
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
      type: 'chart',
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
  const chartViewer = document.querySelector('*[data-viewer="chart"]');
  const mapViewer = document.querySelector('*[data-viewer="map"]');
  const municipal = document.querySelector('*[data-municipal]');
  const subHeader = document.querySelector('.sub-header');
  const regionalMap = new MassMap('map');


  const renderMap = (datasets) => {
    mapViewer.classList.add('active');
    chartViewer.classList.remove('active');

    let onlyMuni = true;

    regionalMap.setFormat(datasets.format || 'number');
    regionalMap.setColorRamp(datasets[datasets.ramp].data, datasets[datasets.ramp].columns, datasets.nonZero);

    regionalMap.unloadData('census');
    regionalMap.unloadData('muni');
    regionalMap.unloadData('schoolDistrict');

    if ('census' in datasets) {
      onlyMuni = false;
      regionalMap.renderData('census', datasets.census);
    }

    if ('schoolDistricts' in datasets) {
      onlyMuni = false;
      regionalMap.renderData('schoolDistricts', datasets.schoolDistricts, mouseHandlers);
    }

    if ('muni' in datasets) {
      regionalMap.layers.muni.fill = onlyMuni ? null : 'rgba(0,0,0,0)'; 
      regionalMap.renderData('muni', datasets.muni, mouseHandlers);
    }

    candlesticks.forEach(candlestick => {
      candlestick.removeTick('default');

      candlestick.setColumnSuffix(datasets.suffix);
      candlestick.setRange(regionalMap.minimum, regionalMap.maximum);
      candlestick.setFormat(datasets.format || 'number');

      candlestick.renderData(datasets[datasets.bounded], datasets.nonZero);

      if ('region' in datasets) {
        candlestick.addTick(datasets.region.data, 'Regional Median');
      }
    });
  };


  const renderChart = (datasets) => {
    chartViewer.classList.add('active');
    mapViewer.classList.remove('active');

    chartViewer.innerHTML = '';
    datasets.chart.bindto = chartViewer;

    c3.generate(datasets.chart);
  };


  const loadVisualization = (vizId) => {
    const viz = visualizations[vizId];

    viz.module.load(datasets => {
      if (viz.type === 'map') {
        renderMap(datasets);
      }
      else {
        renderChart(datasets);
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
