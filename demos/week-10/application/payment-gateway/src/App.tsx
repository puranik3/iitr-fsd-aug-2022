import PaymentMenu from './components/PaymentMenu';
import './App.css';

const App = () => {
  const el = (
    <div className="app">
      <h1 className="app-title">Choose your mode of payment and complete the purchase</h1>
      <PaymentMenu />
    </div>
  );

  console.log( el );

  return el;
};

export default App;