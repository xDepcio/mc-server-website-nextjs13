import { cloudDb } from "@/lib/utils";
import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const playerId = Number(params.id)

    const deathsQuery = "SELECT `Death`.`id`, `Death`.`deaderId`, `Death`.`killerId`, `Death`.`pointsLost`, `Death`.`createdAt`, `Death`.`updatedAt`, `Player`.`id` AS `Player.id`, `Player`.`nickname` AS `Player.nickname`, `Player`.`points` AS `Player.points`, `Player`.`rank` AS `Player.rank` FROM `Deaths` AS `Death` LEFT OUTER JOIN `Players` AS `Player` ON `Death`.`killerId` = `Player`.`id` WHERE `Death`.`deaderId` = '" + `${playerId}` + "' ORDER BY `Death`.`createdAt` DESC LIMIT 24;"
    const deaths = cloudDb.formatResponse(await cloudDb.query(deathsQuery))
    const formattedDeaths = deaths.map((d: any) => ({
        ...d,
        Player: {
            id: d["Player.id"],
            nickname: d["Player.nickname"],
            points: d["Player.points"],
            rank: d["Player.rank"]
        }
    }))

    return NextResponse.json(formattedDeaths)

    // const stats = await db.deaths.findMany({
    //     where: {
    //         deaderId: playerId
    //     },
    //     include: {
    //         Players_Deaths_killerIdToPlayers: true,
    //         // Players_Kills_killerIdToPlayers: true
    //     },
    //     take: 24,
    //     orderBy: {
    //         createdAt: "desc"
    //     }
    // })

    // const changedStats = stats.map(s => ({ ...s, Player: s.Players_Deaths_killerIdToPlayers }))

    // return NextResponse.json(changedStats)
}
