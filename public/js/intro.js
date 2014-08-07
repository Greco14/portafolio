Intro = function() {
    this.settings = {
        greco: $Seccion1.find('.grecoNm'),
        front: $Seccion1.find('.frontNm'),
        scrollMe: $('.btnScroll'),
        arrow: $('.holdCirc'),
        arrow2: $('.arrowDown'),
        msnEnd: false,
        textoIn: 'As a Graphic Designer been able to write code has been a journey of growth and learning.',
        textoIn2: "What else can I ask for? ",
        textoIn3: "oh, yes! a path full of knowledge and more learning.",
        escribiendo: 100,
        loader: $Loader,
    };
    this.tlgreco = new TimelineLite();
    this.tlfront = new TimelineLite();
    this.tlweb = new TimelineLite();
    this.tlarrow2 = new TimelineLite();
    this.tlarrowIn = new TimelineLite();
    this.tlarrowIn = new TimelineLite();
};

Intro.prototype.init = function() {
    var self = this;
    self.bind();
};

Intro.prototype.bind = function() {
    var self = this;
    var s = self.settings;
    self.load([
        //Assets a cargar al principio
        "assets/img/portafolio/home/bg.jpg",

    ], function() {
        //Cuando termine de cargar, se realiza la una acción
        setTimeout(function() {
            self.animation("intro");
            s.scrollMe.on('click', function() {
                self.animation('scroll-me');
            });
        }, 1250);

    });


};

Intro.prototype.load = function(images, onComplete) {
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

Intro.prototype.animation = function(action) {
    var self = this,
        s = self.settings;

    switch (action) {
        case "intro":
            self.tlgreco.to(s.greco, 1, {
                top: 0,
                opacity: 1,
                ease: Cubic.easeOut,
            });
            self.tlfront.to(s.front, 0.8, {
                    top: 0,
                    opacity: 1,
                    ease: Cubic.easeOut,
                    onComplete: function() {
                        var total = s.escribiendo * (s.textoIn.length);
                        var total2 = s.escribiendo * (s.textoIn2.length) + 500;
                        var total3 = s.escribiendo * (s.textoIn3.length) + total2 + total;

                        setTimeout(function() {
                            self.showText("#tx1", s.textoIn, 0, s.escribiendo);
                            setTimeout(function() {
                                self.showText("#tx2", s.textoIn2, 0, s.escribiendo);
                            }, total);
                            setTimeout(function() {
                                self.showText("#tx3", s.textoIn3, 0, s.escribiendo);
                            }, total + total2);
                            setTimeout(function() {
                                self.tlarrow2.to(s.arrow, 0.5, {
                                    width: 44,
                                    height: 44,
                                    opacity: 1,
                                    ease: Back.easeOut
                                });
                                self.tlarrowIn.to(s.arrow2, 0.5, {
                                    opacity: 1,
                                    ease: Back.easeOut,
                                    onComplete: function() {
                                        $('body').css({
                                            overflowY: 'scroll'
                                        })
                                    }
                                });
                            }, total3 + 500);
                        }, 250)

                    }
                },
                '+=0.7');
            break;
        case "scroll-me":
            var goTop = $Portafolio.offset().top;
            $('body').animate({
                scrollTop: goTop
            }, 500, 'easeInOutQuad');
            break;
    }
};
Intro.prototype.showText = function(target, message, index, interval) {
    var self = this,
        s = self.settings;

    if (index < message.length) {
        $(target).append(message[index++]);
        setTimeout(function() {
            self.showText(target, message, index, interval);
        }, interval);
    }
}
Intro.prototype.arrow = function() {
    var self = this,
        s = self.settings;


};