function CircleShape() {
    this.name = "circleShape";
    this.icon = "assets/shapes/circleShape.jpg";
    //Is set to true if is first time the shape has been drawn on the canvas
    this.firstDrawing = true;
    //Controls if the shape's position is ready to be changes
    this.editingPosition = false;
    //Control the coord X and Y of the shape
    this.posX;
    this.posY;

    this.draw = function (previousX, previousY, x, y, fill) {
        //If statement to determine which in which state the shape is (Drawing, Positioning, Finish)
        if (previousX != -1 && !this.editingPosition) {
            //User has clicked the screen and started drawing the shape
            //If it's their first click, the program saves the coord X and Y and also load the pixels
            if (this.firstDrawing) {
                loadPixels();
                //Sets the coord X and Y of shape to where the user has clicked
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            //draws the shape by calling a custom function
            //The X and Y here are the mouse's X and Y
            this.drawShape(x, y)
        }
        //Enters if the mouse is released
        else if (!this.firstDrawing) {
            this.editingPosition = true;
            //If the user clicks the canvas, the program ends the positioning of the shape by setting firstdrawing to false
            if (mouseIsPressed) this.firstDrawing = true;
            updatePixels();
            this.drawShape(x, y);
        }
        else {
            loadPixels();
            this.editingPosition = false;
        }
    }

    this.drawShape = function (x, y) {
        //Gets the correct size for the circle by calling this function
        //The paramete is how much the mouse has moved from the original position
        var size = helpers.getEqualSizes(x - this.posX, y - this.posY);
        //Draws the circle, X and Y are multiplied by two because P5.js uses the diameter as width and height
        ellipse(this.posX, this.posY, size.resX * 2, size.resY * 2);
    }
}