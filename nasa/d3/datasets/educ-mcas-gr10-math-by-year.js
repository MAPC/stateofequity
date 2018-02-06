Nasa.launch('educ-mcas-gr10-math-by-year', () => {

  /**
   * Modules
   */

  const columnString = Nasa.land('column-string');
  const mapcRegion = Nasa.land('mapc-region');
  const columnMap = Nasa.land('column-map');
  const curry = Nasa.land('curry');
  const nest = Nasa.land('nest');


  /**
   * Setup
   */

  const cartoUrl = 'https://mapc-admin.carto.com/api/v2/sql?q=SELECT ';
  const schoolyear = '2014-15';

  const columnMapper = curry(columnMap, { whi_pa_p: 'nhw_pa_p' });

  const datasets = {
    suffix: '_pa_p',
    format: 'percent',
    ramp: 'schoolDistricts',
    bounded: 'schoolDistricts',
    title: 'Percent of Students with 10th Grade MCAS Math Scores of Proficient or Advanced by Race and Ethnicity, MAPC Region, 2014-2015',
    source: 'Massachusetts Department of Elementary and Secondary Education',
    label: 'Range in percent proficient or advanced',
    nonZero: true,
    race: 'All',
    temp: {
      key: 'districtid',
      columns: ['all_pa_p', 'whi_pa_p', 'aa_pa_p', 'as_pa_p', 'lat_pa_p'],
    },
    schoolDistricts: {
      key: 'districtid',
      nameKey: 'district',
      columns: ['all_pa_p', 'nhw_pa_p', 'aa_pa_p', 'as_pa_p', 'lat_pa_p'],
      column: 'all_pa_p',
      data: null,
    },
  };


  const sources = {
    schoolDistricts: encodeURI(cartoUrl + columnString(datasets.temp, ['district']) + ` FROM educ_mcas_gr10_math_by_year_districts WHERE schoolyear = '${schoolyear}'`),
  };


  const load = next => {
    if (datasets.schoolDistricts.data) {
      next(datasets);
    }
    else {
      d3v4.queue()
        .defer(d3v4.json, sources.schoolDistricts)
        .await((err, schoolDistricts) => {
          datasets.schoolDistricts.data = schoolDistricts.rows.map(columnMapper);

          datasets.schoolDistricts.getMuniId = d => {
            return mapcRegion[0];
          };

          next(datasets);
        });
    }
  };


  return { load, sources, datasets };


});
