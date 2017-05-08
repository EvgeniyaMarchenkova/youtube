var _ = require("lodash");
import slider from  './slidePage';

let pageHtml = {
    renderHtmlSlider : function () {
        let sliderWrapper = document.createElement('div');
        sliderWrapper.id = 'slider';
        sliderWrapper.innerHTML = '<div id="content-slider"></div>';
        document.body.appendChild(sliderWrapper);
        var btnLeft = document.createElement('button');
        btnLeft.id = 'btnLeft';
        btnLeft.innerHTML = 'LEFT';
        var btnRigth = document.createElement('button');
        btnRigth.id = 'btnRigth';
        btnRigth.innerHTML = 'RIGTH';
        document.body.appendChild(btnLeft);
        document.body.appendChild(btnRigth);
        btnRigth.onclick = slider.slideToRigth;
        btnLeft.onclick = slider.slideToLeft;


    },
    renderSliderContent: function(videoContent) {
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
                number:slider.number});
            slider.number++;

        });
        document.getElementById('content-slider').innerHTML += resultStr;

    },
    renderPagination: function () {
        let pagination = document.createElement('div');
        pagination.id = 'pagination';
        document.getElementById('slider').appendChild(pagination);
    }

}

export default pageHtml;
