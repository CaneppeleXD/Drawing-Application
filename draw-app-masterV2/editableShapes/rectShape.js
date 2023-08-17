function RectShape() {
    this.name = "rectShape";
    this.icon = "assets/shapes/rectShape.jpg";
    this.firstDrawing = true;
    this.posX;
    this.posY;

    this.draw = function(previousX, previousY, x, y){
        if (previousX != -1) {
            if (this.firstDrawing){
                loadPixels();
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            rect(this.posX,this.posY,x-this.posX,y-this.posY);
        }
        else {
            loadPixels();
            this.firstDrawing = true;
        }
    }
}