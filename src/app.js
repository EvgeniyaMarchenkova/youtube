'use strict';
import "./main.less";
import pageHtml from './create-slider';




class SearchButton
{
    constructor()
    {
        this.searchTimeout = null;
        this.searchText = '';

        var searchButtonTemplate = require('./template/search.tpl');
        document.write( searchButtonTemplate({title: "Search on Youtube"}) );

        var searchInput = document.getElementById('search_input');

        searchInput.onkeyup = function(e) {
            if(this.searchTimeout != null) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(function() {
                this.searchText = e.target.value;
                this.search()}.bind(this),
                1000
            );
        }.bind(this);
    }

    search() {
        let promise = fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&videoEmbeddable=true&safeSearch=strict&order=relevance&key=AIzaSyA0TiCvVNO_CMEc1T1S1XLqto1iRQtb2t0&q='+this.searchText)
            .then(function(response) {
                return response.json();
            })
            .then(function (value) {
                pageHtml.renderHtmlSlider();
                pageHtml.renderSliderContent(value);


               // document.getElementById("content-slider").childNodes[2].classList.add("first-visible-slide");
              //  document.getElementById("content-slider").childNodes[3].classList.add("second-visible-slide");
               // document.getElementById("content-slider").childNodes[4].classList.add("thirth-visible-slide");

            });


    }
}

var p = new SearchButton();
