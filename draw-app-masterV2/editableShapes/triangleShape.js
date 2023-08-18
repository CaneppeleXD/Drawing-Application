function TriangleShape() {
    this.name = "TriangleShape";
    this.icon = "assets/shapes/triangleShape.jpg";
    this.firstDrawing = true;
    this.posX;
    this.posY;

    this.draw = function(previousX, previousY, x, y,fill){
        if (previousX != -1) {
            if (this.firstDrawing){
                loadPixels();
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            var x1 = this.posX + (x - this.posX)/2;
            var y1 = this.posY;
            var x2 = this.posX;
            var y2 = y;
            var x3 = x;
            var y3 = y;
            triangle(x1,y1,x2,y2,x3,y3);
        }
        else {
            loadPixels();
            this.firstDrawing = true;
        }
    }
}