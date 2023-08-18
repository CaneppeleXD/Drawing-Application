function ColorPick() {
    this.icon = "assets/colorpick.jpg";
    this.name = "ColorPick";

    var currentColour = [255, 255, 255];

    var previouslyPressed = false;

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {
            if (!previouslyPressed) {
                loadPixels();
                currentColour = getColorInPosition(mouseX, mouseY);
                changecurrentColourViewer();
                stroke(currentColour);
                fill(currentColour);
                previouslyPressed = true;
            }
        }
        else{
            previouslyPressed = false;
        }
    }

    function getColorInPosition(x, y) {
        var pixelColor = get(x, y);
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