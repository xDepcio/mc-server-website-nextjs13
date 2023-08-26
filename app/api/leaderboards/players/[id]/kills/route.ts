import { cloudDb } from "@/lib/utils";
import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const playerId = Number(params.id)

    const killsQuery = "SELECT `Kill`.`id`, `Kill`.`killerId`, `Kill`.`deaderId`, `Kill`.`pointsGained`, `Kill`.`createdAt`, `Kill`.`updatedAt`, `Player`.`id` AS `Player.id`, `Player`.`nickname` AS `Player.nickname`, `Player`.`points` AS `Player.points`, `Player`.`rank` AS `Player.rank` FROM `Kills` AS `Kill` LEFT OUTER JOIN `Players` AS `Player` ON `Kill`.`deaderId` = `Player`.`id` WHERE `Kill`.`killerId` = '" + `${playerId}` + "' ORDER BY `Kill`.`createdAt` DESC LIMIT 24;"
    const kills = cloudDb.formatResponse(await cloudDb.query(killsQuery))
    const formttedKills = kills.map((k: any) => ({
        ...k,
        Player: {
            id: k["Player.id"],
            nickname: k["Player.nickname"],
            points: k["Player.points"],
            rank: k["Player.rank"]
        }
    }))

    return NextResponse.json(formttedKills)
    // const stats = await db.kills.findMany({
    //     where: {
    //         killerId: playerId
    //     },
    //     include: {
    //         Players_Kills_deaderIdToPlayers: true,
    //         // Players_Kills_killerIdToPlayers: true
    //     },
    //     take: 24,
    //     orderBy: {
    //         createdAt: "desc"
    //     }
    // })

    // const changedStats = stats.map(s => ({ ...s, Player: s.Players_Kills_deaderIdToPlayers }))

    // return NextResponse.json(changedStats)
}
