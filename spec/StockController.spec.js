"use strict";

const Event = require('../site/common/Event.js')
const StockController = require('../site/stock-table/controller/StockController.js')


function Model() {

    this.itemAdded = new Event(this);
    this.itemUpdated = new Event(this);
}

let model = new Model();
let view = {
    render: function() {

    }
};

describe("StockController", function() {
    it('should be initialised', function() {
        //GIVEN NOTHING

        //WHEN creating the StockController instance
        var stockController = new StockController(view, model);

        //THEN
        expect(stockController).not.toBeNull();
        expect(stockController.view).toEqual(view);
        expect(stockController.model).toEqual(model);

    });

    it('should call itemAdded.attach', function() {
        //GIVEN NOTHING
        spyOn(model.itemAdded, 'attach').and.callThrough();

        //WHEN creating the StockController instance
        var stockController = new StockController(view, model);

        //THEN
        expect(stockController.model.itemAdded.attach).toHaveBeenCalled();

    });

    it('should call itemUpdated.attach', function() {
        //GIVEN NOTHING
        spyOn(model.itemUpdated, 'attach').and.callThrough();

        //WHEN creating the StockController instance
        var stockController = new StockController(view, model);

        //THEN
        expect(stockController.model.itemUpdated.attach).toHaveBeenCalled();

    });


})
