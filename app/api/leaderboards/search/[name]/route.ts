import db from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { name: string } }) {
    const player = await db.players.findFirst({
        where: {
            nickname: params.name
        },
        include: {
            Guilds: true
        }
    })

    if (player) {
        const playerPos = await db.players.count({
            where: {
                points: {
                    gt: player.points!
                }
            }
        })

        return NextResponse.json({
            isPlayer: true,
            ...player,
            leaderboardPos: playerPos + 1
        })
    }

    const guild = await db.guilds.findFirst({
        where: {
            name: params.name
        },
        include: {
            Players: {
                orderBy: {
                    points: "desc"
                }
            }
        }
    })

    if (!guild) {
        return NextResponse.json({
            error: 'not-found',
            message: 'Gracz lub Gildia z taką nazwą nie istnieje'
        })
    }

    const guildAvg = await db.players.aggregate({
        where: {
            guildId: guild.id
        },
        _avg: {
            points: true
        }
    })

    const guildLeaders = guild.Players.filter(p => p.guildRank === "leader")
    const guildVleader = guild.Players.filter(p => p.guildRank === "vleader")
    const guildMasters = guild.Players.filter(p => p.guildRank === "master")
    const guildPlayers = guild.Players.filter(p => p.guildRank === "player")

    return NextResponse.json({
        ...guild,
        guildAvg: guildAvg._avg.points,
        isPlayer: false,
        Players: guildPlayers,
        Leaders: guildLeaders,
        vLeaders: guildVleader,
        Masters: guildMasters
    })
}
