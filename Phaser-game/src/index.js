const config = {
width: 800,
height: 600,
type: Phaser.Auto,
//motor de fisicas 
phsysics: {
    default : "arcade",
    arcade: {
        fps:60,
        gravity: {y : 0}
    }

}
};
const game = new Phaser.Game(config);