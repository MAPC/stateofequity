# State of Equity

# Sept 2019: Rails API refactor after expiration of CARTO account

### Nasa-launcher
- This app was built with a custom npm module called [Nasa-launcher.](https://www.npmjs.com/~ericyoungberg)

- Nasa-launcher combines data sources derived from javascript code (called 'modules') including some local static geoJSON files to produce custom queries embedded in urls, that retrieve data from `https://mapc-admin.carto.com/api/v2/~~` (back when MAPC had a paid account with CARTO, until Sep 2019).


### build.js file
- A gulp task would take the Nasa code and produce a minified file called `build.js`, with sql queries embedded, to CARTO, for example: `https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20muni_id,nhwhi_00p,nhwhi_10p,nhwh_pdif,nhaa_pdif,lat_pdif,nhas_pdif,municipal%20FROM%20demo_pop_race_00_10m`
  - CARTO was then taking these queries, looking up data in a database which we cannot access, and returning JSON data formatted like this for example:

```
{"rows":
    [{"muni_id":1,"nhwhi_00p":96.97,"nhwhi_10p":91.44,"nhwh_pdif":-5.53,"nhaa_pdif":1.23,"lat_pdif":1.23,"nhas_pdif":1.31,"municipal":"Abington"},{"muni_id":2,"nhwhi_00p":87.21,"nhwhi_10p":75.51,"nhaa_pdif":1.21,"lat_pdif":2.58,"nhas_pdif":1.32,"municipal":"Central Massachusetts"},{"muni_id":403,"nhwhi_00p":80.17,"nhwhi_10p":72.84,"nhwh_pdif":-7.33,"nhaa_pdif":0.86,"lat_pdif":4.3,"nhas_pdif":1.9,"municipal":"Northeastern Massachusetts"},{"muni_id":404,"nhwhi_00p":88.53,"nhwhi_10p":84.74,"nhwh_pdif":-3.79,"nhaa_pdif":1.63,"lat_pdif":1.66,"nhas_pdif":0.47,"municipal":"Southeastern Massachusetts"},{"muni_id":405,"nhwhi_00p":82.26,"nhwhi_10p":77.05,"nhwh_pdif":-5.21,"nhaa_pdif":0.35,"lat_pdif":3.88,"nhas_pdif":0.65,"municipal":"Western Massachusetts"}], (~~~~ example of rows)
  "time":0.012,
  "fields":{"muni_id":{"type":"number","pgtype":"int4"},"nhwhi_00p":{"type":"number","pgtype":"float4"},      "nhwhi_10p":{"type":"number","pgtype":"float4"},"nhwh_pdif":{"type":"number","pgtype":"float4"},          "nhaa_pdif":{"type":"number","pgtype":"float4"},"lat_pdif":{"type":"number","pgtype":"float4"},           "nhas_pdif":{"type":"number","pgtype":"float4"},"municipal":{"type":"string","pgtype":"text"}},
  "total_rows":405}
end
```

### CARTO queries and responses
- The CARTO data was then combined with the 4 local geoJSON files, for Census, Tract, Muncipal and Racial data here: `/assets/geojson/`

- At the time of this writing, we were unable to re-run the gulp task that produced the current `build.js` file.
- Embdded in the minified `build.js` file are eight (8) queries that formerly reached out to CARTO, but which are now served statically from the Rails API.

# Rails API: serving static data (former CARTO JSON responses).
- In the build.js file: `/assets/scripts/build.js` there is code to toggle the URL:

```
const API_URL = 'https://soe-api.herokuapp.com/api'
// const API_URL = 'http://127.0.0.1:3000/api'
```


# Next step(s) for development of this app, would be:
  - Get the gulp task running, to rebuild `build.js` after refactoring the files here:
  - `/nasa/d3/charts` and `/nasa/d3/datasets`
  - each of these files has a URL that formerly pointed to CARTO, with the sql query embedded
  - there are eight (8) of these queries, which end up embedded in `build.js` file, which is the code that actually runs when the app is live
  - so no matter how you edit the code in `/nasa/d3/~~` it will not run live, until you can regenerate `build.js` through the gulp task here in `Gulpfile.js` at the root of the app:

```
gulp.task('transpileScripts', () => {
  return gulp.src(vendor.js.concat(filePaths(scripts)))
             .pipe(
               babel({
                 presets: ['babel-preset-env'],
                 plugins: ['transform-object-assign']
               }).on('error', logError)
              )
             .pipe(concat('build.js'))
             .pipe(uglify().on('error', logError))
             .pipe(gulp.dest(path.join(__dirname, 'assets/scripts')))
});
```

# API_URL

- add a `.env` file to the root of the project
- [based on these instructions](https://www.npmjs.com/package/dotenv)
- to point the API to a new URL, edit your `.env` file like so:

```
API_URL=https://soe-api.herokuapp.com/api
```
notice that the API_URL does **NOT** end with a forward slash
