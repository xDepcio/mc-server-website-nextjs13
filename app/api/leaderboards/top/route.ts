import { cloudDb } from "@/lib/utils"
import db from "@/lib/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get("limit")) || 10
    const offset = Number(searchParams.get("offset")) || 0

    // const players = await db.players.findMany({
    //     orderBy: {
    //         points: "desc"
    //     },
    //     take: limit,
    //     skip: offset,
    // })
    const playersC = await cloudDb.query("SELECT `id`, `nickname`, `points`, `guildId`, `rank`, `guildRank`, `createdAt`, `updatedAt` FROM `Players` AS `Player` ORDER BY `Player`.`points` DESC LIMIT " + `${limit}` + ";")
    const playersCFormatted = cloudDb.formatResponse(playersC)
    console.log(playersCFormatted)

    // const playerCount = await db.players.count()

    // const guildsGroup = await db.players.groupBy({
    //     by: ["guildId"],
    //     _avg: {
    //         points: true
    //     },
    //     orderBy: {
    //         _avg: {
    //             points: "desc"
    //         }
    //     },
    //     where: {
    //         guildId: {
    //             not: null
    //         }
    //     },
    //     take: limit,
    //     skip: offset,
    // })

    // const guildsIds = guildsGroup.map(g => g.guildId!)

    // const guilds = await db.guilds.findMany({
    //     include: {
    //         Players: {
    //             where: {
    //                 guildRank: {
    //                     equals: "leader"
    //                 }
    //             }
    //         }
    //     },
    //     where: {
    //         id: {
    //             in: guildsIds
    //         }
    //     }
    // })

    // const guildsFinal = guildsGroup.map(g => {
    //     const guild = guilds.find(gg => gg.id === g.guildId)

    //     return {
    //         ...guild?.Players[0],
    //         avgPoints: g._avg.points,
    //         Guild: {
    //             ...guild
    //         }
    //     }
    // })

    const query2 = "SELECT `Player`.`id`, `Player`.`nickname`, `Player`.`points`, `Player`.`guildId`, `Player`.`rank`, `Player`.`guildRank`, `Player`.`createdAt`, `Player`.`updatedAt`, AVG(`points`) AS `avgPoints`, `Guild`.`id` AS `Guild.id`, `Guild`.`name` AS `Guild.name`, `Guild`.`createdAt` AS `Guild.createdAt`, `Guild`.`updatedAt` AS `Guild.updatedAt` FROM `Players` AS `Player` LEFT OUTER JOIN `Guilds` AS `Guild` ON `Player`.`guildId` = `Guild`.`id` GROUP BY `guildId` ORDER BY AVG(`points`) DESC LIMIT 10;"
    const guildC = await cloudDb.query(query2)
    const guildCFormatted1 = cloudDb.formatResponse(guildC)
    const guildCFormatted2 = guildCFormatted1.map((g: any) => {
        return {
            ...g,
            avgPoints: Number(g.avgPoints),
            Guild: {
                id: g["Guild.id"],
                name: g["Guild.name"],
                createdAt: g["Guild.createdAt"],
                updatedAt: g["Guild.updatedAt"]
            }
        }
    })
    console.log(guildC)

    return NextResponse.json({
        // players,
        players: playersCFormatted,
        // guilds: guildsFinal
        guilds: guildCFormatted2
    })
}
