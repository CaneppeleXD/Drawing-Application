function ColorPick(image, imageWidth, imageHeight, mapWidth, mapHeight) {
    this.icon = "assets/colorpick.jpg";
    this.name = "ColorPick";

    //These properties allow the tool to select the pixel in the image it is supposed to
    //As the image might be scaled up from its original values, it's necessary to store its original width and height and its
    // new widht and height
    this.image = image;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    var currentColour = [255, 255, 255];

    var previouslyPressed = false;

    this.draw = function () {
        //Checks if the mouse has been pressed inside the canvas
        if (mouseIsPressed && helpers.insideCanvas) {
            //Ensures the colour picked doesn't change if the user holds the mouse clicked
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

    //Gets the pixel colour where the user has clicked 
    function getColorInPosition(x, y, w, h, mapWidth, mapHeight) {
        //Calculates the right X and Y
        x = map(x, 0, mapWidth, 0, w);
        y = map(y, 0, mapHeight, 0, h);
        var pixelColor = image.get(x, y);
        //Gets the red value
        var r = pixelColor[0];
        //Gets the green value
        var g = pixelColor[1];
        //Gets the blue value
        var b = pixelColor[2];
        //Gets the alpha value
        var a = pixelColor[3];
        return [r, g, b, a];
    }

    this.populateOptions = function () {

    }

    function changecurrentColourViewer() {
        //Changes the colour from the display that showns the current colour
        select("#displaySelectedColour").style("background-color", "rgb(" + currentColour.join(",") + ")");
        //Changes the currentColour of the app so other tools that control the colour works as expected
        helpers.currentColour = currentColour;
    }

    this.unselectTool = function () {

    }

}