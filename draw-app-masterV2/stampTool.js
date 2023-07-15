function StampTool() {

    this.icon = "assets/stampTool.jpg";
    this.name = "stampTool";

    var stampImage = loadImage(this.icon);

    var stamps = ["eraser", "freehand",
        "lineTo", "mirrorDraw", "sprayCan"];

    var drawing = false;

    var editing = false;

    var waiting = false;

    var imageX;

    var imageY;

    var state;

    var centerX = 0;

    var centerY = 0;

    var previousMouseX = 0;

    var previousMouseY = 0;

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
            rect(imageX - 5, imageY - 5, stampImage.width + 10, stampImage.height + 10);
        }
        else {
            updateImagePosition();
        }
        image(stampImage, imageX, imageY);
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
    }

    function updateImagePosition() {
        if (!editing) {
            imageX = mouseX - stampImage.width / 2;
            imageY = mouseY - stampImage.height / 2;
        }

        if (previousMouseX != 0) {
            imageX = imageX + mouseX - previousMouseX;
            imageY = imageY + mouseY - previousMouseY;
        }

        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }

    function insideImage() {
        return mouseX > imageX && mouseX < imageX + stampImage.width && mouseY > imageY && mouseY < imageY + stampImage.height;
    }

    function clickedBorder() {
        return mouseX > imageX - 5 && mouseX < imageX + stampImage.width + 10 && mouseY > imageY - 5 && mouseY < imageY + stampImage.height + 10;
    }

    function updateImageSize(n) {
        if (previousMouseX != 0) {
            switch (n) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    stampImage.width = stampImage.width + mouseX - previousMouseX;
                    stampImage.height = stampImage.height + mouseY - previousMouseY;
                    break;
            }
        }
        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }

    function getCorner() {
        if (mouseX < imageX && mouseX < imageY) {
            return 1;
        }
        else if (mouseX > imageX + stampImage.width && mouseY < imageY) {
            return 2;
        }
        else if (mouseX < imageX && mouseY > imageY + stampImage.height) {
            return 3;
        }
        else if (mouseX > imageX + stampImage.width && mouseY > imageY + stampImage.height) {
            return 4;
        }
    }

    function state2() {
        if (editing) {
            updatePixels();
            drawImage();
            if (mouseIsPressed) {
                if (insideImage()) {
                    updateImagePosition();
                }
                else if (clickedBorder()) {
                    console.log(getCorner());
                    updateImageSize(getCorner());
                }
                else {
                    editing = false;
                }
            }
            else {
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
            waiting = false;
            state = 1;
        }
    }

    this.unselectTool = function () {
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
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
        state = 1;
    }
}