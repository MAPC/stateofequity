Nasa.config({
  root: 'stateofequity',
});

Nasa.houston({
  '*': ['nav'],
  '/': ['home-page'],
  'outcome/': ['outcome-page'],
});
