function ZoomTool() {
    this.icon = "assets/zoomtool.jpg";
    this.name = "ZoomTool";

    var img;
    var w, h, tow, toh;
    var x, y, tox, toy;
    var zoom = .001; //zoom step per mouse tick
    var currentZoom = 0;

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {

        }
        else {
            previouslyPressed = false;
        }

        x = lerp(x, tox, .1);
        y = lerp(y, toy, .1);
        w = lerp(w, tow, .1);
        h = lerp(h, toh, .1);

        // image(img, x - w / 2, y - h / 2, w, h);
        
        image(img, x, y, w, h);
    }

    this.wheel = function(event){
        changeZoom(-event.delta)
    }

    function changeZoom(e) {

        if (e > 0) { //zoom in
            for (var i = 0; i < e; i++) {
                if (tow >= 20 * img.width) return; //max zoom
                tox -= zoom * (mouseX - tox);
                toy -= zoom * (mouseY - toy);
                tow *= zoom + 1;
                toh *= zoom + 1;
                
            }
            currentZoom+=100/20;
        }

        if (e < 0) { //zoom out
            for (var i = 0; i < -e; i++) {
                if (tow <= img.width) return; //min zoom
                tox += zoom / (zoom + 1) * (mouseX - tox);
                toy += zoom / (zoom + 1) * (mouseY - toy);
                toh /= zoom + 1;
                tow /= zoom + 1;
            }
            currentZoom-=100/20;
        }

        if(tox > 0) tox = 0;
        if(toy > 0) toy = 0;
        if(tox+tow<width) tox = width-tow;
        if(toy+toh<height) toy = height-toh;
        select("#currentZoom").html(currentZoom+"%");
    }

    this.populateOptions = function () {
        select(".toolOptions").html("<span for='zoom'>Zoom:</span><span id='currentZoom'>0%</span>");

        img = get();

        background(255,255,255);

        w = tow = img.width;
        h = toh = img.height;
        x = tox = 0;
        y = toy = 0;
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
    }

    //change zoom function made by: "mimimimimi" in https://editor.p5js.org/mimimimimi/sketches/SOkckqY_r
}