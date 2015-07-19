function proceedToPayment(item, price) {
	sessionStorage.setItem("item", item);
	sessionStorage.setItem("price", price);
	
	window.location.href ="payment.html";
}