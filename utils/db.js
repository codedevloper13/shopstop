/** @format */

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connection = {};

export async function connectDB() {
	if (connection.isConnected) {
		console.log("Already Connected to the Database");
		return;
	}

	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState;
		if (connection.isConnected === 1) {
			console.log("Connection is allready Established");
			return;
		}
		await mongoose.disconnect();
	}

	const db = await mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("New Connection was established with Database");
	connection.isConnected = db.connections[0].readyState;
}
