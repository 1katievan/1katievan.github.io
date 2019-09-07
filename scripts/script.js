var animateHTML = function() {
    var elems;
    var windowHeight;
    function init() {
      elems = document.querySelectorAll('.hidden');
      windowHeight = window.innerHeight;
      addEventHandlers();
      checkPosition();
    }
    function addEventHandlers() {
      window.addEventListener('scroll', checkPosition);
      window.addEventListener('resize', init);
    }
    function checkPosition() {
      for (var i = 0; i < elems.length; i++) {
        var positionFromTop = elems[i].getBoundingClientRect().top;
        if (positionFromTop - windowHeight <= 0) {
          elems[i].className = elems[i].className.replace(
            'hidden',
            'fade-in-element'
          );
        }
      }
    }
    return {
      init: init
    };
  };
  animateHTML().init();


function disableButtonOutline(elem) {
    elem.classList.add('btn-outline-disabled');
}

function enableButtonOutline(elem)
{
    if (elem.classList.contains('btn-outline-disabled'))
        elem.classList.remove('btn-outline-disabled');
}

function disableTag(elem) {
    elem.classList.add('disabled-tag')
}

function enableTag(elem) {
    if (elem.classList.contains('disabled-tag'))
        elem.classList.remove('disabled-tag')
}

function selectFilter(e) {
    var lastChar = e.innerText[e.innerText.length-1];

    if (lastChar == '+') {
        e.innerText = e.innerText.substring(0, e.innerText.length-1) + 'x';
        enableButtonOutline(e);

    } else if (lastChar == 'x') {
        e.innerText = e.innerText.substring(0, e.innerText.length-1) + '+';
        disableButtonOutline(e);
    }

    //now re-filter results
    var tagList = loadTagList();
    filterResults(tagList);
}

function loadTagList() {
    var tagList = ['illustration', 'graphic-design', 'video-editing', 'motion-graphics', 'game-dev', '3d-graphics', 'programming', 'web-dev', 'ui-design'];
    var enabledTags = [];
    var urlHash = '';

    for (var i = 0; i < tagList.length; i++) {
        if (!document.getElementById(tagList[i]).classList.contains('btn-outline-disabled')) {
            enabledTags.push(tagList[i]);
            urlHash += tagList[i] + '-';
        }
    }

    if (urlHash.length > 0) {
        urlHash = urlHash.substring(0, urlHash.length-1);
    }
    window.location.hash = urlHash;

    return enabledTags;
}

function filterResults(tagList) {

    //get all portfolio objects
    var portfolioObjects = document.getElementsByClassName('portfolio-object');

    //hide each elements
    for (var i = 0; i < portfolioObjects.length; i++) {
        portfolioObjects[i].style.display = 'none';
    }

    //if no results, show no result message.
    if (tagList.length == 0) {
        document.getElementById('no-results').style.display = 'inline-block';
    } else {
        document.getElementById('no-results').style.display = 'none';

        //now show all objects that have a relevant tag 
        for (var i = 0; i < portfolioObjects.length; i++) {
            for (var j = 0; j < tagList.length; j++) {
                if (portfolioObjects[i].dataset.tags.includes(tagList[j])) {
                    portfolioObjects[i].style.display = 'inline-block';
                }
            }
        }
    }
}

function loadUrlHash() {
    var urlHash = window.location.hash;

    var tagList = ['illustration', 'graphic-design', 'video-editing', 'motion-graphics', 'game-dev', '3d-graphics', 'programming', 'web-dev', 'ui-design'];
    for (var i = 0; i < tagList.length; i++) {
        if (urlHash.includes(tagList[i])) {
            selectFilter(document.getElementById(tagList[i]));
        }
    }

    filterResults(loadTagList());
}

window.addEventListener('load', function () {
    loadUrlHash();
}, false);
