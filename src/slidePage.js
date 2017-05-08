var _ = require("lodash");
import pageHtml from './renderHtml';

let slider = {
    number :0,
    nextPage: '',
    slideToRigth : function() {
        let currentElm = document.getElementsByClassName('swipe__page_center')[0];
        currentElm.classList.remove('swipe__page_center');
        currentElm.classList.add('swipe__page_left');
        let rigthElm = document.getElementsByClassName('swipe__page_right')[0];
        rigthElm.classList.remove('swipe__page_right');
        rigthElm.classList.add('swipe__page_center');
    },
    slideToLeft : function() {
        let currentElm = document.getElementsByClassName('swipe__page_center')[0];
        currentElm.classList.remove('swipe__page_center');
        currentElm.classList.add('swipe__page_right');
        let leftElm = document.getElementsByClassName('swipe__page_left')[document.getElementsByClassName('swipe__page_left').length - 1];
        leftElm.classList.remove('swipe__page_left');
        leftElm.classList.add('swipe__page_center');
    },
    detectClass : function() {
        let  e = document.getElementById('content-slider').lastElementChild;
        var observer = new MutationObserver(function (event) {
            if (e.classList.contains  = 'swipe__page_center') {
                slider.sendRequest();
            }
        })
        observer.observe(e, {
            attributes: true,
            attributeFilter: ['class'],
            childList: false,
            characterData: false
        })

    },
    sendRequest: function() {
        let promise = fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&videoEmbeddable=true&safeSearch=strict&order=relevance&key=AIzaSyA0TiCvVNO_CMEc1T1S1XLqto1iRQtb2t0&q='+this.searchText + '&pageToken=' + slider.nextPage)
                .then(function(response) {
                    return response.json();
                })
                .then(function (value) {
                    slider.nextPage = value.nextPageToken;
                    pageHtml.renderSliderContent(value);
                    slider.detectClass();
                })
        ;
    },

}


export default slider;
