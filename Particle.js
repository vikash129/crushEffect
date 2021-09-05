class Particle {

    constructor(w, h) {
        this.w = w
        this.h = h
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.y = 0;
        this.speed = 0;
        this.vel = Math.random() * 0.5;
        this.size = Math.random() * 2.5 + 0.2 
        this.angle = 0
        
    }

    update(mappedImage) {

        this.posy = Math.floor(this.y)
        this.posx = Math.floor(this.x)

        if ((mappedImage[this.posy]) && (mappedImage[this.posy][this.posx])) {
            this.speed = mappedImage[this.posy][this.posx][0]

        

        }
      
        let movement = (2.5 - this.speed) + this.vel 

        this.angle+=this.speed/20
        this.size = this.speed * 2



        this.y += movement + Math.sin(this.angle)
         

        if (this.y >= this.h) {
            this.y = 0;
            this.x = Math.random() * this.w
        }

        this.x += movement    + Math.random(this.angle);

        if (this.x >= this.w) {
            this.x = 0;
            this.y = Math.random() * this.h
        }
    }
    draw(ctx, grd1 , mappedImage) {

        ctx.beginPath()

        // if ((mappedImage[this.posy]) && (mappedImage[this.posy][this.posx])) {
        //     ctx.fillStyle =  mappedImage[this.posy][this.posx][1]
        // }

        ctx.fillStyle = grd1


        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        // ctx.strokeStyle = grd1
        // ctx.strokeRect(this.x, this.y, this.size * 3, this.size * 3)
        ctx.fill()
    }



}
