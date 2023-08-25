import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const guildId = Number(params.id)

    const stats = await db.$queryRawUnsafe(`SELECT Deaths.id, Deaths.createdAt, Deaths.pointsLost, Players.nickname FROM Deaths JOIN Players ON Players.id = killerId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${guildId}) ORDER BY Deaths.createdAt DESC LIMIT 24;`)
    console.log(stats)

    return NextResponse.json(stats)
}
