import React, { useEffect, useRef, useState } from "react";
import NavBar from "../navigation/Nav";
import styles from "./Home.module.css";
import Score from "../score/Score";

function Home() {
  const filterRef = useRef<any>(null);
  const [serpQuery, setSerpQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let delayTimeOutFunction: any;

    if (!filterRef.current) {
      filterRef.current = true;
    } else {
      delayTimeOutFunction = setTimeout(() => {
        setSearch(serpQuery);
      }, 700);
    }
    return () => clearTimeout(delayTimeOutFunction);
  }, [serpQuery]);

  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.inputContainer} >
        <input
          className={styles.inputSearch}
          value={serpQuery}
          onChange={(e) => setSerpQuery(e.target.value)}
          placeholder={"Search"}
        />
      </div>
      <Score search={search}  />
      <div className={styles.home}></div>
    </div>
  );
}
export default Home;
