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
	
	console.log(data);
}

function processPayment() {
	console.log("test");
}