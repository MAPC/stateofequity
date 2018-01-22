Nasa.launch('matrix-bounds', () => {

  return function(data, columns) {
    const nestedValues = data.map(row => {
      return columns.map(column => row[column]);
    });

    const values = nestedValues.reduce((a, b) => a.concat(b));

    const min = Math.min.apply(null, values);
    const max = Math.max.apply(null, values);

    return { min, max };
  };

});
