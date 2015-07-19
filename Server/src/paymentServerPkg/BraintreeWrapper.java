package paymentServerPkg;
import java.math.BigDecimal;
import com.braintreegateway.*;

public class BraintreeWrapper {
	String creditCardNumber;
	String expDate;
	String cardHolderName;
	String cvv;
	BraintreeGateway gateway;
	final String PUBLIC_KEY = "x9czf5z3m954m4tm";
	final String PRIVATE_KEY = "7c729ffb7fd4356ddd13a242dde70f95";
	final String MERCHANT_ID = "wsrzxrc8fht9bgsm";
	
	public BraintreeWrapper(String cardNum, String name, String exp, String cvv) {
		creditCardNumber = cardNum;
		expDate = exp;
		cardHolderName = name;
		this.cvv = cvv;
		gateway = new BraintreeGateway(Environment.SANDBOX, MERCHANT_ID, PUBLIC_KEY, PRIVATE_KEY);
	}
	
	public String executePayment(double value) {
		TransactionRequest req = new TransactionRequest().
				amount(new BigDecimal(value)).creditCard().
				number(creditCardNumber).
				cardholderName(cardHolderName).
				cvv(cvv).
				expirationDate(expDate).
				done();
		
		Result<Transaction> result = gateway.transaction().sale(req);
		
		if (result.isSuccess()) {
			Transaction txn = result.getTarget();
			return "Success!" + txn.getId();
		}
		else {
			return "Failed";
		}
	}
}
