"use strict";function _toConsumableArray(a){if(Array.isArray(a)){for(var e=0,n=Array(a.length);e<a.length;e++)n[e]=a[e];return n}return Array.from(a)}function _classCallCheck(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}!function a(e,n,t){function i(o,s){if(!n[o]){if(!e[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[o]={exports:{}};e[o][0].call(l.exports,function(a){var n=e[o][1][a];return i(n?n:a)},l,l.exports,a,e,n,t)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<t.length;o++)i(t[o]);return i}({1:[function(a,e,n){(function(e){function n(a){if(a&&a.__esModule)return a;var e={};if(null!=a)for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);return e["default"]=a,e}function t(a){return a&&a.__esModule?a:{"default":a}}var i=a("./interface/config"),r=t(i),o=a("./interface/houston"),s=t(o),c=a("./interface/land"),u=t(c),l=a("./interface/launch"),d=t(l),f=a("./engine/dbug"),m=t(f),h=a("./engine/location"),p=t(h),_=a("./engine/route"),g=n(_),v={};v.__modules__=[],v.__config__={},v.__flight__={},v.config=r["default"],v.houston=s["default"],v.land=u["default"],v.launch=d["default"],v.Engine={},v.Engine.dbug=m["default"],v.Engine.location=p["default"],v.Engine.checkDynamic=g.checkDynamic,v.Engine.check=g.check,e.Nasa=v}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./engine/dbug":2,"./engine/location":3,"./engine/route":4,"./interface/config":5,"./interface/houston":6,"./interface/land":7,"./interface/launch":8}],2:[function(a,e,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(a){Nasa.__config__.debug&&("boolean"==typeof a?a?(console.log("DEBUG | Nasa: Beginning debug session for this Houston instance..."),console.log("DEBUG | Nasa: -------------------------------------------------------"),console.log("DEBUG | Nasa: CONFIG = "+JSON.stringify(Nasa.__config__)),console.log("DEBUG |")):(console.log("DEBUG |"),console.log("DEBUG | Nasa: -------------------------------------------------------"),console.log("DEBUG | Nasa: Ending debug session./")):console.log("DEBUG | Nasa: "+a))},e.exports=n["default"]},{}],3:[function(a,e,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){var a=window.location.pathname,e=a.split("/");return e[e.length-1].indexOf(".")===-1&&(a="/"===a.charAt(a.length-1)?a:a+"/"),a},e.exports=n["default"]},{}],4:[function(a,e,n){function t(a){return a&&a.__esModule?a:{"default":a}}function i(a){(0,l["default"])("Executed the route '"+a+"'\n"),Nasa.__flight__.schedule[a]?Nasa.__flight__.schedule[a].forEach(function(a){Nasa.__modules__[a]?Nasa.__modules__[a]():(0,l["default"])("ERR: '"+a+"' is not a registered module!")}):(0,l["default"])("ERR: Can't find '"+a+"' in the flight schedule!")}function r(){if("**"===m[0]){(0,l["default"])("Found dynamic beginning on "+m.join("/"));for(var a=h.length,e=0;e<h.length;e++)if(h[e]===m[1]||"*"===m[1]){e=0===e?1:0,h.splice(0,e),m.splice(0,1);break}if(a===h.length)return!1}return!0}function o(){if("**"===m[m.length-1]){(0,l["default"])("Found dynamic ending on "+m.join("/"));for(var a=h.length,e=h.length-1;e>=0;e--)if(h[e]===m[m.length-2]||"*"===m[m.length-2]){h.splice(e,h.length-e),m.splice(m.length-1,1);break}if(a===h.length)return!1}return!0}function s(a){return(0,f["default"])()===a&&(i(a),!0)}function c(a){if(m=a.split("/"),h=Nasa.Engine.location().split("/"),m.length>h.length)return!1;if(!r()||!o())return!1;for(var e=0;e<m.length;e++)if("*"!==m[e]){var n;if((n=m[e].indexOf("*"))===-1){if(m[e]!==h[e])return!1}else if(0===n){var t=m[e].substr(1,m[e].length);if(h[e].indexOf(t)!==h[e].length-1-(t.length-1))return!1}else if(n===m[e].length-1){var s=m[e].substr(0,n);if(h[e].substr(0,s.length)!==s)return!1}}return i(a),!0}Object.defineProperty(n,"__esModule",{value:!0}),n.check=s,n.checkDynamic=c;var u=a("./dbug"),l=t(u),d=a("./location"),f=t(d),m=[],h=[]},{"./dbug":2,"./location":3}],5:[function(a,e,n){function t(a){var e="";return e="/"===a.charAt(a.length-1)?a.substr(0,a.length-1):a,e="/"===e.charAt(0)?e.substr(1,e.length-1):e,"/"+e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(a){return a.root&&(a.root=t(a.root)),a.cascade&&"boolean"!=typeof a.cascade?console.error("Nasa: config(): Cascade must be a boolean value."):a.debug&&"boolean"!=typeof a.debug?console.error("Nasa: config(): Debug must be a boolean value."):void(Nasa.__config__=a)},e.exports=n["default"]},{}],6:[function(a,e,n){function t(a){return a&&a.__esModule?a:{"default":a}}function i(a){var e=a;return e=0===e.indexOf("/")?e.slice(1,e.length):e,e="/"+e,e=Nasa.__config__.root?Nasa.__config__.root+e:e}Object.defineProperty(n,"__esModule",{value:!0});var r=a("../engine/dbug"),o=t(r),s=a("../engine/route");n["default"]=function(a,e){(0,o["default"])(!0),"undefined"==typeof e&&(e="undefined"==typeof Nasa.__config__.cascade||Nasa.__config__.cascade),Nasa.__flight__.schedule=a,Object.keys(a).every(function(a){var n=i(a);if(a!==n&&(Nasa.__flight__.schedule[n]=Nasa.__flight__.schedule[a],delete Nasa.__flight__.schedule[a]),n.indexOf("*")!==-1){if((0,s.checkDynamic)(n))return e}else if((0,s.check)(n))return e;return!0}),(0,o["default"])(!1)},e.exports=n["default"]},{"../engine/dbug":2,"../engine/route":4}],7:[function(a,e,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(a){if("string"==typeof a){if(Nasa.__modules__[a])return Nasa.__modules__[a]();console.error("Nasa.land("+a+"): "+a+" doesn't exist.")}else console.error("Nasa.land("+a+"): Module name must be a string.")},e.exports=n["default"]},{}],8:[function(a,e,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(a,e){"string"==typeof a?Nasa.__modules__[a]?console.error("Nasa.launch("+a+"): "+a+" already exists."):Nasa.__modules__[a]=e:console.error("Nasa.launch("+a+"): Module name must be a string.")},e.exports=n["default"]},{}]},{},[1]),Nasa.launch("column-string",function(){return function(a){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return[a.key].concat(_toConsumableArray(a.columns),_toConsumableArray(e)).join(",")}}),Nasa.launch("mapc-region",function(){return[2,10,14,23,25,26,30,34,35,37,40,46,48,50,49,51,57,65,67,71,73,78,82,92,93,99,100,101,107,119,122,131,133,136,139,141,142,144,155,157,158,163,164,165,166,168,170,171,174,175,176,177,178,184,185,187,189,196,198,199,207,208,213,219,220,229,231,243,244,246,248,251,252,258,262,264,266,269,274,277,284,285,286,288,291,298,305,307,308,314,315,317,320,333,335,336,342,344,346,347,350]}),Nasa.launch("matrix-bounds",function(){return function(a,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],t=a.map(function(a){return e.map(function(e){return parseInt(a[e])})}),i=t.reduce(function(a,e){return a.concat(e)}).filter(function(a){return null!==a});n&&(i=i.filter(function(a){return a>0}));var r=Math.min.apply(null,i),o=Math.max.apply(null,i);return{min:r,max:o}}}),Nasa.launch("nest",function(){return function(a,e,n){var t={};return n||(n=!1),a.forEach(function(a){t[a[e]]=a,n&&delete t[a[e]][e]}),t}}),Nasa.launch("normalize",function(){return function(a){return a.toLowerCase().split(" ").join("-")}}),Nasa.launch("string-format",function(){function a(a){return a.toLocaleString("en-US")}function e(e){return"$"+a(e)}function n(e){return a(e)+"%"}return{dollar:e,number:a,percent:n}}),Nasa.launch("accordion",function(){function a(a){a.innerHTML=a.parentNode.classList.contains("active")?"&minus;":"&plus;"}return function(e,n){var t=n||document.querySelector(e),i=Array.from(t.querySelectorAll('*[data-action="toggle-accordion"]'));i.forEach(function(e){a(e),e.parentNode.addEventListener("click",function(n){n.preventDefault(),e.parentNode.classList.toggle("active"),a(e)})})}}),Nasa.launch("nav",function(){var a=document.querySelector(".nav-button"),e=document.querySelector(".site-wrapper");a.addEventListener("click",function(a){a.preventDefault(),e.classList.toggle("active")})}),Nasa.launch("tabs",function(){return function(a,e){var n=document.querySelector(a),t=Array.from(n.querySelectorAll("*[data-tabs] > *")),i=Array.from(n.querySelectorAll("*[data-tab]"));t.forEach(function(a){a.addEventListener("click",function(n){n.preventDefault(),t.forEach(function(a){return a.classList.remove("active")}),a.classList.add("active"),i.forEach(function(e){e.dataset.tab===a.innerText?e.classList.add("active"):e.classList.remove("active")}),e(a)})}),t[0].click()}}),Nasa.launch("truncate-text",function(){var a=90,e="/report#",n=Array.from(document.querySelectorAll("*[data-truncate]"));n.forEach(function(n){var t=Array.from(n.querySelectorAll("p")),i=0;t.forEach(function(t){if(i>=a)t.parentNode.removeChild(t);else{var r=t.innerText.split(" ");if(i+r.length>=a){t.innerText=r.slice(0,a-i).join(" ")+" ...";var o=document.createElement("a");o.classList.add("truncated-anchor"),o.href=e+n.dataset.truncate,o.innerText="Read More",t.appendChild(o)}i+=r.length}})})}),Nasa.launch("home-page",function(){Nasa.land("tabs")(".disparities")}),Nasa.launch("indicators-page",function(){var a=Nasa.land("tabs"),e=Nasa.land("mass-map"),n=Nasa.land("candlestick"),t={diversity:{type:"map",module:Nasa.land("demo-pop-race-00-10")},housing:{type:"map",module:Nasa.land("soe-neigh-income-seg")},health:{type:"chart",module:Nasa.land("health-births-lbw-race-educ")},education:{type:"map",module:Nasa.land("educ-mcas-gr10-math-by-year")},income:{type:"map",module:Nasa.land("soe-neigh-income-seg")},home_ownership:{type:"chart",module:Nasa.land("soe-hous-hmda-race")},employment:{type:"map",module:Nasa.land("c23002-employment-by-race-age-acs")},criminal_justice:{type:"chart",module:Nasa.land("pubsafety-inmate-crimes-race-by-year")},seniors:{type:"map",module:Nasa.land("b17020-poverty-by-race-age-acs")}},i=["as","aa","lat","whi"].map(function(a){return new n(a)}),r=document.querySelector('*[data-viewer="chart"]'),o=document.querySelector('*[data-viewer="map"]'),s=Array.from(document.querySelectorAll("*[data-candlestick]")),c=document.querySelector("*[data-municipal]"),u=document.querySelector(".sub-header"),l=new e("map"),d=null,f=function(a){o.classList.add("active"),r.classList.remove("active");var e=!0;l.setFormat(a.format||"number"),l.setColorRamp(a[a.ramp].data,a[a.ramp].columns,a.nonZero),l.unloadData("census"),l.unloadData("muni"),l.unloadData("schoolDistrict"),l.renderLayer("outline"),"census"in a&&(e=!1,l.renderData("census",a.census)),"schoolDistricts"in a&&(e=!1,l.renderData("schoolDistricts",a.schoolDistricts,p)),"muni"in a&&(l.layers.muni.fill=e?null:"rgba(0,0,0,0)",l.renderData("muni",a.muni,p)),i.forEach(function(e){e.removeTick("default"),e.setColumnSuffix(a.suffix),e.setRange(l.minimum,l.maximum),e.setFormat(a.format||"number"),e.renderData(a[a.bounded],a.nonZero),"region"in a&&e.addTick(a.region.data,"Regional Median")})},m=function(a){r.classList.add("active"),o.classList.remove("active"),r.innerHTML="",a.chart.bindto=r,c3.generate(a.chart)},h=function(a){d=a;var e=t[a];e.module.load(function(a){"map"===e.type?f(a):m(a)})};a(".indicators",function(a){return h(a.dataset.vizId)}),s.forEach(function(a){var e=a.dataset.candlestick;a.parentNode.querySelector("h4").addEventListener("click",function(){var a=t[d].module.datasets;"census"in a&&(a.census.column=e+a.suffix),"muni"in a&&(a.muni.column=e+a.suffix),h(d)})}),s[0].click();var p={"in":function(a){d3v4.select(this).raise(),u.classList.remove("default"),c.innerText=a.properties.municipal,i.forEach(function(e){e.addTick(a.properties,a.properties.municipal,a.properties.municipal)})},out:function(a){u.classList.add("default"),i.forEach(function(e){e.removeTick(a.properties.municipal)})}}}),Nasa.launch("outcome-page",function(){var a=Nasa.land("accordion"),e=Array.from(document.querySelectorAll("*[data-accordion]"));e.forEach(function(e){return a(null,e)})}),Nasa.launch("report-page",function(){var a=function(a){return 50*Math.ceil(a/50)},e=document.querySelector(".report-viewer"),n=Array.from(document.querySelectorAll("*[data-anchor]")),t=n.reduce(function(a,e){return a[e.dataset.anchor]=e,a},{}),i=n.map(function(a){return e.querySelector(a.dataset.anchor)}),r=i.reduce(function(e,n){return n&&(e[a(n.offsetTop)]=n),e},{}),o=function(){var i=a(e.scrollTop);if(i in r){var o=r[i].id;n.forEach(function(a){return a.classList.remove("active")}),t["#"+o].classList.add("active")}};n.forEach(function(a){a.addEventListener("click",o)}),e.addEventListener("scroll",o),document.onload=o});var _createClass=function(){function a(a,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(a,t.key,t)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();Nasa.launch("candlestick",function(){var a=Nasa.land("matrix-bounds"),e=Nasa.land("mapc-region"),n=Nasa.land("normalize"),t=Nasa.land("string-format"),i=function(){function i(a){_classCallCheck(this,i),this.canvas=d3v4.select('*[data-candlestick="'+a+'"]').append("div").attr("class","content"),this.stick=this.canvas.append("div").attr("class","stick"),this.bounding={min:this.stick.append("span").attr("class","bound min-bound"),max:this.stick.append("span").attr("class","bound max-bound")},this.identifier=a,this.column=a,this.format=t.number}return _createClass(i,[{key:"setFormat",value:function(a){this.format=t[a]}},{key:"setColumnSuffix",value:function(a){this.suffix=a,this.column=this.identifier+a}},{key:"setRange",value:function(a,e){this.range={min:a,max:e}}},{key:"leftOffset",value:function(a){var e=this.range.min,n=this.range.max;return this.range.min<0&&(a-=this.range.min,e=0,n=this.range.max-this.range.min),100*Math.abs(a/(e-n))}},{key:"addTick",value:function(a,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default",i=a[this.column];if(i&&this.canvas.select('*[data-id="'+n(t)+'"]').empty()){var r=this.leftOffset(i),o=this.canvas.append("div").attr("class","tick").style("left",r+"%");o.attr("data-id",n(t)),"default"!==t&&o.attr("class","tick identified");var s=o.append("div").attr("class","tick-info");s.append("p").attr("class","tick-title").html(e),s.append("p").attr("class","tick-value").html(this.format(i))}}},{key:"removeTick",value:function(a){this.canvas.selectAll('*[data-id="'+n(a)+'"]').remove()}},{key:"renderData",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=n.data[0].muni_id?n.data.filter(function(a){return e.indexOf(a.muni_id)!==-1}):n.data,r=a(i,[this.column],t),o=100*Math.abs((r.min-r.max)/(this.range.min-this.range.max)),s=this.leftOffset(r.min);this.stick.style("width",o+"%").style("left",s+"%"),this.bounding.min.html(this.format(r.min)),this.bounding.max.html(this.format(r.max))}}]),i}();return i});var _createClass=function(){function a(a,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(a,t.key,t)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();Nasa.launch("mass-map",function(){function a(a){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{file:a,data:null,fill:e.fill||null,features:null,stroke:e.stroke||null,strokeWidth:e.strokeWidth||1}}var e=Nasa.land("nest"),n=Nasa.land("string-format"),t=Nasa.land("mapc-region"),i=Nasa.land("matrix-bounds"),r=function(){function r(e){var t=this;_classCallCheck(this,r),this.identifier=e,this.geoJsonPath="/assets/geojson",this.colors={minimum:"#13314D",maximum:"#57E098",neutral:"#AAAAAA"},this.layers={census:a("ma-census-tracts.json",{strokeWidth:.5}),muni:a("ma-munis.json",{fill:"rgba(0,0,0,0)"}),schoolDistricts:a("ma-school-districts.json"),outline:a("mapc-outline.json",{stroke:"rgba(255,255,255,1)",fill:"none",strokeWidth:2})};var i=600,o=570;this.canvas=d3v4.select(e).append("svg").attr("width",i).attr("height",o),Object.keys(this.layers).forEach(function(a){t.canvas.append("g").attr("data-layer-name",a)});var s=d3v4.geoAlbers().scale(4e4).rotate([71.09,0]).center([0,42.34]).translate([i/2,o/2]);this.geoPath=d3v4.geoPath().projection(s),this.format=n.number}return _createClass(r,[{key:"loadLayer",value:function(a,e){var n=this.layers[a];n.features?e(n):d3v4.json(this.geoJsonPath+"/"+n.file,function(a){n.features=a.features,e(n)})}},{key:"setFormat",value:function(a){this.format=n[a]}},{key:"setColorRamp",value:function(a,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],t=i(a,e,n),r=t.min,o=t.max;this.minimum=r,this.maximum=o,d3v4.select(".range-min").html(this.format(r)),d3v4.select(".range-max").html(this.format(o)),this.colorRamp=d3v4.scaleLinear().domain([this.minimum,this.maximum]).range([this.colors.minimum,this.colors.maximum])}},{key:"unloadData",value:function(a){d3.select('g[data-layer-name="'+a+'"]').selectAll("*").remove()}},{key:"renderLayer",value:function(a){var e=this;this.loadLayer(a,function(n){d3v4.select('g[data-layer-name="'+a+'"]').selectAll("path").data(n.features).enter().append("path").attr("d",e.geoPath).attr("fill",n.fill||e.colors.neutral).attr("stroke",n.stroke||e.colors.minimum).attr("stroke-width",n.strokeWidth)})}},{key:"renderData",value:function(a,n){var i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.loadLayer(a,function(o){var s=e(n.data,n.key),c=o.features.map(function(a){var e=Object.assign({},a);return e.properties=s[a.properties[n.index||n.key]],e}),u=d3v4.select('g[data-layer-name="'+a+'"]').selectAll("path").data(c).enter().append("path").attr("opacity",function(a){return t.indexOf(n.getMuniId(a))!==-1?1:.25}).attr("fill",function(a){return void 0!==a.properties?o.fill||i.colorRamp(a.properties[n.column]):i.colors.neutral}).attr("stroke",o.stroke||i.colors.minimum).attr("stroke-width",o.strokeWidth).attr("d",i.geoPath);r&&(r["in"]&&u.on("mouseover",r["in"]).on("mousemove",r["in"]),r.out&&u.on("mouseout",r.out))})}}]),r}();return r}),Nasa.launch("health-births-lbw-race-educ",function(){var a=Nasa.land("string-format"),e="https://mapc-admin.carto.com/api/v2/sql?q=select%20*%20FROM%20health_births_lbw_race_educ_m%20WHERE%20muni_id=%27352%27%20AND%20cal_years%20IN%20(%272005-09%27,%272010-14%27)",n={query:null,chart:null},t=function(t){n.query?t(n):d3.json(e,function(e){n.query=[{series:"White","2005-09 Less than HS":e.rows[0].whilhs_p,"2010-14 Less than HS":e.rows[1].whilhs_p,"2005-09 HS grad":e.rows[0].whibapl_p,"2010-14 HS grad":e.rows[1].whibapl_p},{series:"Black/African American","2005-09 Less than HS":e.rows[0].aalhs_p,"2010-14 Less than HS":e.rows[1].aalhs_p,"2005-09 HS grad":e.rows[0].aabapl_p,"2010-14 HS grad":e.rows[1].aabapl_p},{series:"Asian","2005-09 Less than HS":e.rows[0].apilhs_p,"2010-14 Less than HS":e.rows[1].apilhs_p,"2005-09 HS grad":e.rows[0].apibapl_p,"2010-14 HS grad":e.rows[1].apibapl_p},{series:"Latino","2005-09 Less than HS":e.rows[0].latlhs_p,"2010-14 Less than HS":e.rows[1].latlhs_p,"2005-09 HS grad":e.rows[0].latbapl_p,"2010-14 HS grad":e.rows[1].latbapl_p}],n.chart={data:{json:n.query,keys:{value:["2005-09 Less than HS","2010-14 Less than HS","2005-09 HS grad","2010-14 HS grad"]},type:"bar"},bar:{width:{ratio:.9}},axis:{x:{type:"category",categories:["White (Non Latino)","Black","Asian","Latino","Native American"],height:40},y:{tick:{format:a.percent},padding:{top:100,bottom:100},label:{text:"Low Birthweight by race in %",position:"outer-middle"}}},size:{height:350},color:{pattern:["#119c76","#57E09B"]}},t(n)})};return{load:t,datasets:n}}),Nasa.launch("pubsafety-inmate-crimes-race-by-year",function(){var a=Nasa.land("string-format"),e="https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20from%20pubsafety_inmate_crimes_race_by_year_m",n={query:null,chart:null},t=function(t){n.query?t(n):d3.json(e,function(e){n.query=[{series:"2010",Total:e.rows[0].tot_p,White:e.rows[0].nhwhi_p,Black:e.rows[0].nhaa_p,Latino:e.rows[0].lat_p,Asian:e.rows[0].nhas_p,"Native American":e.rows[0].nhna_p},{series:"2011",Total:e.rows[1].tot_p,White:e.rows[1].nhwhi_p,Black:e.rows[1].nhaa_p,Latino:e.rows[1].lat_p,Asian:e.rows[1].nhas_p,"Native American":e.rows[1].nhna_p},{series:"2012",Total:e.rows[2].tot_p,White:e.rows[2].nhwhi_p,Black:e.rows[2].nhaa_p,Latino:e.rows[2].lat_p,Asian:e.rows[2].nhas_p,"Native American":e.rows[2].nhna_p},{series:"2013",Total:e.rows[3].tot_p,White:e.rows[3].nhwhi_p,Black:e.rows[3].nhaa_p,Latino:e.rows[3].lat_p,Asian:e.rows[3].nhas_p,"Native American":e.rows[3].nhna_p},{series:"2014",Total:e.rows[4].tot_p,White:e.rows[4].nhwhi_p,Black:e.rows[4].nhaa_p,Latino:e.rows[4].lat_p,Asian:e.rows[4].nhas_p,"Native American":e.rows[4].nhna_p},{series:"2014",Total:e.rows[5].tot_p,White:e.rows[5].nhwhi_p,Black:e.rows[5].nhaa_p,Latino:e.rows[5].lat_p,Asian:e.rows[5].nhas_p,"Native American":e.rows[5].nhna_p},{series:"2016",Total:e.rows[6].tot_p,White:e.rows[6].nhwhi_p,Black:e.rows[6].nhaa_p,Latino:e.rows[6].lat_p,Asian:e.rows[6].nhas_p,"Native American":e.rows[6].nhna_p}],n.chart={data:{json:n.query,keys:{value:["Total","White","Black","Latino","Asian","Native American"]},type:"line"},axis:{x:{type:"category",categories:["2010","2011","2012","2013","2014","2015","2016"],padding:{left:-.48,right:0},height:40,tick:{fit:!0,multiline:!0,rotate:0}},y:{tick:a.percent,padding:{top:100,bottom:100},label:{text:"Percent of Total Population",position:"outer-middle"},max:1.2,min:.31}},size:{height:350}},t(n)})};return{load:t,datasets:n}}),Nasa.launch("soe-hous-hmda-race",function(){var a=Nasa.land("string-format"),e="https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20storage.soe_hous_hmda_race_mapc",n={query:null,chart:null},t=function(t){n.query?t(n):d3.json(e,function(e){n.query=[{series:"White",2009:e.rows[0].hmda09,2015:e.rows[0].hmda15},{series:"Black",2009:e.rows[1].hmda09,2015:e.rows[1].hmda15},{series:"Latino",2009:e.rows[2].hmda09,2015:e.rows[2].hmda15},{series:"Asian",2009:e.rows[3].hmda09,2015:e.rows[3].hmda15},{series:"Native American",2009:e.rows[4].hmda09,2015:e.rows[4].hmda15}],n.chart={data:{json:n.query,keys:{value:["2009","2015"]},type:"bar"},bar:{width:{ratio:.9}},axis:{x:{type:"category",categories:["White","Black","Latino","Asian","Native American"],height:40,tick:{fit:!0,multiline:!0,rotate:0}},y:{tick:{format:a.percent},padding:{top:100,bottom:100},label:{text:"Mortgage loan application denial rate, high-income",position:"outer-middle"}}},size:{height:350},color:{pattern:["#1c164e","#6dbd45"]}},t(n)})};return{load:t,datasets:n}}),Nasa.launch("b17020-poverty-by-race-age-acs",function(){var a=Nasa.land("column-string"),e=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",i={suffix:"65o_p",format:"percent",ramp:"census",bounded:"muni",nonZero:!0,muni:{key:"muni_id",index:"town_id",columns:["whi65o_p","aa65o_p","as65o_p","lat65o_p"],column:"as65o_p",data:null},census:{key:"ct10_id",columns:["whi65o_p","aa65o_p","as65o_p","lat65o_p"],column:"as65o_p",data:null},crosswalk:{data:null}},r={muni:encodeURI(n+a(i.muni,["municipal"])+(" FROM b17020_poverty_by_race_age_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+a(i.census)+(" FROM b17020_poverty_by_race_age_acs_ct WHERE acs_year = '"+t+"'")),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},o=function(a){i.muni.data&&i.census.data?a(i):d3v4.queue().defer(d3v4.json,r.muni).defer(d3v4.json,r.census).defer(d3v4.json,r.crosswalk).await(function(n,t,r,o){i.muni.data=t.rows,i.census.data=r.rows,i.crosswalk.data=e(o.rows,"ct10_id"),i.census.getMuniId=function(a){return i.crosswalk.data[a.properties.ct10_id].muni_id},i.muni.getMuniId=function(a){return a.properties.muni_id},a(i)})};return{load:o,sources:r,datasets:i}}),Nasa.launch("c23002-employment-by-race-age-acs",function(){var a=Nasa.land("column-string"),e=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",i={suffix:"ue_p",format:"percent",ramp:"census",bounded:"muni",nonZero:!0,muni:{key:"muni_id",index:"town_id",columns:["whiue_p","aaue_p","asue_p","latue_p"],column:"asue_p",data:null},census:{key:"ct10_id",columns:["whiue_p","aaue_p","asue_p","latue_p"],column:"asue_p",data:null},crosswalk:{data:null},region:{key:"msa_id",columns:["whiue_p","aaue_p","asue_p","latue_p"],data:null}},r={muni:encodeURI(n+a(i.muni,["municipal"])+(" FROM c23002_employment_by_race_age_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+a(i.census)+(" FROM c23002_employment_by_race_age_acs_ct WHERE acs_year = '"+t+"'")),region:encodeURI(n+a(i.region)+" FROM c23002_employment_by_race_age_acs_msa WHERE msa_id = '14460'"),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},o=function(a){i.muni.data&&i.census.data&&i.region.data?a(i):d3v4.queue().defer(d3v4.json,r.muni).defer(d3v4.json,r.census).defer(d3v4.json,r.region).defer(d3v4.json,r.crosswalk).await(function(n,t,r,o,s){i.muni.data=t.rows,i.census.data=r.rows,i.region.data=o.rows[0],i.crosswalk.data=e(s.rows,"ct10_id"),i.census.getMuniId=function(a){return i.crosswalk.data[a.properties.ct10_id].muni_id},i.muni.getMuniId=function(a){return a.properties.muni_id},a(i)})};return{load:o,sources:r,datasets:i}}),Nasa.launch("demo-pop-race-00-10",function(){var a=Nasa.land("column-string"),e=(Nasa.land("nest"),"https://mapc-admin.carto.com/api/v2/sql?q=SELECT "),n={nhwh_pch:"whi_pdif",nhaa_pdif:"aa_pdif",nhapi_pdif:"as_pdif",nhna_pdif:"na_pdif"},t={suffix:"_pdif",format:"percent",ramp:"muni",bounded:"muni",nonZero:!1,temp:{key:"muni_id",columns:["nhwh_pch","nhaa_pdif","nhna_pdif","lat_pdif","nhapi_pdif"]},muni:{key:"muni_id",index:"town_id",columns:["whi_pdif","aa_pdif","as_pdif","lat_pdif","na_pdif"],column:"as_pdif",data:null},region:{columns:["whi_pdif","aa_pdif","as_pdif","lat_pdif","na_pdif"],data:null}},i={muni:encodeURI(e+a(t.temp,["municipal"])+" FROM demo_pop_race_00_10m")},r=function(a){t.muni.data?a(t):d3v4.queue().defer(d3v4.json,i.muni).await(function(e,i){i.rows=i.rows.filter(function(a){return a.muni_id<=352}).map(function(a){for(var e in n)a[n[e]]=a[e],delete a[e];return a}),t.muni.data=i.rows.filter(function(a){return a.muni_id<=351}),t.region.data=i.rows.filter(function(a){return 352==a.muni_id})[0],t.muni.getMuniId=function(a){return a.properties.muni_id},a(t)})};return{load:r,sources:i,datasets:t}}),Nasa.launch("educ-mcas-gr10-math-by-year",function(){var a=Nasa.land("column-string"),e=(Nasa.land("nest"),Nasa.land("mapc-region")),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2014-15",i={suffix:"_pa_p",format:"number",ramp:"schoolDistricts",bounded:"schoolDistricts",nonZero:!0,schoolDistricts:{key:"districtid",columns:["whi_pa_p","aa_pa_p","as_pa_p","lat_pa_p"],column:"as_pa_p",data:null}},r={schoolDistricts:encodeURI(n+a(i.schoolDistricts,["district"])+(" FROM educ_mcas_gr10_math_by_year_districts WHERE schoolyear = '"+t+"'"))},o=function(a){i.schoolDistricts.data?a(i):d3v4.queue().defer(d3v4.json,r.schoolDistricts).await(function(n,t){i.schoolDistricts.data=t.rows,i.schoolDistricts.getMuniId=function(a){return e[0]},a(i)})};return{load:o,sources:r,datasets:i}}),Nasa.launch("soe-neigh-income-seg",function(){var a=Nasa.land("column-string"),e=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",i={suffix:"_mhi",format:"dollar",ramp:"census",bounded:"muni",nonZero:!0,muni:{key:"muni_id",index:"town_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],column:"as_mhi",data:null},census:{key:"ct10_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],column:"as_mhi",data:null},crosswalk:{data:null},region:{key:"msa_id",columns:["whi_mhi","aa_mhi","as_mhi","lat_mhi"],data:null}},r={muni:encodeURI(n+a(i.muni,["municipal"])+(" FROM b19013_mhi_race_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+a(i.census)+(" FROM b19013_mhi_race_acs_ct WHERE acs_year = '"+t+"'")),region:encodeURI(n+a(i.region)+(" FROM b19013_mhi_race_acs_msa WHERE acs_year = '"+t+"' AND msa_id = '14460'")),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},o=function(a){i.muni.data&&i.census.data?a(i):d3v4.queue().defer(d3v4.json,r.muni).defer(d3v4.json,r.census).defer(d3v4.json,r.region).defer(d3v4.json,r.crosswalk).await(function(n,t,r,o,s){i.muni.data=t.rows,i.census.data=r.rows,i.region.data=o.rows[0],i.crosswalk.data=e(s.rows,"ct10_id"),i.census.getMuniId=function(a){return i.crosswalk.data[a.properties.ct10_id].muni_id},i.muni.getMuniId=function(a){return a.properties.muni_id},a(i)})};return{load:o,sources:r,datasets:i}}),Nasa.houston({"*":["nav","truncate-text"],"/":["home-page"],"goals/*/":["outcome-page"],"indicators/":["indicators-page"],"report/":["report-page"]});