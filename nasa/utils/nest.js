Nasa.launch('nest', () => {

  return function(data, column, deleteColumn) {
    const nested = {};

    if (!deleteColumn) {
      deleteColumn = false; 
    }

    data.forEach(datum => {
      nested[datum[column]] = datum;

      if (deleteColumn) {
        delete nested[datum[column]][column];
      }
    });

    return nested;
  }

});
