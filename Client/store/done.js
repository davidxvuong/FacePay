function initialize() {
	var data = sessionStorage.getItem("returnMsg");
	
	if (data.indexOf("Success") != -1) {
		txnId = data.substring(data.indexOf("Success"));
		document.getElementById("message").innerHTML = "Transaction completed! The transaction ID is: " + txnId.toUpperCase() + ". Please keep this for your future reference.";
	}
	else {
		document.getElementById("message").innerHTML = "Transaction failed. Please try again.";
	}
}