function EditableShape() {
    this.icon = "assets/editableShape.jpg";
    this.name = "EditableShape";
    this.shapes = [];
    var previousMouseX = -1;
    var previousMouseY = -1;

    var selectedShape;

    var _self = this;

    var fill = true;

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

        selectedShape.draw(previousMouseX,previousMouseY,mouseX,mouseY,fill);
    }

    function selectShape(name){
        _self.shapes.forEach(shape => {
            if (shape.name == name){
                selectedShape = shape;
            }
        });
    }

    function changeShape(){
        select("#"+selectedShape.name).style("border","0px solid blue");
        this.style("border","2px solid blue");
        selectShape(this.elt.id);
    }

    function fillEvent(){
        fill = this.elt.children[0].checked;
        helpers.changeFill(fill);
    }

    this.populateOptions = function () {
        this.shapes.push(new FreeShape());
        this.shapes.push(new RectShape());
        this.shapes.push(new SquareShape());
        this.shapes.push(new TriangleShape());
        this.shapes.push(new EllipseShape());
        this.shapes.push(new CircleShape());

        selectedShape = this.shapes[0];

        for(var i = 0;i<this.shapes.length;i++){
            var shape = createDiv();
            shape.class("editable_shape");
            shape.id(this.shapes[i].name);
            shape.mouseClicked(changeShape);
            select(".toolOptions").child(shape);
            var img = createImg(this.shapes[i].icon,this.shapes[i].name);
            img.class("editable_shape_img");
            img.parent(shape);
        }

        select("#"+selectedShape.name).style("border","2px solid blue");

        var checkbox = createCheckbox("Fill",fill);
        checkbox.changed(fillEvent);
        select(".toolOptions").child(checkbox);
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
        this.shapes = [];
    }

}