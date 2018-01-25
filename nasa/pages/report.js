Nasa.launch('report-page', () => {

  const round5 = x => Math.ceil(x / 5) * 5;

  const viewer = document.querySelector('.report-viewer');

  const anchors = Array.from(document.querySelectorAll('*[data-anchor]'));
  const anchorMap = anchors.reduce((map, anchor) => {
    map[anchor.dataset.anchor] = anchor;
    return map; 
  }, {});

  const sections = anchors.map(anchor => viewer.querySelector(anchor.dataset.anchor)).filter(section => section !== null);
  const sectionPositions = sections.reduce((positions, section) => {
    positions[round5(section.offsetTop)] = section;

    return positions;
  }, {});

  viewer.addEventListener('scroll', e => {
    const position = round5(e.target.scrollTop) - viewer.offsetHeight;

    if (position in sectionPositions) {
      const sectionId = sectionPositions[position].id;
      console.log(sectionId);
    }
  });

});
