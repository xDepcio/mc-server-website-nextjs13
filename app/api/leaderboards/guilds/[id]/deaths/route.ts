import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const guildId = Number(params.id)

    const query = `SELECT Deaths.id, Deaths.createdAt, Deaths.pointsLost, Players.nickname FROM Deaths JOIN Players ON Players.id = killerId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${guildId}) ORDER BY Deaths.createdAt DESC LIMIT 24;`

    // const stats = await db.$queryRawUnsafe(`SELECT Deaths.id, Deaths.createdAt, Deaths.pointsLost, Players.nickname FROM Deaths JOIN Players ON Players.id = killerId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${guildId}) ORDER BY Deaths.createdAt DESC LIMIT 24;`)

    let details: any = {
        apikey: "2UUm4jwOJ3AudFqrZaaysOA6QOe",
        dbowner: "xDepcio",
        dbname: "dev.db",
        sql: btoa(query)
    };

    let formBody: any = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const res = await fetch('https://api.dbhub.io/v1/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    const data = await res.json()

    console.log(data)
    const formattedData = data.map((item: any) => {
        return {
            id: Number(item[0].Value),
            createdAt: item[1].Value,
            pointsLost: Number(item[2].Value),
            nickname: item[3].Value
        }
    })

    return NextResponse.json(formattedData)
}
