import ReactDOM from 'react-dom/client';

import Application from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// JSX (JS XML)
// React.createElement( App, {} )
root.render( <Application /> ); // Webpack -> Babel -> React create element (creates an object when run) -> understood by browser