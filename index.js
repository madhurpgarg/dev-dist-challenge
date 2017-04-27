/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')
const StockView = require('./site/StockView.js')
const StockController = require('./site/StockController.js')
const StockModel = require('./site/StockModel.js')
const StockStream = require('./site/StockStream');
const Event = require('./site/Event.js')
const SparklingDataList = require('./site/SparklingDataList.js')
// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)

client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

/*function subscribed(msg){
	console.log(msg);
	var template = TemplateEngine(document.getElementById('stomp-status').innerHTML, msg.body)
	document.getElementById('stomp-status').innerHTML = template;
	//document.getElementById('stomp-status').innerHTML = msg.body;
}*/

/*function connectCallback() {
	console.log("updated")

  //document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
}*/

/*client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})
*/
/*const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])*/

const stockStream = new StockStream();
const model = new StockModel(stockStream);
const view = new StockView();
const controller = new StockController(view, model);
/*var view = new StockView(model);
//view.render();
*/

//model.start();