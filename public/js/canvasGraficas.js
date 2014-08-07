/*
      ___           ___           ___           ___           ___           ___           ___     
     /\  \         /\  \         /\__\         /\  \         /\  \         /\__\         /\  \    
     \:\  \       /::\  \       /::|  |       /::\  \       /::\  \       /::|  |        \:\  \   
      \:\  \     /:/\:\  \     /:|:|  |      /:/\:\  \     /:/\:\  \     /:|:|  |         \:\  \  
      /::\  \   /::\~\:\  \   /:/|:|  |__   /:/  \:\  \   /::\~\:\  \   /:/|:|  |__       /::\  \ 
     /:/\:\__\ /:/\:\ \:\__\ /:/ |:| /\__\ /:/__/_\:\__\ /:/\:\ \:\__\ /:/ |:| /\__\     /:/\:\__\
    /:/  \/__/ \/__\:\/:/  / \/__|:|/:/  / \:\  /\ \/__/ \:\~\:\ \/__/ \/__|:|/:/  /    /:/  \/__/
   /:/  /           \::/  /      |:/:/  /   \:\ \:\__\    \:\ \:\__\       |:/:/  /    /:/  /     
   \/__/            /:/  /       |::/  /     \:\/:/  /     \:\ \/__/       |::/  /     \/__/      
                   /:/  /        /:/  /       \::/  /       \:\__\         /:/  /                 
                   \/__/         \/__/         \/__/         \/__/         \/__/                  
      ___           ___           ___           ___           ___           ___                   
     /\  \         /\  \         /\  \         /\  \         /\  \         /\  \                  
    /::\  \       /::\  \       /::\  \       /::\  \       /::\  \       /::\  \                 
   /:/\ \  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\ \  \                
  _\:\~\ \  \   /::\~\:\  \   /::\~\:\  \   /:/  \:\  \   /::\~\:\  \   _\:\~\ \  \               
 /\ \:\ \ \__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/__/ \:\__\ /:/\:\ \:\__\ /\ \:\ \ \__\              
 \:\ \:\ \/__/ \/__\:\/:/  / \/__\:\/:/  / \:\  \  \/__/ \:\~\:\ \/__/ \:\ \:\ \/__/              
  \:\ \:\__\        \::/  /       \::/  /   \:\  \        \:\ \:\__\    \:\ \:\__\                
   \:\/:/  /         \/__/        /:/  /     \:\  \        \:\ \/__/     \:\/:/  /                
    \::/  /                      /:/  /       \:\__\        \:\__\        \::/  /                 
     \/__/                       \/__/         \/__/         \/__/         \/__/   
                   
 * Simulation #20 - Golden Angles
 *
 * Based on http://geometrydaily.tumblr.com/post/16165189321/20-golden-angles-a-new-minimal-geometric by @tilman
 *
 * Dependencies - 
 * Pixi js  v 1.5.1 - https://github.com/GoodBoyDigital/pixi.js/
 * TweenMax - http://www.greensock.com/get-started-js/
*/

(function() {

    // create an new instance of a pixi _stage - and set it to be interactive
    var _stage = new PIXI.Stage(0xFFFFFF, true);
    _stage.buttonMode = true;

    // create a _renderer instance 
    var _renderer = PIXI.autoDetectRenderer(498, 498, null, true);
    _renderer.view.style.display = "block";

    // add render view to DOM
    document.getElementById("canvasHold").appendChild(_renderer.view);

    //Constants - 
    var SPOT_COLOUR = 0x282828;
    var SPOT_DIAMETER = 3;
    var NUM_SPOTS = 250;
    var TWEEN_TIME = 3;
    var MIN_DISTANCE = 10;
    var MAX_DISTANCE = 150;
    var DELAY_STEP = 0.02;
    var MIN_ROT = 0;
    var MAX_ROT = 3141//(Math.PI*2)*500;

    var _currentRot;
    var _first = true;

    //Spots holder - 
    var _spots = [];

    //Brown BG - 
    var brownBG = new PIXI.Graphics();
    brownBG.beginFill(0xa6856b, 0.4);
    brownBG.drawRect(60, 60, 380, 380);
    brownBG.endFill();

    _stage.addChild(brownBG);

    _stage.mousedown = _stage.touchstart = onMouseDown;

    //Main loop - 
    requestAnimFrame(animate);
    initSpots();
    onMouseDown(null);

    function animate() {
        _renderer.render(_stage);
        requestAnimFrame(animate);
    }

    function onMouseDown(mouseData) {

        //Randomise this withing the parameters for different layouts on click.
        _currentRot = ((Math.random() * (MAX_ROT - MIN_ROT)) + MIN_ROT) * Math.random();

        var circ;
        var spot;
        var gotoY;
        var gotoRot = 0;
        var count = 0;
        var l = _spots.length - 1;
        var _delay = DELAY_STEP;
        var _time = TWEEN_TIME;

        //Easter 
        if (mouseData) {
            var mouse = mouseData.getLocalPosition(_stage);
            if (((mouse.x > 245) && (mouse.x < 255)) && ((mouse.y > 245) && (mouse.y < 255))) {
                _delay = 0;
                _time *= 3;
            }
        }

        var baseAngle = 1.61803399 * 2.0 * Math.PI;

        for (var i = l; i >= 0; i--) {
            spot = _spots[i];
            circ = spot.circ;

            //Close to original - 
            if (_first) {
                //From - http://forums.tigsource.com/index.php?topic=27074.0
                gotoRot = baseAngle * (l - i);
                gotoY = Math.sqrt((l - i) + 1) * 10;
                _time = 2.5;

                spot.rotation = gotoRot;

                TweenMax.to(circ.position, _time, {
                    y: gotoY,
                    ease: Back.easeOut,
                    delay: count * _delay
                });

            } else {
                //Mapped between min & max - 
                gotoRot = map(i, l, 0, 0, _currentRot);
                gotoY = map(i, l, 0, MIN_DISTANCE, MAX_DISTANCE);

                TweenMax.to(circ.position, _time, {
                    y: gotoY,
                    ease: Strong.easeOut,
                    delay: count * _delay
                });
                TweenMax.to(spot, _time, {
                    rotation: gotoRot,
                    ease: Strong.easeOut,
                    delay: count * _delay
                });

            }

            count++;
        }
        _first = false;
    }

    function initSpots() {
        for (var i = NUM_SPOTS - 1; i >= 0; i--) {

            var spot = new PIXI.DisplayObjectContainer();

            var circ = new PIXI.Graphics();
            circ.beginFill(SPOT_COLOUR);
            circ.drawCircle(0, 0, SPOT_DIAMETER);
            circ.endFill();

            spot.addChild(circ);
            spot.alpha = 0.9;
            spot.position.x = 250;
            spot.position.y = 250;
            spot.circ = circ;

            _stage.addChild(spot);
            _spots.push(spot);

        }
    }

    function map(v, a, b, x, y) {
        return (v == a) ? x : (v - a) * (y - x) / (b - a) + x;
    }
})();