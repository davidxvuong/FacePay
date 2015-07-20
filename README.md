# FacePay

BattleHack Toronto 2015

FacePay is a new method of processing online payments. By utilizing your existing webcam on your computer, we simply take a snapshot of you and fetch your credit card information to complete the transaction! It is as simple as a couple button clicks.

##Technical Details

We implemented this system using various APIs and technologies as follows:
- [SkyBiometry API](http://skybiometry.com/) - Used to perform facial detection, and recognition. This also serves as the "key" in which we retrieve credit card informations from registered users in our database.
- [Braintree API](https://developers.braintreepayments.com/) - Used to perform the transaction for the user.
- [WebRTC](http://www.webrtc.org/) - Used to provide the web browser access to the user's webcam.

##Demonstration

[![IMAGE ALT TEXT](http://img.youtube.com/vi/SmtSoLjuEYE/0.jpg)](https://youtu.be/SmtSoLjuEYE)