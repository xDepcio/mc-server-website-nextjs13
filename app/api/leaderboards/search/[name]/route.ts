import { cloudDb } from "@/lib/utils";
import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { name: string } }) {
    const queryPlayerC = "SELECT `Player`.`id`, `Player`.`nickname`, `Player`.`points`, `Player`.`rank`, `Player`.`guildRank`, `Guild`.`id` AS `Guild.id`, `Guild`.`name` AS `Guild.name` FROM `Players` AS `Player` LEFT OUTER JOIN `Guilds` AS `Guild` ON `Player`.`guildId` = `Guild`.`id` WHERE `Player`.`nickname` = '" + `${params.name}` + "';"
    const playerC = await cloudDb.query(queryPlayerC)
    if (playerC) {
        const playerCFormatted = cloudDb.formatResponse(playerC)
        const player = playerCFormatted[0]
        console.log(player)

        const pos = await cloudDb.query("SELECT count(*) AS `count` FROM `Players` AS `Player` WHERE `Player`.`points` >= " + `${Number(player.points)}` + ";")

        return NextResponse.json({
            isPlayer: true,
            ...player,
            leaderboardPos: Number(pos[0][0].Value),
            Guild: {
                id: player["Guild.id"],
                name: player["Guild.name"]
            }
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        })
    }

    const queryG1 = "SELECT `Guild`.`id`, `Guild`.`name`, `Players`.`id` AS `Players.id`, `Players`.`nickname` AS `Players.nickname`, `Players`.`points` AS `Players.points`, `Players`.`rank` AS `Players.rank`, `Players`.`guildRank` AS `Players.guildRank` FROM `Guilds` AS `Guild` LEFT OUTER JOIN `Players` AS `Players` ON `Guild`.`id` = `Players`.`guildId` WHERE `Guild`.`name` = '" + `${params.name}` + "';"
    const guildCR1 = await cloudDb.query(queryG1)
    if (!guildCR1) {
        return NextResponse.json({
            error: 'not-found',
            message: 'Gracz lub Gildia z taką nazwą nie istnieje'
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        })
    }
    const guildC1 = cloudDb.formatResponse(guildCR1)

    const queryG2 = "SELECT `Guild`.`name`, `Guild`.`id`, AVG(`points`) AS `avgPoints` FROM `Guilds` AS `Guild` LEFT OUTER JOIN `Players` AS `Players` ON `Guild`.`id` = `Players`.`guildId` WHERE `Guild`.`id` = " + `${Number(guildC1[0].id)}` + ";"
    const guildC2 = cloudDb.formatResponse(await cloudDb.query(queryG2))

    const queryG3 = "SELECT COUNT(*) as guildPlace FROM (SELECT *, AVG(points) as avgPoints FROM Guilds JOIN (Players) ON (Players.guildId = Guilds.id) GROUP BY guildId HAVING avgPoints >= " + `${Number(guildC2[0].avgPoints)}` + " ORDER BY avgPoints DESC);"
    const guildC3 = cloudDb.formatResponse(await cloudDb.query(queryG3))

    console.log(guildC1)
    console.log(guildC2)
    console.log(guildC3)

    const guildLeaders = guildC1.filter((p: any) => p["Players.guildRank"] === "leader")
    const guildVleader = guildC1.filter((p: any) => p["Players.guildRank"] === "vleader")
    const guildMasters = guildC1.filter((p: any) => p["Players.guildRank"] === "master")
    const guildPlayers = guildC1.filter((p: any) => p["Players.guildRank"] === "player")

    return NextResponse.json({
        isPlayer: false,
        // guildC2,
        ...guildC2[0],
        guildAvg: Number(guildC2[0].avgPoints),
        ...guildC3[0],
        leaderboardPos: Number(guildC3[0].guildPlace),
        Players: guildPlayers,
        Leaders: guildLeaders,
        vLeaders: guildVleader,
        Masters: guildMasters
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })

    // const player = await db.players.findFirst({
    //     where: {
    //         nickname: params.name
    //     },
    //     include: {
    //         Guilds: true
    //     }
    // })

    // if (player) {
    //     const playerPos = await db.players.count({
    //         where: {
    //             points: {
    //                 gt: player.points!
    //             }
    //         }
    //     })

    //     return NextResponse.json({
    //         isPlayer: true,
    //         ...player,
    //         leaderboardPos: playerPos + 1
    //     })
    // }

    // const guild = await db.guilds.findFirst({
    //     where: {
    //         name: params.name
    //     },
    //     include: {
    //         Players: {
    //             orderBy: {
    //                 points: "desc"
    //             }
    //         }
    //     }
    // })

    // if (!guild) {
    //     return NextResponse.json({
    //         error: 'not-found',
    //         message: 'Gracz lub Gildia z taką nazwą nie istnieje'
    //     })
    // }

    // const guildAvg = await db.players.aggregate({
    //     where: {
    //         guildId: guild.id
    //     },
    //     _avg: {
    //         points: true
    //     }
    // })

    // const guildPlace = await db.$queryRawUnsafe(`SELECT COUNT(*) as guildPlace FROM (
    //     SELECT *, AVG(points) as avgPoints FROM Guilds
    //         JOIN (Players) ON (Players.guildId = Guilds.id)
    //         GROUP BY guildId
    //         HAVING avgPoints >= ${Math.floor(guildAvg._avg.points!)}
    //         ORDER BY avgPoints DESC
    //     );`
    // ) as any

    // const guildLeaders = guild.Players.filter(p => p.guildRank === "leader")
    // const guildVleader = guild.Players.filter(p => p.guildRank === "vleader")
    // const guildMasters = guild.Players.filter(p => p.guildRank === "master")
    // const guildPlayers = guild.Players.filter(p => p.guildRank === "player")

    // return NextResponse.json({
    //     ...guild,
    //     guildAvg: guildAvg._avg.points,
    //     guildPlace: Number(guildPlace[0].guildPlace),
    //     isPlayer: false,
    //     Players: guildPlayers,
    //     Leaders: guildLeaders,
    //     vLeaders: guildVleader,
    //     Masters: guildMasters
    // })
}
