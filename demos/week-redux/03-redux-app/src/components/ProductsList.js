import { useDispatch } from 'react-redux';
import products from '../products';
import { addToCart } from '../actions/creators';

const ProductsList = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Products List</h2>
            <hr />
            <ul className="list-group">
            {
                products.map(
                    product => (
                        <li className="list-group-item" key={product["Product ID"]}>
                            <div>
                                <strong>{product.Name}</strong>
                            </div>
                            <div>
                                Price: ${product.Price}
                            </div>
                            <button
                                className="btn btn-warning btn-sm mt-3"
                                onClick={() => dispatch( addToCart(product) )}
                            >
                                Add to cart
                            </button>
                        </li>
                    )
                )
            }
            </ul>
        </div>
    );
}
 
export default ProductsList;