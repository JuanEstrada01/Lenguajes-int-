//se define la clase PlayScene
export default class PlayScene extends Phaser.Scene{
    constructor(){
        super({key:'PlayScene'});
    }
    //configuracion de metodos
    preload(){
       this.load.image('background', '../../assets/img/background.png');
       this.load.image('ship', './img/ship.png');
       this.load.image('asteroid-1', './img/asteroid-1.png');
       this.load.image('shoot', './img/shoot.png');

    }
    create(){
        this.add.image(0, 0, 'background');
        this.add.image(640, 0, 'background');
        this.add.image(0, 480, 'background');
        this.add.image(640, 480, 'background');
        this.ship = this.physics.add.image(400, 300, 'ship');

       

    }
    update(){

    }
        
       

    
}