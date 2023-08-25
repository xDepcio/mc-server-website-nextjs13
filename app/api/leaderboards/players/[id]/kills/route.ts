import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const playerId = Number(params.id)

    const stats = await db.kills.findMany({
        where: {
            killerId: playerId
        },
        include: {
            Players_Kills_deaderIdToPlayers: true,
            // Players_Kills_killerIdToPlayers: true
        },
        take: 24,
        orderBy: {
            createdAt: "desc"
        }
    })

    const changedStats = stats.map(s => ({ ...s, Player: s.Players_Kills_deaderIdToPlayers }))

    return NextResponse.json(changedStats)
}
