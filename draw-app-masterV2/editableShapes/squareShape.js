function SquareShape() {
    this.name = "SquareShape";
    this.icon = "assets/shapes/SquareShape.jpg";
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
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            this.drawShape(x,y);
        }
        else if (!this.firstDrawing) {
            this.editingPosition = true;
            if (mouseIsPressed) this.firstDrawing = true;
            updatePixels();
            this.drawShape(x,y);
        }
        else {
            loadPixels();
            this.editingPosition = false;
        }
    }

    this.drawShape = function(x,y) {
        var size = helpers.getEqualSizes(x - this.posX, y - this.posY);
        rect(this.posX, this.posY, size.resX, size.resY);
    }
}