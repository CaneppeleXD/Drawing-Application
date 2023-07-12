function Eraser() {

    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    this.draw = function () {
        if (mouseIsPressed) {
            fill(255);
            noStroke();
            ellipse(mouseX, mouseY, 20);
        }
    }

    this.unselectTool = function(){
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
    }
}