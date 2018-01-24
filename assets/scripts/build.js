"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var a=0,n=Array(e.length);a<e.length;a++)n[a]=e[a];return n}return Array.from(e)}function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}!function e(a,n,t){function i(r,s){if(!n[r]){if(!a[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(o)return o(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[r]={exports:{}};a[r][0].call(l.exports,function(e){var n=a[r][1][e];return i(n?n:e)},l,l.exports,e,a,n,t)}return n[r].exports}for(var o="function"==typeof require&&require,r=0;r<t.length;r++)i(t[r]);return i}({1:[function(e,a,n){(function(a){function n(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a["default"]=e,a}function t(e){return e&&e.__esModule?e:{"default":e}}var i=e("./interface/config"),o=t(i),r=e("./interface/houston"),s=t(r),c=e("./interface/land"),u=t(c),l=e("./interface/launch"),d=t(l),f=e("./engine/dbug"),m=t(f),h=e("./engine/location"),_=t(h),p=e("./engine/route"),g=n(p),v={};v.__modules__=[],v.__config__={},v.__flight__={},v.config=o["default"],v.houston=s["default"],v.land=u["default"],v.launch=d["default"],v.Engine={},v.Engine.dbug=m["default"],v.Engine.location=_["default"],v.Engine.checkDynamic=g.checkDynamic,v.Engine.check=g.check,a.Nasa=v}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./engine/dbug":2,"./engine/location":3,"./engine/route":4,"./interface/config":5,"./interface/houston":6,"./interface/land":7,"./interface/launch":8}],2:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e){Nasa.__config__.debug&&("boolean"==typeof e?e?(console.log("DEBUG | Nasa: Beginning debug session for this Houston instance..."),console.log("DEBUG | Nasa: -------------------------------------------------------"),console.log("DEBUG | Nasa: CONFIG = "+JSON.stringify(Nasa.__config__)),console.log("DEBUG |")):(console.log("DEBUG |"),console.log("DEBUG | Nasa: -------------------------------------------------------"),console.log("DEBUG | Nasa: Ending debug session./")):console.log("DEBUG | Nasa: "+e))},a.exports=n["default"]},{}],3:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){var e=window.location.pathname,a=e.split("/");return a[a.length-1].indexOf(".")===-1&&(e="/"===e.charAt(e.length-1)?e:e+"/"),e},a.exports=n["default"]},{}],4:[function(e,a,n){function t(e){return e&&e.__esModule?e:{"default":e}}function i(e){(0,l["default"])("Executed the route '"+e+"'\n"),Nasa.__flight__.schedule[e]?Nasa.__flight__.schedule[e].forEach(function(e){Nasa.__modules__[e]?Nasa.__modules__[e]():(0,l["default"])("ERR: '"+e+"' is not a registered module!")}):(0,l["default"])("ERR: Can't find '"+e+"' in the flight schedule!")}function o(){if("**"===m[0]){(0,l["default"])("Found dynamic beginning on "+m.join("/"));for(var e=h.length,a=0;a<h.length;a++)if(h[a]===m[1]||"*"===m[1]){a=0===a?1:0,h.splice(0,a),m.splice(0,1);break}if(e===h.length)return!1}return!0}function r(){if("**"===m[m.length-1]){(0,l["default"])("Found dynamic ending on "+m.join("/"));for(var e=h.length,a=h.length-1;a>=0;a--)if(h[a]===m[m.length-2]||"*"===m[m.length-2]){h.splice(a,h.length-a),m.splice(m.length-1,1);break}if(e===h.length)return!1}return!0}function s(e){return(0,f["default"])()===e&&(i(e),!0)}function c(e){if(m=e.split("/"),h=Nasa.Engine.location().split("/"),m.length>h.length)return!1;if(!o()||!r())return!1;for(var a=0;a<m.length;a++)if("*"!==m[a]){var n;if((n=m[a].indexOf("*"))===-1){if(m[a]!==h[a])return!1}else if(0===n){var t=m[a].substr(1,m[a].length);if(h[a].indexOf(t)!==h[a].length-1-(t.length-1))return!1}else if(n===m[a].length-1){var s=m[a].substr(0,n);if(h[a].substr(0,s.length)!==s)return!1}}return i(e),!0}Object.defineProperty(n,"__esModule",{value:!0}),n.check=s,n.checkDynamic=c;var u=e("./dbug"),l=t(u),d=e("./location"),f=t(d),m=[],h=[]},{"./dbug":2,"./location":3}],5:[function(e,a,n){function t(e){var a="";return a="/"===e.charAt(e.length-1)?e.substr(0,e.length-1):e,a="/"===a.charAt(0)?a.substr(1,a.length-1):a,"/"+a}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e){return e.root&&(e.root=t(e.root)),e.cascade&&"boolean"!=typeof e.cascade?console.error("Nasa: config(): Cascade must be a boolean value."):e.debug&&"boolean"!=typeof e.debug?console.error("Nasa: config(): Debug must be a boolean value."):void(Nasa.__config__=e)},a.exports=n["default"]},{}],6:[function(e,a,n){function t(e){return e&&e.__esModule?e:{"default":e}}function i(e){var a=e;return a=0===a.indexOf("/")?a.slice(1,a.length):a,a="/"+a,a=Nasa.__config__.root?Nasa.__config__.root+a:a}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../engine/dbug"),r=t(o),s=e("../engine/route");n["default"]=function(e,a){(0,r["default"])(!0),"undefined"==typeof a&&(a="undefined"==typeof Nasa.__config__.cascade||Nasa.__config__.cascade),Nasa.__flight__.schedule=e,Object.keys(e).every(function(e){var n=i(e);if(e!==n&&(Nasa.__flight__.schedule[n]=Nasa.__flight__.schedule[e],delete Nasa.__flight__.schedule[e]),n.indexOf("*")!==-1){if((0,s.checkDynamic)(n))return a}else if((0,s.check)(n))return a;return!0}),(0,r["default"])(!1)},a.exports=n["default"]},{"../engine/dbug":2,"../engine/route":4}],7:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e){if("string"==typeof e){if(Nasa.__modules__[e])return Nasa.__modules__[e]();console.error("Nasa.land("+e+"): "+e+" doesn't exist.")}else console.error("Nasa.land("+e+"): Module name must be a string.")},a.exports=n["default"]},{}],8:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e,a){"string"==typeof e?Nasa.__modules__[e]?console.error("Nasa.launch("+e+"): "+e+" already exists."):Nasa.__modules__[e]=a:console.error("Nasa.launch("+e+"): Module name must be a string.")},a.exports=n["default"]},{}]},{},[1]),Nasa.launch("column-string",function(){return function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return[e.key].concat(_toConsumableArray(e.columns),_toConsumableArray(a)).join(",")}}),Nasa.launch("mapc-region",function(){return[2,10,14,23,25,26,30,34,35,37,40,46,48,50,49,51,57,65,67,71,73,78,82,92,93,99,100,101,107,119,122,131,133,136,139,141,142,144,155,157,158,163,164,165,166,168,170,171,174,175,176,177,178,184,185,187,189,196,198,199,207,208,213,219,220,229,231,243,244,246,248,251,252,258,262,264,266,269,274,277,284,285,286,288,291,298,305,307,308,314,315,317,320,333,335,336,342,344,346,347,350]}),Nasa.launch("matrix-bounds",function(){return function(e,a){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],t=e.map(function(e){return a.map(function(a){return parseInt(e[a])})}),i=n?function(e){return e>0}:function(e){return e>=0},o=t.reduce(function(e,a){return e.concat(a)}).filter(function(e){return null!==e&&i(e)}),r=Math.min.apply(null,o),s=Math.max.apply(null,o);return{min:r,max:s}}}),Nasa.launch("nest",function(){return function(e,a,n){var t={};return n||(n=!1),e.forEach(function(e){t[e[a]]=e,n&&delete t[e[a]][a]}),t}}),Nasa.launch("normalize",function(){return function(e){return e.toLowerCase().split(" ").join("-")}}),Nasa.launch("string-format",function(){function e(e){return e.toLocaleString("en-US")}function a(a){return"$"+e(a)}function n(a){return e(a)+"%"}return{dollar:a,number:e,percent:n}}),Nasa.launch("accordion",function(){function e(e){e.innerHTML=e.parentNode.classList.contains("active")?"&minus;":"&plus;"}return function(a,n){var t=n||document.querySelector(a),i=Array.from(t.querySelectorAll('*[data-action="toggle-accordion"]'));i.forEach(function(a){e(a),a.parentNode.addEventListener("click",function(n){n.preventDefault(),a.parentNode.classList.toggle("active"),e(a)})})}}),Nasa.launch("nav",function(){var e=document.querySelector(".nav-button"),a=document.querySelector(".site-wrapper");e.addEventListener("click",function(e){e.preventDefault(),a.classList.toggle("active")})}),Nasa.launch("tabs",function(){return function(e,a){var n=document.querySelector(e),t=Array.from(n.querySelectorAll("*[data-tabs] > *")),i=Array.from(n.querySelectorAll("*[data-tab]"));t.forEach(function(e){e.addEventListener("click",function(n){n.preventDefault(),t.forEach(function(e){return e.classList.remove("active")}),e.classList.add("active"),i.forEach(function(a){a.dataset.tab===e.innerText?a.classList.add("active"):a.classList.remove("active")}),a(e)})}),t[0].click()}}),Nasa.launch("home-page",function(){Nasa.land("tabs")(".disparities")}),Nasa.launch("indicators-page",function(){var e=Nasa.land("tabs"),a=Nasa.land("mass-map"),n=Nasa.land("candlestick"),t={diversity:{type:"map",module:Nasa.land("soe-neigh-income-seg")},housing:{type:"map",module:Nasa.land("soe-neigh-income-seg")},health:{type:"chart",module:Nasa.land("health-births-lbw-race-educ")},education:{type:"map",module:Nasa.land("educ-mcas-gr10-math-by-year")},income:{type:"map",module:Nasa.land("soe-neigh-income-seg")},home_ownership:{type:"map",module:Nasa.land("soe-hous-hmda-race")},employment:{type:"map",module:Nasa.land("c23002-employment-by-race-age-acs")},criminal_justice:{type:"map",module:Nasa.land("pubsafety-inmate-crimes-race-by-year")},seniors:{type:"map",module:Nasa.land("b17020-poverty-by-race-age-acs")}},i=["as","aa","lat","whi"].map(function(e){return new n(e)}),o=document.querySelector("*[data-municipal]"),r=document.querySelector(".sub-header"),s=new a("map"),c=function(e){s.setFormat(e.format||"number"),s.setColorRamp(e[e.ramp].data,e[e.ramp].columns),s.unloadData("census"),s.unloadData("muni"),s.unloadData("schoolDistrict"),"census"in e&&s.renderData("census",e.census),"muni"in e&&s.renderData("muni",e.muni,d),"schoolDistricts"in e&&s.renderData("schoolDistricts",e.schoolDistricts,d),i.forEach(function(a){a.removeTick("regional"),a.setColumnSuffix(e.suffix),a.setRange(s.minimum,s.maximum),a.setFormat(e.format||"number"),a.renderData(e[e.bounded]),"region"in e&&a.addTick(e.region.data,"Regional Median","regional")})},u=function(e){},l=function(e){var a=t[e];a.module.load(function(e){"map"===a.type?c(e):u(e)})};e(".indicators",function(e){return l(e.dataset.vizId)});var d={"in":function(e){d3v4.select(this).raise(),r.classList.remove("default"),o.innerText=e.properties.municipal,i.forEach(function(a){a.addTick(e.properties,e.properties.municipal,e.properties.municipal)})},out:function(e){r.classList.add("default"),i.forEach(function(a){a.removeTick(e.properties.municipal)})}}}),Nasa.launch("outcome-page",function(){var e=Nasa.land("accordion"),a=Array.from(document.querySelectorAll("*[data-accordion]"));a.forEach(function(a){return e(null,a)})});var _createClass=function(){function e(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(a,n,t){return n&&e(a.prototype,n),t&&e(a,t),a}}();Nasa.launch("candlestick",function(){var e=Nasa.land("matrix-bounds"),a=Nasa.land("mapc-region"),n=Nasa.land("normalize"),t=Nasa.land("string-format"),i=function(){function i(e){_classCallCheck(this,i),this.canvas=d3v4.select('*[data-candlestick="'+e+'"]').append("div").attr("class","content"),this.stick=this.canvas.append("div").attr("class","stick"),this.bounding={min:this.stick.append("span").attr("class","bound min-bound"),max:this.stick.append("span").attr("class","bound max-bound")},this.identifier=e,this.column=e,this.format=t.number}return _createClass(i,[{key:"setFormat",value:function(e){this.format=t[e]}},{key:"setColumnSuffix",value:function(e){this.suffix=e,this.column=this.identifier+e}},{key:"setRange",value:function(e,a){this.range={min:e,max:a}}},{key:"leftOffset",value:function(e){return 100*Math.abs(e/(this.range.min-this.range.max))}},{key:"addTick",value:function(e,a,t){var i=e[this.column];if(i>0){var o=this.leftOffset(i),r=this.canvas.append("div").attr("class","tick").style("left",o+"%");t&&(r.attr("data-id",n(t)),"regional"!==t&&r.attr("class","tick identified"));var s=r.append("div").attr("class","tick-info");s.append("p").attr("class","tick-title").html(a),s.append("p").attr("class","tick-value").html(this.format(i))}}},{key:"removeTick",value:function(e){this.canvas.selectAll('*[data-id="'+n(e)+'"]').remove()}},{key:"renderData",value:function(n){var t=n.data.filter(function(e){return a.indexOf(e.muni_id)!==-1}),i=e(t,[this.column],!0),o=100*Math.abs((i.min-i.max)/(this.range.min-this.range.max)),r=this.leftOffset(i.min);this.stick.style("width",o+"%").style("left",r+"%"),this.bounding.min.html(this.format(i.min)),this.bounding.max.html(this.format(i.max))}}]),i}();return i});var _createClass=function(){function e(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(a,n,t){return n&&e(a.prototype,n),t&&e(a,t),a}}();Nasa.launch("mass-map",function(){function e(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{file:e,data:null,fill:a.fill||null,features:null,strokeWidth:a.strokeWidth||1}}var a=Nasa.land("nest"),n=Nasa.land("string-format"),t=Nasa.land("mapc-region"),i=Nasa.land("matrix-bounds"),o=function(){function o(a){var t=this;_classCallCheck(this,o),this.identifier=a,this.geoJsonPath="/assets/geojson",this.colors={minimum:"#13314D",maximum:"#57E098",neutral:"#AAAAAA"},this.layers={census:e("ma-census-tracts.json",{strokeWidth:.5}),muni:e("ma-munis.json",{fill:"rgba(0,0,0,0)"}),schoolDistricts:e("schooldistricts.json")};var i=600,r=570;this.canvas=d3v4.select(a).append("svg").attr("width",i).attr("height",r),Object.keys(this.layers).forEach(function(e){t.canvas.append("g").attr("data-layer-name",e)});var s=d3v4.geoAlbers().scale(4e4).rotate([71.09,0]).center([0,42.34]).translate([i/2,r/2]);this.geoPath=d3v4.geoPath().projection(s),this.format=n.number}return _createClass(o,[{key:"loadLayer",value:function(e,a){var n=this.layers[e];n.features?a(n):d3v4.json(this.geoJsonPath+"/"+n.file,function(e){n.features=e.features,a(n)})}},{key:"setFormat",value:function(e){this.format=n[e]}},{key:"setColorRamp",value:function(e,a){var n=i(e,a),t=n.min,o=n.max;this.minimum=t,this.maximum=o,d3v4.select(".range-min").html(this.format(t)),d3v4.select(".range-max").html(this.format(o)),this.colorRamp=d3v4.scaleLinear().domain([this.minimum,this.maximum]).range([this.colors.minimum,this.colors.maximum])}},{key:"unloadData",value:function(e){d3.select('g[data-layer-name="'+e+'"]').selectAll("*").remove()}},{key:"renderData",value:function(e,n){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.loadLayer(e,function(r){var s=a(n.data,n.key),c=r.features.map(function(e){var a=Object.assign({},e);return a.properties=s[e.properties[n.index||n.key]],a}),u=d3v4.select('g[data-layer-name="'+e+'"]').selectAll("path").data(c).enter().append("path").attr("opacity",function(e){return t.indexOf(n.getMuniId(e))!==-1?1:.25}).attr("fill",function(e){return void 0!==e.properties?r.fill||i.colorRamp(e.properties[n.column]):i.colors.neutral}).attr("stroke",i.colors.minimum).attr("stroke-width",r.strokeWidth).attr("d",i.geoPath);o&&(o["in"]&&u.on("mouseover",o["in"]).on("mousemove",o["in"]),o.out&&u.on("mouseout",o.out))})}}]),o}();return o}),Nasa.launch("homeownership-chart",function(){var e=Nasa.land("string-format");return function(a){var n=document.querySelector(a),t="https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20storage.soe_hous_hmda_race_mapc";d3.json(t,function(a){var t=[{series:"White",2009:a.rows[0].hmda09,2015:a.rows[0].hmda15},{series:"Black",2009:a.rows[1].hmda09,2015:a.rows[1].hmda15},{series:"Latino",2009:a.rows[2].hmda09,2015:a.rows[2].hmda15},{series:"Asian",2009:a.rows[3].hmda09,2015:a.rows[3].hmda15},{series:"Native American",2009:a.rows[4].hmda09,2015:a.rows[4].hmda15}];d3.nest().key(function(e){return e.schoolyear}).entries(a.rows),c3.generate({bindto:n,data:{json:t,keys:{value:["2009","2015"]},type:"bar"},bar:{width:{ratio:.9}},axis:{x:{type:"category",categories:["White","Black","Latino","Asian","Native American"],height:40,tick:{fit:!0,multiline:!0,rotate:0}},y:{tick:{format:e.percent},padding:{top:100,bottom:100},label:{text:"Mortgage loan application denial rate, high-income",position:"outer-middle"}}},size:{height:350},color:{pattern:["#1c164e","#6dbd45"]}})})}}),Nasa.launch("b17020-poverty-by-race-age-acs",function(){var e=Nasa.land("column-string"),a=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",i={suffix:"65o_p",format:"percent",ramp:"census",bounded:"muni",muni:{key:"muni_id",index:"town_id",columns:["whi65o_p","aa65o_p","as65o_p","lat65o_p"],column:"whi65o_p",data:null},census:{key:"ct10_id",columns:["whi65o_p","aa65o_p","as65o_p","lat65o_p"],column:"whi65o_p",data:null},crosswalk:{data:null}},o={muni:encodeURI(n+e(i.muni,["municipal"])+(" FROM b17020_poverty_by_race_age_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+e(i.census)+(" FROM b17020_poverty_by_race_age_acs_ct WHERE acs_year = '"+t+"'")),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},r=function(e){i.muni.data&&i.census.data?e(i):d3v4.queue().defer(d3v4.json,o.muni).defer(d3v4.json,o.census).defer(d3v4.json,o.crosswalk).await(function(n,t,o,r){i.muni.data=t.rows,i.census.data=o.rows,i.crosswalk.data=a(r.rows,"ct10_id"),i.census.getMuniId=function(e){return i.crosswalk.data[e.properties.ct10_id].muni_id},i.muni.getMuniId=function(e){return e.properties.muni_id},e(i)})};return{load:r,sources:o,datasets:i}}),Nasa.launch("educ-mcas-gr10-math-by-year",function(){var e=Nasa.land("column-string"),a=(Nasa.land("nest"),Nasa.land("mapc-region")),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2014-15",i={suffix:"_pa_p",format:"number",ramp:"schoolDistricts",bounded:"schoolDistricts",schoolDistricts:{key:"districtid",columns:["whi_pa_p","aa_pa_p","as_pa_p","lat_pa_p"],column:"whi_pa_p",data:null},region:{key:"msa_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],data:null}},o={schoolDistricts:encodeURI(n+e(i.schoolDistricts,["district"])+(" FROM educ_mcas_gr10_math_by_year_districts WHERE schoolyear = '"+t+"'"))},r=function(e){i.schoolDistricts.data?e(i):d3v4.queue().defer(d3v4.json,o.schoolDistricts).await(function(n,t){i.schoolDistricts.data=t.rows,i.schoolDistricts.getMuniId=function(e){return a[0]},e(i)})};return{load:r,sources:o,datasets:i}}),Nasa.launch("soe-neigh-income-seg",function(){var e=Nasa.land("column-string"),a=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",i={suffix:"_mhi",format:"dollar",ramp:"census",bounded:"muni",muni:{key:"muni_id",index:"town_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],column:"whi_mhi",data:null},census:{key:"ct10_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],column:"whi_mhi",data:null},crosswalk:{data:null},region:{key:"msa_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],data:null}},o={muni:encodeURI(n+e(i.muni,["municipal"])+(" FROM b19013_mhi_race_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+e(i.census)+(" FROM b19013_mhi_race_acs_ct WHERE acs_year = '"+t+"'")),region:encodeURI(n+e(i.region)+(" FROM b19013_mhi_race_acs_msa WHERE acs_year = '"+t+"' AND msa_id = '14460'")),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},r=function(e){i.muni.data&&i.census.data?e(i):d3v4.queue().defer(d3v4.json,o.muni).defer(d3v4.json,o.census).defer(d3v4.json,o.region).defer(d3v4.json,o.crosswalk).await(function(n,t,o,r,s){i.muni.data=t.rows,i.census.data=o.rows,i.region.data=r.rows[0],i.crosswalk.data=a(s.rows,"ct10_id"),i.census.getMuniId=function(e){return i.crosswalk.data[e.properties.ct10_id].muni_id},i.muni.getMuniId=function(e){return e.properties.muni_id},e(i)})};return{load:r,sources:o,datasets:i}}),Nasa.houston({"*":["nav"],"/":["home-page"],"goals/*/":["outcome-page"],"indicators/":["indicators-page"]});