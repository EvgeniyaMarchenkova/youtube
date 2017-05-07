var _ = require("lodash");

let slideMethods = {
    slideToRigth : function() {
        let currentElm = document.getElementsByClassName('swipe__page_center')[0];
        currentElm.classList.remove('swipe__page_center');
        currentElm.classList.add('swipe__page_left');
        let rigthElm = document.getElementsByClassName('swipe__page_right')[0];
        console.log(rigthElm);
        rigthElm.classList.remove('swipe__page_right');
        rigthElm.classList.add('swipe__page_center');
    },
    slideToLeft : function() {
        let currentElm = document.getElementsByClassName('swipe__page_center')[0];
        currentElm.classList.remove('swipe__page_center');
        currentElm.classList.add('swipe__page_right');
        let rigthElm = document.getElementsByClassName('swipe__page_left')[0];
        console.log(rigthElm);
        rigthElm.classList.remove('swipe__page_left');
        rigthElm.classList.add('swipe__page_center');
    }
}


export default slideMethods;
