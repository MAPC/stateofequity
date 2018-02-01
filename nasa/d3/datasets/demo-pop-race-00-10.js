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
    nhwh_pdif: 'nhw_pdif',
    nhaa_pdif: 'aa_pdif',
    nhas_pdif: 'as_pdif',
  };


  const datasets = {
    suffix: '_pdif',
    format: 'percent',
    ramp: 'muni',
    title: 'Percent difference in population from 2000 to 2010',
    source: 'Census 2000 & Census 2010',
    sourceYear: '2000 & 2010',
    bounded: 'muni',
    nonZero: false,
    race: 'Asian',
    temp: {
      key: 'muni_id' ,
      columns: ['nhwhi_00p', 'nhwhi_10p', 'nhwh_pdif', 'nhaa_pdif', 'lat_pdif', 'nhas_pdif'],
    },
    muni: {
      key: 'muni_id',
      nameKey: 'municipal',
      index: 'town_id',
      columns: ['all_pdif', 'nhw_pdif', 'aa_pdif', 'as_pdif', 'lat_pdif'],
      column: 'as_pdif',
      data: null,
    },
    region: {
      columns: ['all_pdif', 'nhw_pdif', 'aa_pdif', 'as_pdif', 'lat_pdif'],
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

          muni.rows = muni.rows.map(row => {
            row.all_pdif = (100 - row.nhwhi_10p) - (100 - row.nhwhi_00p);

            return row;
          });

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
