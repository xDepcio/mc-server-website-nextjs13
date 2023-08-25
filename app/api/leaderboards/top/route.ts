import db from "@/lib/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get("limit")) || 10
    const offset = Number(searchParams.get("offset")) || 0

    const players = await db.players.findMany({
        orderBy: {
            points: "desc"
        },
        take: limit,
        skip: offset,
    })

    const playerCount = await db.players.count()

    const guildsGroup = await db.players.groupBy({
        by: ["guildId"],
        _avg: {
            points: true
        },
        orderBy: {
            _avg: {
                points: "desc"
            }
        },
        where: {
            guildId: {
                not: null
            }
        },
        take: limit,
        skip: offset,
    })

    const guildsIds = guildsGroup.map(g => g.guildId!)

    const guilds = await db.guilds.findMany({
        include: {
            Players: {
                where: {
                    guildRank: {
                        equals: "leader"
                    }
                }
            }
        },
        where: {
            id: {
                in: guildsIds
            }
        }
    })

    const guildsFinal = guildsGroup.map(g => {
        const guild = guilds.find(gg => gg.id === g.guildId)

        return {
            ...guild?.Players[0],
            avgPoints: g._avg.points,
            Guild: {
                ...guild
            }
        }
    })

    return NextResponse.json({
        players,
        guilds: guildsFinal
    })
}
