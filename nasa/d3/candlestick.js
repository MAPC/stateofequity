Nasa.launch('candlestick', () => {

  class Candlestick {

    constructor(identifier) {
      this.canvas = d3.select(`*[data-candlestick="${identifier}"]`)
                      .append('svg');
    }


    setRange(min, max) {
      this.minimum = min;
      this.maximum = max;
    }


    renderData(data) {
       
    }
  
  };


  return Candlestick;

});
