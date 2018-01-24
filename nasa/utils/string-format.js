Nasa.launch('string-format', () => {

  function number(val) {
    return val.toLocaleString('en-US');
  }

  function dollar(val) {
    return '$' + number(val);
  }

  function percent(val) {
    return number(val) + '%';
  }


  return { dollar, number, percent };

});
