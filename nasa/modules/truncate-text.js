Nasa.launch('truncate-text', () => {

  /**
   * Setup
   */

  const wordLimit = 90;
  const url = '/report#';

  const blocks = Array.from(document.querySelectorAll('*[data-truncate]'));


  /**
   * State
   */

  blocks.forEach(block => {
    const paragraphs = Array.from(block.querySelectorAll('p'));
    let wordCount = 0;

    paragraphs.forEach(paragraph => {
      if (wordCount >= wordLimit) {
        paragraph.parentNode.removeChild(paragraph);
      }
      else {
        const words = paragraph.innerText.split(' ');

        if ((wordCount + words.length) >= wordLimit) {
          paragraph.innerText = words.slice(0, (wordLimit - wordCount)).join(' ') + ' ...';

          const reportAnchor = document.createElement('a');
          reportAnchor.classList.add('truncated-anchor');
          reportAnchor.href = url + block.dataset.truncate;
          reportAnchor.innerText = 'Read More';

          paragraph.appendChild(reportAnchor);
        }

        wordCount += words.length;
      }
    });
  });

});
