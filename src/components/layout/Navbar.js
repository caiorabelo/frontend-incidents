import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../img/incident_logo.png";

function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link to="/">
          <img src={logo} alt="Incidentes" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/incidents">Incidentes</Link>
          </li>
        </ul>
    </div>
  );
}

export default Navbar;
