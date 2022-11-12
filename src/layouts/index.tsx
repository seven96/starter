import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

import styles from "./index.module.less";

export default function Layout() {
    return <div className={styles.layout}>
        <div className={styles['sidebar-container']}>
            <SideBar />
        </div>
        <div className={styles.content}>
            <Header />
            <Outlet />
        </div>
    </div>
}