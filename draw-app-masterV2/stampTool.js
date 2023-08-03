function StampTool() {

    this.icon = "assets/stampTool.jpg";
    this.name = "stampTool";

    var stampImage;

    var stamps = ["eraser", "freehand",
        "lineTo", "mirrorDraw", "sprayCan"];

    var currentImagePath = this.icon;

    var drawing = false;

    var editing = false;

    var waiting = false;

    var imageX;

    var imageY;

    var imageWidth;

    var imageHeight;

    var state;

    var centerX = 0;

    var centerY = 0;

    var previousMouseX = 0;

    var previousMouseY = 0;

    var margin = 10;

    var onBorder;

    var currentCorner;

    var fileInput;

    this.draw = function () {
        switch (state) {
            case 1:
                state1();
                break;
            case 2:
                state2();
                break;
            case 3:
                state3();
                break;
        }
    }

    function drawImage() {
        if (waiting) { }
        else if (editing) {
            stroke(0);
            noFill();
            strokeWeight(2);
            rect(imageX - 5, imageY - 5, imageWidth + 10, imageHeight + 10);
        }
        else {
            updateImagePosition();
        }

        if(imageWidth == 0){
            image(stampImage, imageX, imageY);
            imageWidth = stampImage.width;
            imageHeight = stampImage.height;   
        }
        else{
            image(stampImage, imageX, imageY, imageWidth, imageHeight);
        }
    }

    function state1() {
        if (mouseIsPressed && helpers.insideCanvas) {
            if (!drawing) {
                drawing = true;
                loadPixels();
            }

            else {
                updatePixels();
                drawImage();
            }
        }
        else if (drawing) {
            drawing = false;
            editing = true;
            state++;
        }
        else{
            loadImageCustom(currentImagePath);
        }
    }

    function updateImagePosition() {
        if (!editing) {
            imageX = mouseX - imageWidth / 2;
            imageY = mouseY - imageHeight / 2;
        }

        if (previousMouseX != 0) {
            imageX = imageX + mouseX - previousMouseX;
            imageY = imageY + mouseY - previousMouseY;
        }

        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }

    function insideImage() {
        return mouseX > imageX + 4 && mouseX < imageX + imageWidth - 4 && mouseY > imageY + 4 && mouseY < imageY + imageHeight - 4;
    }

    function clickedBorder() {
        return mouseX > imageX - margin && mouseX < imageX + imageWidth + margin && mouseY > imageY - margin && mouseY < imageY + imageHeight + margin;
    }

    function updateImageSize(n) {
        if (previousMouseX != 0) {
            var nx = mouseX - previousMouseX;
            var ny = mouseY - previousMouseY;
            switch (n) {
                case 1:
                    imageX = imageX + nx;
                    imageY = imageY + ny;
                    imageWidth = imageWidth - nx;
                    imageHeight = imageHeight - ny;
                    break;
                case 2:
                    imageY = imageY + ny;
                    imageWidth = imageWidth + nx;
                    imageHeight = imageHeight - ny;
                    break;
                case 3:
                    imageX = imageX + nx;
                    imageWidth = imageWidth - nx;
                    imageHeight = imageHeight + ny;
                    break;
                case 4:
                    imageWidth = imageWidth + nx;
                    imageHeight = imageHeight + ny;
                    break;
            }
        }
        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }

    function getCorner() {
        if(onBorder){
            return currentCorner;
        }
        
        if (mouseX < imageX + imageWidth / 2 && mouseY < imageY + imageHeight / 2) {
            currentCorner = 1;
        }
        else if (mouseX > imageX + imageWidth / 2 && mouseY < imageY + imageHeight / 2) {
            currentCorner = 2;
        }
        else if (mouseX < imageX + imageWidth / 2 && mouseY > imageY + imageHeight / 2) {
            currentCorner = 3;
        }
        else if (mouseX > imageX + imageWidth / 2 && mouseY > imageY + imageHeight / 2) {
            currentCorner = 4;
        }
        
        return currentCorner;
    }

    function state2() {
        if (editing) {
            updatePixels();
            drawImage();
            if (mouseIsPressed) {
                if (insideImage() && !onBorder) {
                    console.log("insideImage");
                    updateImagePosition();
                }
                else if (clickedBorder() || onBorder) {
                    console.log(getCorner());
                    updateImageSize(getCorner());
                    onBorder = true;
                }
                else {
                    editing = false;
                }
            }
            else {
                onBorder = false;
                previousMouseX = 0;
                previousMouseY = 0;
            }
        }
        else {
            waiting = true;
            updatePixels();
            drawImage();
            loadPixels();
            state++;
        }
    }

    function state3() {
        if (!mouseIsPressed) {
            stampImage = loadImageCustom(currentImagePath);
            waiting = false;
            state = 1;
        }
    }

    function loadImageCustom(path){
        waiting = true;
        stampImage = loadImage(path,function(){waiting = false;});
        imageWidth = 0;
        imageHeight = 0;
    }

    this.unselectTool = function () {
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
        select(".toolOptions").html("");
        strokeWeight(lineWeight.getWeight());
    }

    this.populateOptions = function () {
        var html = "";
        for (var i = 0; i < stamps.length; i++) {

            select(".toolOptions").html("<button class='stamp' id='" + stamps[i] + "'>" + stamps[i] + "</button>", true);


        }
        for (var i = 0; i < stamps.length; i++) {
            select("#" + stamps[i]).mouseClicked(function () {
                currentImagePath = "assets/stamps/" + this.elt.id + ".jpg";
                stampImage = loadImageCustom(currentImagePath);
            });
        }
        fileInput = createFileInput(function(file){if(file.type == "image") currentImagePath = file.data;});
        fileInput.parent("toolOptions");
        fileInput.html('Click to select an image file');
        state = 1;
    }
}