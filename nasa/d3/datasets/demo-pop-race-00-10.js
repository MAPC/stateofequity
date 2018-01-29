Nasa.launch('demo-pop-race-00-10', () => {


  /**
   * Modules
   */

  const columnString = Nasa.land('column-string');
  const nest = Nasa.land('nest');


  /**
   * Setup
   */

  const cartoUrl = 'https://mapc-admin.carto.com/api/v2/sql?q=SELECT ';


  const columnMap = {
    'nhwh_pch': 'whi_pdif',
    'nhaa_pdif': 'aa_pdif',
    'nhapi_pdif': 'as_pdif',
    'nhna_pdif': 'na_pdif',
  };


  const datasets = {
    suffix: '_pdif',
    format: 'percent',
    ramp: 'muni',
    bounded: 'muni',
    nonZero: false,
    temp: {
      key: 'muni_id' ,
      columns: ['nhwh_pch', 'nhaa_pdif', 'nhna_pdif', 'lat_pdif', 'nhapi_pdif'],
    },
    muni: {
      key: 'muni_id',
      index: 'town_id',
      columns: ['whi_pdif', 'aa_pdif', 'as_pdif', 'lat_pdif', 'na_pdif'],
      column: 'as_pdif',
      data: null,
    },
    region: {
      columns: ['whi_pdif', 'aa_pdif', 'as_pdif', 'lat_pdif', 'na_pdif'],
      data: null
    }
  };


  const sources = {
    muni: encodeURI(cartoUrl + columnString(datasets.temp, ['municipal']) + ' FROM demo_pop_race_00_10m'),
  };


  const load = next => {
    if (datasets.muni.data) {
      next(datasets);
    }
    else {
      d3v4.queue()
        .defer(d3v4.json, sources.muni)
        .await((err, muni) => {
          muni.rows = muni.rows
                          .filter(row => row.muni_id <= 352)
                          .map(row => {
                            for (let key in columnMap) {
                              row[columnMap[key]] = row[key];
                              delete row[key];
                            }

                            return row;
                          });

          datasets.muni.data = muni.rows.filter(row => row.muni_id <= 351);
          datasets.region.data = muni.rows.filter(row => row.muni_id == 352)[0];

          datasets.muni.getMuniId = d => {
            return d.properties.muni_id;
          };

          next(datasets);
        });
    }
  };


  return { load, sources, datasets };
});
