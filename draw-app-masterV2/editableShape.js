function EditableShape() {
    this.icon = "assets/editableShape.jpg";
    this.name = "EditableShape";
    this.shapes = [];
    var previousMouseX = -1;
    var previousMouseY = -1;

    var selectedShape;

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            else {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }

        selectedShape.draw(previousMouseX,previousMouseY,mouseX,mouseY);
    }

    function changeShape(){
        
    }

    this.populateOptions = function () {
        this.shapes.push(new FreeShape());

        this.selectedShape = shapes[0];

        shapes.forEach(shape => {
            select(".toolOptions").html("<div class='box editable_shape' id='" + shape.name + "'><img alt='"+shape.name+"' src='"+shape.icon+"'>" + + "</div>", true);
            select("#"+shape.name).mouseClicked(changeShape);
        });
    }

    this.unselectTool = function () {

    }

}