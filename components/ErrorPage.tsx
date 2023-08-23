'use client'

import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ErrorPage.css'
import { useRouter } from 'next/navigation'


function ErrorPage({ message }) {
    const router = useRouter()

    return (
        <div className="error-page-outer-wrapper">
            <div className="error-page-content">
                <p className='main-error-info'>Wystąpił problem <p className='sad-face-error'>{":("}</p></p>
                <p className="error-message-field">{message}</p>
                <div className='error-nav-wrapper'>
                    <button onClick={() => router.push('/')}>
                        <FontAwesomeIcon className='arrow-back-error' icon={faArrowCircleLeft} />{' Wroć na stronę główną'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
