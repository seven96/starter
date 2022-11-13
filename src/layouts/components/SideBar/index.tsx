import { Link } from "react-router-dom";
import styles from "./index.module.less";

export default function SideBar() {
    return <ul className={styles.sidebar}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="store-selector">StoreSelector</Link></li>
        <li><Link to="store-connect">StoreConnect</Link></li>
    </ul>;
}