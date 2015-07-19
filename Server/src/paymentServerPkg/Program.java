package paymentServerPkg;

import java.io.*;
import java.net.*;

public class Program {

	private static ServerSocket server;
	private static Socket client;
	private static WebSocketService instance;
	private static InputStream input;
	private static OutputStream output;
	
	public static void main(String[] args) throws IOException {
		System.out.println("Server started. Accepting connections...");

		server = new ServerSocket(2048);
		while (true) {
			client = server.accept();
			input = client.getInputStream();
			output = client.getOutputStream();
			instance = new WebSocketService(client, input, output);
			instance.start();
		}
	}

}
