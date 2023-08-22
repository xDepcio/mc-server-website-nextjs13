'use client'

import './Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function Navigation() {
    const [navScrolled, setNavScrolled] = useState('')
    const [onlineNum, setOnlineNum] = useState(1912)

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (window.scrollY >= 100) {
                setNavScrolled('nav-scrolled')
            }
            else {
                setNavScrolled('')
            }
        }, 150)

        return () => {
            clearInterval(scrollInterval)
        }
    }, [])

    return (
        <div className='nav-outer-wrapper'>
            <div className={`nav-wrapper-main ${navScrolled}`}>
                <nav>
                    <div className='logo-wrapper'>
                        <div className='logo-icon'>
                            <img src='/images/logo.png'></img>
                        </div>
                        <div className='logo-name'>TEST<span>MC</span>.PL</div>
                        <div className='status-icon-wrapper'>
                            <FontAwesomeIcon className='status-icon' icon={faCircle} />
                        </div>
                        <div className='logo-online'>{onlineNum} online</div>
                    </div>
                    <ul className='main-nav-ul'>
                        <li className='main-nav-li'>
                            <Link href='/'>Strona główna</Link>
                        </li>
                        <li className='main-nav-li'>
                            <Link href='/leaderboards'>Ranking</Link>
                        </li>
                        <li className='main-nav-li'>
                            <Link href='/shop'>Sklep</Link>
                        </li>
                        <li className='main-nav-li'>
                            <Link href='/terms'>Regulamin</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navigation
