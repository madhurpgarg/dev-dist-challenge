/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')
const StockView = require('./site/stock-table/view/StockView.js')
const StockController = require('./site/stock-table/controller/StockController.js')
const StockModel = require('./site/stock-table/model/StockModel.js')
const StockStream = require('./site/stock-table/model/StockStream');
const Event = require('./site/common/Event.js')
const SparklingDataList = require('./site/stock-table/model/SparklingDataList.js')
const Renderer = require('./site/stock-table/view/Renderer.js')
// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)

client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

const stockStream = new StockStream();
const model = new StockModel(stockStream);
const renderer = new Renderer();
const view = new StockView(renderer);
const controller = new StockController(view, model);
