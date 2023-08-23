// @ts-nocheck

'use client'

import { useEffect, useRef, useState } from "react"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Terms() {
    const [hiddenEles, setHiddenEles] = useState(['chuj'])
    const [scrolledToEle, setScrolledToEle] = useState('')
    const lastScrolledToEle = useRef()

    const handleScroll = () => {
        let ele = document.elementFromPoint(window.innerWidth / 2, 260).parentElement
        if (ele.tagName === 'SECTION') {
            if (ele.id === lastScrolledToEle.current.id) return
            setScrolledToEle(ele)
            document.getElementById(`${ele.id}-li`).style.listStyleType = 'disc'
            document.getElementById(`${ele.id}-li`).classList.add('hovered-li')

            if (lastScrolledToEle.current !== '') {
                document.getElementById(`${lastScrolledToEle.current.id}-li`).style.listStyleType = 'none'
                document.getElementById(`${lastScrolledToEle.current.id}-li`).classList.remove('hovered-li')
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-term')
                }
            })
        })

        const hiddenFirst = document.querySelectorAll('.terms-info section')
        hiddenFirst.forEach((el) => observer.observe(el))

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        lastScrolledToEle.current = scrolledToEle
    }, [scrolledToEle])



    return (
        <div className="terms-wrapper">
            <div className='main-terms-head'>Regulamin</div>
            {/* <div style={{zIndex: 10, position: 'fixed', top: '500px'}}>now: {contentInView} prev: {prevContentInView.current}</div> */}
            <div style={{ marginTop: '0px' }} className='term-container' id='first-art'>
                <div className='term-header'>
                    <div className='clicker' onClick={() => {

                        const ele = document.getElementById('first-art')

                        if (ele.className.split(' ').includes('hidden-terms')) {
                            ele.className = 'term-container'
                            setHiddenEles([...hiddenEles].filter((e) => e !== 'first-cont'))
                        }
                        else {
                            ele.className += ' hidden-terms'
                            setHiddenEles([...hiddenEles, 'first-cont'])
                        }
                    }}></div>
                    <div style={{
                        transform: `${hiddenEles?.includes('first-cont') ? 'rotate(-45deg)' : ''}`,
                        top: `${hiddenEles?.includes('first-cont') ? '-5px' : ''}`
                    }} className='expand-arrow'></div>
                    <h2 className='term-name'>Regulaming Rozgrywki</h2>
                    <div className='divider'></div>
                </div>
                {!hiddenEles?.includes('first-cont') ? (
                    <div className='terms-content'>
                        <div className='terms-nav'>
                            <ul>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('cuboidy')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='cuboidy-li'>Cuboidy</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('rywalizacja')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='rywalizacja-li'>Rywalizacja</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('nagrody')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='nagrody-li'>Nagrody</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('inne')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='inne-li'>Inne</li>
                            </ul>
                        </div>
                        <div className='terms-info' id='first-cont'>
                            <section id='cuboidy'>
                                <h3>Cuboidy</h3>
                                <div className='in-section-sep'>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                    <img src='https://i.ytimg.com/vi/OjWQ527PZRc/maxresdefault.jpg' />
                                    <img src='https://i.ytimg.com/vi/OjWQ527PZRc/maxresdefault.jpg' />
                                    <p>Dozwolone<FontAwesomeIcon className='reg-check' icon={faCheck} /></p>
                                    <p>Zakazane<FontAwesomeIcon className='reg-xmark' icon={faXmark} /></p>
                                </div>
                            </section>
                            <section id='rywalizacja'>
                                <h3>Rywalizacja</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='nagrody'>
                                <h3>Nagrody</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='inne'>
                                <h3>Inne</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>

                        </div>
                    </div>
                ) : <></>}
            </div>
            <div style={{ marginTop: '0px' }} className='term-container' id='second-art'>
                <div className='term-header'>
                    <div className='clicker' onClick={() => {

                        const ele = document.getElementById('second-art')

                        if (ele.className.split(' ').includes('hidden-terms')) {
                            ele.className = 'term-container'
                            setHiddenEles([...hiddenEles].filter((e) => e !== 'second-cont'))
                        }
                        else {
                            ele.className += ' hidden-terms'
                            setHiddenEles([...hiddenEles, 'second-cont'])
                        }
                    }}></div>
                    <div style={{
                        transform: `${hiddenEles?.includes('second-cont') ? 'rotate(-45deg)' : ''}`,
                        top: `${hiddenEles?.includes('second-cont') ? '-5px' : ''}`
                    }} className='expand-arrow'></div>
                    <h2 className='term-name'>Regulaming Płatności</h2>
                    <div className='divider'></div>
                </div>
                {!hiddenEles?.includes('second-cont') ? (
                    <div className='terms-content'>
                        <div className='terms-nav'>
                            <ul>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('paypal')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='paypal-li'>Paypal</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('stripe')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='stripe-li'>Stripe</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('kontakt')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='kontakt-li'>Kontakt</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('podatek')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='podatek-li'>Podatek</li>
                            </ul>
                        </div>
                        <div className='terms-info' id='second-cont'>
                            <section id='paypal'>
                                <h3>Paypal</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='stripe'>
                                <h3>Stripe</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='kontakt'>
                                <h3>Kontakt</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='podatek'>
                                <h3>Podatek</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>

                        </div>
                    </div>
                ) : <></>}
            </div>
            <div style={{ marginTop: '0px' }} className='term-container' id='third-art'>
                <div className='term-header'>
                    <div className='clicker' onClick={() => {

                        const ele = document.getElementById('third-art')

                        if (ele.className.split(' ').includes('hidden-terms')) {
                            ele.className = 'term-container'
                            setHiddenEles([...hiddenEles].filter((e) => e !== 'third-cont'))
                        }
                        else {
                            ele.className += ' hidden-terms'
                            setHiddenEles([...hiddenEles, 'third-cont'])
                        }
                    }}></div>
                    <div style={{
                        transform: `${hiddenEles?.includes('third-cont') ? 'rotate(-45deg)' : ''}`,
                        top: `${hiddenEles?.includes('third-cont') ? '-5px' : ''}`
                    }} className='expand-arrow'></div>
                    <h2 className='term-name'>Regulaming nagród</h2>
                    <div className='divider'></div>
                </div>
                {!hiddenEles?.includes('third-cont') ? (
                    <div className='terms-content'>
                        <div className='terms-nav'>
                            <ul>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('bezpieczenstwo')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='bezpieczenstwo-li'>bezpieczeństwo</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('realizacja')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='realizacja-li'>realizacja</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('wysylka')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='wysylka-li'>Wysyłka</li>
                                <li onMouseLeave={(e) => {
                                    if (e.target.id !== `${scrolledToEle.id}-li`) {
                                        e.target.className = ''
                                    }
                                }}
                                    onMouseEnter={(e) => e.target.classList.add('hovered-li')}
                                    onClick={() => {
                                        let ele = document.getElementById('weryfikacja')
                                        ele.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }} id='weryfikacja-li'>Weryfikacja</li>
                            </ul>
                        </div>
                        <div className='terms-info' id='third-cont'>
                            <section id='bezpieczenstwo'>
                                <h3>Bezpieczeństwo</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='realizacja'>
                                <h3>Realizacja</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='wysylka'>
                                <h3>Wysyłka</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>
                            <section id='weryfikacja'>
                                <h3>Weryfikacja</h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                            </section>

                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    )
}

export default Terms
