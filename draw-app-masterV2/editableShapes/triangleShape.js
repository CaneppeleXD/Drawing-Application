function TriangleShape() {
    this.name = "TriangleShape";
    this.icon = "assets/shapes/triangleShape.jpg";
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
        var x1 = this.posX + (x - this.posX) / 2;
        var y1 = this.posY;
        var x2 = this.posX;
        var y2 = y;
        var x3 = x;
        var y3 = y;
        triangle(x1, y1, x2, y2, x3, y3);
    }
}