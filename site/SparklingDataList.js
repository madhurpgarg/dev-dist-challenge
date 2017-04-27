function SparklingDataList() {
	this.list = [];
}

SparklingDataList.prototype = {
	push : function (item) {
		
		this.list.push(item);

		if (this.list.length > 31) {
			this.list = this.list.splice(1,this.list.length - 2);
		}
	},
	
	getList : function () {
		return this.list;
	}
}

module.exports = SparklingDataList;