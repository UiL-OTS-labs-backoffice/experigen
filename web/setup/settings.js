var Experigen =  {
	settings: {

		experimentName: "Default", // use only A-Z, a-z, 0-9
		
		databaseServer:    "https://experiment-datastore.lab.hum.uu.nl/",
		recorderServer:    "/experigen/audioserver/upload.php",
		databaseAccessKey: "",

		online: true, // make sure you know what you're doing before changing this
		
		strings: {
			windowTitle:     "Wug test",
			connecting:		 "Connecting...",
			loading:         "Loading...",
			soundButton:     "    ►    ",
			continueButton:  "   continue   ",
			errorMessage:    "An error occurred. We apologize for the inconvenience.",
			emptyBoxMessage: "Please supply your answer in the text box.",
			
			recordButton : "Record",
			stopButton : "Stop",
			sentButton : "Save",
			tryagainButton: "Delete",
			uploadSuccessful : "Saved! ✔︎",
			uploading : "Saving...",
			recording : "Recording...",
			processing: "Processing..."
		},
		
		audio: true,
		
		progressbar: {
			visible: true, 
			adjustWidth: 6,
			percentage: false
		},
		
		items: "resources/items.txt",
		
		otherresources: {
			frames: "resources/frames.txt",
			pictures: "resources/pictures.txt"	
		},

		folders: {
			views: "views/",
			sounds: "resources/sounds/",
			pictures: "resources/pictures/"
		},
	
		footer: "views/footer.html",
		missingview: "views/missingview.ejs"
	}	
};




