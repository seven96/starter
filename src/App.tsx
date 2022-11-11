import React from 'react';
import "./app.module.less";
import "./app.css";

import HelloWorld from '@/components/HelloWorld';

const App: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);

    return (
        <div>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <HelloWorld />

            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
        </div>
    );
};

export default App;