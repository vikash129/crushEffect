const myImage = new Image()

var dataList = ['sadaf2', 'sadaf3',  'sadaf' ]
let imgData = dataList[Math.floor(Math.random() * dataList.length)];

fetch('imgData/' + imgData + '.txt').then(res => res.text()).then(src => myImage.src = src)


myImage.addEventListener('load', () => {

    const canvas = document.getElementById('canvas')

    // w = 500
    // h = 706
    let h = myImage.height
    let w = myImage.width

    canvas.width = w
    canvas.height = h
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px'
    canvas.style.border = '2px solid white' 
    const ctx = canvas.getContext('2d')

    const grd1 = ctx.createLinearGradient( 0, 0, canvas.width, canvas.height)
grd1.addColorStop(0.2 , 'pink')
grd1.addColorStop(0.3 , 'red')
grd1.addColorStop(0.4 , 'orange')
grd1.addColorStop(0.5 , 'yellow')
grd1.addColorStop(0.6 , 'green')
grd1.addColorStop(0.7 , 'turquoise')
grd1.addColorStop(0.8 , 'violet')

    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)

    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)


    let pixelsData = pixels.data
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    let mappedImage = []

    for (let y = 0; y < canvas.height; y++) {
        row = []
        for (let x = 0; x < canvas.width; x++) { //x += 4

            const red = pixelsData[(y * 4 * pixels.width) + (x * 4)]
            const green = pixelsData[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixelsData[(y * 4 * pixels.width) + (x * 4 + 2)]

            const brightness = relativeBrightness(red, green, blue)

            // const cell = [
            //     cellBrightness = brightness,
            //     cellColor = `rgb(${red},${green},${blue})`
            // ]
            const cell = [
                brightness,`rgb(${red},${green},${blue})`
            ]

            row.push(cell)
        }

        mappedImage.push(row) //706

    }

    pixels.data = pixelsData



    function relativeBrightness(r, g, b) {
        return Math.sqrt(
            (r * r) * 0.299 +
            (g * g) * 0.587 +
            (b * b) * 0.114

        ) / 100
    }

    let particles = []
    const noOfParticles = 3000

    function init() {
        for (let i = 0; i < noOfParticles; i++) {
            particles.push(new Particle(canvas.width, canvas.height))
        }
    }

    init()

    function animate() {

        ctx.globalAlpha = 0.05;
        // ctx.fillStyle = 'blue'
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particles.length; i++) {

            particles[i].update(mappedImage)
            ctx.globalAlpha = particles[i].speed * 0.5;
            particles[i].draw(ctx, grd1 ,mappedImage)
        }

       
        requestAnimationFrame(animate)
    }
    animate()
    // setInterval(() => {
    //     animate()
    // }, 100);

})


