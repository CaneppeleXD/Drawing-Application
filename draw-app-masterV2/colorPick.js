function ColorPick(image, imageWidth, imageHeight, mapWidth, mapHeight) {
    this.icon = "assets/colorpick.jpg";
    this.name = "ColorPick";

    this.image = image;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    var currentColour = [255, 255, 255];

    var previouslyPressed = false;

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {
            if (!previouslyPressed) {
                currentColour = getColorInPosition(mouseX, mouseY, this.imageWidth, this.imageHeight, this.mapWidth, this.mapHeight);
                changecurrentColourViewer();
                stroke(currentColour);
                fill(currentColour);
                previouslyPressed = true;
            }
        }
        else {
            previouslyPressed = false;
        }
    }

    function getColorInPosition(x, y, w, h, mapWidth, mapHeight) {
        x = map(x, 0, mapWidth, 0, w);
        y = map(y, 0, mapHeight, 0, h);
        var pixelColor = image.get(x, y);
        var r = pixelColor[0];
        var g = pixelColor[1];
        var b = pixelColor[2];
        var a = pixelColor[3];
        return [r, g, b, a];
    }

    this.populateOptions = function () {

    }

    function changecurrentColourViewer() {
        select("#displaySelectedColour").style("background-color", "rgb(" + currentColour.join(",") + ")");
        helpers.currentColour = currentColour;
    }

    this.unselectTool = function () {

    }

}