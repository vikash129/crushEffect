const myImage = new Image()

// var dataList = ['family', 'sh2', 'vk', 'shreya', 'sadaf2', 'sadaf3', 'mummy', 'pro', 'sadaf' , 'mummy']
// var dataList = ['spider']
// let imgData = dataList[Math.floor(Math.random() * dataList.length)];

fetch('imgData/' + 'spider' + '.txt').then(res => res.text()).then(src => myImage.src = src)

const chg = document.getElementById('change')
const val = document.getElementById('val')
let a = 1

chg.addEventListener('click', (e) => {
    a += 1
    val.innerHTML = a

})
myImage.addEventListener('load', () => {

    const canvas = document.getElementById('canvas')
    // let h = myImage.height
    // let w = myImage.width
    //  if (w > 700 || h > 800){w = 700 ; h = 800}
    w = 500
    h = 700
    canvas.width = w
    canvas.height = h
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')



    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)

    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    let pixelsData = pixels.data

    // console.log('pisels' , pixelsData)

    // let particles = []
    // const noOfParticles = 5000

    // let mappedImage = []

    for (let i = 0; i < pixelsData.length; i += 4) {
        const total = pixelsData[i] + pixelsData[i + 1] + pixelsData[i + 2]
        const avgColor = total / 3
        // console.log(avgColor)

        pixelsData[i] = avgColor * a
        pixelsData[i + 1] = avgColor * a + 3
        pixelsData[i + 2] = avgColor * a + 6

    }
    pixelsData = pixels.data
    ctx.putImageData(pixels, 0, 0)
    // console.log(row.length , mappedImage.length)


    function relativeBrightness(r, g, b) {
        return Math.sqrt(
            (r * r) * 0.3 +
            (g * g) * 0.3 +
            (b * b) * 0.3

        ) / 100
    }

    function init() {
        for (let i = 0; i < noOfParticles; i++) {
            particles.push(new Particle(canvas.width, canvas.height))
        }
    }

    // init()

    function animate() {

        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#33495f'
        // ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particles.length; i++) {

            particles[i].update(mappedImage)
            ctx.globalAlpha = particles[i].speed * 0.5;
            particles[i].draw(ctx)
        }


        // requestAnimationFrame(animate)
    }
    // animate()

})


