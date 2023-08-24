'use client'

import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function PaymentSection({ price, purchaseType }) {

    const [nick, setNick] = useState('')
    const [agreeToReg, setAgreeToReg] = useState(false)
    const [agreeToResign, setAgreeToResign] = useState(false)
    const [payment, setPayment] = useState('bank')
    const [validateErrors, setValidateErrors] = useState([])
    const [hasSubmited, setHasSubmited] = useState(false)
    const [showLoad, setShowLoad] = useState(false)

    console.log('================')
    console.log('nick:', nick)
    console.log('agreeToReg:', agreeToReg)
    console.log('agreeToResign:', agreeToResign)
    console.log('payment:', payment)
    console.log('================')

    const loadPay = (e) => {
        let ele = document.getElementsByClassName('final-shop-icon').item(0)
        ele.style.scale = 0
        setShowLoad(true)
    }

    const handleBuyClick = async (e) => {

        if (validateErrors.length > 0) {
            e.preventDefault()
            setHasSubmited(true)
            if (validateErrors.includes('e_nick')) {
                setNick('')
            }
            return
        }
        loadPay(e)
    }

    useEffect(() => {
        const errors = []

        if (!agreeToReg) {
            errors.push('e_reg')
        }

        if (!agreeToResign) {
            errors.push('e_resign')
        }

        if (!nick || nick.length < 3) {
            errors.push('e_nick')
        }

        setValidateErrors(errors)
        console.log(validateErrors)
    }, [nick, agreeToReg, agreeToResign])


    return (
        <div className='payment-section' >
            <div className='payment-main' >
                <form className='payment-form' >
                    <input onChange={(e) => setNick(e.target.value)} value={nick} className={`payment-nick ${(hasSubmited && validateErrors.includes('e_nick')) ? `bad-nick` : ''}`
                    } placeholder={(hasSubmited && validateErrors.includes('e_nick')) ? `Podaj poprawny nick` : `Twój nick`}> </input>
                    {
                        (hasSubmited && (validateErrors.includes('e_resign') || validateErrors.includes('e_reg'))) && (
                            <p style={
                                {
                                    color: 'rgb(247, 80, 80)',
                                    fontSize: '14px',
                                    // textAlign: 'center',
                                    // marginRight: '5px'
                                    marginBottom: '5px'
                                }
                            }> Potwierdź że zapoznałeś się z poniższymi informacjami </p>
                        )
                    }
                    <div className='terms-regulamin' >
                        <input onChange={() => setAgreeToReg(!agreeToReg)} id='reg-terms-pay' className='checkbox-payment' type={'checkbox'} > </input>
                        <label htmlFor='reg-terms-pay' >
                            Potwierdzam że zapoznałem się z <span > regulaminem </span>
                        </label>
                    </div>
                    <div className='terms-return' >
                        <input onChange={() => setAgreeToResign(!agreeToResign)} id='res-terms' className='checkbox-payment' type={'checkbox'} > </input>
                        <label htmlFor='res-terms' >
                            Kupując tą uługę następuje jej natychmiastowe aktywowanie w związku z czym zrzekam się z 14 dni na odstąpienie od umowy
                        </label>
                    </div>
                </form>
                <div className='payment-options' >
                    <h3>Metoda płatności </h3>
                    <div className='pay-options-wrapper' >
                        <div className={payment === 'bank' ? 'pay-selected' : ''} onClick={() => setPayment('bank')}> Przelew bankowy </div>
                        <div className={payment === 'paypal' ? 'pay-selected' : ''} onClick={() => setPayment('paypal')}> Paypal </div>
                        <div className={payment === 'psc' ? 'pay-selected' : ''} onClick={() => setPayment('psc')}> Paysafecard </div>
                        <div className={payment === 'sms' ? 'pay-selected' : ''} onClick={() => setPayment('sms')}> SMS + </div>
                    </div>
                </div>
                <form style={{ gridColumnStart: 1, gridColumnEnd: 3 }} method="POST" action="http://localhost:8000/create-checkout-session" >
                    <input type={'hidden'} name="purchaseType" id="purchaseType" value={purchaseType} > </input>
                    <input type={'hidden'} name="nickname" id="nickname" value={nick} > </input>
                    <button onClick={handleBuyClick} type="submit" className='buy-button' >
                        Kup za <span>{price} zł</span>{showLoad && (
                            <div className="lds-roller">
                                <div></div >
                                <div></div>
                                <div></div >
                                <div></div>
                                <div></div >
                                <div></div>
                                <div></div >
                                <div></div>
                            </div >)}
                        <FontAwesomeIcon className='final-shop-icon' icon={faCartShopping} />
                    </button>
                </form>
            </div>
        </div>
    )
}
