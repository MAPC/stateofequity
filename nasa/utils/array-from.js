Nasa.launch('array-from', () => {

  return function(from) {
    return [].slice.call(from);
  };

});
