import { useSelector } from 'react-redux';

const ShoppingCart = () => {
    const items = useSelector( state => state.cart.items );

    return (
        <>
            <h2>Cart</h2>
            <hr />
            <ul className="list-group">
            {
                items.map(
                    item => (
                        <li className="list-group-item">
                            {item.product.Name}
                            <div>Quantity: {item.quantity}</div>
                        </li>
                    )
                )
            }
            </ul>
        </>
    );
}
 
export default ShoppingCart;