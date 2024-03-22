import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import styles from "./Nav.module.css";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout() as any) as any;
    navigate("/login");
  };

  return (
    <div className={`${styles.menu}`}>
      <div className={styles.menuSection}>
        <div className={styles.logoBox}>
          <div className={styles.logo}></div>
        </div>
      </div>{" "}
      <div className={styles.submitBtnContainer}>
        <button
          name="action"
          value="login"
          type="button"
          className={styles.btnSubmit}
          onClick={() => handleLogout()}
        >
          <p className={styles.txtSubmit}>Log out</p>
        </button>
      </div>
    </div>
  );
}
export default NavBar;
