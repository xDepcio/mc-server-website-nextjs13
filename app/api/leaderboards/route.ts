export const GET = async () => {
    console.log('qeury params:', res.locals.query)

    const players = await Player.findAll({
        order: [
            ['points', 'DESC']
        ],
        limit: res.locals.query.limit,
        offset: res.locals.query.offset,
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt',
                'guildId',
                'guildRank'
            ]
        }
    })

    const guilds = await Player.findAll({
        where: {
            guildId: {
                [Op.ne]: null
            }
        },
        include: [
            {
                model: Guild,
                // attributes: [
                // 'id',
                // 'name'
                // ]
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('points')), 'avgPoints'],
            ]
        },
        group: 'guildId',
        order: [[sequelize.fn('AVG', sequelize.col('points')), 'DESC']],
        limit: res.locals.query.limit,
        offset: res.locals.query.offset
    })

    res.json({
        totalPlayers: await Player.count(),
        totalGuilds: await Guild.count(),
        players: players,
        guilds: guilds
    })
}
