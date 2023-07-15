function LineWeigth(){
    this.text = "Line Weight:";

    var _self = this;

    this.loadSlider = function(){
        select(".lineWeight").html("<label for='weight'>"+this.text+"</label><input type='range' min='1' max='15' value='1' id='weight'></input>");
        select("#weight").touchMoved(function() {
			strokeWeight(_self.getWeight());
		});
        strokeWeight(this.getWeight());
    }

    this.getWeight = function(){
		var slider = select("#weight");
        return slider.value();
    }

    this.getSlider = function(){
        return select("#weight");
    }
    
}