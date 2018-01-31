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
      this.canvas = d3v4.select(`*[data-candlestick="${identifier}"]`)
                      .append('div')
                      .attr('class', 'content');

      this.bounding = {
        min: this.canvas.append('span')
                        .attr('class', 'bound min-bound'),

        max: this.canvas.append('span')
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
      let min = this.range.min;
      let max = this.range.max;

      if (this.range.min < 0) {
        value -= this.range.min;
        min = 0;
        max = this.range.max - this.range.min;
      }

      return 100 * Math.abs((value - min) / (min - max));
    }


    addTick(data, title, id = 'default') {
      const value = data[this.column];

      if (value && this.canvas.select(`*[data-id="${normalize(id)}"]`).empty()) {
        const left = this.leftOffset(value);

        const tick = this.canvas
                         .append('div')
                         .attr('class', 'tick')
                         .style('left', `${left}%`);

        tick.attr('data-id', normalize(id))

        if (id !== 'default') {
          tick.attr('class', 'tick identified');
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
      this.canvas.selectAll(`*[data-id="${normalize(id)}"]`).remove();
    }


    renderData(bounded, nonZero = false) {
      const data = (bounded.data[0].muni_id) ? bounded.data.filter(row => mapcRegion.indexOf(row.muni_id) !== -1) : bounded.data;

      data.forEach(row => {
        const line = this.canvas.append('div');

        line.attr('class', 'line');
        line.style('left', this.leftOffset(row[this.column]) + '%');
      });

      const bounds = matrixBounds(data, [this.column], nonZero);

      this.bounding
          .min
          .html(this.format(bounds.min))
          .style('left', (this.leftOffset(bounds.min) - 3)+ '%');

      this.bounding
          .max
          .html(this.format(bounds.max))
          .style('left', (this.leftOffset(bounds.max) + 3)+ '%');

      /*
      const width = 100 * Math.abs((bounds.min - bounds.max) / (this.range.min - this.range.max));
      const left = this.leftOffset(bounds.min);

      this.stick
          .style('width', `${width}%`)
          .style('left', `${left}%`);
      */
    }
  
  };


  return Candlestick;

});
