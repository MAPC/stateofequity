Nasa.launch('report-page', () => {


  const round = x => Math.ceil(x / 50) * 50;
  const arrayFrom = Nasa.land('array-from');


  /**
   * Setup 
   */

  const viewer = document.querySelector('.report-viewer');

  const anchors = arrayFrom(document.querySelectorAll('*[data-anchor]'))
                           .filter(anchor => anchor.dataset.anchor.length > 1);

  const anchorMap = anchors.reduce((map, anchor) => {
    map[anchor.dataset.anchor] = anchor;
    return map; 
  }, {});

  const sections = anchors.map(anchor => viewer.querySelector(anchor.dataset.anchor));
  const sectionPositions = sections.reduce((positions, section) => {
    if (section) {
      positions[round(section.offsetTop)] = section;
    }

    return positions;
  }, {});


  const setActiveAnchor = () => {
    let position = round(viewer.scrollTop);

    if (position in sectionPositions) {
      const sectionId = sectionPositions[position].id;

      anchors.forEach(anchor => anchor.classList.remove('active'));
      anchorMap[`#${sectionId}`].classList.add('active');
    }
  };


  /**
   * Events
   */

  anchors.forEach(anchor => {
    anchor.addEventListener('click', setActiveAnchor);
  });

  viewer.addEventListener('scroll', setActiveAnchor);

  document.onload = setActiveAnchor;

});
