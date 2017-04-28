"use strict"


class SparklingDataList {
	constructor() {
		this.list = [];
	}
	push (item) {
		
		this.list.push(item);

		if (this.list.length > 31) {
			this.list = this.list.splice(1,this.list.length - 2);
		}
	}
	
	getList () {
		return this.list;
	}
}

module.exports = SparklingDataList;