export default class shoot extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y){
        //sprite en escena 
        super (scene, x,y,'asteroid');
        //velocidad de los asteroides
        this.speed = Phaser.Math.GetSpeed(100,1);
        this.orbiting =false;
        this.direction = 0;
       
    }
    isOrbiting(){
        return this.orbiting;
    }
      //se crean los parametros de los asteroides
    launch(ShipX,shipY){
        this.orbiting=true;
        this.setActive(true);
        this,setVisible(true);
       let xOrigin = Phaser.Math.RND.between(0,800);
       let yOrigin = 0;
       this.setPosition(xOrigin, yOrigin);
       //la pendiente de la recta que pasa por 2 puntos
       let m= (shipY - yOrigin) / (ShipX - xOrigin);
       this.direction = Math.atan(m);
       this.angleRotation = Phaser.Math.RND.between(0.2,0.9);

    }
    update(time,delta){
        this.x += Math.cos(this.direction) * this.speed * delta;
        this.y += Math.sin(this.direction) * this.speed * delta;
        this.angle += this.angleRotation;
        
        if (this.x < -50 ||this.y < -50 || this.x > 800 || this.y > 600){
            this.setActive(false);
            this.setVisible(false);
        }


    }
}