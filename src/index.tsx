import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from "@/routes";

import "antd/dist/antd.css";

// hot reload
if (module && module.hot) {
    module.hot.accept();
}

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
