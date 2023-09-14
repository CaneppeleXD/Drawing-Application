function InvertColour() {

    this.icon = "assets/invertColour.jpg";
    this.name = "invertColour";

    var previousClicked = true;
    //Saves the pixels values so a pixel that was already inverted by the user doesn't get inverted again before he has released the click
    var savedPixels = [];

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {
            //Guarrantees the user has released the mouse after selecting the tool
            if (!previousClicked) {
                invertPixels(mouseX, mouseY, getSize(), getSize());
                updatePixels();
            }
        }
        else {
            //Resets the variables
            loadPixels();
            savedPixels = pixels.slice();
            previousClicked = false;
        }
    }

    var invertPixels = function (x, y, w, h) {
        //Creates a kind of square, all the pixels inside will be inverted
        var startX = x - w / 2;
        var endX = x + w / 2;
        var startY = y - h / 2;
        var endY = y + h / 2;
        //Iterates over the pixels inside de square to invert them
        for (var coordX = startX; coordX < endX; coordX++) {
            for (var coordY = startY; coordY < endY; coordY++) {
                invertPixel(coordX, coordY);
            }
        }
    }
    //Gets the pixels in the the X and Y and invert it's rgb values
    var invertPixel = function (x, y) {
        //Get from https://p5js.org/reference/#/p5/pixels
        let d = pixelDensity();
        for (let i = 0; i < d; i++) {
            for (let j = 0; j < d; j++) {
                // loop over
                index = 4 * ((y * d + j) * width * d + (x * d + i));
                //Inverts the red, green and blue by subtracting the value from 255
                pixels[index] = 255 - savedPixels[index];
                pixels[index + 1] = 255 - savedPixels[index + 1];
                pixels[index + 2] = 255 - savedPixels[index + 2];
            }
        }
    }

    this.populateOptions = function () {
        //Creates a slider to control the inverter size
        select(".toolOptions").html("<label for='slider'>Inverter Size:</label><input type='range' min='10' max='100' value='50' id='slider'></input>");
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
    }

    var getSize = function () {
        return select("#slider").value();
    }
}