Nasa.launch('b17020-poverty-by-race-age-acs', () => {


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
    suffix: '65o_p',
    format: 'percent',
    ramp: 'census',
    title: 'Population over 65 years old in poverty',
    source: 'ACS',
    sourceYear: acsYear,
    bounded: 'muni',
    nonZero: true,
    race: 'Asian',
    muni: {
      key: 'muni_id',
      index: 'town_id',
      columns: ['whi65o_p', 'aa65o_p', 'as65o_p', 'lat65o_p'],
      column: 'as65o_p',
      data: null,
    },
    census: {
      key: 'ct10_id',
      columns: ['whi65o_p', 'aa65o_p', 'as65o_p', 'lat65o_p'],
      column: 'as65o_p',
      data: null,
    },
    crosswalk: {
      data: null
    },
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.muni, ['municipal']) + ` FROM b17020_poverty_by_race_age_acs_m WHERE acs_year = '${acsYear}'`),
    census: encodeURI(cartoUrl + columnString(datasets.census) + ` FROM b17020_poverty_by_race_age_acs_ct WHERE acs_year = '${acsYear}'`),
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
        .defer(d3v4.json, sources.crosswalk)
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
