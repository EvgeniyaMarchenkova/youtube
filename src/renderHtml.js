var _ = require("lodash");
import {slider} from  './app';

let pageHtml = {
    renderHtmlSlider : function () {
        let sliderWrapper = document.createElement('div');
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
    renderSliderContent: function(videoContent, count) {
        let resultStr='';
        console.log(videoContent);
        videoContent.items.forEach(function (video) {
            let item = require('./template/result-item.tpl');
            resultStr += item({title:video.snippet.title,
                urlImg:video.snippet.thumbnails.default.url,
                url:"https://www.youtube.com/watch?v="+video.id.videoId,
                description:video.snippet.description,
                author:video.snippet.channelTitle,
                date:video.snippet.publishedAt,
                number:slider.number,
                count:count});
            slider.number++;

        });
        document.getElementById('content-slider').innerHTML += resultStr;

    },
    renderPagination: function (pages){
        let resultStrOfPagination = '';
        [].reduce.call(pages, function (prevResult, page) {
            let refToPage = require('./template/pagination.tpl');
            console.log(+page.id.replace(/\D+/,''))
            if (+page.id.replace(/\D+/,'') % slider.countOfVideos == 0) {
                resultStrOfPagination += refToPage({
                    ref:page.id,
                    numberOfPage: prevResult++
                } );
            }

            return prevResult;
        }, 1)
        let paginationElm = document.getElementById('pagination');
        paginationElm.innerHTML = resultStrOfPagination;
        let paginationLinks = paginationElm.querySelectorAll('span a');
        Array.from(paginationLinks).forEach(function(link) {
            link.addEventListener('click', function () { slider.slideToPage(this.getAttribute('id')) });
        });
    }

}

export default pageHtml;
