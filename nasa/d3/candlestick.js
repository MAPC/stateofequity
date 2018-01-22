Nasa.launch('candlestick', () => {

  /**
   * Modules
   */

  const matrixBounds = Nasa.land('matrix-bounds');
  const mapcRegion = Nasa.land('mapc-region');
  const normalize = Nasa.land('normalize');
  const fmt = Nasa.land('string-format');



  class Candlestick {

    constructor(identifier) {
      this.canvas = d3.select(`*[data-candlestick="${identifier}"]`)
                      .append('div')
                      .attr('class', 'content');

      this.stick = this.canvas
                       .append('div')
                       .attr('class', 'stick');

      this.bounding = {
        min: this.stick.append('span')
                       .attr('class', 'bound min-bound'),

        max: this.stick.append('span')
                       .attr('class', 'bound max-bound'),
      };


      this.identifier = identifier;
      this.column = identifier;
      this.format = fmt.number;
    }


    setFormat(format) {
      this.format = fmt[format];
    }


    setColumnSuffix(suffix) {
      this.suffix = suffix;
      this.column = this.identifier + suffix;
    }


    setRange(min, max) {
      this.range = { min, max };
    }


    leftOffset(value) {
      return 100 * Math.abs(value / (this.range.min - this.range.max));
    }


    addTick(data, title, id) {
      const value = data[this.column];

      if (value > 0) {
        const left = this.leftOffset(value);

        const tick = this.canvas
                         .append('div')
                         .attr('class', 'tick')
                         .style('left', `${left}%`);

        if (id) {
          tick.attr('id', normalize(id))
              .attr('class', 'tick identified');
        }

        const info = tick.append('div')
                         .attr('class', 'tick-info');

        info.append('p')
            .attr('class', 'tick-title')
            .html(title);

        info.append('p')
            .attr('class', 'tick-value')
            .html(this.format(value));
      }
    }


    removeTick(id) {
      d3.selectAll(`#${normalize(id)}`).remove();
    }


    renderData(sets) {
      const data = sets.bounded.data.filter(row => mapcRegion.indexOf(row.muni_id) !== -1);
      const bounds = matrixBounds(data, [this.column], true);

      const width = 100 * Math.abs((bounds.min - bounds.max) / (this.range.min - this.range.max));
      const left = this.leftOffset(bounds.min);

      this.stick
          .style('width', `${width}%`)
          .style('left', `${left}%`);

      this.bounding.min.html(this.format(bounds.min));
      this.bounding.max.html(this.format(bounds.max));

      this.addTick(sets.median.data, 'Regional Median');
    }
  
  };


  return Candlestick;

});
