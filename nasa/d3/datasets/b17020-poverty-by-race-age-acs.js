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
    tempMuni: {
      key: 'muni_id',
      columns: ['pov_65o_p'],
    },
    tempCensus: {
      key: 'ct10_id',
      columns: ['pov_65o_p'],
    },
    muni: {
      key: 'muni_id',
      index: 'town_id',
      nameKey: 'municipal',
      columns: ['nhw65o_p', 'aa65o_p', 'as65o_p', 'lat65o_p'],
      column: 'all65o_p',
      data: null,
    },
    census: {
      key: 'ct10_id',
      columns: ['nhw65o_p', 'aa65o_p', 'as65o_p', 'lat65o_p'],
      column: 'all65o_p',
      data: null,
    },
    crosswalk: {
      data: null
    },
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.muni, ['municipal']) + ` FROM b17020_poverty_by_race_age_acs_m WHERE acs_year = '${acsYear}'`),
    tempMuni: encodeURI(cartoUrl + columnString(datasets.tempMuni) + ` FROM b17001_poverty_by_age_gender_acs_m WHERE acs_year = '${acsYear}'`),
    census: encodeURI(cartoUrl + columnString(datasets.census) + ` FROM b17020_poverty_by_race_age_acs_ct WHERE acs_year = '${acsYear}'`),
    tempCensus: encodeURI(cartoUrl + columnString(datasets.tempCensus) + ` FROM b17001_poverty_by_age_gender_acs_ct WHERE acs_year = '${acsYear}'`),
    crosswalk: encodeURI(cartoUrl + "ct10_id, muni_id FROM table_datakeys_ct10"),
  };


  const addAllColumn = row => {
    const races = ['aa', 'as', 'lat'];

    const numerator = races.reduce((agg, race) => agg + (parseInt(row[`${race}65o`]) || 0), 0);
    const denominator = races.reduce((agg, race) => {
      const total = (parseInt(row[`${race}65o`]) || 0) / parseFloat(row[`${race}65o_p`]);

      delete row[`${race}65o`];

      return agg + ((total === NaN) ? 0 : total);
    }, 0);

    row.all65o_p = (numerator / denominator) || null;

    return row;
  };


  const load = next => {
    if (datasets.muni.data && datasets.census.data) {
      next(datasets);
    }
    else {
      d3v4.queue()
        .defer(d3v4.json, sources.muni)
        .defer(d3v4.json, sources.tempMuni)
        .defer(d3v4.json, sources.census)
        .defer(d3v4.json, sources.tempCensus)
        .defer(d3v4.json, sources.crosswalk)
        .await((err, muni, tempMuni,census,tempCensus, crosswalk) => {

          tempMuni = nest(tempMuni.rows, 'muni_id');
          tempCensus = nest(tempCensus.rows, 'ct10_id');

          datasets.muni.data = muni.rows.map(row => Object.assign({all65o_p: tempMuni[row.muni_id].pov_65o_p}, row));
          datasets.census.data = census.rows.map(row => Object.assign({all65o_p: tempCensus[row.ct10_id].pov_65o_p}, row));

          datasets.muni.columns.push('all65o_p');
          datasets.census.columns.push('all65o_p');

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
