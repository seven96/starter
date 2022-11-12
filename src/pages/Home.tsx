import React from "react";
import HelloWorld from "@components/HelloWorld";

const Home: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);
    return (
        <div>
            <h3>HomePage</h3>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>Add</button>
            <button onClick={() => setCount(count - 1)}>Sub</button>
            <HelloWorld />
        </div>
    );
}

export default Home