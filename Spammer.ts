import {
	loginWithAuthToken,
	loginWithPassword,
	loginWithQR,
} from "@evex/linejs";
import { FileStorage } from "@evex/linejs/storage";
import { v4 as uuidv4 } from "uuid";

const client = await loginWithPassword({
	email: "めあ、ど",
	password: "ぱすわ",
	onPincodeRequest(pin) {
		console.log(pin);
	},
}, {
	device: "DESKTOPWIN",
	storage: new FileStorage("./storage.json"),
});

client.on("message", async (message) => {
	console.log(message.text);
	if (message.text === "!spammer") {
		for (let i = 0; i < 100; i++) {
			await client.sendText({
				to: message.threadId,
				text: `https://x.com/Rur1_jp\n${uuidv4()}`
// ｢\n｣が改行です｢${uuidv4}｣がランダム文字列です😺そもそもこれがわかんないなら使うな
// for (let i = 0; i < 100; i++) の100の部分が送信回数でうあうあう
			});
		}
	}
});

client.listen({ talk: true });
