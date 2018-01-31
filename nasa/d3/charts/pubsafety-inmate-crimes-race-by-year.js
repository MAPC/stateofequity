Nasa.launch('pubsafety-inmate-crimes-race-by-year', () => {

  /**
   * Modules
   */

  const fmt = Nasa.land('string-format');


  /**
   * State
   */

  const url = "https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20from%20pubsafety_inmate_crimes_race_by_year_m";


  const datasets = {
    query: null,
    chart: null, 
    title: 'Percent of inmate population',
    source: 'ACS',
    sourceYear: '2010 - 2016',
  };


  const load = next => {
    if (datasets.query) {
      next(datasets);
    }
    else {
      d3.json(url, function(j) {
        datasets.query = [   
          { series: '2010', 
           "Total": j.rows[0]["tot_p"], 
           "White": j.rows[0]["nhwhi_p"],
           "Black": j.rows[0]["nhaa_p"],
           "Latino": j.rows[0]["lat_p"],
           "Asian": j.rows[0]["nhapi_p"],
           "Native American": j.rows[0]["nhna_p"]},
           { series: '2011', 
           "Total": j.rows[1]["tot_p"], 
           "White": j.rows[1]["nhwhi_p"],
           "Black": j.rows[1]["nhaa_p"],
           "Latino": j.rows[1]["lat_p"],
           "Asian": j.rows[1]["nhapi_p"],
           "Native American": j.rows[1]["nhna_p"]},
           { series: '2012', 
           "Total": j.rows[2]["tot_p"], 
           "White": j.rows[2]["nhwhi_p"],
           "Black": j.rows[2]["nhaa_p"],
           "Latino": j.rows[2]["lat_p"],
           "Asian": j.rows[2]["nhapi_p"],
           "Native American": j.rows[2]["nhna_p"]},
           { series: '2013', 
           "Total": j.rows[3]["tot_p"], 
           "White": j.rows[3]["nhwhi_p"],
           "Black": j.rows[3]["nhaa_p"],
           "Latino": j.rows[3]["lat_p"],
           "Asian": j.rows[3]["nhapi_p"],
           "Native American": j.rows[3]["nhna_p"]},
           { series: '2014', 
           "Total": j.rows[4]["tot_p"], 
           "White": j.rows[4]["nhwhi_p"],
           "Black": j.rows[4]["nhaa_p"],
           "Latino": j.rows[4]["lat_p"],
           "Asian": j.rows[4]["nhapi_p"],
           "Native American": j.rows[4]["nhna_p"]},
           { series: '2014', 
           "Total": j.rows[5]["tot_p"], 
           "White": j.rows[5]["nhwhi_p"],
           "Black": j.rows[5]["nhaa_p"],
           "Latino": j.rows[5]["lat_p"],
           "Asian": j.rows[5]["nhapi_p"],
           "Native American": j.rows[5]["nhna_p"]},
           { series: '2016', 
           "Total": j.rows[6]["tot_p"], 
           "White": j.rows[6]["nhwhi_p"],
           "Black": j.rows[6]["nhaa_p"],
          "Latino": j.rows[6]["lat_p"],
          "Asian": j.rows[6]["nhapi_p"],
          "Native American": j.rows[6]["nhna_p"]}
        ];

        console.log(j.rows);
      
        datasets.chart = {
          data: {
            json: datasets.query,
            keys: {value:["Total","White","Black","Latino","Asian","Native American"]},
            type: 'line'        
          },
          axis: {
            x: {
              type: 'category',
              categories: ['2010','2011','2012','2013','2014','2015','2016'],
              padding: {left: -.48, right: 0},
              height: 40,
              tick: {
                fit: true,
                multiline: true,
                rotate: 0
              }
            },
            y: {
              tick: { format: fmt.percent },
              padding: { top: 100, bottom: 100 },
              label: {
                text: "Percent of Total Population",
                position: "outer-middle"                  
              },
              max: 1.2,
              min: 0.31,
            },
          },
          size: { height: 350 },
          color: {
            pattern: ['#57E09B','#18EDED','#22619b','#95989A','#F0F2F1','#FDEB10'],
          },
        };

        next(datasets);
      });
    }
  };


  return { load, datasets };
 
});
