Nasa.launch('educ-mcas-gr10-math-by-year', () => {

  /**
   * Modules
   */

  const columnString = Nasa.land('column-string');
  const nest = Nasa.land('nest');
  const mapcRegion = Nasa.land('mapc-region');


  /**
   * Setup
   */

  const cartoUrl = 'https://mapc-admin.carto.com/api/v2/sql?q=SELECT ';
  const schoolyear = '2014-15';


  const datasets = {
    suffix: '_pa_p',
    format: 'number',
    ramp: 'schoolDistricts',
    bounded: 'schoolDistricts',
    nonZero: true,
    schoolDistricts: {
      key: 'districtid',
      columns: ['whi_pa_p', 'aa_pa_p', 'as_pa_p', 'lat_pa_p'],
      column: 'whi_pa_p',
      data: null,
    },
  };


  const sources = {
    schoolDistricts: encodeURI(cartoUrl + columnString(datasets.schoolDistricts, ['district']) + ` FROM educ_mcas_gr10_math_by_year_districts WHERE schoolyear = '${schoolyear}'`),
  };


  const load = next => {
    if (datasets.schoolDistricts.data) {
      next(datasets);
    }
    else {
      d3v4.queue()
        .defer(d3v4.json, sources.schoolDistricts)
        .await((err, schoolDistricts) => {
          datasets.schoolDistricts.data = schoolDistricts.rows;

          datasets.schoolDistricts.getMuniId = d => {
            return mapcRegion[0];
          };

          next(datasets);
        });
    }
  };


  return { load, sources, datasets };


});
