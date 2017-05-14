var _ = require("lodash");
import {slider} from  './app';

let pageHtml = {
    renderHtmlSlider : function () {
        let sliderWrapper = document.querySelector('#slider');
        if (sliderWrapper) sliderWrapper.remove();
        sliderWrapper = document.createElement('div');
        sliderWrapper.id = 'slider';
        sliderWrapper.innerHTML = '<div id="content-slider"></div>';
        document.body.appendChild(sliderWrapper);
        let pagination = document.createElement('div');
        pagination.id = 'pagination';
        document.getElementById('slider').appendChild(pagination);

        //var btnLeft = document.createElement('button');
        //btnLeft.id = 'btnLeft';
        //btnLeft.innerHTML = 'LEFT';
        //var btnRigth = document.createElement('button');
        //btnRigth.id = 'btnRigth';
        //btnRigth.innerHTML = 'RIGTH';
        //document.body.appendChild(btnLeft);
        //document.body.appendChild(btnRigth);
       // btnRigth.onclick = slider.slideToRigth;
      //  btnLeft.onclick = slider.slideToLeft;


    },
    renderSliderContent: function(appendVideos, countOnPage, offset, slideWidth) {
        let resultStr='';
        let item = require('./template/result-item.tpl');
        appendVideos.forEach(function (video, i) {
            resultStr += item({
                title:video.snippet.title,
                urlImg:video.snippet.thumbnails.default.url,
                url:"https://www.youtube.com/watch?v="+video.id.videoId,
                description:video.snippet.description,
                author:video.snippet.channelTitle,
                date:video.snippet.publishedAt,
                number:offset + i,
                count:countOnPage,
                viewCount: video.statistics.viewCount,
                width: slideWidth
            });
            slider.number++;

        });
        document.getElementById('content-slider').innerHTML += resultStr;

    },
    renderPagination: function (currentPage, totalItems, itemsOnThePage){

        let maxPageNumber = Math.ceil(totalItems/itemsOnThePage);
        let page = currentPage - 2;
        if (page < 1) {
            page = 1;
        }
        let resultStrOfPagination = '';
        let refToPage = require('./template/pagination.tpl');
        let pages = Array(5).fill().map(function(e, i) {

            if (page > maxPageNumber) {
                return;
            }

            resultStrOfPagination += refToPage({
                currentPage: currentPage,
                numberOfPage: page
            });
            page++;

        });

        let paginationElm = document.getElementById('pagination');
        paginationElm.innerHTML = resultStrOfPagination;
        let paginationLinks = paginationElm.querySelectorAll('span a');
        Array.from(paginationLinks).forEach(function(link) {
            link.addEventListener('click', function () { slider.slideToPage(this.getAttribute('data-page-id')); event.preventDefault(); return false; });
        });
    }

}

export default pageHtml;
