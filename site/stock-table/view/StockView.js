"use strict";


class StockView {
	constructor(renderer) { 
		this.renderer = renderer;
	}

	render (items) {
		
		this.renderer.resetTable();

		let _this = this;
		items.forEach(function (item) {
			_this.renderer.render(item);
		});

	}

	console(items) {
		console.log(items);
	}
}

module.exports = StockView;