"use strict";
function Renderer() {


    this.element = document.getElementById("stock-data");

    let tbody = document.getElementById('stock-data').firstElementChild.lastElementChild;
    
    function createSparkLine(element) {
        let sparkLineSpan = document.createElement('span');
        let sparkline1 = new Sparkline(sparkLineSpan);
        element.lastElementChild.append(sparkLineSpan);

        return sparkline1
    }

    function createRow(item) {

        var td1 = document.createElement('td');
        td1.innerHTML = item.name;
        var td2 = document.createElement('td');
        td2.innerHTML = item.bestBid;
        var td3 = document.createElement('td');
        td3.innerHTML = item.bestAsk;
        var td4 = document.createElement('td');
        td4.innerHTML = item.lastChangeBid;
        var td5 = document.createElement('td');
        td5.innerHTML = item.lastChangeAsk
        var td6 = document.createElement('td');

        var tr = document.createElement('tr');
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        return tr;
    }

    this.resetTable = function () {
    	tbody.innerHTML = '';
    }
    
    this.render = function(item) {
    	let row = createRow(item);
        let sparkline = createSparkLine(row);
        tbody.append(row);
        sparkline.draw(item.sparklineData.getList());
    }
}

module.exports = Renderer;
