import CardsList from "@components/CardsList/CardsList";
import React from "react";
import styles from "@styles/pages/AllCoinsPage/AllCoinsPage.module.scss";

function AllCoinsPage(): JSX.Element {
  return (
    <>
      <h1 className={styles.main_heading}>Coins</h1>
      <CardsList vsCurrency="usd" perPage={15} />
    </>
  );
}

export default AllCoinsPage;
