function ZoomTool() {
    this.icon = "assets/zoomtool.jpg";
    this.name = "ZoomTool";

    var img;
    var imageToZoom
    var w, h, tow, toh;
    var x, y, tox, toy;
    var zoom = .001; //zoom step per mouse tick
    var currentZoom = 0;
    x = tox = 0;
    y = toy = 0;
    var zoomAmount = 10;

    this.draw = function () {

        x = lerp(x, tox, .1);
        y = lerp(y, toy, .1);
        w = lerp(w, tow, .1);
        h = lerp(h, toh, .1);
        
        image(imageToZoom, x, y, w, h);
    }

    this.wheel = function(event){
        changeZoom(-event.delta)
    }

    function changeZoom(e) {

        if (e > 0) { //zoom in
            for (var i = 0; i < e; i++) {
                if (tow >= zoomAmount * img.width){
                    tow = zoomAmount * img.width;
                    toh = zoomAmount * img.height;
                    break;
                }
                tox -= zoom * (mouseX - tox);
                toy -= zoom * (mouseY - toy);
                tow *= zoom + 1;
                toh *= zoom + 1;
            }
        }

        if (e < 0) { //zoom out
            for (var i = 0; i < -e; i++) {
                if (tow <= img.width) {
                    tow = img.width;
                    toh = img.height;
                    break;
                }
                tox += zoom / (zoom + 1) * (mouseX - tox);
                toy += zoom / (zoom + 1) * (mouseY - toy);
                toh /= zoom + 1;
                tow /= zoom + 1;
            }
        }

        currentZoom=map(tow,img.width,img.width*zoomAmount,0,100);
        
        if(tox > 0) tox = 0;
        if(toy > 0) toy = 0;
        if(tox+tow<width) tox = width-tow;
        if(toy+toh<height) toy = height-toh;
        select("#currentZoom").html(currentZoom.toPrecision(3)+"%");

    }

    this.populateOptions = function () {
        select(".toolOptions").html("<span for='zoom'>Zoom:</span><span id='currentZoom'>"+currentZoom.toPrecision(3)+"%</span>");

        if (img==null){
            img = get();
            w = tow = img.width;
            h = toh = img.height;
        }

        imageToZoom = createGraphics(w,h);
        imageToZoom.image(img,0,0,w,h);
        img = get();
        imageToZoom.image(img,0-x,0-y,img.width,img.height);

        background(255,255,255);
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
    }

    //change zoom function made by: "mimimimimi" in https://editor.p5js.org/mimimimimi/sketches/SOkckqY_r

    //TO DO: change the pixel density of the canvas and wait for the image to load before executing the other functions
}