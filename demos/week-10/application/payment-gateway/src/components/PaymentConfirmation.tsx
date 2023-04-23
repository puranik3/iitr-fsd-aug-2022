import { useState } from 'react';
import { CSSProperties } from 'react';
import Dialog from "./Dialog";
import PaymentSuccess from './PaymentSuccess';
import PaymentOptions from '../models/PaymentOptions';

type Props = {
  onNo: () => void,
  onSuccess: () => void,
  paymentOption: PaymentOptions
}

const centerStyle : CSSProperties = {
  textAlign: 'center'
};

const PaymentConfirmation = ( { onNo, onSuccess, paymentOption } : Props ) => {
  const [ showPaymentSuccess, setShowPaymentSuccess ] = useState( false );

  return (
    <>
      {
        showPaymentSuccess === false ? (
          <Dialog title="Please confirm payment">
            <div style={centerStyle}>
              <h3>Proceed to complete the payment?</h3>
              <button className="btn btn-cancel" onClick={onNo}>No</button>
              <button className="btn btn-confirm" onClick={() => setShowPaymentSuccess( true )}>Yes</button>
            </div>
          </Dialog>
        ) : (
          <PaymentSuccess onClose={onSuccess} paymentOption={paymentOption} />
        )
      }
    </>
  );
}

export default PaymentConfirmation