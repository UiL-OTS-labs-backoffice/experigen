// connection to local text files and to the database

Experigen.loadUserID = function () {
	// offline mode
	/// Online mode is not supported by the UiL OTS dataserver

	// find device name
	if (!$.totalStorage('deviceName')) {
		var name =  String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65 + Math.floor(Math.random()*26));
		$.totalStorage('deviceName',name);
	}
	// find record of last file name, add 1 to that
	if (!$.totalStorage('fileName')){
		$.totalStorage('fileName', {});
	}
	var fileName = $.totalStorage('fileName');
	if (fileName && !fileName[this.settings.experimentName]) {
		fileName[this.settings.experimentName] = 0;
		$.totalStorage('fileName',fileName);
	}
	fileName[this.settings.experimentName] += 1;
	$.totalStorage('fileName',fileName);
	this.userFileName = $.totalStorage('fileName')[this.settings.experimentName];
	var code =  String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65 + Math.floor(Math.random()*26));
	this.userCode = code + this.userFileName;
	this.load();
	// create interface for managing local data
	this.manageLocalData();
}


Experigen.data = []

Experigen.saveForm = function (formObj) {
	let trial = {};
	formObj.serializeArray().forEach( x => trial[x.name] = x.value);

	this.data.push(trial);
}

Experigen.sendData = function () {

	if (this.settings.online) {
		// online mode
		var jsonp_url = this.settings.databaseServer + "api/" + this.settings.databaseAccessKey.trim() + '/upload/';
		$.ajax({
			method: 'POST',
			contentType: 'text/plain',
			data: JSON.stringify(this.data),
			url: jsonp_url,
			success: function (data) {
				console.debug(data);
				return true;
			}
		});

	}
}




Experigen.loadText = function (spec) {
	var url = spec.url;
	var wait = spec.wait;
	var destination = spec.destination;
	
	$.ajax({
		url: url,
		success: function (data) {
			$(destination).html(data);
		},
		async: !wait,
		error: function() {
			console.error("Error! Footer not found.");
		}
	});
}


Experigen.loadResource = function (name) {

	var key = "";
	var items = [];
	
	$.ajax({
		url: name,
		success: function(data) {
			var lines = data.split(/[\n\r]/);
			var fields = lines[0].replace(/\s+$/, '').split("\t");
			key = fields[0]; // for now, the "key" for a tab-delimited file is always the first before the file's first tab
			if (!fields.uniqueNonEmpty()) {
				console.error("Field names in " + name + " must be unique and non-empty!");
				return false;
			}
			var keys = []; // these are saved to be evaluated by uniqueNonEmpty()
			LINE: for (var i=1; i<lines.length; i++) {
				if (lines[i].match(/^\s*$/)) {
					continue LINE;
				}
				var line = lines[i].replace(/\s+$/, '').split("\t");
				keys.push(line[0]);
				var frame = {};
				for (var j=0; j<line.length; j++) {
					frame[ fields[j] ] = line[j];
				}
				//console.log(frame);
				items.push(frame);
			}
			if(!keys.uniqueNonEmpty()) {
				console.error("In " + name + ", the values of the first column must be unique and non-empty!");
				return false;
			}
			return true;
		},
		async: false,
		error: function() {
			console.error("The file " + name + " wasn't found.");
			return false;
		}
	});
	
	return {table: items, key: key};
}


