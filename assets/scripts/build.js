"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var a=0,n=Array(e.length);a<e.length;a++)n[a]=e[a];return n}return Array.from(e)}function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}!function e(a,n,t){function r(i,s){if(!n[i]){if(!a[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[i]={exports:{}};a[i][0].call(u.exports,function(e){var n=a[i][1][e];return r(n?n:e)},u,u.exports,e,a,n,t)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<t.length;i++)r(t[i]);return r}({1:[function(e,a,n){(function(a){function n(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a["default"]=e,a}function t(e){return e&&e.__esModule?e:{"default":e}}var r=e("./interface/config"),o=t(r),i=e("./interface/houston"),s=t(i),c=e("./interface/land"),l=t(c),u=e("./interface/launch"),d=t(u),m=e("./engine/dbug"),p=t(m),h=e("./engine/location"),f=t(h),_=e("./engine/route"),g=n(_),y={};y.__modules__=[],y.__config__={},y.__flight__={},y.config=o["default"],y.houston=s["default"],y.land=l["default"],y.launch=d["default"],y.Engine={},y.Engine.dbug=p["default"],y.Engine.location=f["default"],y.Engine.checkDynamic=g.checkDynamic,y.Engine.check=g.check,a.Nasa=y}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./engine/dbug":2,"./engine/location":3,"./engine/route":4,"./interface/config":5,"./interface/houston":6,"./interface/land":7,"./interface/launch":8}],2:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e){Nasa.__config__.debug&&("boolean"==typeof e?e?(console.log("DEBUG | Nasa: Beginning debug session for this Houston instance..."),console.log("DEBUG | Nasa: -------------------------------------------------------"),console.log("DEBUG | Nasa: CONFIG = "+JSON.stringify(Nasa.__config__)),console.log("DEBUG |")):(console.log("DEBUG |"),console.log("DEBUG | Nasa: -------------------------------------------------------"),console.log("DEBUG | Nasa: Ending debug session./")):console.log("DEBUG | Nasa: "+e))},a.exports=n["default"]},{}],3:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){var e=window.location.pathname,a=e.split("/");return a[a.length-1].indexOf(".")===-1&&(e="/"===e.charAt(e.length-1)?e:e+"/"),e},a.exports=n["default"]},{}],4:[function(e,a,n){function t(e){return e&&e.__esModule?e:{"default":e}}function r(e){(0,u["default"])("Executed the route '"+e+"'\n"),Nasa.__flight__.schedule[e]?Nasa.__flight__.schedule[e].forEach(function(e){Nasa.__modules__[e]?Nasa.__modules__[e]():(0,u["default"])("ERR: '"+e+"' is not a registered module!")}):(0,u["default"])("ERR: Can't find '"+e+"' in the flight schedule!")}function o(){if("**"===p[0]){(0,u["default"])("Found dynamic beginning on "+p.join("/"));for(var e=h.length,a=0;a<h.length;a++)if(h[a]===p[1]||"*"===p[1]){a=0===a?1:0,h.splice(0,a),p.splice(0,1);break}if(e===h.length)return!1}return!0}function i(){if("**"===p[p.length-1]){(0,u["default"])("Found dynamic ending on "+p.join("/"));for(var e=h.length,a=h.length-1;a>=0;a--)if(h[a]===p[p.length-2]||"*"===p[p.length-2]){h.splice(a,h.length-a),p.splice(p.length-1,1);break}if(e===h.length)return!1}return!0}function s(e){return(0,m["default"])()===e&&(r(e),!0)}function c(e){if(p=e.split("/"),h=Nasa.Engine.location().split("/"),p.length>h.length)return!1;if(!o()||!i())return!1;for(var a=0;a<p.length;a++)if("*"!==p[a]){var n;if((n=p[a].indexOf("*"))===-1){if(p[a]!==h[a])return!1}else if(0===n){var t=p[a].substr(1,p[a].length);if(h[a].indexOf(t)!==h[a].length-1-(t.length-1))return!1}else if(n===p[a].length-1){var s=p[a].substr(0,n);if(h[a].substr(0,s.length)!==s)return!1}}return r(e),!0}Object.defineProperty(n,"__esModule",{value:!0}),n.check=s,n.checkDynamic=c;var l=e("./dbug"),u=t(l),d=e("./location"),m=t(d),p=[],h=[]},{"./dbug":2,"./location":3}],5:[function(e,a,n){function t(e){var a="";return a="/"===e.charAt(e.length-1)?e.substr(0,e.length-1):e,a="/"===a.charAt(0)?a.substr(1,a.length-1):a,"/"+a}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e){return e.root&&(e.root=t(e.root)),e.cascade&&"boolean"!=typeof e.cascade?console.error("Nasa: config(): Cascade must be a boolean value."):e.debug&&"boolean"!=typeof e.debug?console.error("Nasa: config(): Debug must be a boolean value."):void(Nasa.__config__=e)},a.exports=n["default"]},{}],6:[function(e,a,n){function t(e){return e&&e.__esModule?e:{"default":e}}function r(e){var a=e;return a=0===a.indexOf("/")?a.slice(1,a.length):a,a="/"+a,a=Nasa.__config__.root?Nasa.__config__.root+a:a}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../engine/dbug"),i=t(o),s=e("../engine/route");n["default"]=function(e,a){(0,i["default"])(!0),"undefined"==typeof a&&(a="undefined"==typeof Nasa.__config__.cascade||Nasa.__config__.cascade),Nasa.__flight__.schedule=e,Object.keys(e).every(function(e){var n=r(e);if(e!==n&&(Nasa.__flight__.schedule[n]=Nasa.__flight__.schedule[e],delete Nasa.__flight__.schedule[e]),n.indexOf("*")!==-1){if((0,s.checkDynamic)(n))return a}else if((0,s.check)(n))return a;return!0}),(0,i["default"])(!1)},a.exports=n["default"]},{"../engine/dbug":2,"../engine/route":4}],7:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e){if("string"==typeof e){if(Nasa.__modules__[e])return Nasa.__modules__[e]();console.error("Nasa.land("+e+"): "+e+" doesn't exist.")}else console.error("Nasa.land("+e+"): Module name must be a string.")},a.exports=n["default"]},{}],8:[function(e,a,n){Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e,a){"string"==typeof e?Nasa.__modules__[e]?console.error("Nasa.launch("+e+"): "+e+" already exists."):Nasa.__modules__[e]=a:console.error("Nasa.launch("+e+"): Module name must be a string.")},a.exports=n["default"]},{}]},{},[1]),Nasa.launch("column-map",function(){return function(e,a){for(var n in e)a[e[n]]=a[n],delete a[n];return a}}),Nasa.launch("column-string",function(){return function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return[e.key].concat(_toConsumableArray(e.columns),_toConsumableArray(a)).join(",")}}),Nasa.launch("curry",function(){return function(e){var a=Array.prototype.slice.call(arguments,1);return function(){return e.apply(this,a.concat(Array.prototype.slice.call(arguments,0)))}}}),Nasa.launch("mapc-region",function(){return[2,10,14,23,25,26,30,34,35,37,40,46,48,50,49,51,57,65,67,71,73,78,82,92,93,99,100,101,107,119,122,131,133,136,139,141,142,144,155,157,158,163,164,165,166,168,170,171,174,175,176,177,178,184,185,187,189,196,198,199,207,208,213,219,220,229,231,243,244,246,248,251,252,258,262,264,266,269,274,277,284,285,286,288,291,298,305,307,308,314,315,317,320,333,335,336,342,344,346,347,350]}),Nasa.launch("matrix-bounds",function(){return function(e,a){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],t=e.map(function(e){return a.map(function(a){return parseInt(e[a])})}),r=t.reduce(function(e,a){return e.concat(a)}).filter(function(e){return null!==e});n&&(r=r.filter(function(e){return e>0}));var o=Math.min.apply(null,r),i=Math.max.apply(null,r);return{min:o,max:i}}}),Nasa.launch("nest",function(){return function(e,a,n){var t={};return n||(n=!1),e.forEach(function(e){t[e[a]]=e,n&&delete t[e[a]][a]}),t}}),Nasa.launch("normalize",function(){return function(e){return e.toLowerCase().split(" ").join("-")}}),Nasa.launch("string-format",function(){function e(e){return e.toLocaleString("en-US")}function a(a){return"$"+e(a)}function n(a){return e(a)+"%"}return{dollar:a,number:e,percent:n}}),Nasa.launch("accordion",function(){function e(e){e.innerHTML=e.parentNode.classList.contains("active")?"&minus;":"&plus;"}return function(a,n){var t=n||document.querySelector(a),r=Array.from(t.querySelectorAll('*[data-action="toggle-accordion"]'));r.forEach(function(a){e(a),a.parentNode.addEventListener("click",function(n){a.parentNode.classList.toggle("active"),e(a)})})}}),Nasa.launch("nav",function(){var e=document.querySelector(".nav-button"),a=document.querySelector(".site-wrapper");e.addEventListener("click",function(e){e.preventDefault(),a.classList.toggle("active")})}),Nasa.launch("tabs",function(){return function(e,a){var n=document.querySelector(e),t=Array.from(n.querySelectorAll("*[data-tabs] > *")),r=Array.from(n.querySelectorAll("*[data-tab]")),o=[],i=document.createElement("select");i.classList.add("tabs-select"),t.forEach(function(e){var n=document.createElement("option");n.innerText=e.innerText,n.value=e.innerText,i.appendChild(n),o.push(n),e.addEventListener("click",function(n){n.preventDefault(),t.forEach(function(e){return e.classList.remove("active")}),e.classList.add("active"),i.value=e.innerText,r.forEach(function(a){a.dataset.tab===e.innerText?a.classList.add("active"):a.classList.remove("active")}),a&&a(e)})}),i.addEventListener("change",function(){t.some(function(e){var a=i.value===e.innerText;return a&&e.click(),a})}),n.appendChild(i),t[0].click()}}),Nasa.launch("truncate-text",function(){var e=90,a="/report#",n=Array.from(document.querySelectorAll("*[data-truncate]")),t=Array.from(document.querySelectorAll(".footnotes")).map(function(e){return Array.from(e.querySelectorAll("li"))}).reduce(function(e,a){return e.concat(a)},[]);console.log(t);var r=function(e){var a=Array.from(e.querySelectorAll("a.footnote")),n=null;a.length>0&&(a.forEach(function(e){var a=null;t.some(function(n){if(n.id===e.href.split("#")[1])return a=n,!0}),a&&(n=a.parentNode,n.removeChild(a))}),n&&0===n.querySelectorAll("li").length&&n.parentNode.removeChild(n))};n.forEach(function(n){var t=0,o=Array.from(n.querySelectorAll("p")).filter(function(e){return e.parentNode===n});o.forEach(function(o){if(t>=e)r(o),o.parentNode.removeChild(o);else{var i=o.innerText.split(" ");if(t+i.length>=e){r(o),o.innerText=i.slice(0,e-t).join(" ")+" ...";var s=document.createElement("a");s.classList.add("truncated-anchor"),s.href=a+n.dataset.truncate,s.target="_blank",s.innerText="Read More",o.appendChild(s)}t+=i.length}})})}),Nasa.launch("home-page",function(){Nasa.land("tabs")(".disparities")}),Nasa.launch("indicators-page",function(){var e=Nasa.land("tabs"),a=Nasa.land("mass-map"),n=Nasa.land("candlestick"),t={diversity:{type:"map",module:Nasa.land("demo-pop-race-00-10")},housing:{type:"map",module:Nasa.land("soe-neigh-income-seg")},health:{type:"chart",module:Nasa.land("health-births-lbw-race-educ")},education:{type:"map",module:Nasa.land("educ-mcas-gr10-math-by-year")},income:{type:"map",module:Nasa.land("soe-neigh-income-seg")},home_ownership:{type:"chart",module:Nasa.land("soe-hous-hmda-race")},employment:{type:"map",module:Nasa.land("c23002-employment-by-race-age-acs")},criminal_justice:{type:"chart",module:Nasa.land("pubsafety-inmate-crimes-race-by-year")},seniors:{type:"map",module:Nasa.land("b17020-poverty-by-race-age-acs")}},r=["all","as","aa","lat","nhw"].map(function(e){return new n(e)}),o=document.querySelector('*[data-viewer="chart"]'),i=document.querySelector('*[data-viewer="map"]'),s=Array.from(document.querySelectorAll("*[data-candlestick]")),c=document.querySelector("*[data-municipal]"),l=document.querySelector(".sub-header"),u=new a("map"),d={title:document.querySelector("*[data-title]"),sourceYear:document.querySelector("*[data-source-year]")},m={title:document.querySelector("*[data-legend-title]"),race:document.querySelector("*[data-race]"),source:document.querySelector("*[data-source]")},p={all:"All Races",as:"Asian",aa:"Black",lat:"Latino",nhw:"White"},h=null,f=function(e){i.classList.add("active"),o.classList.remove("active"),m.title.innerText=e.title.toLowerCase(),m.race.innerText=e.race,m.source.innerText=e.source;var a=!0;u.setFormat(e.format||"number"),u.setColorRamp(e[e.ramp].data,e[e.ramp].columns,e.nonZero),u.unloadData("census"),u.unloadData("muni"),u.unloadData("schoolDistricts"),u.renderLayer("outline"),"census"in e&&(a=!1,u.renderData("census",e.census)),"schoolDistricts"in e&&(a=!1,u.renderData("schoolDistricts",e.schoolDistricts,w)),"muni"in e&&(u.layers.muni.fill=a?null:"rgba(0,0,0,0)",u.renderData("muni",e.muni,w)),r.forEach(function(a){a.removeTick("default"),a.setColumnSuffix(e.suffix),a.setRange(u.minimum,u.maximum),a.setFormat(e.format||"number"),a.renderData(e[e.bounded],e.nonZero),"region"in e&&a.addTick(e.region.data,"Regionwide")})},_=function(e){o.classList.add("active"),i.classList.remove("active"),o.innerHTML="",e.chart.bindto=o,c3.generate(e.chart)},g=function(e){h=e;var a=t[e];a.module.load(function(e){d.title.innerText=e.title,d.sourceYear.innerText=e.sourceYear,"map"===a.type?f(e):_(e)})},y=function(e,a,n){s.forEach(function(e){return e.parentNode.querySelector("h4").classList.remove("active")}),e.classList.add("active");var r=t[n].module.datasets;r.race=p[a],"census"in r&&(r.census.column=a+r.suffix),"muni"in r&&(r.muni.column=a+r.suffix),"schoolDistricts"in r&&(r.schoolDistricts.column=a+r.suffix),g(n)},v=function(e){y(s[0].parentNode.querySelector("h4"),s[0].dataset.candlestick,e)};e(".indicators.tabs",function(e){return v(e.dataset.vizId)}),s.forEach(function(e){var a=e.dataset.candlestick;e.parentNode.querySelector("h4").addEventListener("click",function(e){return y(e.target,a,h)})});var w={"in":function(e,a){d3v4.select(this).raise(),l.classList.remove("default"),c.innerText=e.properties[a],r.forEach(function(n){n.addTick(e.properties,e.properties[a],e.properties[a])})},out:function(e,a){l.classList.add("default"),r.forEach(function(n){n.removeTick(e.properties[a])})}}}),Nasa.launch("outcome-page",function(){var e=Nasa.land("accordion"),a=Array.from(document.querySelectorAll("*[data-accordion]"));a.forEach(function(a){return e(null,a)})}),Nasa.launch("report-page",function(){var e=function(e){return 50*Math.ceil(e/50)},a=document.querySelector(".report-viewer"),n=Array.from(document.querySelectorAll("*[data-anchor]")).filter(function(e){return e.dataset.anchor.length>1}),t=n.reduce(function(e,a){return e[a.dataset.anchor]=a,e},{}),r=n.map(function(e){return a.querySelector(e.dataset.anchor)}),o=r.reduce(function(a,n){return n&&(a[e(n.offsetTop)]=n),a},{}),i=function(){var r=e(a.scrollTop);if(r in o){var i=o[r].id;n.forEach(function(e){return e.classList.remove("active")}),t["#"+i].classList.add("active")}};n.forEach(function(e){e.addEventListener("click",i)}),a.addEventListener("scroll",i),document.onload=i});var _createClass=function(){function e(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(a,n,t){return n&&e(a.prototype,n),t&&e(a,t),a}}();Nasa.launch("candlestick",function(){var e=Nasa.land("matrix-bounds"),a=Nasa.land("mapc-region"),n=Nasa.land("normalize"),t=Nasa.land("string-format"),r=function(){function r(e){_classCallCheck(this,r),this.canvas=d3v4.select('*[data-candlestick="'+e+'"]').append("div").attr("class","content"),this.bounding={min:this.canvas.append("span").attr("class","bound min-bound"),max:this.canvas.append("span").attr("class","bound max-bound")},this.identifier=e,this.column=e,this.format=t.number}return _createClass(r,[{key:"setFormat",value:function(e){this.format=t[e]}},{key:"setColumnSuffix",value:function(e){this.suffix=e,this.column=this.identifier+e}},{key:"setRange",value:function(e,a){this.range={min:e,max:a}}},{key:"leftOffset",value:function(e){var a=this.range.min,n=this.range.max;return this.range.min<0&&(e-=this.range.min,a=0,n=this.range.max-this.range.min),100*Math.abs((e-a)/(a-n))}},{key:"addTick",value:function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default",r=e[this.column];if(r&&this.canvas.select('*[data-id="'+n(t)+'"]').empty()){var o=this.leftOffset(r),i=this.canvas.append("div").attr("class","tick").style("left",o+"%");i.attr("data-id",n(t)),"default"!==t&&i.attr("class","tick identified");var s=i.append("div").attr("class","tick-info");s.append("p").attr("class","tick-title").html(a),s.append("p").attr("class","tick-value").html(this.format(r))}}},{key:"removeTick",value:function(e){this.canvas.selectAll('*[data-id="'+n(e)+'"]').remove()}},{key:"renderData",value:function(n){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=n.data[0].muni_id?n.data.filter(function(e){return a.indexOf(e.muni_id)!==-1}):n.data;this.canvas.selectAll("div").remove(),o.forEach(function(e){var a=t.canvas.append("div");a.attr("class","line"),a.style("left",t.leftOffset(e[t.column])+"%")});var i=e(o,[this.column],r);this.bounding.min.html(this.format(i.min)).style("left",this.leftOffset(i.min)-3+"%"),this.bounding.max.html(this.format(i.max)).style("left",this.leftOffset(i.max)+3+"%")}}]),r}();return r});var _createClass=function(){function e(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(a,n,t){return n&&e(a.prototype,n),t&&e(a,t),a}}();Nasa.launch("mass-map",function(){function e(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{file:e,data:null,fill:a.fill||null,features:null,stroke:a.stroke||null,strokeWidth:a.strokeWidth||1}}var a=Nasa.land("nest"),n=Nasa.land("string-format"),t=Nasa.land("mapc-region"),r=Nasa.land("matrix-bounds"),o=function(){function o(a){var t=this;_classCallCheck(this,o),this.identifier=a,this.geoJsonPath="/assets/geojson",this.colors={minimum:"#13314D",maximum:"#57E098",neutral:"#1b4873",dark:"#081b2d"},this.layers={census:e("ma-census-tracts.json",{strokeWidth:.5}),muni:e("ma-munis.json",{fill:"rgba(0,0,0,0)"}),schoolDistricts:e("ma-school-districts.json"),outline:e("mapc-outline.json",{stroke:"rgba(255,255,255,1)",fill:"none",strokeWidth:2})};var r=600,i=570;this.canvas=d3v4.select(a).append("svg").attr("width",r).attr("height",i),Object.keys(this.layers).forEach(function(e){t.canvas.append("g").attr("data-layer-name",e)});var s=d3v4.geoAlbers().scale(4e4).rotate([71.09,0]).center([0,42.34]).translate([r/2,i/2]);this.geoPath=d3v4.geoPath().projection(s),this.format=n.number}return _createClass(o,[{key:"loadLayer",value:function(e,a){var n=this.layers[e];n.features?a(n):d3v4.json(this.geoJsonPath+"/"+n.file,function(e){n.features=e.features,a(n)})}},{key:"setFormat",value:function(e){this.format=n[e]}},{key:"setColorRamp",value:function(e,a){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];"muni_id"in e[0]&&(e=e.filter(function(e){return t.indexOf(e.muni_id)!==-1}));var o=r(e,a,n),i=o.min,s=o.max;this.minimum=i,this.maximum=s,d3v4.select(".range-min").html(this.format(i)),d3v4.select(".range-max").html(this.format(s)),this.colorRamp=d3v4.scaleLinear().domain([this.minimum,this.maximum]).range([this.colors.minimum,this.colors.maximum])}},{key:"unloadData",value:function(e){d3.select('g[data-layer-name="'+e+'"]').selectAll("*").remove()}},{key:"renderLayer",value:function(e){var a=this;this.loadLayer(e,function(n){d3v4.select('g[data-layer-name="'+e+'"]').selectAll("path").data(n.features).enter().append("path").attr("d",a.geoPath).attr("fill",n.fill||a.colors.neutral).attr("stroke",n.stroke||a.colors.minimum).attr("stroke-width",n.strokeWidth)})}},{key:"renderData",value:function(e,n){var r=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.loadLayer(e,function(i){var s=a(n.data,n.key),c=i.features.map(function(e){var a=Object.assign({},e);return a.properties=s[e.properties[n.index||n.key]],a}).filter(function(e){return e.properties}),l=d3v4.select('g[data-layer-name="'+e+'"]').selectAll("path").data(c).enter().append("path").attr("opacity",function(e){return t.indexOf(n.getMuniId(e))!==-1?1:.25}).attr("fill",function(e){return void 0!==e.properties?e.properties[n.column]?i.fill||r.colorRamp(e.properties[n.column]):r.colors.dark:r.colors.neutral}).attr("stroke",function(e){return e.properties[n.column]&&0!=e.properties[n.column]?i.stroke||r.colors.minimum:r.colors.neutral}).attr("stroke-width",function(e){return e.properties[n.column]&&0!=e.properties[n.column]?i.strokeWidth:.5}).attr("d",r.geoPath);o&&(o["in"]&&l.on("mouseover",function(e){o["in"].call(this,e,n.nameKey)}).on("mousemove",function(e){o["in"].call(this,e,n.nameKey)}),o.out&&l.on("mouseout",function(e){o.out.call(this,e,n.nameKey)}))})}}]),o}();return o}),Nasa.launch("health-births-lbw-race-educ",function(){var e=Nasa.land("string-format"),a="https://mapc-admin.carto.com/api/v2/sql?q=select%20*%20FROM%20health_births_lbw_race_educ_m%20WHERE%20muni_id=%27352%27%20AND%20cal_years%20IN%20(%272005-09%27,%272010-14%27)",n={query:null,chart:null,title:"Low birth weight",source:"MA DPH",sourceYear:"2005-09 & 2010-14"},t=function(t){n.query?t(n):d3.json(a,function(a){n.query=[{series:"White","2005-09 Less than High School":a.rows[0].whilhs_p,"2010-14 Less than High School":a.rows[1].whilhs_p,"2005-09 High School Graduate":a.rows[0].whihs_p,"2010-14 High School Graduate":a.rows[1].whihs_p,"2005-09 Some College":a.rows[0].whisc_p,"2010-14 Some College":a.rows[1].whisc_p,"2005-09 College Graduate":a.rows[0].whibapl_p,"2010-14 College Graduate":a.rows[1].whibapl_p},{series:"Black/African American","2005-09 Less than High School":a.rows[0].aalhs_p,"2010-14 Less than High School":a.rows[1].aalhs_p,"2005-09 High School Graduate":a.rows[0].aahs_p,"2010-14 High School Graduate":a.rows[1].aahs_p,"2005-09 Some College":a.rows[0].aasc_p,"2010-14 Some College":a.rows[1].aasc_p,"2005-09 College Graduate":a.rows[0].aabapl_p,"2010-14 College Graduate":a.rows[1].aabapl_p},{series:"Asian","2005-09 Less than High School":a.rows[0].apilhs_p,"2010-14 Less than High School":a.rows[1].apilhs_p,"2005-09 High School Graduate":a.rows[0].apihs_p,"2010-14 High School Graduate":a.rows[1].apihs_p,"2005-09 Some College":a.rows[0].apisc_p,"2010-14 Some College":a.rows[1].apisc_p,"2005-09 College Graduate":a.rows[0].apibapl_p,"2010-14 College Graduate":a.rows[1].apibapl_p},{series:"Latino","2005-09 Less than High School":a.rows[0].latlhs_p,"2010-14 Less than High School":a.rows[1].latlhs_p,"2005-09 High School Graduate":a.rows[0].laths_p,"2010-14 High School Graduate":a.rows[1].laths_p,"2005-09 Some College":a.rows[0].latsc_p,"2010-14 Some College":a.rows[1].latsc_p,"2005-09 College Graduate":a.rows[0].latbapl_p,"2010-14 College Graduate":a.rows[1].latbapl_p}],n.chart={data:{json:n.query,type:"bar",keys:{value:["2005-09 Less than High School","2010-14 Less than High School","2005-09 High School Graduate","2010-14 High School Graduate","2005-09 Some College","2010-14 Some College","2005-09 College Graduate","2010-14 College Graduate"]}},bar:{width:{ratio:.7}},axis:{x:{type:"category",categories:["White (Non Latino)","Black","Asian","Latino","Native American"],height:40},y:{tick:{format:e.percent},padding:{top:100,bottom:100},label:{text:"Low Birthweight by race in %",position:"outer-middle"}}},size:{height:350},color:{pattern:["#57E09B","#4bc989","#18EDED","#57D5E0","#22619b","#283b5d","#F0F2F1","#95989A"]}},t(n)})};return{load:t,datasets:n}}),Nasa.launch("pubsafety-inmate-crimes-race-by-year",function(){var e=Nasa.land("string-format"),a="https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20from%20pubsafety_inmate_crimes_race_by_year_m",n={query:null,chart:null,title:"Percent of inmate population",source:"ACS",sourceYear:"2010 - 2016"},t=function(t){n.query?t(n):d3.json(a,function(a){n.query=[{series:"2010",Total:a.rows[0].tot_p,White:a.rows[0].nhwhi_p,Black:a.rows[0].nhaa_p,Latino:a.rows[0].lat_p,Asian:a.rows[0].nhapi_p,"Native American":a.rows[0].nhna_p},{series:"2011",Total:a.rows[1].tot_p,White:a.rows[1].nhwhi_p,Black:a.rows[1].nhaa_p,Latino:a.rows[1].lat_p,Asian:a.rows[1].nhapi_p,"Native American":a.rows[1].nhna_p},{series:"2012",Total:a.rows[2].tot_p,White:a.rows[2].nhwhi_p,Black:a.rows[2].nhaa_p,Latino:a.rows[2].lat_p,Asian:a.rows[2].nhapi_p,"Native American":a.rows[2].nhna_p},{series:"2013",Total:a.rows[3].tot_p,White:a.rows[3].nhwhi_p,Black:a.rows[3].nhaa_p,Latino:a.rows[3].lat_p,Asian:a.rows[3].nhapi_p,"Native American":a.rows[3].nhna_p},{series:"2014",Total:a.rows[4].tot_p,White:a.rows[4].nhwhi_p,Black:a.rows[4].nhaa_p,Latino:a.rows[4].lat_p,Asian:a.rows[4].nhapi_p,"Native American":a.rows[4].nhna_p},{series:"2014",Total:a.rows[5].tot_p,White:a.rows[5].nhwhi_p,Black:a.rows[5].nhaa_p,Latino:a.rows[5].lat_p,Asian:a.rows[5].nhapi_p,"Native American":a.rows[5].nhna_p},{series:"2016",Total:a.rows[6].tot_p,White:a.rows[6].nhwhi_p,Black:a.rows[6].nhaa_p,Latino:a.rows[6].lat_p,Asian:a.rows[6].nhapi_p,"Native American":a.rows[6].nhna_p}],n.chart={data:{json:n.query,keys:{value:["Total","White","Black","Latino","Asian","Native American"]},type:"line"},axis:{x:{type:"category",categories:["2010","2011","2012","2013","2014","2015","2016"],padding:{left:-.48,right:0},height:40,tick:{fit:!0,multiline:!0,rotate:0}},y:{tick:{format:e.percent},padding:{top:100,bottom:100},label:{text:"Percent of Total Population",position:"outer-middle"},max:1.2,min:.31}},size:{height:350},color:{pattern:["#57E09B","#18EDED","#22619b","#95989A","#F0F2F1","#FDEB10"]}},t(n)})};return{load:t,datasets:n}}),Nasa.launch("soe-hous-hmda-race",function(){var e=Nasa.land("string-format"),a="https://mapc-admin.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20storage.soe_hous_hmda_race_mapc",n={query:null,chart:null,title:"Home mortgage denial rate",source:"",sourceYear:"2009 & 2015"},t=function(t){n.query?t(n):d3.json(a,function(a){n.query=[{series:"White",2009:a.rows[0].hmda09,2015:a.rows[0].hmda15},{series:"Black",2009:a.rows[1].hmda09,2015:a.rows[1].hmda15},{series:"Latino",2009:a.rows[2].hmda09,2015:a.rows[2].hmda15},{series:"Asian",2009:a.rows[3].hmda09,2015:a.rows[3].hmda15},{series:"Native American",2009:a.rows[4].hmda09,2015:a.rows[4].hmda15}],n.chart={data:{json:n.query,keys:{value:["2009","2015"]},type:"bar"},bar:{width:{ratio:.9}},axis:{x:{type:"category",categories:["White","Black","Latino","Asian","Native American"],height:40,tick:{fit:!0,multiline:!0,rotate:0}},y:{tick:{format:e.percent},padding:{top:100,bottom:100},label:{text:"Mortgage loan application denial rate, high-income",position:"outer-middle"}}},size:{height:350},color:{pattern:["#95989A","#22598e"]}},t(n)})};return{load:t,datasets:n}}),Nasa.launch("b17020-poverty-by-race-age-acs",function(){var e=Nasa.land("column-string"),a=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",r={suffix:"65o_p",format:"percent",ramp:"census",title:"Population over 65 years old in poverty",source:"ACS",sourceYear:t,bounded:"muni",nonZero:!0,race:"Asian",tempMuni:{key:"muni_id",columns:["pov_65o_p"]},tempCensus:{key:"ct10_id",columns:["pov_65o_p"]},muni:{key:"muni_id",index:"town_id",nameKey:"municipal",columns:["nhw65o_p","aa65o_p","as65o_p","lat65o_p"],column:"all65o_p",data:null},census:{key:"ct10_id",columns:["nhw65o_p","aa65o_p","as65o_p","lat65o_p"],column:"all65o_p",data:null},crosswalk:{data:null}},o={muni:encodeURI(n+e(r.muni,["municipal"])+(" FROM b17020_poverty_by_race_age_acs_m WHERE acs_year = '"+t+"'")),tempMuni:encodeURI(n+e(r.tempMuni)+(" FROM b17001_poverty_by_age_gender_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+e(r.census)+(" FROM b17020_poverty_by_race_age_acs_ct WHERE acs_year = '"+t+"'")),tempCensus:encodeURI(n+e(r.tempCensus)+(" FROM b17001_poverty_by_age_gender_acs_ct WHERE acs_year = '"+t+"'")),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},i=function(e){r.muni.data&&r.census.data?e(r):d3v4.queue().defer(d3v4.json,o.muni).defer(d3v4.json,o.tempMuni).defer(d3v4.json,o.census).defer(d3v4.json,o.tempCensus).defer(d3v4.json,o.crosswalk).await(function(n,t,o,i,s,c){o=a(o.rows,"muni_id"),s=a(s.rows,"ct10_id"),r.muni.data=t.rows.map(function(e){return Object.assign({all65o_p:o[e.muni_id].pov_65o_p},e)}),r.census.data=i.rows.map(function(e){return Object.assign({all65o_p:s[e.ct10_id].pov_65o_p},e)}),r.muni.columns.push("all65o_p"),r.census.columns.push("all65o_p"),r.crosswalk.data=a(c.rows,"ct10_id"),r.census.getMuniId=function(e){return r.crosswalk.data[e.properties.ct10_id].muni_id},r.muni.getMuniId=function(e){return e.properties.muni_id},e(r)})};return{load:i,sources:o,datasets:r}}),Nasa.launch("c23002-employment-by-race-age-acs",function(){var e=Nasa.land("column-string"),a=Nasa.land("nest"),n="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",t="2011-15",r={suffix:"ue_p",format:"percent",title:"Percent unemployment",source:"ACS",sourceYear:t,ramp:"census",bounded:"muni",nonZero:!0,race:"Asian",tempMuni:{key:"muni_id",columns:["unemp_p"]},tempCensus:{key:"ct10_id",columns:["unemp_p"]},tempRegion:{key:"msa_id",columns:["unemp_p"]},muni:{key:"muni_id",index:"town_id",nameKey:"municipal",columns:["nhwue_p","aaue_p","asue_p","latue_p"],column:"asue_p",data:null},census:{key:"ct10_id",columns:["nhwue_p","aaue_p","asue_p","latue_p"],column:"asue_p",data:null},crosswalk:{data:null},region:{key:"msa_id",columns:["nhwue_p","aaue_p","asue_p","latue_p"],data:null}},o={muni:encodeURI(n+e(r.muni,["municipal"])+(" FROM c23002_employment_by_race_age_acs_m WHERE acs_year = '"+t+"'")),census:encodeURI(n+e(r.census)+(" FROM c23002_employment_by_race_age_acs_ct WHERE acs_year = '"+t+"'")),region:encodeURI(n+e(r.region)+" FROM c23002_employment_by_race_age_acs_msa WHERE msa_id = '14460'"),tempMuni:encodeURI(n+e(r.tempMuni)+(" FROM b23025_employment_acs_m WHERE acs_year = '"+t+"'")),tempCensus:encodeURI(n+e(r.tempCensus)+(" FROM b23025_employment_acs_ct WHERE acs_year = '"+t+"'")),crosswalk:encodeURI(n+"ct10_id, muni_id FROM table_datakeys_ct10")},i=function(e){r.muni.data&&r.census.data&&r.region.data?e(r):d3v4.queue().defer(d3v4.json,o.muni).defer(d3v4.json,o.census).defer(d3v4.json,o.region).defer(d3v4.json,o.tempMuni).defer(d3v4.json,o.tempCensus).defer(d3v4.json,o.crosswalk).await(function(n,t,o,i,s,c,l){s=a(s.rows,"muni_id"),c=a(c.rows,"ct10_id"),r.muni.data=t.rows.map(function(e){return Object.assign({allue_p:s[e.muni_id].unemp_p},e)}),r.census.data=o.rows.map(function(e){return Object.assign({allue_p:c[e.ct10_id].unemp_p},e)}),r.region.data=i.rows[0],r.muni.columns.push("allue_p"),r.census.columns.push("allue_p"),r.crosswalk.data=a(l.rows,"ct10_id"),r.census.getMuniId=function(e){return r.crosswalk.data[e.properties.ct10_id].muni_id},r.muni.getMuniId=function(e){return e.properties.muni_id},e(r)})};return{load:i,sources:o,datasets:r}}),Nasa.launch("demo-pop-race-00-10",function(){var e=Nasa.land("column-string"),a=Nasa.land("column-map"),n=Nasa.land("curry"),t=(Nasa.land("nest"),"https://mapc-admin.carto.com/api/v2/sql?q=SELECT "),r=n(a,{nhwh_pdif:"nhw_pdif",nhaa_pdif:"aa_pdif",nhas_pdif:"as_pdif"}),o={suffix:"_pdif",format:"percent",ramp:"muni",title:"Percent difference in population from 2000 to 2010",source:"Census 2000 & Census 2010",sourceYear:"2000 & 2010",bounded:"muni",nonZero:!1,race:"Asian",temp:{key:"muni_id",columns:["nhwhi_00p","nhwhi_10p","nhwh_pdif","nhaa_pdif","lat_pdif","nhas_pdif"]},muni:{key:"muni_id",nameKey:"municipal",index:"town_id",columns:["all_pdif","nhw_pdif","aa_pdif","as_pdif","lat_pdif"],column:"as_pdif",data:null},region:{columns:["all_pdif","nhw_pdif","aa_pdif","as_pdif","lat_pdif"],data:null}},i={muni:encodeURI(t+e(o.temp,["municipal"])+" FROM demo_pop_race_00_10m")},s=function(e){o.muni.data?e(o):d3v4.queue().defer(d3v4.json,i.muni).await(function(a,n){n.rows=n.rows.map(function(e){return e.all_pdif=100-e.nhwhi_10p-(100-e.nhwhi_00p),delete e.nhwhi_00p,delete e.nhwhi_10p,e}),n.rows=n.rows.filter(function(e){return e.muni_id<=352}).map(r),o.muni.data=n.rows.filter(function(e){return e.muni_id<=351}),o.region.data=n.rows.filter(function(e){return 352==e.muni_id})[0],o.muni.getMuniId=function(e){return e.properties.muni_id;
},e(o)})};return{load:s,sources:i,datasets:o}}),Nasa.launch("educ-mcas-gr10-math-by-year",function(){var e=Nasa.land("column-string"),a=Nasa.land("mapc-region"),n=Nasa.land("column-map"),t=Nasa.land("curry"),r=(Nasa.land("nest"),"https://mapc-admin.carto.com/api/v2/sql?q=SELECT "),o="2014-15",i=t(n,{whi_pa_p:"nhw_pa_p"}),s={suffix:"_pa_p",format:"percent",ramp:"schoolDistricts",bounded:"schoolDistricts",title:"Percent of proficient students",source:"MA DESE",sourceYear:o,nonZero:!0,race:"All",temp:{key:"districtid",columns:["all_pa_p","whi_pa_p","aa_pa_p","as_pa_p","lat_pa_p"]},schoolDistricts:{key:"districtid",nameKey:"district",columns:["all_pa_p","nhw_pa_p","aa_pa_p","as_pa_p","lat_pa_p"],column:"all_pa_p",data:null}},c={schoolDistricts:encodeURI(r+e(s.temp,["district"])+(" FROM educ_mcas_gr10_math_by_year_districts WHERE schoolyear = '"+o+"'"))},l=function(e){s.schoolDistricts.data?e(s):d3v4.queue().defer(d3v4.json,c.schoolDistricts).await(function(n,t){s.schoolDistricts.data=t.rows.map(i),s.schoolDistricts.getMuniId=function(e){return a[0]},e(s)})};return{load:l,sources:c,datasets:s}}),Nasa.launch("soe-neigh-income-seg",function(){var e=Nasa.land("column-string"),a=Nasa.land("column-map"),n=Nasa.land("curry"),t=Nasa.land("nest"),r="https://mapc-admin.carto.com/api/v2/sql?q=SELECT ",o="2011-15",i=n(a,{mhi:"all_mhi"}),s={suffix:"_mhi",format:"dollar",ramp:"census",title:"Median household income",source:"ACS",sourceYear:o,bounded:"muni",nonZero:!0,race:"All",tempMuni:{key:"muni_id",columns:["mhi","nhw_mhi","aa_mhi","as_mhi","lat_mhi"]},tempCensus:{key:"ct10_id",columns:["mhi","nhw_mhi","aa_mhi","as_mhi","lat_mhi"]},tempRegion:{key:"msa_id",columns:["mhi","nhw_mhi","aa_mhi","as_mhi","lat_mhi"]},muni:{key:"muni_id",index:"town_id",nameKey:"municipal",columns:["all_mhi","nhw_mhi","aa_mhi","as_mhi","lat_mhi"],column:"all_mhi",data:null},census:{key:"ct10_id",columns:["all_mhi","nhw_mhi","aa_mhi","as_mhi","lat_mhi"],column:"all_mhi",data:null},crosswalk:{data:null},region:{key:"msa_id",columns:["all_mhi","nhw_mhi","aa_mhi","as_mhi","lat_mhi"],data:null}},c={muni:encodeURI(r+e(s.tempMuni,["municipal"])+(" FROM b19013_mhi_race_acs_m WHERE acs_year = '"+o+"'")),census:encodeURI(r+e(s.tempCensus)+(" FROM b19013_mhi_race_acs_ct WHERE acs_year = '"+o+"'")),region:encodeURI(r+e(s.tempRegion)+(" FROM b19013_mhi_race_acs_msa WHERE acs_year = '"+o+"' AND msa_id = '14460'")),crosswalk:encodeURI(r+"ct10_id, muni_id FROM table_datakeys_ct10")},l=function(e){s.muni.data&&s.census.data?e(s):d3v4.queue().defer(d3v4.json,c.muni).defer(d3v4.json,c.census).defer(d3v4.json,c.region).defer(d3v4.json,c.crosswalk).await(function(a,n,r,o,c){s.muni.data=n.rows.map(i),s.census.data=r.rows.map(i),s.region.data=i(o.rows[0]),s.crosswalk.data=t(c.rows,"ct10_id"),s.census.getMuniId=function(e){return s.crosswalk.data[e.properties.ct10_id].muni_id},s.muni.getMuniId=function(e){return e.properties.muni_id},e(s)})};return{load:l,sources:c,datasets:s}}),Nasa.houston({"*":["nav","truncate-text"],"/":["home-page"],"goals/*/":["outcome-page"],"indicators/":["indicators-page"],"report/":["report-page"]});