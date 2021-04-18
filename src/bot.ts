/* eslint-disable sort-keys */
import * as cvs from "csv-writer";
import { CONFIG } from "./globals";
import fetch from "node-fetch";

async function getSubs(): Promise<void> {
    const res = await fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${CONFIG.userID}`, {
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Authorization": `Bearer ${CONFIG.accessToken}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Client-ID": "gp762nuuoqcoxypju8c569th9wz7q5"
        }
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!res.ok) {
        return void console.error("Could not retieve data from the Twitch API");
    }

    const { data } = await res.json();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!data) {
        return void console.error("Could not retrieve data from the Twitch API");
    }

    console.log(data);

    const subs: Object[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.forEach((sub: any, index: number) => {
        const user: String = sub.user_name;
        console.log(data[index].tier);

        if (data[index].tier === "1000") {

            subs.push({ name: user, tier: `Tier 1 - ${sub.plan_name}`, gift: sub.is_gift });
            console.log("1");
        }

        if (data[index].tier === "2000") {

            subs.push({ name: user, tier: `Tier 2 - ${sub.plan_name}`, gift: sub.is_gift });
            console.log("2");

        }

        if (data[index].tier === "3000") {

            subs.push({ name: user, tier: `Tier 3 - ${sub.plan_name}`, gift: sub.is_gift });
            console.log("3");
        }

    });

    const csvWriter = cvs.createObjectCsvWriter({
        header: [
            { id: "name", title: "UserName" },
            { id: "tier", title: "Tier" },
            { id: "gift", title: "Gifted?" }
        ],
        path: "./list.cvs"


    });

    console.log(subs);
    const records = subs;

    void csvWriter.writeRecords(records) // Returns a promise
        .then(() => {
            console.log("...Done");
        });
}

void getSubs();
