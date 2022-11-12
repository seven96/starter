import React from "react";
import WebpackImage from "@/assets/images/webpack.png";

const About: React.FC = () => {
    return (
        <div>
            <h1>About</h1>
            <img src={WebpackImage} alt="Webpack" />
        </div>
    );
};

export default About;