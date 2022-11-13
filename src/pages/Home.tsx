import React from "react";
import { Button } from "antd";
import { useBoolean } from "ahooks";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { Paths } from "@/settings";
import { changeLanguage } from "@/locales";
import HelloWorld from "@components/HelloWorld";

const Home: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);
    const [visible, { toggle }] = useBoolean(false);
    const { t } = useTranslation();

    return (
        <div>
            <h3>HomePage</h3>

            <hr />

            {t("common.title")}

            <Button type="primary" onClick={() => { changeLanguage("cn")}}>
                Change Language
            </Button>

            <hr />

            <span> {count}</span>
            <button onClick={() => setCount(count + 1)}>Add</button>
            <button onClick={() => setCount(count - 1)}>Sub</button>

            <HelloWorld />

            <span>
                {visible ? "visible" : "hidden"}
            </span>

            <Button type="primary" onClick={toggle}>
                Primary Button
            </Button>

            <hr />

            <Button>
                <Link to={Paths.SubPage}>SubStorePage</Link>
            </Button>

            <section>
                <Outlet />
            </section>
        </div>
    );
}

export default Home