'use client'
import { useState } from "react"

// @ts-ignore
function EventCard({ day, title, description, imageUrl, onClick, selected }) {

    // console.log({day, selected})
    // console.log(selected == day)
    const [eleOpacity, setEleOpacity] = useState('0.6')

    return (
        <div onClick={onClick} className='event-continer' style={{
            scale: selected == day ? '1' : '0.9',
            opacity: selected == day ? '1' : eleOpacity,
        }}
            onMouseEnter={() => {
                setEleOpacity('1')
            }}
            onMouseLeave={() => {
                setEleOpacity('0.6')
            }}>
            <h2>Dzień {day}</h2>
            <div>
                <div className='event-info'>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <img src={imageUrl}></img>
                </div>
            </div>
        </div>
    )
}

export default EventCard
