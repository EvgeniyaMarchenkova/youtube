import {slider} from  './app';

let swipe = {
    touchStartCoords :  {'x':-1, 'y':-1}, // X and Y coordinates on mousedown or touchstart events.
    touchEndCoords : {'x':-1, 'y':-1},// X and Y coordinates on mouseup or touchend events.
    direction : 'undefined',// Swipe direction
    minDistanceXAxis : 30,// Min distance on mousemove or touchmove on the X axis
    maxDistanceYAxis : 30,// Max distance on mousemove or touchmove on the Y axis
    maxAllowedTime : 1000,// Max allowed time between swipeStart and swipeEnd
    startTime : 0,// Time on swipeStart
    elapsedTime : 0,// Elapsed time between swipeStart and swipeEnd

    swipeStart: function(e) {
        e = e ? e : window.event;
        e = ('changedTouches' in e)?e.changedTouches[0] : e;
        swipe.touchStartCoords = {'x':e.pageX, 'y':e.pageY};
        swipe.startTime = new Date().getTime();
        document.getElementById('content-slider').style.cursor = 'grab';
        //targetElement.textContent = " ";
    },

    swipeMove: function(e){
        e = e ? e : window.event;
        e.preventDefault();
    },

    swipeEnd: function(e) {
        e = e ? e : window.event;
        e = ('changedTouches' in e)?e.changedTouches[0] : e;
        swipe.touchEndCoords = {'x':e.pageX - swipe.touchStartCoords.x, 'y':e.pageY - swipe.touchStartCoords.y};
        swipe.elapsedTime = new Date().getTime() - swipe.startTime;
        if (swipe.elapsedTime <= swipe.maxAllowedTime){
            if (Math.abs(swipe.touchEndCoords.x) >= swipe.minDistanceXAxis && Math.abs(swipe.touchEndCoords.y) <= swipe.maxDistanceYAxis){
                swipe.direction = (swipe.touchEndCoords.x < 0)? 'left' : 'right';
                switch(swipe.direction){
                    case 'left':
                        slider.slideToRigth();
                        break;
                    case 'right':
                        slider.slideToLeft();
                        break;
                }
            }
        }
    },

    addMultipleListeners: function(el, s, fn) {
        var evts = s.split(' ');
        for (var i=0, iLen=evts.length; i<iLen; i++) {
            el.addEventListener(evts[i], fn, false);
        }
    }

}

export default swipe;
