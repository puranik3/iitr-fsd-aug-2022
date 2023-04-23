import { ChangeEvent, Component, FormEvent } from 'react';
import PaymentConfirmation from './PaymentConfirmation';
import { getRangeArray } from '../service/utils';
import PaymentOptions from '../models/PaymentOptions';

type Props = {};

type State = {
    cc: string,
    name: string,
    month: number,
    year: number,
    cvv: number,
    showPaymentConfirmation: boolean
};

class DebitCard extends Component<Props, State> {
    state = {
        cc: '',
        name: '',
        month: 0,
        year: 0,
        cvv: 0,
        showPaymentConfirmation: false
    };

    resetForm = () => {
        this.setState({
            cc: '',
            name: '',
            month: 0,
            year: 0,
            cvv: 0,
        })
    }

    // For event handlers, please use () => {} syntax
    updateValue = ( event : ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        const { name, value } = event.target;
        let valueToSet : string | number = value;

        if( name === 'month' || name === 'year' || name === 'cvv' ) {
            valueToSet = parseInt( value || '0', 10 );
        }

        this.setState({
            [name]: valueToSet
        } as unknown as Pick<State, keyof State>);
    }

    onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
        // Hey browser! Do not submit the form.
        event.preventDefault();

        // Validating the data

        // If all valid, then POST/PUT/... the data

        this.setState({
            showPaymentConfirmation: true
        })
    }

    closePaymentConfirmation = () => {
        this.setState({
            showPaymentConfirmation: false
        });
    }

    render() {
        const { cc, name, month, year, cvv, showPaymentConfirmation } = this.state;

        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="cc">Credit/Debit card number <br />(12 digit number)</label>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        id="cc"
                                        min="10000000000"
                                        max="999999999999"
                                        placeholder='xxxx-xxxx-xxxx'
                                        name="cc"
                                        value={cc}
                                        onChange={this.updateValue}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="name">Name</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder='Name as on your card'
                                        name="name"
                                        value={name}
                                        onChange={this.updateValue}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="expiry-date">Expiry date</label>
                                </td>
                                <td>
                                    <div id="expiry-date">
                                        <select
                                            id="month"
                                            name="month"
                                            value={month}
                                            onChange={this.updateValue}
                                            required
                                        >
                                            <option value="">mm</option>
                                            {
                                                getRangeArray( 1, 12 ).map(
                                                    monthNum => <option value={monthNum} key={monthNum}>{('' + monthNum).padStart(2, '0')}</option>
                                                )
                                            } 
                                        </select>
                                        <select
                                            id="year"
                                            name="year"
                                            value={year}
                                            onChange={this.updateValue}
                                            required
                                        >
                                            <option value="">yyyy</option>
                                            {
                                                getRangeArray( (new Date()).getFullYear(), (new Date()).getFullYear() + 10 ).map(
                                                    yearNum => <option value={yearNum} key={yearNum}>{yearNum}</option>
                                                )
                                            } 
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="cvv">CVV Number</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="cvv"
                                        min="100"
                                        max="999"
                                        placeholder='123'
                                        name="cvv"
                                        value={cvv}
                                        onChange={this.updateValue}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="btn btn-pay">Pay</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                
                {
                    showPaymentConfirmation && (
                        <PaymentConfirmation
                            onNo={this.closePaymentConfirmation}
                            onSuccess={this.resetForm}
                            paymentOption={PaymentOptions.CARD}
                        />
                    )
                }
            </>
        );
    }
}
 
export default DebitCard;