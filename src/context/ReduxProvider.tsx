import { Provider } from "react-redux";
import { store } from "@/store";
import React from "react";

export const ReduxProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>
        {children}
    </Provider>
}
