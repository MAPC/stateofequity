Nasa.launch('soe-hous-hmda-race', () => {

  /**
   * Modules
   */

  const fmt = Nasa.land('string-format');


  /**
   * State
   */

  const url = "https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20storage.soe_hous_hmda_race_mapc";


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
           "2009": j.rows[0]["hmda09"], 
           "2015": j.rows[0]["hmda15"]},
          { series: 'Black', 
           "2009": j.rows[1]["hmda09"], 
           "2015": j.rows[1]["hmda15"]},
           { series: 'Latino', 
           "2009": j.rows[2]["hmda09"], 
           "2015": j.rows[2]["hmda15"]},
           { series: 'Asian', 
           "2009": j.rows[3]["hmda09"], 
           "2015": j.rows[3]["hmda15"]},
           { series: 'Native American', 
           "2009": j.rows[4]["hmda09"], 
           "2015": j.rows[4]["hmda15"]},
        ];
      
        datasets.chart = {
          data: {
            json: datasets.query,
            keys: {value:["2009","2015"]},
            type: 'bar'        
          },
          bar: {
            width: { ratio: 0.9 }
          },
          axis: {
            x: {
              type: 'category',
              categories: ['White','Black','Latino','Asian','Native American'],
              height: 40,
              tick: {
                fit: true,
                multiline:true,
                rotate:0
              }
            },
            y: {
              tick: { format: fmt.percent },
              padding: {top: 100, bottom: 100},
              label: {
                text: "Mortgage loan application denial rate, high-income",
                position: "outer-middle"                  
              }
            }
          },
          size: { height: 350 },
          color: { pattern: ['#1c164e','#6dbd45'] }
        };

        next(datasets);
      });
    }
  };


  return { load, datasets };
 
});
