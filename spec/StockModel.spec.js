"use strict";

var StockModel = require('../site/StockModel');

const message = {
	body: JSON.stringify({
        name: "usdjpy",
        bestBid: 1,
        bestAsk: 2,
        openBid: 3,
        openAsk: 4,
        lastChangeAsk: 1,
        lastChangeBid: 2
    })
};
const message1 = {
	body: JSON.stringify({
        name: "eurjpy",
        bestBid: 1,
        bestAsk: 2,
        openBid: 3,
        openAsk: 4,
        lastChangeAsk: 1,
        lastChangeBid: 1
    })
};

var mockStockStream = {

    subscribe: function (callback) {
        callback(message);
    }
};



describe("StockModel", function() {
    it('should be populate the items available', function() {
    	//GIVEN NOTHING

    	//WHEN creating the StockModel instance
    	var stockModel = new StockModel(mockStockStream);

    	//THEN
    	expect(stockModel.getItems()[0]).not.toBeNull();

    });

    it('should be populate the items available', function() {
    	//GIVEN NOTHING
    	spyOn(mockStockStream, 'subscribe');

    	//WHEN creating the StockModel instance
    	var stockModel = new StockModel(mockStockStream);

    	//THEN
    	expect(stockModel.stockStream.subscribe).toHaveBeenCalled();

    });

    describe("StockModel.pushItem", function() {
    	it("should pushItem with the [item] pass", function () {
	    	//GIVEN
	    	let stockModel = new StockModel(mockStockStream);

	    	//WHEN
			stockModel.pushItem(JSON.parse(message.body));

			//THEN
			expect(stockModel.getItems()[0]).not.toBeNull();    	
    	});

    	it("should sort the items after pushing the item", function () {
	    	//GIVEN
	    	let stockModel = new StockModel(mockStockStream);

	    	//WHEN
			stockModel.pushItem(JSON.parse(message1.body));

			//THEN

			//its has two items
			expect(stockModel.getItems().length).toBe(2);

			//it has been sorted thats why second message is the first now
			expect(stockModel.getItems()[0].lastChangeBid).toBe(1);
			expect(stockModel.getItems()[1].lastChangeBid).toBe(2);

    	});
    });

    describe("StockModel._processMessage", function() {
    	it("should call pushItem", function () {
	    	//GIVEN
	    	let stockModel = new StockModel(mockStockStream);
	    	spyOn(stockModel,'pushItem');

	    	//WHEN
			stockModel._processMessage(JSON.parse(message1.body));

			//THEN
			expect(stockModel.pushItem).toHaveBeenCalled();    	
    	});

    	it("should call updateItem", function () {
	    	//GIVEN
	    	let stockModel = new StockModel(mockStockStream);
	    	spyOn(stockModel,'updateItem');
	    	
	    	//WHEN
			stockModel._processMessage(JSON.parse(message.body));

			//THEN
			expect(stockModel.updateItem).toHaveBeenCalled();

    	});
    });

    
})
