var videoDiv = null;
var video = null;
var canvas = null;
var photo = null;
var takePhoto  = null;
var outputDiv = null;
var width = 300;
var height = 300;

function initialize() {
	var streaming  = false;
	
	video = document.getElementById("video");
	canvas = document.getElementById("canvas");
	photo = document.getElementById("photo");
	takePhoto = document.getElementById("takePhoto");
	outputDiv = document.getElementById("output");
	
	navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia ||
						   null);

	navigator.getUserMedia({video: true, audio: false}, function(stream) {
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		}
		else {
			
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL.createObjectURL(stream);
		}
		video.play();
	}, function(err) {
		console.log("An error occured! " + err);
	});
	
	video.addEventListener('canplay', function(ev) {
		if (!streaming) {
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			outputDiv.setAttribute('width', width);
			outputDiv.setAttribute('height', height);
			streaming = true;
		}
	}, false);
	
	takePhoto.addEventListener('click', function(event) {
	console.log("working");
		takePicture();
		event.preventDefault();
	}, false);
	
	clearPhoto();
}

function clearPhoto() {
	var context = canvas.getContext('2d');
	context.fillStyle="#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function takePicture() {
	var context = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	context.drawImage(video, 0,0, width, height);
	
	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src',data);

	outputDiv.style.display = "block";
	
	var formData = new FormData();
	
	formData.append("imgData", data);

	var newFile = new XMLHttpRequest();
	newFile.addEventListener("load", performFaceTraining, false);
	newFile.addEventListener("error", uploadError, false);
	newFile.addEventListener("abort", uploadCancelled, false);
	
	newFile.open("POST", "newfile.php");
	newFile.send(formData);
}

function performFaceTraining(event) { 
	console.log(event.target.responseText);
}

function uploadError(event) {
	console.log("Error uploading file");
}

function uploadCancelled(event) {
	console.log("Upload cancelled");
}