function StampTool(){

    this.icon = "assets/stampTool.jpg";
    this.name = "stampTool";

    var stampImage = loadImage(this.icon);

    var stamps = ["eraser","freehand",
    "lineTo","mirrorDraw","sprayCan"];

    var drawing = false;

    var startMouseX = -1;
	var startMouseY = -1;
    var previousMouseX = 0;
    var previousMouseY = 0;
    var mouseWasPressed = false;
    this.draw = function(){
        // if(mouseIsPressed){
        //     if(!mouseWasPressed){
        //         image(stampImage,mouseX-stampImage.width/2,mouseY-stampImage.height/2);
        //         mouseWasPressed=true;
        //     }
        // }
        // else{
        //     if(mouseWasPressed) mouseWasPressed=false;
        // }

        if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

			else{
				updatePixels();
				image(stampImage,startMouseX-stampImage.width/2,startMouseY-stampImage.height/2);
                if (previousMouseX!=mouseX && previousMouseY!=mouseY){
                stampImage.width+=mouseX-startMouseY;
                stampImage.height+=mouseY-startMouseY;
                }
                previousMouseX = mouseX;
                previousMouseY = mouseY;
			}
        }
		else if(drawing){
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
    }

    this.unselectTool = function(){
        select(".toolOptions").html("");
    }

    this.populateOptions = function(){
        var html = "";
        for (var i = 0; i < stamps.length; i++){
            
            select(".toolOptions").html("<button class='stamp' id='"+stamps[i]+"'>"+stamps[i]+"</button>",true);
            
            
        }
        for (var i = 0; i < stamps.length; i++){
            select("#"+stamps[i]).mouseClicked(function() {
                stampImage = loadImage("assets/stamps/"+this.elt.id+".jpg");
            });    
        }
        
    }
}