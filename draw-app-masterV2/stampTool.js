function StampTool() {

    this.icon = "assets/stampTool.jpg";
    this.name = "stampTool";

    var stampImage = loadImage(this.icon);

    var stamps = ["eraser", "freehand",
        "lineTo", "mirrorDraw", "sprayCan"];

    var drawing = false;

    var editing = false;

    var state;

    this.draw = function () {
        switch (state) {
            case 1:
                state1();
                break;
            case 2:
                state1();
                break;
            case 3:
                state1();
                break;
            case 4:
                state1();
                break;
        }
    }

    function state1() {
        if (mouseIsPressed) {
            if (!drawing) {
                drawing = true;
                loadPixels();
            }

            else {
                updatePixels();
                image(stampImage, mouseX - stampImage.width / 2, mouseY - stampImage.height / 2);
            }
        }
        else if (drawing) {
            loadPixels();
            drawing = false;
            editing = true;
            state++;
        }
    }

    function state2(){
        if(mouseIsPressed){
            if(helpers.insideCanvas){

            }
        }
        else if(!editing){
            loadPixels();
        }
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
    }

    this.populateOptions = function () {
        var html = "";
        for (var i = 0; i < stamps.length; i++) {

            select(".toolOptions").html("<button class='stamp' id='" + stamps[i] + "'>" + stamps[i] + "</button>", true);


        }
        for (var i = 0; i < stamps.length; i++) {
            select("#" + stamps[i]).mouseClicked(function () {
                stampImage = loadImage("assets/stamps/" + this.elt.id + ".jpg");
            });
        }

    }
}