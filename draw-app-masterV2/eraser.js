function Eraser() {

    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    this.draw = function(){
        if(mouseIsPressed){
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;			}
			else{
                fill(255);
                noStroke();
                var n = 10;
                var nx = (mouseX-previousMouseX)/n;
                var ny = (mouseY-previousMouseY)/n;
				for(var i = 0; i < n; i++){
                    ellipse(previousMouseX,previousMouseY,this.getSize());
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

    this.unselectTool = function(){
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
        select(".toolOptions").html("");
    }

    this.populateOptions = function() {
        select(".toolOptions").html("<label for='slider'>Eraser Size:</label><input type='range' min='10' max='100' value='50' id='slider'></input>");
	}

    this.getSize = function() {
        return select("#slider").value();
    }
}