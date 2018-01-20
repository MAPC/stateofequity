Nasa.launch('column-string', () => {

  return function columnString(dataset, additionalColumns = []) {
    return [
      dataset.key,
      ...dataset.columns,
      ...additionalColumns
    ].join(',');
  }

});
