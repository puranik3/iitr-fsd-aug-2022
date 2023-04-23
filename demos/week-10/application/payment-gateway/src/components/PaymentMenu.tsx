// rafce
// sfc
// hooks are a set of functions meant to be used only by function components
import { useState } from 'react';
import DebitCard from './DebitCard';
import NetBanking from './NetBanking';
import UPI from './UPI';
import PaymentOptions from '../models/PaymentOptions';

import './PaymentMenu.css';

const paymentOptions = [
    PaymentOptions.CARD,
    PaymentOptions.NET_BANKING,
    PaymentOptions.UPI,
];

console.log( paymentOptions );

const PaymentMenu = () => {
    // const option : string = PaymentOptions.NET_BANKING;
    const [ option, setOption ] = useState( PaymentOptions.CARD );

    // an array of React button elements
    // const buttons = paymentOptions.map(
    //     item => <button>{item}</button>
    // );

    // console.log( buttons );

    // Within an element, you can have the following as dynamic content, i.e. provided within {}
    // {react element} -> {<div>Hello</div>}
    // {array of react elements} -> {[ <button>Card</button>, <button>...</button>, ...]}
    // {primitives, [ primitives] - {'Hello'}, {name} }
    return (
        <div className="menu">
            <div className="payment-options">
                {/* {buttons} */}
                {
                    paymentOptions.map(
                        ( item, index ) => (
                            <button
                                key={item}
                                className={"payment-option " + ( option === item ? 'payment-option-selected' : '')}
                                onClick={() => setOption( item )}
                            >
                                {item}
                            </button>
                        )
                    )
                }
            </div>
            <div className="payment-details">
                {
                    option === PaymentOptions.CARD && <DebitCard />
                }
                {
                    option === PaymentOptions.NET_BANKING && <NetBanking />
                }
                {
                    option === PaymentOptions.UPI && <UPI />
                }
            </div>
        </div>
    );
}
 
export default PaymentMenu;