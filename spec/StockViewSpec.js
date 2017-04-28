"use strict";

const StockView = require('../site/stock-table/view/StockView.js')

const mockRenderer = {
    resetTable: function(){

    },
    render: function(){

    }
}


describe("StockView", function() {
    it('should be initialised', function() {
        //GIVEN NOTHING

        //WHEN creating the StockController instance
        var view = new StockView(mockRenderer);

        //THEN
        expect(view).not.toBeNull();
        expect(view.renderer).toEqual(mockRenderer);

    });

    it('render function should in turn call Renderer.render() ', function() {
        //GIVEN NOTHING
        spyOn(mockRenderer, 'resetTable').and.callThrough();
        var view = new StockView(mockRenderer);

        //WHEN creating the StockController instance
        view.render([]);

        //THEN
        expect(view.renderer.resetTable).toHaveBeenCalled();

    });

    /*it('should call itemUpdated.attach', function() {
        //GIVEN NOTHING
        spyOn(model.itemUpdated, 'attach').and.callThrough();

        //WHEN creating the StockController instance
        var stockController = new StockController(view, model);

        //THEN
        expect(stockController.model.itemUpdated.attach).toHaveBeenCalled();

    });*/


})
