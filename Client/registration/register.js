var videoDiv = null;
var video = null;
var canvas = null;
var photo = null;
var takePhoto  = null;
var outputDiv = null;
var width = 300;
var height = 300;
var API_KEY = "5305005f8dd2426696adedfb6b159da1";
var API_SECRET = "325e64602e874234af4d833e073e6f99";
var uid;

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
	newFile.addEventListener("load", performFaceRecognition, false);
	newFile.addEventListener("error", uploadError, false);
	newFile.addEventListener("abort", uploadCancelled, false);
	
	newFile.open("POST", "newfile.php");
	newFile.send(formData);
}

function performFaceRecognition(event) { 
	console.log(event.target.responseText);

	$.get("http://api.skybiometry.com/fc/faces/detect.json?api_key=" + API_KEY + "&api_secret=" + API_SECRET + "&urls=http://davidvuong.ca/BattleHackToronto/Client/registration/images/" + event.target.responseText, performFaceTraining);
}

function performFaceTraining(event) {
	console.log(event);
	console.log(event.photos[0].tags[0].tid);
	console.log(document.getElementById("name").value);
	uid = document.getElementById("name").value + "@BattleHack";
	console.log(uid);
	$.get("http://api.skybiometry.com/fc/tags/save.json?api_key=" + API_KEY + "&api_secret=" + API_SECRET + "&uid=" + uid + "&tids=" + event.photos[0].tags[0].tid, trainingComplete);
}

function trainingComplete(event) {

	document.getElementById("uid").value = uid;
}

function uploadError(event) {
	console.log("Error uploading file");
}

function uploadCancelled(event) {
	console.log("Upload cancelled");
}