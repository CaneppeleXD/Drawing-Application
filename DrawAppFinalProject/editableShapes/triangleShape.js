function TriangleShape() {
    this.name = "TriangleShape";
    this.icon = "assets/shapes/triangleShape.jpg";
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
            this.drawShape(x,y);
        }
        //Enters if the mouse is released
        else if (!this.firstDrawing) {
            this.editingPosition = true;
            //If the user clicks the canvas, the program ends the positioning of the shape by setting firstdrawing to false
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
        //Calculates the X and Y of the triangle's points
        //first one is the X positio of the triangle plus half between the X difference between the original triangle's X position 
        var x1 = this.posX + (x - this.posX) / 2;
        //first Y is the same Y as the triangle's 
        var y1 = this.posY;
        //second X is the same as th triangle's
        var x2 = this.posX;
        //second Y is the mouse's current Y
        var y2 = y;
        //third Y is the mouse's current X
        var x3 = x;
        //third Y is the mouse's current Y
        var y3 = y;
        //draws the triangle
        triangle(x1, y1, x2, y2, x3, y3);
    }
}