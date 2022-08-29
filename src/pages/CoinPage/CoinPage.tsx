import React, { useState } from "react";
import Coin from "@components/Coin/Coin";
import { Button, ButtonColor } from "@components/Button/Button";
import styles from "@styles/pages/CoinPage/CoinPage.module.scss";
import { useParams } from "react-router-dom";

export interface CoinPageProps {
  vsCurrency: string;
}

function CoinPage({ vsCurrency }: CoinPageProps): JSX.Element {
  const { id } = useParams();
  if (typeof id !== "string") return <></>;

  const [period, setPeriod] = useState("1h");
  const [clickedBtn, setClickedBtn] = useState("1h");

  const handleButtonClick = (e: React.MouseEvent, period: string): void => {
    const clickedBtn = (e.target as HTMLElement).innerText
      .toLowerCase()
      .replace(/\s/g, "");

    setPeriod(period);

    setClickedBtn(clickedBtn);
  };

  function getBtnColor(btn: string): ButtonColor {
    return clickedBtn === btn ? ButtonColor.primary : ButtonColor.secondary;
  }

  return (
    <>
      <Coin id={id} currency={vsCurrency} period={period} />
      <section className={styles.buttons}>
        <Button
          color={getBtnColor("1h")}
          onClick={(e) => handleButtonClick(e, "1h")}
        >
          1 H
        </Button>
        <Button
          color={getBtnColor("24h")}
          onClick={(e) => handleButtonClick(e, "24h")}
        >
          24 H
        </Button>
        <Button
          color={getBtnColor("1w")}
          onClick={(e) => handleButtonClick(e, "7d")}
        >
          1 W
        </Button>
        <Button
          color={getBtnColor("1m")}
          onClick={(e) => handleButtonClick(e, "30d")}
        >
          1 M
        </Button>
        <Button
          color={getBtnColor("1y")}
          onClick={(e) => handleButtonClick(e, "1y")}
        >
          1 Y
        </Button>
      </section>
    </>
  );
}

export default CoinPage;
