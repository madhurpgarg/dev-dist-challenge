"use strict";
const Event = require('../.././common/Event.js')
const SparklingDataList = require('./SparklingDataList.js')
const StockStream = require('./StockStream');


class StockModel {
	constructor(stockStream) {
		let self = this;

		self._items = [];
		
		self.stockStream = stockStream;
		self.itemAdded = new Event(self);
		self.itemUpdated = new Event(self);

		self.stockStream.subscribe(function (message) {
			self._processMessage(JSON.parse(message.body));
		});
	}

	_processMessage (stock) {

		let foundStock = this._items.find(function(stockItem) {
			return stockItem.name === stock.name;
		}); 
		
		if(foundStock) {
			//console.log('update');
			this.updateItem(foundStock, stock)
			this.itemUpdated.notify(stock);
		} else {
			//console.log('added');
			this.pushItem(stock);
			this.itemAdded.notify(stock)
		}

	}

	getItems () {
		return [].concat(this._items);
	}
	
	pushItem (item) {
		let sparklineList = new SparklingDataList();
		sparklineList.push((item.bestAsk + item.bestBid)/2);

		item.sparklineData = sparklineList;

		this._items.push(item);
		this._items.sort(function (a, b) {
			  if (a.lastChangeBid < b.lastChangeBid) {
			    return -1;
			  }
			  if (a.lastChangeBid > b.lastChangeBid) {
			    return 1;
			  }
			  // a must be equal to b
			  return 0;
			})
	}
	updateItem (toItem, fromItem) {

		toItem.name = fromItem.name;
		toItem.bestAsk = fromItem.bestAsk;
		toItem.bestBid = fromItem.bestBid;
		toItem.lastChangeAsk = fromItem.lastChangeAsk;
		toItem.lastChangeBid = fromItem.lastChangeBid;
		toItem.openAsk = fromItem.openAsk;
		toItem.openBid = fromItem.openBid;

		toItem.sparklineData.push((fromItem.bestAsk + fromItem.bestBid)/2);

		this._items.sort(function (a, b) {
			  if (a.lastChangeBid < b.lastChangeBid) {
			    return -1;
			  }
			  if (a.lastChangeBid > b.lastChangeBid) {
			    return 1;
			  }
			  // a must be equal to b
			  return 0;
			})
	}
	calculateSparklingData (item) {
		let element = (item.bestAsk + item.bestBid)/2
		return item.sparklineData.push(element);
	}
}

module.exports = StockModel;
