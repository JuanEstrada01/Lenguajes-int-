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
        //velocidad y control de la nave
        this.ship.setDrag(0.99);
        this.ship.setMaxVelocity(200);
        this.ship.setCollideWorldBounds(true);
        this.ship.setSize(20, 30);
        this.cursors = this.input.keyboard.createCursorKeys();


       

    }
    update(){
        //se crean las teclas movimiento
        if(this.cursors.up.isDown){
            this.physics.velocityFromRotation(this.ship.rotation,200,this.ship.body.acceleration);
        }else{
            this.ship.setAcceleration
        }
        if(this.cursors.left.isDown){
            this.ship.setAngularVelocity(-300);
        }else if(this.cursors.right.isDown){
            this.ship.setAngularVelocity(300);
        }else{
            this.ship.setAngularVelocity(0);
        }


    }
        
       

    
}