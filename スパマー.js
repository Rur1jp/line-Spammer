import { Client } from "@evex/linejs";
import { RateLimitter } from "@evex/linejs/rate-limit";

const client = new Client({
    device: "IOSIPAD",
    squareRateLimitter: new RateLimitter(5, 3000),
});

client.on("pincall", (pincode) => {
    console.log(`pin:${pincode}`);
});

client.on("ready", async (user) => {
    console.log(`login name:${user.displayName}`);
});


client.on("update:authtoken", (authtoken) => {
    console.log("Token", authtoken);
});

client.on("qrcall", (qrcodeUrl) => console.log(qrcodeUrl));

function randomStr(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}


client.on("square:message", async (message) => {
    if (message.content.trim() === "!spam") {
        for (let i = 0; i < 114514; i++) {
            const msg = `おわったんよw x.com/rur1_jp ${randomStr(8)}`;
            await message.send({
                text: msg,
                e2ee: true,
            });
            console.log("[+]spam success");
        }
    }
});


await client.login({
    email: "めあぉ",
    password: "ぱす",
    pincode: "000000",
});
