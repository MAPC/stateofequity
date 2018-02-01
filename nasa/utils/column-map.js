Nasa.launch('column-map', () => {
  return (columnMap, row) => {
    for (let key in columnMap) {
      row[columnMap[key]] = row[key];
      delete row[key];
    }

    return row;
  };
});
