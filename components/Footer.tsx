'use client'

import { faFacebook, faDiscord, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function Footer() {

    const path = usePathname()

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            // behavior: 'smooth'
        })
    }, [path])

    return (
        <div className='footer-wrapper'>
            <div className='upper-footer'>
                <div className='left-upper-footer'>
                    <img src='/images/logo.png'></img>
                    <div className='left-upper-footer--info'>
                        <div className="left-upper-footer--ip">TEST<span>MC</span>.PL</div>
                        <div className="left-upper-footer--slogan">Największy serwer w Polsce</div>
                    </div>
                </div>
                <div className='right-upper-footer'>
                    <h3>Dołącz do nas na</h3>
                    <ul>
                        <li>Discord <FontAwesomeIcon icon={faDiscord} /></li>
                        <li>Fecebook <FontAwesomeIcon icon={faFacebook} /></li>
                        <li>TikTok <FontAwesomeIcon icon={faTiktok} /></li>
                        <li>YouTube <FontAwesomeIcon icon={faYoutube} /></li>
                        <li>Instagram <FontAwesomeIcon icon={faInstagram} /></li>
                    </ul>
                </div>
                <div className='upper-footer-nav'>
                    <ul>
                        <Link href={'/'}><li>Strona główna</li></Link>
                        <Link href={'/leaderboards'}><li>Ranking</li></Link>
                        <Link href={'/shop'}><li>Sklep</li></Link>
                        <Link href={'/terms'}><li>Regulamin</li></Link>
                    </ul>
                </div>
            </div>
            <div className='lower-footer'>
                <div>TESTMC.PL - Wszystkie prawa obsarane 2022 ©</div>
                <div>Created By: <span>Norbi Gierczak</span></div>
            </div>
        </div>
    )
}

export default Footer
