var _ = require("lodash");
import slideMethods from  './slidePage';

let pageHtml = {
    renderHtmlSlider : function () {
        let sliderWrapper = document.createElement('div');
        sliderWrapper.id = 'slider';
        sliderWrapper.innerHTML = '<div id="content-slider"></div>'+
            '<div class="pagination"><a href="#">1</a><a href="#">2</a><a href="#">3</a></div>';
        document.body.appendChild(sliderWrapper);
        var btnLeft = document.createElement('button');
        btnLeft.id = 'btnLeft';
        btnLeft.innerHTML = 'LEFT';
        var btnRigth = document.createElement('button');
        btnRigth.id = 'btnRigth';
        btnRigth.innerHTML = 'RIGTH';
        document.body.appendChild(btnLeft);
        document.body.appendChild(btnRigth);
        btnRigth.onclick = slideMethods.slideToRigth;
        btnLeft.onclick = slideMethods.slideToLeft;


    },
    renderSliderContent: function(videoContent) {
        let count = 0;
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
                count:count});
            count++;

        });
        document.getElementById('content-slider').innerHTML = resultStr;
        document.getElementById('content-slider').firstElementChild.classList.add('swipe__page_center');
        document.getElementById('content-slider').children[1].classList.add('swipe__page_right')
        document.getElementById('content-slider').children[2].classList.add('swipe__page_right')

    }

}

export default pageHtml;
