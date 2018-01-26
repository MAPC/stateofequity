Nasa.launch('matrix-bounds', () => {

  return function(data, columns, nonZero = false) {
    const nestedValues = data.map(row => {
      return columns.map(column => parseInt(row[column]));
    });

    let values = nestedValues.reduce((a, b) => a.concat(b))
                             .filter(a => a !== null);

    if (nonZero) {
      values = values.filter(a => a > 0);
    }

    const min = Math.min.apply(null, values);
    const max = Math.max.apply(null, values);

    return { min, max };
  };

});
