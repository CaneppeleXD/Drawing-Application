function Eraser() {

    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    //Draws small circles to simulate a eraser effect
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
                //Draws ellipses between the previous mouse position and the current mouse position to ensue there will be no gap
                //that was not erased
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
        //Turns settings back to what they were before selecting the eraser tool
        if(helpers.fill) fill(helpers.currentColour);
        stroke(helpers.currentColour);
        select(".toolOptions").html("");
    }

    this.populateOptions = function() {
        //Creates a slider to control the eraser size
        select(".toolOptions").html("<label for='slider'>Eraser Size:</label><input type='range' min='10' max='100' value='50' id='slider'></input>");
	}

    this.getSize = function() {
        return select("#slider").value();
    }
}