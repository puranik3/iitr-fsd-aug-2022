import Counter from './components/Counter';
import Profile from './components/Profile';
import ProductsList from './components/ProductsList';
import ShoppingCart from './components/ShopingCart';

function App() {
  return (
    <div className="container">
      {/*<Counter />
      <hr />
      <Profile />
      <hr />
      */}

      <div className="row">
          <div className="col-8">
            <ProductsList />
          </div>
          <div className="col-4">
            <ShoppingCart />
          </div>
      </div>
      
    </div>
  );
}

export default App;
