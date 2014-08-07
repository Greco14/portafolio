canvas = function() {
    var game = new Phaser.Game(960, 400, Phaser.CANVAS, 'myCanvas', {
        create: create
    });
}
preload = function() {

}
create = function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


}

canvas();