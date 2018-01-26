Nasa.launch('soe-neigh-income-seg', () => {


  /**
   * Modules
   */

  const columnString = Nasa.land('column-string');
  const nest = Nasa.land('nest');


  /**
   * Setup
   */

  const cartoUrl = 'https://mapc-admin.carto.com/api/v2/sql?q=SELECT ';
  const acsYear = '2011-15';


  const datasets = {
    suffix: '_mhi',
    format: 'dollar',
    ramp: 'census',
    bounded: 'muni',
    nonZero: true,
    muni: {
      key: 'muni_id',
      index: 'town_id',
      columns: ['whi_mhi', 'aa_mhi', 'as_mhi', 'lat_mhi'],
      column: 'whi_mhi',
      data: null,
    },
    census: {
      key: 'ct10_id',
      columns: ['whi_mhi', 'aa_mhi', 'as_mhi', 'lat_mhi'],
      column: 'whi_mhi',
      data: null,
    },
    crosswalk: {
      data: null
    },
    region: {
      key: 'msa_id',
      columns: ['whi_mhi', 'aa_mhi', 'as_mhi', 'lat_mhi'],
      data: null
    }
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.muni, ['municipal']) + ` FROM b19013_mhi_race_acs_m WHERE acs_year = '${acsYear}'`),
    census: encodeURI(cartoUrl + columnString(datasets.census) + ` FROM b19013_mhi_race_acs_ct WHERE acs_year = '${acsYear}'`),
    region: encodeURI(cartoUrl + columnString(datasets.region) + ` FROM b19013_mhi_race_acs_msa WHERE acs_year = '${acsYear}' AND msa_id = '14460'`),
    crosswalk: encodeURI(cartoUrl + "ct10_id, muni_id FROM table_datakeys_ct10"),
  };


  const load = next => {
    if (datasets.muni.data && datasets.census.data) {
      next(datasets);
    }
    else {
      d3v4.queue()
        .defer(d3v4.json, sources.muni)
        .defer(d3v4.json, sources.census)
        .defer(d3v4.json, sources.region)
        .defer(d3v4.json, sources.crosswalk)
        .await((err, muni, census, region, crosswalk) => {
          datasets.muni.data = muni.rows;
          datasets.census.data = census.rows;
          datasets.region.data = region.rows[0];

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
