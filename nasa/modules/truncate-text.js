Nasa.launch('truncate-text', () => {

  /**
   * Setup
   */

  const wordLimit = 90;
  const url = '/report#';

  const blocks = Array.from(document.querySelectorAll('*[data-truncate]'));
  const notes = Array.from(document.querySelectorAll('.footnotes'))
                     .map(list => Array.from(list.querySelectorAll('li')))
                     .reduce((a,b) => a.concat(b), []);


  console.log(notes);

  /**
   * State
   */

  const removeFootnotes = p => {
    const footnotes = Array.from(p.querySelectorAll('a.footnote'));
    let list = null;

    if (footnotes.length > 0) {
      footnotes.forEach(footnote => {
        let ref = null;

        notes.some(note => {
          if (note.id === footnote.href.split('#')[1]) {
            ref = note;
            return true; 
          }
        });
        
        if (ref) {
          list = ref.parentNode;
          list.removeChild(ref);
        }
      });

      if (list) {
        if (list.querySelectorAll('li').length === 0) {
          list.parentNode.removeChild(list);
        }
      }
    }
  };


  blocks.forEach(block => {
    let wordCount = 0;

    const paragraphs = Array.from(block.querySelectorAll('p'))
                            .filter(p => p.parentNode === block); // only grab top-level <p>'s

    paragraphs.forEach(paragraph => {
      if (wordCount >= wordLimit) {
        removeFootnotes(paragraph);

        paragraph.parentNode.removeChild(paragraph);
      }
      else {
        const words = paragraph.innerText.split(' ');

        if ((wordCount + words.length) >= wordLimit) {
          removeFootnotes(paragraph);

          paragraph.innerText = words.slice(0, (wordLimit - wordCount)).join(' ') + ' ...';

          const reportAnchor = document.createElement('a');
          reportAnchor.classList.add('truncated-anchor');
          reportAnchor.href = url + block.dataset.truncate;
          reportAnchor.target = '_blank';
          reportAnchor.innerText = 'Read More';

          paragraph.appendChild(reportAnchor);
        }

        wordCount += words.length;
      }
    });
  });

});
