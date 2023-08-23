'use client'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import './SingleRankGuild.css'
import { useRouter } from 'next/navigation'



function SingleRankGuild({ searchData }) {
    // const navigate = useNavigate()
    const router = useRouter()
    console.log('guidl SEARCH DATA:', searchData)
    const guildKills = useSelector((state) => state.leaderboard.guildKills)
    const guildDeaths = useSelector((state) => state.leaderboard.guildDeaths)
    const [displayHoverInfo, setDisplayHoverInfo] = useState(false)
    const [displayHoverElement, setDisplayHoverElement] = useState(7)
    const [displayStatInfo, setDisplayStatInfo] = useState(false)
    const [displayStatEle, setDisplayStatEle] = useState(1)

    return (
        <div className="single-rank-wrapper--guilds">
            <h2>Statystyki gildii {searchData && searchData.name}</h2>
            <div className='single-rank-main-content--guilds'>
                <div className='name-and-head--guilds'>
                    <h3>Lider: {searchData && searchData.Leaders[0].nickname}</h3>
                    <div className='head-icon-wrapper--guilds'>
                        <div style={{ backgroundImage: `url(https://minotar.net/cube/${searchData ? searchData.Leaders[0].nickname : 'undefined'}/100.png)` }}></div>
                    </div>
                </div>
                <div className='basic-info--guilds'>
                    <p className='main-leaders'>Zarząd Gildii</p>
                    <div className='leader'>
                        <h4>Lider:</h4>
                        <ul>
                            {searchData.Leaders.map((ele, i) => {
                                return (
                                    <li
                                        onClick={() => {
                                            router.push(`/leaderboards/${ele.nickname}`)
                                        }}
                                        onMouseEnter={() => {
                                            setDisplayHoverInfo(true)
                                            setDisplayHoverElement(ele.id)
                                        }}
                                        onMouseLeave={() => {
                                            setDisplayHoverInfo(false)
                                        }}
                                        key={i}
                                        style={{ backgroundImage: `url(https://minotar.net/helm/${ele.nickname}/35.png)` }}>
                                        {(displayHoverInfo && displayHoverElement === ele.id) && (
                                            <div className='hover-info'>
                                                <div className='hover-info-inner-div'>
                                                    <p className='width-setter-hover'></p>
                                                    <p className='hover-info-nick'>Nick: <span>{ele.nickname}</span></p>
                                                    <p className='hover-info-points'>Punkty: <span>{ele.points}</span></p>
                                                    <p className='hover-nav-info'>Kliknij aby przejść na profil</p>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                        <h4>Zastępcy:</h4>
                        <ul>
                            {searchData.vLeaders.length <= 0 ? (<span className='guild-no-rank'>Brak</span>) : searchData.vLeaders.map((ele, i) => {
                                return (
                                    <li
                                        onClick={() => {
                                            router.push(`/leaderboards/${ele.nickname}`)
                                        }}
                                        onMouseEnter={() => {
                                            setDisplayHoverInfo(true)
                                            setDisplayHoverElement(ele.id)
                                        }}
                                        onMouseLeave={() => {
                                            setDisplayHoverInfo(false)
                                        }}
                                        key={i}
                                        style={{ backgroundImage: `url(https://minotar.net/helm/${ele.nickname}/35.png)` }}>
                                        {(displayHoverInfo && displayHoverElement === ele.id) && (
                                            <div className='hover-info'>
                                                <div className='hover-info-inner-div'>
                                                    <p className='width-setter-hover'></p>
                                                    <p className='hover-info-nick'>Nick: <span>{ele.nickname}</span></p>
                                                    <p className='hover-info-points'>Punkty: <span>{ele.points}</span></p>
                                                    <p className='hover-nav-info'>Kliknij aby przejść na profil</p>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='masters'>
                        <h4>Mistrzowie:</h4>
                        <ul>
                            {searchData.Masters.length <= 0 ? (<span className='guild-no-rank'>Brak</span>) : searchData.Masters.map((ele, i) => {
                                return (
                                    <li
                                        onClick={() => {
                                            router.push(`/leaderboards/${ele.nickname}`)
                                        }}
                                        onMouseEnter={() => {
                                            setDisplayHoverInfo(true)
                                            setDisplayHoverElement(ele.id)
                                        }}
                                        onMouseLeave={() => {
                                            setDisplayHoverInfo(false)
                                        }}
                                        key={i}
                                        style={
                                            { backgroundImage: `url(https://minotar.net/helm/${ele.nickname}/35.png)` }
                                        }>
                                        {(displayHoverInfo && displayHoverElement === ele.id) && (
                                            <div className='hover-info'>
                                                <div className='hover-info-inner-div'>
                                                    <p className='width-setter-hover'></p>
                                                    <p className='hover-info-nick'>Nick: <span>{ele.nickname}</span></p>
                                                    <p className='hover-info-points'>Punkty: <span>{ele.points}</span></p>
                                                    <p className='hover-nav-info'>Kliknij aby przejść na profil</p>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='main-stats--guilds'>
                    <p>Główne statystyki</p>
                    <ul>
                        <li>Punkty: <span>{searchData && Math.floor(searchData.guildAvg)}</span></li>
                        <li>Zabójstwa: <span>35</span></li>
                        <li>Śmierci: <span>9</span></li>
                        <li>Pozycja: <span>{searchData.leaderboardPos}</span></li>
                        <li>Ilość żyć: {[1].map((ele) => {
                            let sol = []

                            for (let i = 0; i < 3; i++) {
                                sol.push((
                                    <FontAwesomeIcon className='guild-hearts' icon={faHeart} key={i} />
                                ))
                            }
                            return sol
                        })}</li>
                    </ul>
                </div>
            </div>
            <div className='last-stats-page-wrapper--guilds'>
                <div className='last-stats-page--guilds'>
                    <div className='remaining-players'>
                        <h4>Pozostali członkowie</h4>
                        <div className='remaining-players-holder'>
                            {searchData.Players.length <= 0 ?
                                (<span className='guild-no-rank'>Brak</span>) :
                                searchData.Players.map((ele, i) => {
                                    console.log(ele.id, 'idDDD')
                                    return (
                                        <div
                                            onClick={() => {
                                                router.push(`/leaderboards/${ele.nickname}`)
                                            }}
                                            onMouseEnter={() => {
                                                setDisplayHoverInfo(true)
                                                setDisplayHoverElement(ele.id)
                                            }}
                                            onMouseLeave={() => {
                                                setDisplayHoverInfo(false)
                                            }}
                                            className='player-head-in-guild-rank'
                                            key={i}
                                            style={{
                                                backgroundImage: `url(https://minotar.net/helm/${ele.nickname}/35.png)`
                                            }}>
                                            {(displayHoverInfo && displayHoverElement === ele.id) && (
                                                <div
                                                    className='hover-info'>
                                                    <div className='hover-info-inner-div'>
                                                        <p className='width-setter-hover'></p>
                                                        <p className='hover-info-nick'>Nick: <span>{ele.nickname}</span></p>
                                                        <p className='hover-info-points'>Punkty: <span>{ele.points}</span></p>
                                                        <p className='hover-nav-info'>Kliknij aby przejść na profil</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            {/* <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div> */}
                        </div>
                    </div>
                    <div className='last-kills--guilds'>
                        <h4>Ostatnie zabójstwa</h4>
                        <div className='last-kills-holder--guilds'>
                            {guildKills?.map((kill) => {
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
                                                setDisplayStatEle(`${kill.id}kill`)
                                                setDisplayStatInfo(true)
                                            }}
                                            onMouseLeave={() => {
                                                setDisplayStatInfo(false)
                                            }}
                                            onClick={() => {
                                                console.log('---------------clicked-----------------')
                                                setDisplayStatInfo(false)
                                                router.push(`/leaderboards/${kill.nickname}`)
                                            }}
                                            style={{
                                                width: '35px',
                                                height: '35px',
                                                cursor: 'pointer',
                                                margin: 0,
                                                backgroundImage: `url(https://minotar.net/helm/${kill.nickname}/35.png)`
                                            }}>
                                        </div>
                                        {(displayStatInfo && displayStatEle === `${kill.id}kill`) && (
                                            <div className='hover-info--player'>
                                                <p className='hover-info-nick--player-stats'>Nick: <span>{kill.nickname}</span> <span style={{ color: 'rgb(185, 185, 185)', marginLeft: '15px' }}>Punkty:</span><span className='hover-info-points--player-stats'>+{kill.pointsGained}</span></p>
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
                    <div className='last-deaths--guilds'>
                        <h4>Ostatnie śmierci</h4>
                        <div className='last-deaths-holder--guilds'>
                            {guildDeaths?.map((death) => {

                                const currDate = new Date(death.createdAt)
                                const year = String(currDate.getFullYear())
                                const month = String(currDate.getMonth()).length <= 1 ? `0${currDate.getMonth()}` : currDate.getMonth()
                                const day = String(currDate.getDay()).length <= 1 ? `0${currDate.getDay()}` : currDate.getDay()
                                const time = `${String(currDate.getHours()).length <= 1 ? `0${currDate.getHours()}` : currDate.getHours()}:${String(currDate.getMinutes()).length <= 1 ? `0${currDate.getMinutes()}` : currDate.getMinutes()}:${String(currDate.getSeconds()).length <= 1 ? `0${currDate.getSeconds()}` : currDate.getSeconds()}`

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
                                                router.push(`/leaderboards/${death.nickname}`)
                                            }}
                                            style={{
                                                width: '35px',
                                                height: '35px',
                                                cursor: 'pointer',
                                                margin: 0,
                                                backgroundImage: `url(https://minotar.net/helm/${death.nickname}/35.png)`
                                            }}>
                                        </div>
                                        {(displayStatInfo && displayStatEle === death.id) && (
                                            <div className='hover-info--player'>
                                                <p className='hover-info-nick--player-stats'>Nick: <span>{death.nickname}</span> <span style={{ color: 'rgb(185, 185, 185)', marginLeft: '15px' }}>Punkty:</span><span className='hover-info-points--player-stats hover-info-points--player-stats--death'>-{death.pointsLost}</span></p>
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

export default SingleRankGuild
