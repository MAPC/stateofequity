Nasa.launch('health-births-lbw-race-educ', () => {

  /**
   * Modules
   */

  const fmt = Nasa.land('string-format');


  /**
   * State
   */

  const url = "https://mapc-admin.carto.com/api/v2/sql?q=select%20*%20FROM%20health_births_lbw_race_educ_m%20WHERE%20muni_id=%27352%27%20AND%20cal_years%20IN%20(%272005-09%27,%272010-14%27)";

  const datasets = {
    query: null,
    chart: null, 
  };


  const load = next => {
    if (datasets.query) {
      next(datasets);
    }
    else {
      d3.json(url, function(j) {
        datasets.query = [            
          { series: 'White', 
           "2005-09 Less than HS": j.rows[0]["whilhs_p"],
           "2010-14 Less than HS": j.rows[1]["whilhs_p"],
           "2005-09 HS grad": j.rows[0]["whibapl_p"],
           "2010-14 HS grad": j.rows[1]["whibapl_p"]},          
          { series: 'Black/African American', 
           "2005-09 Less than HS": j.rows[0]["aalhs_p"],
           "2010-14 Less than HS": j.rows[1]["aalhs_p"],
           "2005-09 HS grad": j.rows[0]["aabapl_p"],
           "2010-14 HS grad": j.rows[1]["aabapl_p"]},
          { series: 'Asian', 
           "2005-09 Less than HS": j.rows[0]["apilhs_p"],
           "2010-14 Less than HS": j.rows[1]["apilhs_p"],
           "2005-09 HS grad": j.rows[0]["apibapl_p"],
           "2010-14 HS grad": j.rows[1]["apibapl_p"]},
          { series: 'Latino', 
           "2005-09 Less than HS": j.rows[0]["latlhs_p"],
           "2010-14 Less than HS": j.rows[1]["latlhs_p"],
           "2005-09 HS grad": j.rows[0]["latbapl_p"],
           "2010-14 HS grad": j.rows[1]["latbapl_p"]},
        ];
      
        datasets.chart = {
          data: {
            json: datasets.query,
            keys: {value:["2005-09 Less than HS","2010-14 Less than HS", "2005-09 HS grad","2010-14 HS grad"]},
            type: 'bar'        
          },
          bar: {
            width: { ratio: 0.9 }
          },
          axis: {
            x: {
              type: 'category',
              categories: ['White (Non Latino)', 'Black','Asian','Latino','Native American'],
              height: 40
            },
            y: {
              tick: {
                format: fmt.percent
              },
              padding: { top: 100, bottom: 100 },
              label: {
                text: "Low Birthweight by race in %",
                position: "outer-middle"                  
              }
            }
          },
          size: { height: 350 },
          color: { pattern: ['#119c76','#57E09B'] }
        };

        next(datasets);
      });
    }
  };


  return { load, datasets };
 
});
