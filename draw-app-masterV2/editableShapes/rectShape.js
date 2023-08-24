function RectShape() {
    this.name = "rectShape";
    this.icon = "assets/shapes/rectShape.jpg";
    this.firstDrawing = true;
    this.editingPosition = false;
    this.posX;
    this.posY;
    var lastX;
    var lastY;

    this.draw = function(previousX, previousY, x, y,fill){
        if (previousX != -1 && !this.editingPosition) {
            if (this.firstDrawing){
                loadPixels();
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            lastX = x;
            lastY = y;
            rect(this.posX,this.posY,x-this.posX,y-this.posY);
        }
        else if(!this.firstDrawing){
            this.editingPosition = true;
            if (mouseIsPressed) this.firstDrawing = true;
            var xdiff = x - lastX;
            var ydiff = y - lastY;
            var newX = this.posX+xdiff;
            var newY = this.posY+ydiff;
            updatePixels();
            rect(newX,newY,x-newX,y-newY);
        }
        else {
            loadPixels();
            this.editingPosition = false;
        }
    }
}