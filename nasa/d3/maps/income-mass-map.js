Nasa.launch('income-mass-map', () => {


  /**
   * Modules
   */

  const columnString = Nasa.land('column-string');
  const nest = Nasa.land('nest');


  /**
   * Setup
   */

  const cartoUrl = 'https://mapc-admin.carto.com/api/v2/sql?q=SELECT ';

  const datasets = {
    muni: {
      key: 'muni_id',
      index: 'town_id',
      columns: ['whi_mhi','aa_mhi','as_mhi','lat_mhi'],
      column: 'whi_mhi',
      data: null,
    },
    census: {
      key: 'ct10_id',
      columns: ['whi_mhi','aa_mhi','as_mhi','lat_mhi'],
      column: 'whi_mhi',
      data: null,
    },
    crosswalk: {
      data: null
    }
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.muni, ['municipal']) + " FROM b19013_mhi_race_acs_m WHERE acs_year = '2011-15'"),
    census: encodeURI(cartoUrl + columnString(datasets.census) + " FROM b19013_mhi_race_acs_ct WHERE acs_year = '2011-15'"),
    crosswalk: encodeURI(cartoUrl + "ct10_id, muni_id FROM table_datakeys_ct10"),
  };


  const load = next => {
    if (datasets.muni.data && datasets.census.data) {
      next(datasets);
    }
    else {
      d3.queue()
        .defer(d3.json, sources.muni)
        .defer(d3.json, sources.census)
        .defer(d3.json, sources.crosswalk)
        .await((err, muni, census, crosswalk) => {
          datasets.muni.data = muni.rows;
          datasets.census.data = census.rows;
          datasets.crosswalk.data = nest(crosswalk.rows, 'ct10_id');

          datasets.census.getMuniId = d => {
            return datasets.crosswalk.data[d.properties.ct10_id].muni_id;
          };

          datasets.muni.getMuniId = d => {
            return d.properties.muni_id;
          };

          next(datasets);
        });
    }
  };


  return { load, sources, datasets };
});
