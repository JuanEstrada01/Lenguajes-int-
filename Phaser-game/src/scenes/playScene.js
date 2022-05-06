import shoot from "../gameObjects/shoot.js";
import Asteroind from "../gameObjects/shoot.js"

//se define la clase PlayScene
export default class PlayScene extends Phaser.Scene{
    constructor(){
        super({key:'PlayScene'});
    }
    //configuracion de metodos
    preload(){
       this.load.image('background', './assets/img/background.png');
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
            runChildUpdate:true
        });
        //se crea el grupo de los asteroides
        this.asteroidGroup =this.physics.add.group();
        //los asteroides se configuraran medida aparecen
        this.asteroidsArray = [];
        this.asteroidTimeEvent=this.time.addEvent({
            delay: 1000,
            callback: this.addAsteroid,
            callbackScope:this,
            loop:true
        });
        this.physics.add.overlap(this.ship, this.asteroidsGroup, this.hitShip, null, this);
        this.physics.add.collider(this.shootsGroup, this.asteroidsGroup, this.hitShoot, null, this);   

    }
    update(time,delta){
        //pierde
        if (this.gameOver) {
            return;
        }
        //se crean las teclas movimiento
        if(this.cursors.up.isDown){
            this.physics.velocityFromRotation(this.ship.rotation,200,this.ship.body.acceleration);
        }else{
            this.ship.setAcceleration(0)
        }
        //disparo en el espacio
        if(this.cursors.space.isDown && time > this.lastFired){
            let shoot = this.shootsGroup.get();
          
            if(shoot){
                shoot.fire(this.ship.x,this.ship.y,this.ship.rotation)

                this.lastFired = time + 50;
            }
        }
        if(this.cursors.left.isDown){
            this.ship.setAngularVelocity(-300);
        }else if(this.cursors.right.isDown){
            this.ship.setAngularVelocity(300);
        }else{
            this.ship.setAngularVelocity(0);
        }
        this.asteroidsArray = this.asteroidsArray.filter(function (asteroid) {
            return asteroid.active;
        });
        for(let asteroid of this.asteroidsArray){
            if(!asteroid.isOrbiting()){
                asteroid.launch(this.ship.x,this.ship.y);
            }
            asteroid.update(time,delta);
            
        }
   
}
//colisiones 
addAsteroid() {
    let asteroid = new Asteroid(this, 200, 300, 'asteroid', 0);
    this.asteroidsGroup.add(asteroid, true);
    this.asteroidsArray.push(asteroid);

}
hitShip(ship, asteroid) {
    this.physics.pause();
    this.asteroidsTimedEvent.paused = true;
    
    this.ship.setTint(0xff0000);
    this.ship.body.allowRotation = false;

    this.gameOver = true;
}

hitShoot(shoot, asteroid) {
    asteroid.disableBody(true, true);
}
 }