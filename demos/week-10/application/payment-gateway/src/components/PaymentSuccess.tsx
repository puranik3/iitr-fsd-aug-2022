import { CSSProperties, useState } from 'react';
import PaymentOptions from '../models/PaymentOptions';

import Dialog from "./Dialog";

import './PaymentSuccess.css';

type Props = {
  onClose: () => void,
  paymentOption: PaymentOptions
}

const centerStyle : CSSProperties = {
  textAlign: 'center'
};

const PaymentSuccess = ( { onClose, paymentOption } : Props ) => {
  const [ showDialog, setShowDialog ] = useState( true );
  
  return (
    <>
      {
        showDialog && (
          <Dialog title="Successfully paid">
            <div style={centerStyle}>
              <h2 className="order-value">Your Payment of Rs 5000 is Successful!!!</h2>
              <p className="order-delivery">Your order will be delivered by {(new Date()).toDateString()}</p>
              <table className="order-details">
                  <tbody>
                      <tr>
                          <td>Transaction Id: </td>
                          <td>123456789012</td>
                      </tr>
                      <tr>
                          <td>Transaction Date:</td>
                          <td>12-03-2021</td>
                      </tr>
                      <tr>
                          <td>Payment Mode:</td>
                          <td>{paymentOption}</td>
                      </tr>
                      <tr>
                          <td colSpan={2}>
                              <button className="btn btn-close" onClick={() => { onClose(); setShowDialog( false ); }}>Close</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </Dialog>
        )
      }
    </>
  );
}

export default PaymentSuccess