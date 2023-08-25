import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const guildId = Number(params.id)

    const stats = await db.$queryRawUnsafe(`SELECT Kills.id, Kills.createdAt, Kills.pointsGained, Players.nickname FROM Kills JOIN Players ON Players.id = deaderId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${guildId}) ORDER BY Kills.createdAt DESC LIMIT 24;`)
    console.log(stats)

    return NextResponse.json(stats)
}
