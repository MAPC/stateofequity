Nasa.launch('mass-map', () => {

  /**
   * Modules
   */

  const nest = Nasa.land('nest');
  const fmt = Nasa.land('string-format');
  const mapcRegion = Nasa.land('mapc-region');
  const matrixBounds = Nasa.land('matrix-bounds');


  /**
   * Private
   */

  /**
   * Creates a new layer
   * @param {string} file - The file name for the layer's GeoJSON.
   * @return {object} - An object describing the layer.
   */
  function newLayer(file, opt = {}) {
    return {
      file,
      data: null,
      fill: opt.fill || null,
      features: null,
      stroke: opt.stroke || null,
      strokeWidth: opt.strokeWidth || 1,
    };
  }


  /**
   * Class
   */

  class MassMap {
    
    /**
     * Creates a new map of Massachussetts using d3v4.
     * @param {string} identifier - Query string to find the mountNode
     */
    constructor(identifier) {
      this.identifier = identifier;
      this.geoJsonPath = '/assets/geojson';

      this.colors = {
        minimum: '#13314D',
        maximum: '#57E098',
        neutral: '#1b4873',
        dark: '#081b2d',
      };

      this.layers = {
        census: newLayer('ma-census-tracts.json', { strokeWidth: .5 }),
        muni: newLayer('ma-munis.json', { fill: 'rgba(0,0,0,0)' }),
        schoolDistricts: newLayer('ma-school-districts.json'),
        outline: newLayer('mapc-outline.json', { stroke: 'rgba(255,255,255,1)', fill: 'none', strokeWidth: 2 }),
      };

      const width = 600;
      const height = 570;

      this.canvas = d3v4.select(identifier)
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height);

      Object.keys(this.layers).forEach(layerName => {
        this.canvas.append('g').attr('data-layer-name', layerName);
      });

      const _projection = d3v4.geoAlbers()
                          .scale(40000)
                          .rotate([71.09, 0])
                          .center([0, 42.34])
                          .translate([width/2, height/2]);

      this.geoPath = d3v4.geoPath().projection(_projection);

      this.format = fmt.number;
    }


    /**
     * Loads and caches layer files.
     * @param {string} layerName - The name of the layer we are loading.
     * @param {function} next - The callback which passes the layer.
     */
    loadLayer(layerName, next) {
      const layer = this.layers[layerName];

      if (layer.features) {
        next(layer);
      }
      else {
        d3v4.json(`${this.geoJsonPath}/${layer.file}`, file => {
          layer.features = file.features; 

          next(layer);
        });
      }
    }


    setFormat(format) {
      this.format = fmt[format];
    }


    setColorRamp(data, columns, nonZero = false) {
      if ('muni_id' in data[0]) {
        data = data.filter(row => mapcRegion.indexOf(row.muni_id) !== -1);
      }

      console.log(columns);

      const { min, max } = matrixBounds(data, columns, nonZero);

      this.minimum = min;
      this.maximum = max;

      d3v4.select('.range-min').html(this.format(min));
      d3v4.select('.range-max').html(this.format(max));

      this.colorRamp = d3v4.scaleLinear()
                          .domain([this.minimum, this.maximum])
                          .range([this.colors.minimum, this.colors.maximum]);
    }


    /**
     * Removes the layer from showing.
     * @param {string} layerName - The name of the layer to remove.
     */
    unloadData(layerName) {
      d3.select(`g[data-layer-name="${layerName}"]`)
        .selectAll('*')
        .remove();
    }


    renderLayer(layerName) {
      this.loadLayer(layerName, layer => {
        d3v4.select(`g[data-layer-name="${layerName}"]`) 
            .selectAll('path')
            .data(layer.features)
            .enter()
            .append('path')
            .attr('d', this.geoPath)
            .attr('fill', layer.fill || this.colors.neutral)
            .attr('stroke', layer.stroke || this.colors.minimum)
            .attr('stroke-width', layer.strokeWidth);
      });
    }


    /**
     * Mounts the data into the layer specified.
     * @param {string} layerName - The layer to render the data.
     * @param {array} data - The data to render.
     * @param {object} handlers - The in/out mouse event handlers.
     */
    renderData(layerName, dataset, handlers = null) {
      this.loadLayer(layerName, layer => {
        const data = nest(dataset.data, dataset.key);

        const features = layer.features.map(feature => {
          const newFeature = Object.assign({}, feature);
          newFeature.properties = data[feature.properties[dataset.index || dataset.key]];

          return newFeature;
        }).filter(feature => feature.properties);

        const paths = d3v4.select(`g[data-layer-name="${layerName}"]`)
                          .selectAll('path')
                          .data(features)
                          .enter()
                          .append('path')
                          .attr('opacity', d => {
                            return (mapcRegion.indexOf(dataset.getMuniId(d)) !== -1) ? 1 : .25;
                          })
                          .attr('fill', d => {
                            if (d.properties !== undefined) {
                              if (d.properties[dataset.column]) {
                                return layer.fill || this.colorRamp(d.properties[dataset.column]);
                              }
                              else {
                                return this.colors.dark; 
                              }
                            }

                            return this.colors.neutral;
                          })
                          .attr('stroke', d => {
                            if (!d.properties[dataset.column] || d.properties[dataset.column] == 0) {
                              return this.colors.neutral;
                            }

                            return layer.stroke || this.colors.minimum
                          })
                          .attr('stroke-width', d => {
                            if (!d.properties[dataset.column] || d.properties[dataset.column] == 0) {
                              return .5;
                            }
                            
                            return layer.strokeWidth
                          })
                          .attr('d', this.geoPath);

        if (handlers) {
          if (handlers.in) {
            paths.on('mouseover', function(d) { handlers.in.call(this, d, dataset.nameKey) })
                 .on('mousemove', function(d) { handlers.in.call(this, d, dataset.nameKey) });
          }
          if (handlers.out) {
            paths.on('mouseout', function(d) { handlers.out.call(this, d, dataset.nameKey) });
          }
        }
      });
    }

  };


  return MassMap;

});
