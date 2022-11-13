import React from "react";
import { Button } from "antd";
import WebpackImage from "@/assets/images/webpack.png";

const About: React.FC = () => {
    
    return (
        <div>
            <h1>About</h1>
            <Button type="primary">按钮</Button>
            <img src={WebpackImage} alt="Webpack" />
        </div>
    );
};

export default About;
About.whyDidYouRender = true;