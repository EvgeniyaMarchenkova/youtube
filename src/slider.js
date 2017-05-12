let _ = require("lodash");
import pageHtml from './renderHtml';
import {p} from './app';

class Slider  {
    constructor() {
        this.number = 0;
        this.nextPage = '';
        this.countOfVideos = 0;
        this.detectClass = this.detectClass.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }
    slideToRigth () {
        let currentElm = document.getElementsByClassName('swipe__page_center')[0];
        currentElm.classList.remove('swipe__page_center');
        currentElm.classList.add('swipe__page_left');
        let rigthElm = document.getElementsByClassName('swipe__page_right')[0];
        rigthElm.classList.remove('swipe__page_right');
        rigthElm.classList.add('swipe__page_center');
    }
    slideToLeft() {
        let currentElm = document.getElementsByClassName('swipe__page_center')[0];
        currentElm.classList.remove('swipe__page_center');
        currentElm.classList.add('swipe__page_right');
        let leftElm = document.getElementsByClassName('swipe__page_left')[document.getElementsByClassName('swipe__page_left').length - 1];
        leftElm.classList.remove('swipe__page_left');
        leftElm.classList.add('swipe__page_center');
    }
    slideToPage(idPage) {
        console.log(idPage);
        let currentPage = document.getElementById(idPage);
        currentPage.classList.remove('swipe__page_right');
        currentPage.classList.remove('swipe__page_left');
        currentPage.classList.add('swipe__page_center');
        let arrLeftPages = (function(elem) {
            let arrLeftSibl = [];
            while (elem = elem.previousSibling) {
                if (elem.nodeType === 1) {
                    arrLeftSibl.push(elem);
                }
            }
            return arrLeftSibl;
        })(currentPage);
        [].forEach.call(arrLeftPages, function (page) {
            page.classList.remove('swipe__page_center');
            page.classList.remove('swipe__page_right');
            page.classList.add('swipe__page_left');
        })
        currentPage = document.getElementById(idPage);
        let arrRightPages = (function(elem) {
            let arrRightSibl = [];
            while (elem = elem.nextSibling) {
                if (elem.nodeType === 1) {
                    arrRightSibl.push(elem);
                }
            }
            return arrRightSibl;
        })(currentPage);
        [].forEach.call(arrRightPages, function (page) {
            page.classList.remove('swipe__page_center');
            page.classList.remove('swipe__page_left');
            page.classList.add('swipe__page_right');
        })
    }
    detectClass() {
        let  e = document.getElementById('content-slider').lastElementChild;
        let observer = new MutationObserver(function (event) {
            if (e.classList.contains('swipe__page_center')) {
                this.sendRequest();
            }
        }.bind(this));
        observer.observe(e, {
            attributes: true,
            attributeFilter: ['class'],
            childList: false,
            characterData: false
        })
    }
    sendRequest() {
        let promise = fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&videoEmbeddable=true&safeSearch=strict&key=AIzaSyA0TiCvVNO_CMEc1T1S1XLqto1iRQtb2t0&q='+p.searchText + '&pageToken=' + this.nextPage )
                .then(function(response) {
                    return response.json();
                })
                //.then(function (val) {
                //    val.items.forEach(function (video) {
                 //       fetch('https://www.googleapis.com/youtube/v3/search?part=statistics&id=' + video.id.videoId + '&key=AIzaSyA0TiCvVNO_CMEc1T1S1XLqto1iRQtb2t0&q=')
                 //           .then(function () {
                 //           })
                 //   })
                //})
                
                .then(function (value) {
                    let sliderElm = document.getElementById('slider');
                    this.calculateCountOfVideo();
                    sliderElm.onresize = function () {
                        console.log(this)
                        this.calculateCountOfVideo();
                    }.bind(this);
                    this.nextPage = value.nextPageToken;
                    pageHtml.renderSliderContent(value, this.countOfVideos);
                    var arrOfPage = document.getElementsByClassName('wrapper-page-slade');
                    pageHtml.renderPagination(arrOfPage);
                    this.detectClass();
                }.bind(this))
    }
    calculateCountOfVideo() {
        if  (window.innerWidth > 1200) {
            this.countOfVideos = 5;
        }
        else if (window.innerWidth >  800 && window.innerWidth < 1200) {
            this.countOfVideos = 3;
        }
        else {
            this.countOfVideos = 1;
        }
    }
}


export default Slider;
