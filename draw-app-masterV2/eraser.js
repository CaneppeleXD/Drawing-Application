function Eraser() {

    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    this.unselectTool = function(){
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
    }

    this.draw = function(){
		if(mouseIsPressed){
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			else{
                fill(255);
                noStroke();
                var n = 5;
                var nx = (mouseX-previousMouseX)/n;
                var ny = (mouseY-previousMouseY)/n;
				while (Math.abs(previousMouseX-mouseX)>nx){
                    ellipse(previousMouseX,previousMouseY,50)
                    previousMouseX+=nx;
                    previousMouseY+=ny;
                }
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	}
}