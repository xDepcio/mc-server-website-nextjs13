'use client'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './PaySuccess.css'

const parseQuery = (params) => {
    let newParams = {}
    params.split('?')[1].split('&').forEach((e) => {
        const [key, value] = e.split('=')
        newParams[key] = value
    })
    return newParams
}


function PaySuccess() {
    const urlParams = parseQuery((useLocation()).search)
    console.log(urlParams)
    const [typeEle, setTypeEle] = useState(<></>)

    useEffect(() => {
        switch (urlParams.type) {
            case 'svip': {
                setTypeEle(
                    <span style={{ color: 'aqua', fontWeight: 500 }}>SVIP</span>
                )
                break
            }
            case 'vip': {
                setTypeEle(
                    <span style={{ color: 'rgb(226, 226, 226)', fontWeight: 500 }}>VIP</span>
                )
                break
            }
            case 'chests16': {
                setTypeEle(
                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>16 MAGICZNYCH SKRZYNEK</span>
                )
                break
            }
            case 'chests32': {
                setTypeEle(
                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>32 MAGICZNYCH SKRZYNEK</span>
                )
                break
            }
            case 'chests64': {
                setTypeEle(
                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>64 MAGICZNYCH SKRZYNEK</span>
                )
                break
            }
            case 'chests128': {
                setTypeEle(
                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>128 MAGICZNYCH SKRZYNEK</span>
                )
                break
            }
            case 'chests256': {
                setTypeEle(
                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>256 MAGICZNYCH SKRZYNEK</span>
                )
                break
            }
            case 'chests512': {
                setTypeEle(
                    <span style={{ color: 'goldenrod', fontWeight: 500 }}>512 MAGICZNYCH SKRZYNEK</span>
                )
                break
            }
        }
    }, [])

    return (
        <div className='pay-success-wrapper'>
            <div className='pay-holder'>
                <div className='pay-status-info'>
                    <h2>Płatność powiodła się</h2>
                    <FontAwesomeIcon icon={faCheck} className={'check-icon'} />
                </div>
                <p className='pay-activate'>
                    Usługa {typeEle} została aktywowana na serwerze dla gracza <Link to={`/leaderboards/${urlParams.nick}`}><span className='pay-nick' style={{
                        color: 'white'
                    }}>
                        {urlParams.nick}
                    </span></Link>
                </p>
            </div>
        </div>
    )
}

export default PaySuccess
