'use client'

import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react'
import './ShopPage.css'
import OutsideAlerter from './OutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { changeShowStatus } from '../store/shop'
import PaymentSection from './shop-components/PaymentSection'
import RankBenefitsSvip from './shop-components/RankBenefitsSvip'
import KitPreviewSvip from './shop-components/KitPreviewSvip'
import RankBenefitsVip from './shop-components/RankBenefitsVip'
import KitPreviewVip from './shop-components/KitPreviewVip'
import ChestsDesc from './shop-components/ChestsDesc'
import ChestsDrop from './shop-components/ChestsDrop'

function ShopPage() {

    const dispatch = useDispatch()
    const showInfo = useSelector((state) => state.shop.showInfo)
    console.log('showInfo---', showInfo)
    const [clickedEleClass, setClickedEleClass] = useState('')
    console.log('clickedEleClass IN shop:', clickedEleClass)
    const [chosenOffer, setChosenOffer] = useState('')
    const [chosenBenefitsComp, setChosenBenefitsComp] = useState(<RankBenefitsSvip />)
    const [chosenKitComp, setChosenKitComp] = useState(<KitPreviewSvip />)
    const [offerPrice, setOfferPrice] = useState(25)

    useEffect(() => {
        switch (chosenOffer) {
            case 'svip': {
                setChosenBenefitsComp(<RankBenefitsSvip />)
                setChosenKitComp(<KitPreviewSvip />)
                setOfferPrice(25)
                break
            }
            case 'vip': {
                setChosenBenefitsComp(<RankBenefitsVip />)
                setChosenKitComp(<KitPreviewVip />)
                setOfferPrice(12.50)
                break
            }
            case 'chests16': {
                setChosenBenefitsComp(<ChestsDesc amount={16} />)
                setChosenKitComp(<ChestsDrop />)
                setOfferPrice(5)
                break
            }
            case 'chests32': {
                setChosenBenefitsComp(<ChestsDesc amount={32} />)
                setChosenKitComp(<ChestsDrop />)
                setOfferPrice(9)
                break
            }
            case 'chests64': {
                setChosenBenefitsComp(<ChestsDesc amount={64} />)
                setChosenKitComp(<ChestsDrop />)
                setOfferPrice(17)
                break
            }
            case 'chests128': {
                setChosenBenefitsComp(<ChestsDesc amount={128} />)
                setChosenKitComp(<ChestsDrop />)
                setOfferPrice(32)
                break
            }
            case 'chests256': {
                setChosenBenefitsComp(<ChestsDesc amount={256} />)
                setChosenKitComp(<ChestsDrop />)
                setOfferPrice(60)
                break
            }
            case 'chests512': {
                setChosenBenefitsComp(<ChestsDesc amount={512} />)
                setChosenKitComp(<ChestsDrop />)
                setOfferPrice(110)
                break
            }
        }
    }, [chosenOffer])

    return (
        <div className="shop-wrapper">
            {showInfo && (
                <>
                    <OutsideAlerter clickedEleClass={clickedEleClass}>
                        <div className='shop-item-info'>
                            {chosenOffer === 'vip' && (
                                <h2>Ranga <span style={{ color: 'silver' }}>VIP</span></h2>
                            )}
                            {chosenOffer === 'svip' && (
                                <h2>Ranga <span>SVIP</span></h2>
                            )}
                            {chosenOffer.startsWith('chests') && (
                                <h2 style={{ color: 'goldenrod' }}>{chosenOffer.length >= 9 ? chosenOffer.slice(chosenOffer.length - 3) : chosenOffer.slice(chosenOffer.length - 2)} Magicznych Skrzynek</h2>
                            )}
                            <div className='svip-info-main'>
                                {chosenBenefitsComp}
                                {chosenKitComp}
                            </div>
                            <PaymentSection price={offerPrice} purchaseType={chosenOffer} />
                        </div>
                    </OutsideAlerter>
                    <div className='darknerer'></div>
                </>
            )}
            <div className='shop-header'>
                <h2>Sklep</h2>
                <FontAwesomeIcon className='main-shop-icon' icon={faCartShopping} />
            </div>
            <div className='shop-category' id='shop-category-first'>
                <h2>Rangi</h2>
                <div className='offers-wrapper'>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('svip')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='svip-icon'></div>
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip item-header'>SVIP</h3>
                        <p className='svip shop-item-desc'>Najlepsza ranga na serwerze daje dostęp do zestawu SVIP i wszystkich możliwych dodatków</p>
                        <div className='svip-price'>od 25 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('vip')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='svip-icon vip-icon'></div>
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip vip item-header'>VIP</h3>
                        <p className='svip shop-item-desc'>Daje dotęp do zestawu VIP i wielu dodatków</p>
                        <div className='svip-price'>od 12.50 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                </div>
            </div>
            <div className='shop-category'>
                <h2>Magiczne skrzynki</h2>
                <div className='offers-wrapper'>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('chests16')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='chest-icon-1-16'></div>
                        {/* <div className='chest-icon-2-512'></div> */}
                        {/* <div className='chest-icon-3-512'></div> */}
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip' id='chests-header'>16 MAGICZNYCH SKRZYNEK</h3>
                        <p className='svip' id='chests-desc'>Z magicznych wypadają przydatne przedmioty w tym <span>rangi</span> i <span>kilof 6/3/3</span></p>
                        <div className='svip-price'>od 5 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('chests32')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='chest-icon-1-32'></div>
                        <div className='chest-icon-2-32'></div>
                        {/* <div className='chest-icon-2-512'></div> */}
                        {/* <div className='chest-icon-3-512'></div> */}
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip' id='chests-header'>32 MAGICZNYCH SKRZYNEK</h3>
                        <p className='svip' id='chests-desc'>Z magicznych wypadają przydatne przedmioty w tym <span>rangi</span> i <span>kilof 6/3/3</span></p>
                        <div className='svip-price'>od 9 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('chests64')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='chest-icon-1-64'></div>
                        <div className='chest-icon-2-64'></div>
                        <div className='chest-icon-3-64'></div>
                        {/* <div className='chest-icon-2-512'></div> */}
                        {/* <div className='chest-icon-3-512'></div> */}
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip' id='chests-header'>64 MAGICZNYCH SKRZYNEK</h3>
                        <p style={{ marginLeft: '20px' }} className='svip' id='chests-desc'>Z magicznych wypadają przydatne przedmioty w tym <span>rangi</span> i <span>kilof 6/3/3</span></p>
                        <div className='svip-price'>od 17 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('chests128')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='chest-icon-1-128'></div>
                        <div className='chest-icon-2-128'></div>
                        <div className='chest-icon-3-128'></div>
                        <div className='chest-icon-4-128'></div>
                        {/* <div className='chest-icon-2-512'></div> */}
                        {/* <div className='chest-icon-3-512'></div> */}
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip' id='chests-header'>128 MAGICZNYCH SKRZYNEK</h3>
                        <p style={{ marginLeft: '25px' }} className='svip' id='chests-desc'>Z magicznych wypadają przydatne przedmioty w tym <span>rangi</span> i <span>kilof 6/3/3</span></p>
                        <div className='svip-price'>od 32 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('chests256')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='chest-icon-1-256'></div>
                        <div className='chest-icon-2-256'></div>
                        <div className='chest-icon-3-256'></div>
                        <div className='chest-icon-4-256'></div>
                        <div className='chest-icon-5-256'></div>
                        {/* <div className='chest-icon-2-512'></div> */}
                        {/* <div className='chest-icon-3-512'></div> */}
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip' id='chests-header'>256 MAGICZNYCH SKRZYNEK</h3>
                        <p style={{ marginLeft: '30px' }} className='svip' id='chests-desc'>Z magicznych wypadają przydatne przedmioty w tym <span>rangi</span> i <span>kilof 6/3/3</span></p>
                        <div className='svip-price'>od 60 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('chests512')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='chest-icon-1-512'></div>
                        <div className='chest-icon-2-512'></div>
                        <div className='chest-icon-3-512'></div>
                        <div className='chest-icon-4-512'></div>
                        <div className='chest-icon-5-512'></div>
                        <div className='chest-icon-6-512'></div>

                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip' id='chests-header'>512 MAGICZNYCH SKRZYNEK</h3>
                        <p style={{ marginLeft: '30px' }} className='svip' id='chests-desc'>Z magicznych wypadają przydatne przedmioty w tym <span>rangi</span> i <span>kilof 6/3/3</span></p>
                        <div className='svip-price'>od 110 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                </div>
            </div>
            <div className='shop-category'>
                <h2>Skrzynki</h2>
                <div className='offers-wrapper'>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('svip')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='svip-icon'></div>
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip item-header'>SVIP</h3>
                        <p className='svip shop-item-desc'>Najlepsza ranga na serwerze daje dostęp do zestawu SVIP i wszystkich możliwych dodatków</p>
                        <div className='svip-price'>od 25 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                    <div className='svip-card' onClick={() => {
                        setChosenOffer('vip')
                        // setClickedEleClass('svip')
                        dispatch(changeShowStatus(true))
                    }}>
                        <div className='svip-icon vip-icon'></div>
                        <div className='svip triangle-b-l'></div>
                        <div className='svip triangle-t-r'></div>
                        <h3 className='svip vip item-header'>VIP</h3>
                        <p className='svip shop-item-desc'>Daje dotęp do zestawu VIP i wielu dodatków</p>
                        <div className='svip-price'>od 12.50 zł <FontAwesomeIcon icon={faCartShopping} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopPage
