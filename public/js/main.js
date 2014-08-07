Main = {

    init: function(params) {

        this.cachedElements();

        portafolio = new Portafolio();
        portafolio.init();




        loader = new Loader();
        loader.init();

    },
    cachedElements: function() {
        $Seccion1 = $('#main');
        $Portafolio = $('#holdPortafolio');
        $Loader = $('#loader');
    },
};

$(function() {
    Main.init();
});