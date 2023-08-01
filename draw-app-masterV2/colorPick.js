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
                fill(currentColor);
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
        currentColor.mouseClicked(mouseClick);
        changeCurrentColorViewer();
    }

    function changeCurrentColorViewer() {
        select("#colorPickCurrentColor").style("background-color", "rgb(" + currentColor.join(",") + ")");
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
    }

    function mouseClick(){
        var current = select("#" + colourP.selectedColour + "Swatch");
		current.style("border", "0");
		fill(currentColor);
		stroke(currentColor);
		this.style("border", "2px solid blue");
        // uma boa ideia seria mudar a maneira como as cores sao selecionadas, ao inves de mudar a borda do quadrada da cor atual, mostrar um quadrado separado com a cor atual, tipo
        // como é mostrado a cor pega pelo color pick, dessa forma ficaria melhor para usar
    }
}