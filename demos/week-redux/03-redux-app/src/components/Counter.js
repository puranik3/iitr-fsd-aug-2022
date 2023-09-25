import { useDispatch, useSelector } from 'react-redux';
import {
    decrement,
    increment
} from '../actions/creators';

const Counter = () => {
    const dispatch = useDispatch();

    // this component will re-render when the value returned by the function in useSelector changes
    const value = useSelector( (state) => state.counter.value );

    return (
        <div>
            <button onClick={() => dispatch( decrement() )}>-</button>
            <span id="counter">{value}</span>
            <button onClick={() => dispatch( increment() )}>+</button>
        </div>
    );
}
 
export default Counter;