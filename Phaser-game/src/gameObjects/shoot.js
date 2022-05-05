//se crea clase de disparos
export default class shoot extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y){
        //sprite en escena 
        super (scene, x,y,'shoot');
        //velocidad de las balas 
        this.speed = Phaser.Math.GetSpeed(400,1);
       
    }
      //se instancia el disparo en la nave
    fire(x,y,direccion){
        this.setPosition(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.direction = direction;
        this.rotation = this.direction;
        
      

    }
    update(time,delta){
        this.x +=1;
        this.y +=1;
        


    }
}