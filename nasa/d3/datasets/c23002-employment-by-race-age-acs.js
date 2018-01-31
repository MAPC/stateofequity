Nasa.launch('c23002-employment-by-race-age-acs', () => {


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
    suffix: 'ue_p',
    format: 'percent',
    title: 'Percent unemployment',
    source: 'ACS',
    sourceYear: acsYear,
    ramp: 'census',
    bounded: 'muni',
    nonZero: true,
    race: 'Asian',
    muni: {
      key: 'muni_id',
      index: 'town_id',
      nameKey: 'municipal',
      columns: ['whiue_p', 'aaue_p', 'asue_p', 'latue_p'],
      column: 'asue_p',
      data: null,
    },
    census: {
      key: 'ct10_id',
      columns: ['whiue_p', 'aaue_p', 'asue_p', 'latue_p'],
      column: 'asue_p',
      data: null,
    },
    crosswalk: {
      data: null
    },
    region: {
      key: 'msa_id',
      columns: ['whiue_p', 'aaue_p', 'asue_p', 'latue_p'],
      data: null
    }
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.muni, ['municipal']) + ` FROM c23002_employment_by_race_age_acs_m WHERE acs_year = '${acsYear}'`),
    census: encodeURI(cartoUrl + columnString(datasets.census) + ` FROM c23002_employment_by_race_age_acs_ct WHERE acs_year = '${acsYear}'`),
    region: encodeURI(cartoUrl + columnString(datasets.region) + ` FROM c23002_employment_by_race_age_acs_msa WHERE msa_id = '14460'`),
    crosswalk: encodeURI(cartoUrl + "ct10_id, muni_id FROM table_datakeys_ct10"),
  };


  const load = next => {
    if (datasets.muni.data && datasets.census.data && datasets.region.data) {
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
