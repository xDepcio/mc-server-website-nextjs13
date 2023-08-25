import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const playerId = Number(params.id)

    const stats = await db.deaths.findMany({
        where: {
            deaderId: playerId
        },
        include: {
            Players_Deaths_killerIdToPlayers: true,
            // Players_Kills_killerIdToPlayers: true
        },
        take: 24,
        orderBy: {
            createdAt: "desc"
        }
    })

    const changedStats = stats.map(s => ({ ...s, Player: s.Players_Deaths_killerIdToPlayers }))

    return NextResponse.json(changedStats)
}
