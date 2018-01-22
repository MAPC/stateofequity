Nasa.launch('normalize', () => {

  return function(value) {
    return value.toLowerCase()
                .split(' ')
                .join('-');
  };

});
