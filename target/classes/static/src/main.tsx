/** Vendor. */
import React from 'react';
import ReactDOM from 'react-dom/client';

/** Import styles. */
import '$css/app.css';

/** Import base component. */
import App from '$js/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
