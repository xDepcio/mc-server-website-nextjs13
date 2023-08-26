import { toFormBody } from "@/lib/utils";
import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const guildId = Number(params.id)

    const query = `SELECT Deaths.id, Deaths.createdAt, Deaths.pointsLost, Players.nickname FROM Deaths JOIN Players ON Players.id = killerId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${guildId}) ORDER BY Deaths.createdAt DESC LIMIT 24;`

    // const stats = await db.$queryRawUnsafe(`SELECT Deaths.id, Deaths.createdAt, Deaths.pointsLost, Players.nickname FROM Deaths JOIN Players ON Players.id = killerId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${guildId}) ORDER BY Deaths.createdAt DESC LIMIT 24;`)

    const res = await fetch('https://api.dbhub.io/v1/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: toFormBody({
            apikey: "2UUm4jwOJ3AudFqrZaaysOA6QOe",
            dbowner: "xDepcio",
            dbname: "dev.db",
            sql: btoa(query)
        })
    })
    const data = await res.json()

    const formattedData = data.map((item: any) => {
        return {
            id: Number(item[0].Value),
            createdAt: item[1].Value,
            pointsLost: Number(item[2].Value),
            nickname: item[3].Value
        }
    })

    return NextResponse.json(formattedData, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })
}
