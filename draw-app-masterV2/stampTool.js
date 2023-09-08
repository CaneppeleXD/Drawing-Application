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

    //Determines in which state the stamping is
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

    function state1() {
        //Draws the image for the first time
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

    function state2() {
        if (editing) {
            updatePixels();
            drawImage();
            if (mouseIsPressed) {
                //Changes the image postion if the user clicks inside the image
                if (insideImage() && !onBorder) {
                    updateImagePosition();
                }
                //Changes image size if the user has clicked inside the border
                else if (clickedBorder() || onBorder) {
                    updateImageSize(getCorner());
                    onBorder = true;
                }
                //Turns the editing to false if the user has clicked outside the image's scope
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
            //Updates the pixel array so the image is permanent fixed to the canvas and goes to the other state
            waiting = true;
            updatePixels();
            drawImage();
            loadPixels();
            state++;
        }
    }

    function state3() {
        //Finalizes the stamping if the user has released its click
        if (!mouseIsPressed) {
            //Loads the image again so the variables get set to its default value
            stampImage = loadImageCustom(currentImagePath);
            waiting = false;
            state = 1;
        }
    }

    //Draw the image with some addicional things such has a ractangle around it so the user knows that they can change its size
    function drawImage() {
        if (waiting) { }
        //Prints a rectangle around the image if its size is ready to be edited
        else if (editing) {
            stroke(0);
            noFill();
            strokeWeight(2);
            rect(imageX - 5, imageY - 5, imageWidth + 10, imageHeight + 10);
        }
        else {
            updateImagePosition();
        }

        //If its the first time image is beeing printed, will print it with its dafult widht and height, if not, the widht and height are controlled by private variables
        if(imageWidth == 0){
            image(stampImage, imageX, imageY);
            imageWidth = stampImage.width;
            imageHeight = stampImage.height;   
        }
        else{
            image(stampImage, imageX, imageY, imageWidth, imageHeight);
        }
    }

    //Updates variables that control the images position
    function updateImagePosition() {
        //Ensures the center of the image is placed where the user has clicked if it's not ready to be edited
        if (!editing) {
            imageX = mouseX - imageWidth / 2;
            imageY = mouseY - imageHeight / 2;
        }

        //Only enters here if it's not the first time the function is called
        if (previousMouseX != 0) {
            imageX = imageX + mouseX - previousMouseX;
            imageY = imageY + mouseY - previousMouseY;
        }

        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }

    //Checks if the user has clicked inside the image, it has some little padding for better UX
    function insideImage() {
        return mouseX > imageX + 4 && mouseX < imageX + imageWidth - 4 && mouseY > imageY + 4 && mouseY < imageY + imageHeight - 4;
    }

    //Checks if the user has clicked in the border. Uses a margin to know that
    function clickedBorder() {
        return mouseX > imageX - margin && mouseX < imageX + imageWidth + margin && mouseY > imageY - margin && mouseY < imageY + imageHeight + margin;
    }

    //Changes the value of the varaibles which control the width and height of the image
    function updateImageSize(n) {
        //Checkes if the user has clicked in the canvas
        if (previousMouseX != 0) {
            var nx = mouseX - previousMouseX;
            var ny = mouseY - previousMouseY;
            //Determines in which place of the image the user is
            //1 = Top Left; 2 = Top Right; 3 = Botton Left; 4 = Botton Right
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

    //Determines in which corner the user is with the mouse on
    function getCorner() {
        //Returns the current corner if the user has already clicked in the border of the image
        if(onBorder){
            return currentCorner;
        }
        
        //Top Left side
        if (mouseX < imageX + imageWidth / 2 && mouseY < imageY + imageHeight / 2) {
            currentCorner = 1;
        }
        //Top Right side
        else if (mouseX > imageX + imageWidth / 2 && mouseY < imageY + imageHeight / 2) {
            currentCorner = 2;
        }
        //Botton Left side
        else if (mouseX < imageX + imageWidth / 2 && mouseY > imageY + imageHeight / 2) {
            currentCorner = 3;
        }
        //Botton Right side
        else if (mouseX > imageX + imageWidth / 2 && mouseY > imageY + imageHeight / 2) {
            currentCorner = 4;
        }
        
        return currentCorner;
    }

    function loadImageCustom(path){
        //This functions loads an image and sets the variabled that control its width and height to zero, it also makes use of asynchronous
        // code with the waiting variable that when gets the false value when the image is ready
        waiting = true;
        stampImage = loadImage(path,function(){waiting = false;});
        imageWidth = 0;
        imageHeight = 0;
    }

    this.unselectTool = function () {
        //Ensures the settings are the same has they were before selecting the stamp tool
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
        select(".toolOptions").html("");
        strokeWeight(lineWeight.getWeight());
    }

    this.populateOptions = function () {
        //Populate the test stamps so the user don't need to upload a file from his device to test the stamp
        for (var i = 0; i < stamps.length; i++) {

            select(".toolOptions").html("<button class='stamp' id='" + stamps[i] + "'>" + stamps[i] + "</button>", true);


        }
        //It needed to be splited in two separate for loops because the buttons weren't receiving the mouse clicked event if done in the same loop
        for (var i = 0; i < stamps.length; i++) {
            select("#" + stamps[i]).mouseClicked(function () {
                currentImagePath = "assets/stamps/" + this.elt.id + ".jpg";
                stampImage = loadImageCustom(currentImagePath);
            });
        }

        //Creates a file input so the user can upload a picture from his device to be stamped
        fileInput = createFileInput(function(file){if(file.type == "image") currentImagePath = file.data;});
        fileInput.parent("toolOptions");
        fileInput.html('Click to select an image file');
        state = 1;
    }
}