function StampTool(){

    this.icon = "assets/stampTool.jpg";
    this.name = "stampTool";

    var stampImage = loadImage(this.icon);

    var stamps = ["eraser","freehand",
    "lineTo","mirrorDraw","sprayCan"];

    var drawing = false;


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
			if(!drawing){
				drawing = true;
				loadPixels();
			}

			else{
				updatePixels();
				image(stampImage,mouseX-stampImage.width/2,mouseY-stampImage.height/2);
			}
        }
		else if(drawing){
			loadPixels();
			drawing = false;
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