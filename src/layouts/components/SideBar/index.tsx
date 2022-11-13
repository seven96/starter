import { Paths } from "@/settings";
import { Link } from "react-router-dom";
import styles from "./index.module.less";

export default function SideBar() {
    return <ul className={styles.sidebar}>
        <li><Link to={Paths.Home}>Home</Link></li>
        <li><Link to={Paths.About}>About</Link></li>
        <li><Link to={Paths.StoreSelector}>StoreSelector</Link></li>
        <li><Link to={Paths.StoreConnect}>StoreConnect</Link></li>
    </ul>;
}