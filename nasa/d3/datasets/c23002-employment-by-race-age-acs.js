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
    tempMuni: {
      key: 'muni_id',
      columns: ['unemp_p']
    },
    tempCensus: {
      key: 'ct10_id',
      columns: ['unemp_p']
    },
    tempRegion: {
      key: 'msa_id',
      columns: ['unemp_p']
    },
    muni: {
      key: 'muni_id',
      index: 'town_id',
      nameKey: 'municipal',
      columns: ['nhwue_p', 'aaue_p', 'asue_p', 'latue_p'],
      column: 'asue_p',
      data: null,
    },
    census: {
      key: 'ct10_id',
      columns: ['nhwue_p', 'aaue_p', 'asue_p', 'latue_p'],
      column: 'asue_p',
      data: null,
    },
    crosswalk: {
      data: null
    },
    region: {
      key: 'msa_id',
      columns: ['nhwue_p', 'aaue_p', 'asue_p', 'latue_p'],
      data: null
    }
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.muni, ['municipal']) + ` FROM c23002_employment_by_race_age_acs_m WHERE acs_year = '${acsYear}'`),
    census: encodeURI(cartoUrl + columnString(datasets.census) + ` FROM c23002_employment_by_race_age_acs_ct WHERE acs_year = '${acsYear}'`),
    region: encodeURI(cartoUrl + columnString(datasets.region) + ` FROM c23002_employment_by_race_age_acs_msa WHERE msa_id = '14460'`),
    tempMuni: encodeURI(cartoUrl + columnString(datasets.tempMuni) + ` FROM b23025_employment_acs_m WHERE acs_year = '${acsYear}'`),
    tempCensus: encodeURI(cartoUrl + columnString(datasets.tempCensus) + ` FROM b23025_employment_acs_ct WHERE acs_year = '${acsYear}'`),
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
        .defer(d3v4.json, sources.tempMuni)
        .defer(d3v4.json, sources.tempCensus)
        .defer(d3v4.json, sources.crosswalk)
        .await((err, muni, census, region, tempMuni, tempCensus, crosswalk) => {

          tempMuni = nest(tempMuni.rows, 'muni_id');
          tempCensus = nest(tempCensus.rows, 'ct10_id');

          datasets.muni.data = muni.rows.map(row => Object.assign({allue_p: tempMuni[row.muni_id].unemp_p}, row));
          datasets.census.data = census.rows.map(row => Object.assign({allue_p: tempCensus[row.ct10_id].unemp_p}, row));
          datasets.region.data = region.rows[0];

          datasets.muni.columns.push('allue_p');
          datasets.census.columns.push('allue_p');

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
