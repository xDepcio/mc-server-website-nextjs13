import { cloudDb } from "@/lib/utils"
import db from "@/lib/utils/prisma"
import { NextResponse } from "next/server"
import { inspect } from 'util'

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    let limit = Number(searchParams.get("limit")) || 10
    let offset = Number(searchParams.get("offset")) || 0
    let page = Number(searchParams.get("page")) || 1

    offset = (page - 1) * limit


    // const players = await db.players.findMany({
    //     orderBy: {
    //         points: "desc"
    //     },
    //     take: limit,
    //     skip: offset,
    // })
    const playersC = cloudDb.formatResponse(await cloudDb.query("SELECT `main`.`Players`.`id`, `main`.`Players`.`nickname`, `main`.`Players`.`points`, `main`.`Players`.`guildId`, `main`.`Players`.`rank`, `main`.`Players`.`guildRank` FROM `main`.`Players` WHERE 1=1 ORDER BY `main`.`Players`.`points` DESC LIMIT " + `${limit}` + " OFFSET " + `${offset}` + ""))
    console.log(playersC)

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
    const guildsGroupC = cloudDb.formatResponse(
        await cloudDb.query("SELECT AVG(`main`.`Players`.`points`), `main`.`Players`.`guildId` FROM `main`.`Players` WHERE `main`.`Players`.`guildId` IS NOT NULL GROUP BY `main`.`Players`.`guildId` ORDER BY AVG(`main`.`Players`.`points`) DESC LIMIT " + `${limit}` + " OFFSET " + `${offset}` + ""),
        {
            fieldName: "AVG(`main`.`Players`.`points`)",
            newFieldName: "_avg",
            replaceWith: (entry) => ({
                points: Number(entry.Value)
            })
        }
    )
    console.log(guildsGroupC)

    // const guildsIds = guildsGroup.map(g => g.guildId!)
    const guildsIds = guildsGroupC.map((g: any) => g.guildId!)

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
    const query1 = "SELECT `main`.`Guilds`.`id`, `main`.`Guilds`.`name`, `main`.`Guilds`.`createdAt`, `main`.`Guilds`.`updatedAt` FROM `main`.`Guilds` WHERE `main`.`Guilds`.`id` IN (" + `${guildsIds.join(',')}` + ") LIMIT -1 OFFSET 0"
    const guildsC1 = cloudDb.formatResponse(
        await cloudDb.query(query1)
    )

    const query2 = "SELECT `main`.`Players`.`id`, `main`.`Players`.`nickname`, `main`.`Players`.`points`, `main`.`Players`.`guildId`, `main`.`Players`.`rank`, `main`.`Players`.`guildRank` FROM `main`.`Players` WHERE (`main`.`Players`.`guildRank` = " + `"leader"` + " AND `main`.`Players`.`guildId` IN (" + `${guildsIds.join(',')}` + ")) LIMIT " + `${-1}` + " OFFSET " + `${0}` + ""
    const guildsC2 = cloudDb.formatResponse(
        await cloudDb.query(query2)
    )
    // console.log(guildsC1)
    // console.log(guildsC2)
    // console.log(inspect(guilds, {
    //     depth: null
    // }))

    const formattedGuildsC = guildsC1.map((g: any) => {
        const player = guildsC2.find((gg: any) => gg.guildId === g.id)
        // console.log(g)
        return {
            ...player,
            avgPoints: guildsGroupC.find((gd: any) => gd.guildId === g.id)._avg.points,
            Guild: {
                ...g
            }
        }
    }).sort((a: any, b: any) => b.avgPoints - a.avgPoints)
    console.log(formattedGuildsC)
    // console.log(inspect(formattedGuildsC, { depth: null }), 'dasdsa')

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

    let totalPlayers = await cloudDb.query("SELECT COUNT(*) FROM (SELECT `main`.`Players`.`id` FROM `main`.`Players` WHERE 1=1 LIMIT -1 OFFSET 0) AS `sub`")
    totalPlayers = Number(totalPlayers[0][0].Value)
    // console.log(totalPlayers)
    let totalGuilds = await cloudDb.query("SELECT COUNT(*) FROM (SELECT `main`.`Guilds`.`id` FROM `main`.`Guilds` WHERE 1=1 LIMIT -1 OFFSET 0) AS `sub`")
    totalGuilds = Number(totalGuilds[0][0].Value)
    // console.log(totalGuilds)
    return NextResponse.json({
        // totalPlayers: await db.players.count(),
        totalPlayers: totalPlayers,
        // totalGuilds: await db.guilds.count(),
        totalGuilds: totalGuilds,
        // players,
        players: playersC,
        // guilds: guildsFinal
        guilds: formattedGuildsC
    })
}
