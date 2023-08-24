function EllipseShape() {
    this.name = "ellipseShape";
    this.icon = "assets/shapes/EllipseShape.jpg";
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
            this.drawShape(x, y)
        }
        else if (!this.firstDrawing) {
            this.editingPosition = true;
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
        ellipse(this.posX, this.posY, (x - this.posX) * 2, (y - this.posY) * 2);
    }
}