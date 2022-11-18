import { UPDATE_INTERVAL_S } from "./config";
import { TOKEN } from "./token";

const API_URL = "https://discordapp.com/api/v6/users/@me/settings";

let status = "", nextUpdateAt = 0;

export default function updateDiscord(newStatus: string) {
    if (status != newStatus) {
        status = newStatus;
        if(nextUpdateAt < Date.now()) {
            sendUpdate();
            scheduleNextUpdate();
        }
    }
}

function scheduleNextUpdate() {
    nextUpdateAt = Date.now() + UPDATE_INTERVAL_S * 1000;
}

function sendUpdate() {
    const patch = { "custom_status": { "text": status, "expires_at": null, "emoji_id": null, "emoji_name": null } }

    fetch(API_URL, {
        headers: {
            "Authorization": TOKEN,
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(patch)
    });
}