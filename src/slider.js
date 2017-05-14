let _ = require("lodash");
import pageHtml from './renderHtml';
import {p} from './app';

class Slider  {
    constructor() {
        this.reset();
        this.detectClass = this.detectClass.bind(this);
        this.sendRequest = this.sendRequest.bind(this);

        this.currentLeftSlide = null;
        window.onresize = function () {
            this.calculateCountOfVideo();
        }.bind(this);
    }

    get currentPage() {
        return this.privateCurrentPage;
    }

    set currentPage(newValue) {
        this.privateCurrentPage = newValue;
        pageHtml.renderPagination(this.currentPage, this.totalVideos, this.countOfVideos);
    }

    get totalVideos() {
        return this.privateTotalVideos;
    }

    set totalVideos(newValue) {
        this.privateTotalVideos = newValue;
        pageHtml.renderPagination(this.currentPage, this.totalVideos, this.countOfVideos);
    }

    get countOfVideos() {
        return this.privateCountOfVideos;
    }

    set countOfVideos(newValue) {
        this.privateCountOfVideos = newValue;
        pageHtml.renderPagination(this.currentPage, this.totalVideos, this.countOfVideos);
    }

    appendVideos(videos) {
        this.videosArray = this.videosArray.concat(videos);
        pageHtml.renderSliderContent(videos, this.countOfVideos, (this.currentPage-1)*this.countOfVideos, this.slideWidth);
    }

    slideToRigth () {
        if (this.currentPage+1 > Math.ceil(this.totalVideos/this.countOfVideos)) return;

        this.slideToPage(this.currentPage+1);
    }
    slideToLeft() {
        if (this.currentPage-1 < 1) return;

        this.slideToPage(this.currentPage-1);
    }
    slideToPage(pageNumber) {
        this.currentLeftSlide = document.querySelector('#slide-id-'+( (pageNumber-1)*this.countOfVideos + 1));
        document.getElementById('content-slider').style.marginLeft = -  (pageNumber-1)*this.slideWidth*this.countOfVideos + "px" ;
        this.currentPage = pageNumber;

        if (this.currentPage * this.countOfVideos >= this.videosArray.length - 5) {
            this.sendRequest();
        }
    }

    detectClass() {
        let  e = document.getElementById('content-slider');
        let observer = new MutationObserver(function (event) {
            if (e.style.marginLeft == -(this.arrOfVideos.length/this.countOfVideos - 1) * (this.slideWidth * this.countOfVideos) + 'px') {
                //this.sendRequest();
            }
        }.bind(this));
        observer.observe(e, {
            attributes: true,
            attributeFilter: ['style'],
            childList: false,
            characterData: false
        })
    }
    reset() {
        this.searchText = null;
        this.privateCurrentPage = 1;
        this.privateTotalVideos = 0;
        this.privateCountOfVideos = 0;
        this.nextPage = '';
        this.arrOfVideos = [];
        this.videosArray = [];

    }
    newSearchRequest(searchText) {
        this.reset();
        this.searchText = searchText;
        pageHtml.renderHtmlSlider();
        this.calculateCountOfVideo();
    }
    sendRequest() {
        let promise = fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&videoEmbeddable=true&safeSearch=strict&key=AIzaSyA0TiCvVNO_CMEc1T1S1XLqto1iRQtb2t0&q='+this.searchText + '&pageToken=' + this.nextPage )
                .then(function(response) {
                    return response.json();
                })
                .then( function(value) {
                    this.totalVideos = value.pageInfo.totalResults;
                    this.nextPage = value.nextPageToken;

                    var ids = Array(value.items.length).fill().map(function(e, i) {
                        return value.items[i].id.videoId;
                    }).join();

                    fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=' + ids + '&key=AIzaSyA0TiCvVNO_CMEc1T1S1XLqto1iRQtb2t0&q=')
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (value) {

                            this.appendVideos(value.items);

                        }.bind(this))
                }.bind(this));
    }
    calculateCountOfVideo() {

        var currentLeftElement = (this.currentPage-1)*this.countOfVideos + 1;
        if (document.documentElement.clientWidth > 1680) {
            this.countOfVideos = 5;
            this.slideWidth = 336;
        }
        else if (document.documentElement.clientWidth > 1200 && document.documentElement.clientWidth < 1680) {
            this.countOfVideos = 3;
            this.slideWidth = 600;
        }
        //else if (document.documentElement.clientWidth >  800 && document.documentElement.clientWidth < 1200) {
        //    this.countOfVideos = 3;
         //   this.slideWidth = 266;
        //}
        else {
            this.countOfVideos = 1;
            this.slideWidth = 800;
        }

        // при ресайзе меняем ширину всех отрисованных элементов
        this.arrOfVideos = document.querySelectorAll('.slide');
        Array.from(this.arrOfVideos).forEach(function (video) {
            video.style.width = String(this.slideWidth) + 'px';
            video.style.minWidth = String(this.slideWidth) + 'px';
        }.bind(this));

        var sliderHtml = document.getElementById('slider');
        sliderHtml.style.width = String(this.slideWidth*this.countOfVideos) + 'px';
        sliderHtml.style.minWidth = String(this.slideWidth*this.countOfVideos) + 'px';

        this.currentPage = Math.ceil(currentLeftElement/this.countOfVideos);
        this.slideToPage(this.currentPage);
    }
}


export default Slider;
