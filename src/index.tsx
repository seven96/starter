import ReactDOM from 'react-dom/client';

import App from './App';

// hot reload
if (module && module.hot) {
    module.hot.accept();
}

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(<App />);
