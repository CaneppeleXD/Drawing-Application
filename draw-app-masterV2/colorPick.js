function ColorPick() {
    this.icon = "assets/colorpick.jpg";
    this.name = "ColorPick";

    var currentColor = [255, 255, 255];

    var previouslyPressed = false;

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {
            if (!previouslyPressed) {
                loadPixels();
                currentColor = getColorInPosition(mouseX, mouseY);
                changeCurrentColorViewer();
                stroke(currentColor);
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
        select(".toolOptions").html("<span>Current Color Picked</span>");
        var currentColor = createDiv()
        currentColor.parent("toolOptions");
        currentColor.class('colourSwatches');
        currentColor.id("colorPickCurrentColor");
        changeCurrentColorViewer();

    }

    function changeCurrentColorViewer() {
        select("#colorPickCurrentColor").style("background-color", "rgb(" + currentColor.join(",") + ")");
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
    }
}