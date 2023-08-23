'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SingleRankPlayer.css'
import { getPlayerKills } from '@/redux/leaderboard'
import { useRouter } from 'next/navigation'

function SingleRankPlayer({ searchData }) {
    // const navigate = useNavigate()
    const router = useRouter()
    console.log('searchDATA', searchData)
    const playerKills = useSelector((state) => state.leaderboard.kills)
    const playerDeaths = useSelector((state) => state.leaderboard.deaths)
    console.log('playerKills', playerKills)

    const [displayStatInfo, setDisplayStatInfo] = useState(false)
    const [displayStatEle, setDisplayStatEle] = useState(1)

    return (
        <div className="single-rank-wrapper">
            <h2>Statystyki gracza {searchData && searchData.nickname}</h2>
            <div className='single-rank-main-content'>
                <div className='name-and-head'>
                    <h3>{searchData && searchData.nickname}</h3>
                    <div className='head-icon-wrapper'>
                        <div style={{ backgroundImage: `url(https://minotar.net/cube/${searchData ? searchData.nickname : 'undefined'}/100.png)` }}></div>
                    </div>
                </div>
                <div className='basic-info'>
                    <h4>Gildia: {searchData.Guild ? <span className='guild-tag-in-player' onClick={() => router.push(`/leaderboards/${searchData.Guild.name}`)}>{searchData && searchData.Guild.name}</span> : <span style={{ color: 'rgb(185, 185, 185)' }} >Brak</span>}</h4>
                    <h4>Ranga: <span className='color-player' style={{
                        color: `${searchData.rank === 'gracz' ? 'rgb(185, 185, 185)' :
                            searchData.rank === 'vip' ? 'silver' : 'aqua'}`
                    }}>{searchData.rank !== 'gracz' ? searchData.rank.toUpperCase() : searchData.rank}</span></h4>
                </div>
                <div className='main-stats'>
                    <p>Główne statystyki</p>
                    <ul>
                        <li>Punkty: <span>{searchData && searchData.points}</span></li>
                        <li>Zabójstwa: <span>35</span></li>
                        <li>Śmierci: <span>9</span></li>
                        <li>Pozycja: <span>{searchData.leaderboardPos}</span></li>
                    </ul>
                </div>
                <div className='additional-stats'>
                    <p>Inne statystyki</p>
                    <ul>
                        <li>Wykopany kamień: <span>5.4 mln</span></li>
                        <li>Zjedzony koxy: <span>127</span></li>
                        <li>Zjedzone refy: <span>1432</span></li>
                        <li>Rzucone perły: <span>32</span></li>
                    </ul>
                </div>
            </div>
            <div className='last-stats-page-wrapper'>
                <div className='last-stats-page'>
                    <div className='last-kills'>
                        <h4>Ostatnie zabójstwa</h4>
                        <div className='last-kills-holder'>
                            {playerKills?.map((kill) => {
                                // console.log('kiklk', kill)
                                const currDate = new Date(kill.createdAt)
                                const year = String(currDate.getFullYear())
                                const month = String(currDate.getMonth()).length <= 1 ? `0${currDate.getMonth()}` : currDate.getMonth()
                                const day = String(currDate.getDay()).length <= 1 ? `0${currDate.getDay()}` : currDate.getDay()
                                const time = `${String(currDate.getHours()).length <= 1 ? `0${currDate.getHours()}` : currDate.getHours()}:${String(currDate.getMinutes()).length <= 1 ? `0${currDate.getMinutes()}` : currDate.getMinutes()}:${String(currDate.getSeconds()).length <= 1 ? `0${currDate.getSeconds()}` : currDate.getSeconds()}`

                                // console.log(year, month, day,currDate.getHours())
                                // console.log('gggggfdgdf')
                                return (
                                    <div key={kill.id} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                        <div
                                            onMouseEnter={() => {
                                                setDisplayStatEle(kill.id)
                                                setDisplayStatInfo(true)
                                            }}
                                            onMouseLeave={() => {
                                                setDisplayStatInfo(false)
                                            }}
                                            onClick={() => {
                                                console.log('---------------clicked-----------------')
                                                setDisplayStatInfo(false)
                                                router.push(`/leaderboards/${kill.Player.nickname}`)
                                            }}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                cursor: 'pointer',
                                                margin: 0,
                                                backgroundImage: `url(https://minotar.net/helm/${kill.Player.nickname}/40.png)`
                                            }}>
                                        </div>
                                        {(displayStatInfo && displayStatEle === kill.id) && (
                                            <div className='hover-info--player'>
                                                <p className='hover-info-nick--player-stats'>Nick: <span>{kill.Player.nickname}</span> <span style={{ color: 'rgb(185, 185, 185)', marginLeft: '15px' }}>Punkty:</span><span className='hover-info-points--player-stats'>+{kill.pointsGained}</span></p>
                                                {/* <p className='hover-info-points--player-stats'><span>+{kill.pointsGained}</span></p> */}
                                                <p className='hover-info-date'>{`${year}-${month}-${day} ${time}`}</p>

                                                <p className='hover-nav-info--player-stats'>Kliknij aby przejść na profil</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='last-deaths'>
                        <h4>Ostatnie śmierci</h4>
                        <div className='last-deaths-holder'>
                            {playerDeaths?.map((death) => {
                                // console.log('kiklk', kill)
                                const currDate = new Date(death.createdAt)
                                const year = String(currDate.getFullYear())
                                const month = String(currDate.getMonth()).length <= 1 ? `0${currDate.getMonth()}` : currDate.getMonth()
                                const day = String(currDate.getDay()).length <= 1 ? `0${currDate.getDay()}` : currDate.getDay()
                                const time = `${String(currDate.getHours()).length <= 1 ? `0${currDate.getHours()}` : currDate.getHours()}:${String(currDate.getMinutes()).length <= 1 ? `0${currDate.getMinutes()}` : currDate.getMinutes()}:${String(currDate.getSeconds()).length <= 1 ? `0${currDate.getSeconds()}` : currDate.getSeconds()}`

                                // console.log(year, month, day,currDate.getHours())
                                // console.log('gggggfdgdf')
                                return (
                                    <div key={death.id} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                        <div
                                            onMouseEnter={() => {
                                                setDisplayStatEle(death.id)
                                                setDisplayStatInfo(true)
                                            }}
                                            onMouseLeave={() => {
                                                setDisplayStatInfo(false)
                                            }}
                                            onClick={() => {
                                                console.log('---------------clicked-----------------')
                                                setDisplayStatInfo(false)
                                                router.push(`/leaderboards/${death.Player.nickname}`)
                                            }}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                cursor: 'pointer',
                                                margin: 0,
                                                backgroundImage: `url(https://minotar.net/helm/${death.Player.nickname}/40.png)`
                                            }}>
                                        </div>
                                        {(displayStatInfo && displayStatEle === death.id) && (
                                            <div className='hover-info--player'>
                                                <p className='hover-info-nick--player-stats'>Nick: <span>{death.Player.nickname}</span> <span style={{ color: 'rgb(185, 185, 185)', marginLeft: '15px' }}>Punkty:</span><span className='hover-info-points--player-stats hover-info-points--player-stats--death'>-{death.pointsLost}</span></p>
                                                {/* <p className='hover-info-points--player-stats'><span>+{kill.pointsGained}</span></p> */}
                                                <p className='hover-info-date'>{`${year}-${month}-${day} ${time}`}</p>

                                                <p className='hover-nav-info--player-stats'>Kliknij aby przejść na profil</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRankPlayer
