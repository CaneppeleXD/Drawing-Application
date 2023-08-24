function SquareShape() {
    this.name = "SquareShape";
    this.icon = "assets/shapes/SquareShape.jpg";
    this.firstDrawing = true;
    this.editingPosition = false;
    this.posX;
    this.posY;

    this.draw = function (previousX, previousY, x, y, fill) {
        if (previousX != -1 && !this.editingPosition) {
            if (this.firstDrawing) {
                loadPixels();
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            lastX = x;
            lastY = y;
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