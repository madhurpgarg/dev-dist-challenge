var Renderer = require('./Renderer');

function StockView (model){
	
	this.renderer = new Renderer();

}

StockView.prototype = {
	render : function (items) {
		
		this.renderer.resetTable();

		let _this = this;
		items.forEach(function (item) {
			_this.renderer.render(item);
		});

	},

	console : function(items) {
		console.log(items);
	}
}

module.exports = StockView;