function StockController(view, model){

	var _this = this;

	_this.view = view;
	_this.model = model;

	
	_this.model.itemUpdated.attach(function () {
		_this.view.render(_this.model.getItems());
	});

	_this.model.itemAdded.attach(function () {
		_this.view.render(_this.model.getItems());
	});
}

module.exports = StockController; 