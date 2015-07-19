package paymentServerPkg;

import java.net.*;
import java.io.*;
import java.nio.charset.*;
import java.security.*;
import javax.xml.bind.*;
import java.util.*;

public class WebSocketService extends Thread {
	Socket client;
	String nameOfClient;
	InputStream in;
	OutputStream out;
	final String guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
	final Charset UTF8_CHARSET = Charset.forName("UTF-8");
	final Charset ASCII_CHARSET = Charset.forName("US-ASCII");
	
	public WebSocketService(Socket obj, InputStream input, OutputStream output) {
		client = obj;
		in = input;
		out = output;
		nameOfClient = "";
	}
	
	public void run() {
		try {
			byte[] buffer = new byte[1024];
	        byte[] handshakeResponse;
	        String headerResponse = "";

			in.read(buffer);
	        
			headerResponse = new String(buffer, UTF8_CHARSET);
			
			int keyStartIndex = headerResponse.indexOf("Sec-WebSocket-Key: ") + 19;
			int keyEndIndex = headerResponse.indexOf("\r\n", keyStartIndex);
			
			String key = headerResponse.substring(keyStartIndex, keyEndIndex) + guid;
			byte[] t = computeHash(key);
			
			for (int i = 0; i < t.length; i++) {
				t[i] = (byte) (t[i] & 255);
			}
			
			String hash = new String(DatatypeConverter.printBase64Binary(t));
			
			String hr = "HTTP/1.1 101 Switching Protocols\r\n" +
                    "Connection: Upgrade\r\nUpgrade: websocket\r\nSec-WebSocket-Accept: " + hash + "\r\n\r\n";
			
			handshakeResponse = hr.getBytes(UTF8_CHARSET);
			out.write(handshakeResponse);
			
			in.read(buffer);
			nameOfClient = decodeMessage(buffer);
			System.out.println(String.format("%1$s: %2$s connected!",getDateTime(), nameOfClient));
			
			out.write(encodeMessage("Java"));
			listenForMessage();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private byte[] computeHash(String key) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md = MessageDigest.getInstance("SHA1");
		return md.digest(key.getBytes(ASCII_CHARSET));
	}
	
	private void listenForMessage() throws IOException {
		byte[] incoming = new byte[1024];
		in.read(incoming);
		
		String message = decodeMessage(incoming);
		
		String[] data = message.split(";");
		//Format: credit card num, card holder name, expiry date, cvv, amount
		BraintreeWrapper paymentInstance = new BraintreeWrapper(data[0], data[1], data[2], data[3]);
		
		String returnValue = paymentInstance.executePayment(Double.parseDouble(data[4]));
		
		out.write(encodeMessage(returnValue));
		
		disposeThread();
	}
	
	private void disposeThread() {
		try {
			client.close();
			System.out.println(String.format("%1$s: %2$s disconnected", getDateTime(), nameOfClient));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	private String decodeMessage(byte[] data) {
        byte length = (byte)(data[1] & 127);
        byte[] decoded;
        byte[] mask = new byte[4];
        int maskIndex = 2;

        if (length == 126)
            maskIndex += 2;
        else if (length == 127)
            maskIndex += 8;
        
        System.arraycopy(data, maskIndex, mask, 0, 4);
        
        int dataIndex = maskIndex + 4;
        decoded = new byte[data.length - dataIndex];

        for (int i = dataIndex, j = 0; j < decoded.length; i++, j++)
            decoded[j] = (byte)(data[i] ^ mask[j % 4]);

        String raw = new String(decoded, UTF8_CHARSET);
        
        int junkIndex = raw.indexOf("EOD");
        return raw.substring(0, junkIndex);
	}
	
	private byte[] encodeMessage(String text) {
		byte[] response;
		byte[] bytesRaw = text.getBytes(UTF8_CHARSET);
		byte[] frame = new byte[10];

        int indexStartRawData = -1;
        int length = bytesRaw.length;

        frame[0] = (byte)129;
        if (length <= 125)
        {
            frame[1] = (byte)length;
            indexStartRawData = 2;
        }
        else if (length >= 126 && length <= 65535)
        {
            frame[1] = (byte)126;
            frame[2] = (byte)((length >> 8) & 255);
            frame[3] = (byte)(length & 255);
            indexStartRawData = 4;
        }
        else
        {
            frame[1] = (byte)127;
            frame[2] = (byte)((length >> 56) & 255);
            frame[3] = (byte)((length >> 48) & 255);
            frame[4] = (byte)((length >> 40) & 255);
            frame[5] = (byte)((length >> 32) & 255);
            frame[6] = (byte)((length >> 24) & 255);
            frame[7] = (byte)((length >> 16) & 255);
            frame[8] = (byte)((length >> 8) & 255);
            frame[9] = (byte)(length & 255);

            indexStartRawData = 10;
        }

        response = new byte[indexStartRawData + length];

        int i, reponseIdx = 0;

        //Add the frame bytes to the response
        for (i = 0; i < indexStartRawData; i++)
        {
            response[reponseIdx] = frame[i];
            reponseIdx++;
        }

        //Add the data bytes to the response
        for (i = 0; i < length; i++)
        {
            response[reponseIdx] = bytesRaw[i];
            reponseIdx++;
        }

        return response;
	}
	
	private String getDateTime() {
		Date time = new Date();
		return time.toString();
	}
}

