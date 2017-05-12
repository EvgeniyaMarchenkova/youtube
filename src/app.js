'use strict';
import "./main.less";
import pageHtml from './renderHtml';
import Slider from  './slider';
import swipe from  './swipe';


class SearchButton
{
    constructor()
    {
        this.searchTimeout = null;
        this.searchText = '';
        let searchButtonTemplate = require('./template/search.tpl');
        document.write( searchButtonTemplate({title: "Search on Youtube"}) );
        let searchInput = document.getElementById('search_input');
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
        pageHtml.renderHtmlSlider();
        slider.sendRequest();
        let targetElement = document.getElementById('slider');
        swipe.addMultipleListeners(targetElement, 'mousedown touchstart', swipe.swipeStart);
        swipe.addMultipleListeners(targetElement, 'mousemove touchmove', swipe.swipeMove);
        swipe.addMultipleListeners(targetElement, 'mouseup touchend', swipe.swipeEnd);
    }
}
let slider = new Slider();
let p = new SearchButton();


export {p, slider};
