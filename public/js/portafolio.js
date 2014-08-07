Portafolio = function() {

    this.settings = {
        ancho: $Portafolio.width(),
        btnPortafolio: $Portafolio.find(".itemGrid"),
        infoDisplay: $Portafolio.find("#MainInfo"),
        closeDisplay: $Portafolio.find("#closeInfo"),
        infoHold: $Portafolio.find('#rightHold'),
        picsHold: $Portafolio.find('#leftHold'),
        up_slide: $Portafolio.find('.arriba'),
        down_slide: $Portafolio.find('.abajo'),
        mobile: $Portafolio.find('.mobileIcon'),

        cuantas: 12,
        seAnima: false,
        currentView: 0,

    };

    support = Modernizr.cssanimations;

    this.tlWork = new TimelineLite();
    this.tlShow = new TimelineLite();
    this.tlShowinfo = new TimelineLite();
    this.tlhoverIn = new TimelineLite();
    this.tlhoverOut = new TimelineLite();

};
Portafolio.prototype.init = function() {
    var self = this;;
    self.bind();
};
Portafolio.prototype.bind = function() {

    var self = this;
    var s = self.settings;


    self.load([
        //Assets a cargar al principio
        "assets/img/portafolio/home/bg.jpg",

    ], function() {
        //Cuando termine de cargar, se realiza la una acción
        self.begin();
    });

};

Portafolio.prototype.begin = function() {
    var self = this;
    var s = self.settings;

    s.btnPortafolio.on('click', function() {
        var row = $(this).data('row');
        var col = $(this).data('col');
        $('#numss').val(col);
        setTimeout(function() {
            self.animations("open-work");
        }, 51);
    });

    s.closeDisplay.on('click', function() {
        self.animations("close-work");
        $('#numss').val(0);
    });

    s.closeDisplay.hover(function() {
        $('.holdCubs').stop().animate({
            left: '2px',
            width: '16px',
            height: '16px',
            top: '2px'
        }, 150, 'easeInOutQuad');
    }, function() {
        $('.holdCubs').stop().animate({
            left: '0',
            width: '20px',
            height: '20px',
            top: '0'
        }, 150, 'easeInOutQuad');
    });

    s.btnPortafolio.hover(function() {
        var esEl = $(this).data('col');
        $('#content-' + esEl).stop().animate({
            left: '0%'
        }, 250, 'easeInOutQuad');

        $('#itemGrid-' + esEl + '-hover').stop().animate({
            opacity: '1'

        }, 250, 'easeInOutQuad');


    }, function() {
        var esEl = $(this).data('col');
        $('#content-' + esEl).stop().animate({
            left: '-110%'
        }, 250, 'easeInOutQuad');
        $('#itemGrid-' + esEl + '-hover').stop().animate({
            opacity: '0'
        }, 250, 'easeInOutQuad');

    });
    s.mobile.hover(function() {
        var laID = $(this).attr('id');
        $('#holdQrs').stop().animate({
            right: '10px'
        }, 250, 'easeInOutQuad');
        $('#' + laID + '-qr').css({
            display: 'block'
        });
    }, function() {
        var laID = $(this).attr('id');
        $('#holdQrs').stop().animate({
            right: '-350px'
        }, 250, 'easeInOutQuad');
        setTimeout(function() {
            $('#' + laID + '-qr').css({
                display: 'none'
            });
        }, 150);

    });
}

Portafolio.prototype.load = function(images, onComplete) {
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


Portafolio.prototype.animations = function(action, CualTrabajo) {

    var self = this,
        s = self.settings;

    switch (action) {
        case "open-work":
            self.tlWork.to(s.infoDisplay, 0.5, {
                height: 100 + '%',
                top: 0,
                ease: Cubic.easeOut,

            });

            break;
        case "close-work":
            self.tlWork.to(s.infoDisplay, 0.5, {
                height: 0 + '%',
                top: 50 + '%',
                ease: Cubic.easeOut,

            });
            break;
        case "hover-on":
            if (s.seAnima) {
                return false;
            }
            s.seAnima = true;
            self.tlhoverIn.to($('#content-' + CualTrabajo), 0.25, {
                left: '0%',
                ease: Cubic.easeOut,
                onComplete: function() {
                    s.seAnima = false;
                    return s.seAnima;
                }
            });


            break;
        case "hover-out":
            if (s.seAnima) {
                return false;
            }
            s.seAnima = true;
            self.tlhoverOut.to($('#content-' + CualTrabajo), 0.25, {
                left: '-110%',
                ease: Cubic.easeOut,
                onComplete: function() {
                    s.seAnima = false;
                    return s.seAnima;
                }
            });


            break;
    }
};

Portafolio.prototype.slide = function(CualTrabajo) {
    var self = this,
        s = self.settings;
    var move = (CualTrabajo * 100) - 100;

    if (s.seAnima) {
        return false;
    }

    if (CualTrabajo == 1) {
        s.down_slide.animate({
            opacity: '0'
        }, 150, 'easeInOutQuad').css({
            display: 'none'
        });
    }
    if (CualTrabajo == 2) {
        s.down_slide.animate({
            opacity: '1'
        }, 150, 'easeInOutQuad').css({
            display: 'block'
        });
    }

    if (CualTrabajo == 12) {
        s.up_slide.animate({
            opacity: '0'
        }, 150, 'easeInOutQuad').css({
            display: 'none'
        });
    }
    if (CualTrabajo == 11) {
        s.up_slide.animate({
            opacity: '1'
        }, 150, 'easeInOutQuad').css({
            display: 'block'
        });
    }

    console.log('CualTrabajo: ' + CualTrabajo);
    self.tlShowinfo.to(s.picsHold, 0.35, {
        ease: Cubic.easeOut,
        top: -move + '%',
    });
    self.tlShow.to(s.infoHold, 0.35, {
        ease: Cubic.easeOut,
        bottom: -move + '%',
        onComplete: function() {
            s.seAnima = false;
        }
    });
    s.currentView = CualTrabajo;
    return s.currentView;
}

// Greco.prototype.share = function(hire, collaborate) {
//     var self = this;
//     if (likeIt) {
//         self.hire.Me++;
//     } else {
//         self.call.Me = true;
//     }
// }