let _ = require("lodash");
import pageHtml from './renderHtml';
import {p} from './app';

class Slider  {
    constructor() {
        this.number = 0;
        this.nextPage = '';
        this.countOfVideos = 0;
        this.slideWidth = 0;
        this.arrOfVideos = [];
        this.detectClass = this.detectClass.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.calculateCountOfVideo();



    }
    slideToRigth () {
        let currentMarginLeft = +document.getElementById('content-slider').style.marginLeft.replace('px', '')||0;
        document.getElementById('content-slider').style.marginLeft = currentMarginLeft-this.slideWidth*this.countOfVideos + "px" ;
    }
    slideToLeft() {
        let currentMarginLeft = +document.getElementById('content-slider').style.marginLeft.replace('px', '')||0;
        document.getElementById('content-slider').style.marginLeft = currentMarginLeft+this.slideWidth*this.countOfVideos + "px" ;
    }
    slideToPage(idPage) {
        console.log(idPage);
        let currentMarginLeft = +document.getElementById('content-slider').style.marginLeft.replace('px', '')||0;
        document.getElementById('content-slider').style.marginLeft = - (idPage.replace(/\D+/,'')-1) *this.slideWidth*this.countOfVideos + "px" ;

    }
    detectClass() {
        let  e = document.getElementById('content-slider');
        let observer = new MutationObserver(function (event) {
            if (e.style.marginLeft == -(this.arrOfVideos.length/this.countOfVideos - 1) * (this.slideWidth * this.countOfVideos) + 'px') {
                this.sendRequest();
            }
        }.bind(this));
        observer.observe(e, {
            attributes: true,
            attributeFilter: ['style'],
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
                    sliderElm.onresize = function () {
                        console.log(this)
                        this.calculateCountOfVideo();
                    }.bind(this);
                    this.nextPage = value.nextPageToken;
                    pageHtml.renderSliderContent(value, this.countOfVideos);
                    sliderElm.style.width = this.countOfVideos * this.slideWidth;
                    this.arrOfVideos = document.getElementsByClassName('slide');
                    Array.from(this.arrOfVideos).forEach(function (video) {
                        console.log(this.slideWidth)
                        video.style.minWidth = this.slideWidth + 'px';
                    }.bind(this));
                    pageHtml.renderPagination(this.arrOfVideos);
                    this.detectClass();
                }.bind(this))
    }
    calculateCountOfVideo() {
        if  (window.innerWidth > 1200) {
            this.countOfVideos = 5;
            this.slideWidth = 300;
        }
        else if (window.innerWidth >  800 && window.innerWidth < 1200) {
            this.countOfVideos = 3;
            this.slideWidth = 400;
        }
        else {
            this.countOfVideos = 1;
            this.slideWidth = 600;
        }

    }
}


export default Slider;
