var delimiter = "EOD";
var ws;
var sendData;

function initialize() {
	console.log(sessionStorage.getItem("item"));
	console.log(sessionStorage.getItem("price"));
	var convertData = sessionStorage.getItem("queryData");
	
	var data = jQuery.parseJSON(convertData);
	document.getElementById("userName").value = data[0].userName;
	document.getElementById("address").value = data[0].adrs;
	document.getElementById("phone").value = data[0].pn;
	document.getElementById("email").value = data[0].email;
	document.getElementById("creditCardNum").value = data[0].ccn;
	document.getElementById("exp").value = data[0].exp;
	document.getElementById("cvv").value = data[0].cvn;
	document.getElementById("item").value =sessionStorage.getItem("item");
	document.getElementById("cost").value = sessionStorage.getItem("price");
	
	console.log(data);
}

function processPayment() {
		//Format: credit card num, card holder name, expiry date, cvv, amount
	var cardNum = document.getElementById("creditCardNum").value;
	var cardHolder = document.getElementById("userName").value;
	var expDate = document.getElementById("exp").value;
	var cvv = document.getElementById("cvv").value;
	var amount = document.getElementById("cost").value;
	
	ws = new WebSocket("ws://localhost:2048/");
	
	ws.onopen = function() {
		console.log("Connected! Sending name...");
		ws.send(cardHolder + delimiter);
		console.log("Sent");
	};
	
	ws.onmessage = function(evt) {
		console.log(evt.data);
		if (evt.data.indexOf("Success") != -1) {
			ws.close();
			console.log("move to next window!");
			sessionStorage.setItem("returnMsg", evt.data);
			//move to next window
		}
		else {
			console.log("Sending transaction info");
			ws.send(sendData);
		}
	};
	
	ws.onerror = function(err) {
		console.log(err);
	};
	
	ws.onclose = function() {
		console.log("Closed connection");
	};
	
	sendData = cardNum + ";" + cardHolder + ";" + expDate + ";" + cvv + ";" + amount + delimiter;
	
}