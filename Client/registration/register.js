var video = null;
var canvas = null;
var photo = null;
var takePhoto  = null;

function initialize() {
	var width = 300;
	var height = 300;
	
	var streaming  = false;
	
	video = document.getElementById("video");
	canvas = document.getElementById("canvas");
	photo = document.getElementById("photo");
	takePhoto = document.getElementbyId("takePhoto");
	
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
	}, function (err) {
		console.log("An error occurred. " + err);
	});
	
	video.addEventListener('canplay', function(ev) {
		if (!streaming) {
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);
	
	takePhoto.addEventListener('click', function(event) {
		takePicture();
		event.preventDefault();
	}, false);
}

function clearPhoto() {
	var context = canvas.getContext('2d');
	context.fillStyle="#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function takePicture() {
	
}