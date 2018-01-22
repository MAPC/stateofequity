Nasa.launch('string-format', () => {

  function number(val) {
    return val.toLocaleString('en-US');
  }

  function money(val) {
    return '$' + number(val);
  }


  return { money, number };

});
