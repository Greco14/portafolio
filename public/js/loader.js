Loader = function() {
    this.settings = {
        loader: $Loader,
        green: $Loader.find('#green'),
        pink: $Loader.find('#pink'),
        blue: $Loader.find('#blue'),
        completeLoad: false,
    };
    this.tlLoad = new TimelineLite();
    this.tlgreen = new TimelineLite();
    this.tlblue = new TimelineLite();
    this.tlpink = new TimelineLite();

};

Loader.prototype.init = function() {
    var self = this;
    self.bind();
    self.party();
};

Loader.prototype.bind = function() {
    var self = this;
    var s = self.settings;

    self.load([
        //Assets a cargar al principio
        "assets/img/portafolio/home/bg.jpg",

        "assets/img/portafolio/invaderFestival/left.png",
        "assets/img/portafolio/invaderFestival/center.png",
        "assets/img/portafolio/invaderFestival/right.png",

        "assets/img/portafolio/jd/left.png",
        "assets/img/portafolio/jd/center.png",
        "assets/img/portafolio/jd/right.png",

        "assets/img/portafolio/mabe/left.png",
        "assets/img/portafolio/mabe/center.png",
        "assets/img/portafolio/mabe/right.png",

        "assets/img/portafolio/encuestas/left.png",
        "assets/img/portafolio/encuestas/center.png",
        "assets/img/portafolio/encuestas/right.png",

        "assets/img/portafolio/mostaccino/left.png",
        "assets/img/portafolio/mostaccino/center.png",
        "assets/img/portafolio/mostaccino/right.png",

        "assets/img/portafolio/mundoIdeal/left.png",
        "assets/img/portafolio/mundoIdeal/center.png",
        "assets/img/portafolio/mundoIdeal/right.png",

        "assets/img/portafolio/nosococo/left.png",
        "assets/img/portafolio/nosococo/center.png",
        "assets/img/portafolio/nosococo/right.png",

        "assets/img/portafolio/poloGti/left.png",
        "assets/img/portafolio/poloGti/center.png",
        "assets/img/portafolio/poloGti/right.png",

        "assets/img/portafolio/promociones/left.png",
        "assets/img/portafolio/promociones/center.png",
        "assets/img/portafolio/promociones/right.png",

        "assets/img/portafolio/rally/left.png",
        "assets/img/portafolio/rally/center.png",
        "assets/img/portafolio/rally/right.png",

        "assets/img/portafolio/grid/encuestas.jpg",
        "assets/img/portafolio/grid/fortune.jpg",
        "assets/img/portafolio/grid/invaderFestival.jpg",
        "assets/img/portafolio/grid/JD.jpg",
        "assets/img/portafolio/grid/latitud.jpg",
        "assets/img/portafolio/grid/mabe.jpg",
        "assets/img/portafolio/grid/mostaccino.jpg",
        "assets/img/portafolio/grid/mundoIdeal.jpg",
        "assets/img/portafolio/grid/nosococo.jpg",
        "assets/img/portafolio/grid/poloGti.jpg",
        "assets/img/portafolio/grid/promociones.jpg",
        "assets/img/portafolio/grid/rally.jpg",

        "assets/img/portafolio/qrs/jdQr.png",
        "assets/img/portafolio/qrs/pologtiQr.png",
        "assets/img/portafolio/qrs/promocionesQr.png",
        "assets/img/portafolio/qrs/rally.png",

        "assets/img/portafolio/qrs/desktop.png",
        "assets/img/portafolio/qrs/mobile.png",

    ], function() {
        console.log('Finish Charge');

        self.animate();
        intro = new Intro();
        intro.init();

    });

}

Loader.prototype.load = function(images, onComplete) {
    var count = 0;
    $.each(images, function(index, src) {

        var img = new Image();
        img.src = src;
        img.onload = function() {

            count = count + 1;
            if (count >= images.length) {
                onComplete();

            };
        };
    });
};

Loader.prototype.animate = function() {
    var self = this,
        s = self.settings;
    self.tlLoad.to(s.loader, 0.5, {
        opacity: 0,
        ease: Sine.easeInOut,
        onComplete: function() {
            s.loader.css({
                display: 'none'
            });
        }
    });

}
Loader.prototype.party = function(onComplete) {
    var self = this,
        s = self.settings;
    var crece = 500;
    var small = 300;
    lights()

    function lights() {
        TweenLite.to(s.green, 0.25, {
            width: crece,
            height: crece,
            opacity: 0.7,
            ease: Back.easeOut,
            onComplete: function() {
                TweenLite.to(s.green, 0.25, {
                    width: small,
                    height: small,
                    opacity: 0,
                    ease: Back.easeOut,
                });
            }
        });
        setTimeout(blue, 400);

        function blue() {
            TweenLite.to(s.blue, 0.25, {
                width: crece,
                height: crece,
                opacity: 0.7,
                ease: Back.easeOut,
                onComplete: function() {
                    TweenLite.to(s.blue, 0.25, {
                        width: small,
                        height: small,
                        opacity: 0,
                        ease: Back.easeOut,
                    });
                }
            });
            setTimeout(pink, 400);
        }

        function pink() {
            TweenLite.to(s.pink, 0.25, {
                width: crece,
                height: crece,
                opacity: 0.7,
                ease: Back.easeOut,
                onComplete: function() {
                    TweenLite.to(s.pink, 0.25, {
                        width: small,
                        height: small,
                        opacity: 0,
                        ease: Back.easeOut,
                        onComplete: function() {
                            lights();
                        }
                    });
                }
            });
        }


    }



}