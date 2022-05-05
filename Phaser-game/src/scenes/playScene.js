import shoot from "../gameObjects/shoot.js";

//se define la clase PlayScene
export default class PlayScene extends Phaser.Scene{
    constructor(){
        super({key:'PlayScene'});
    }
    //configuracion de metodos
    preload(){
       this.load.image('background', '../../assets/img/background.png');
       this.load.image('ship', './assets/img/ship.png');
       this.load.image('asteroid', './assets/img/asteroid-1.png');
       this.load.image('shoot', './assets/img/shoot.png');

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
        //se define el grupo de disparo
        this.shootsGroup = this.physics.add.group({
            //se crea un objeto json
            //parametros de disparo
            classType: shoot,
            maxSize: 10,
            runChilldUpdate:true
        });


       

    }
    update(){
        //se crean las teclas movimiento
        if(this.cursors.up.isDown){
            this.physics.velocityFromRotation(this.ship.rotation,200,this.ship.body.acceleration);
        }else{
            this.ship.setAcceleration(0)
        }
        //disparo en el espacio
        if(this.cursors.space.isDown){
            let shoot = this.shootGroup.get();
          
            if(shoot){
                shoot.fire(this.ship.x,this.ship.y,this.ship.rotation)
            }
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