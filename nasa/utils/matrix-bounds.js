Nasa.launch('matrix-bounds', () => {

  return function(data, columns, nonZero = false) {
    const nestedValues = data.map(row => {
      return columns.map(column => parseInt(row[column]));
    });

    const lowerBound = nonZero ? a => a > 0 : a => a >= 0;

    const values = nestedValues.reduce((a, b) => a.concat(b))
                               .filter(a => a !== null && lowerBound(a));

    const min = Math.min.apply(null, values);
    const max = Math.max.apply(null, values);

    return { min, max };
  };

});
