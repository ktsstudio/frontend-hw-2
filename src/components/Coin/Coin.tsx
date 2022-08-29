import React, { useState, useEffect } from "react";
import coingecko from "@utils/coingecko";
import styles from "@styles/components/Coin/Coin.module.scss";
import { formatCurrentPrice, formatPriceChange } from "@utils/formatPrices";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export interface CoinProps {
  id: string;
  currency: string;
  period: string;
}

export interface CoinData {
  name: string;
  symbol: string;
  imgSmall: string;

  curPrice: number;

  priceChange1hPercent: number;
  priceChange24hPercent: number;
  priceChange7dPercent: number;
  priceChange30dPercent: number;
  priceChange1yPercent: number;
}

function Coin({ id, currency, period }: CoinProps): JSX.Element {
  const [coinData, setCoinData] = useState<CoinData>({
    name: "",
    symbol: "",
    imgSmall: "",
    curPrice: 0,

    priceChange1hPercent: 0,
    priceChange24hPercent: 0,
    priceChange7dPercent: 0,
    priceChange30dPercent: 0,
    priceChange1yPercent: 0,
  });

  const [curPeriod, setCurPeriod] = useState(period);

  useEffect(() => {
    async function fetchCoinData(): Promise<any> {
      setCurPeriod(period);
      const response = await coingecko.get(`/coins/${id}`, {
        params: { tickers: false },
      });

      const {
        image: { small: imgSmall },
        name,
        symbol,
        market_data: {
          current_price: { [currency]: curPrice },
          price_change_percentage_1h_in_currency: {
            [currency]: priceChange1hPercent,
          },
          price_change_percentage_24h_in_currency: {
            [currency]: priceChange24hPercent,
          },
          price_change_percentage_7d_in_currency: {
            [currency]: priceChange7dPercent,
          },
          price_change_percentage_30d_in_currency: {
            [currency]: priceChange30dPercent,
          },
          price_change_percentage_1y_in_currency: {
            [currency]: priceChange1yPercent,
          },
        },
      } = response.data;

      setCoinData({
        name,
        symbol,
        imgSmall,
        curPrice,
        priceChange1hPercent,
        priceChange24hPercent,
        priceChange7dPercent,
        priceChange30dPercent,
        priceChange1yPercent,
      });
    }
    fetchCoinData().catch((err) => err);
  }, []);

  useEffect(() => {
    setCurPeriod(period);
  }, [period]);

  const { name, symbol, imgSmall, curPrice } = coinData;
  const priceChangePercent =
    coinData[`priceChange${curPeriod}Percent` as keyof CoinData];
  const priceChange =
    (100 * curPrice) / (100 - Number(priceChangePercent)) - curPrice;

  const navigate = useNavigate();

  return (
    <article className={styles.coin}>
      <header className={styles.coin_header}>
        <button
          type="button"
          className={styles["btn-return"]}
          onClick={() => navigate("/")}
        >
          <svg
            viewBox="0 0 10 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.33333 1.25731L7.92976 0L0 7.10345L7.92976 14.2069L9.33333 12.9496L2.80714 7.10345L9.33333 1.25731Z"
              fill="#212529"
            />
          </svg>
        </button>
        <img className={styles.coin_logo} src={imgSmall} />
        <h1 className={styles.coin_name}>{name}</h1>
        <p className={styles.coin_subtitle}>{`(${symbol})`}</p>

        <button type="button" className={styles["btn-star"]}>
          <svg
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.41143 2.2934L9.98857 5.12463L10.2514 5.63202L10.8229 5.70813L14.3429 6.1597L11.84 8.34148L11.4114 8.71187L11.5143 9.21926L12.1143 12.3296L8.96571 10.8632L8.41143 10.6552L7.88 10.9038L4.73143 12.3499L5.30286 9.23956L5.40571 8.73217L4.98286 8.34148L2.45714 6.13434L5.97714 5.68276L6.54857 5.60665L6.81143 5.09926L8.41143 2.2934ZM8.41143 0L5.81143 4.67813L0 5.42399L4.20571 9.06705L3.21143 14.2069L8.41143 11.7816L13.6114 14.2069L12.6171 9.06705L16.8229 5.42906L11.0114 4.67813L8.41143 0Z"
              fill="#343A40"
            />
          </svg>
        </button>
      </header>

      <main className={styles.coin_main}>
        <p className={styles.coin_price}>
          {formatCurrentPrice(currency, curPrice)}
        </p>
        <p
          className={
            styles[
              classNames({
                coin_pricechange: true,
                "coin_pricechange-decrease": priceChange < 0,
              })
            ]
          }
        >
          {formatPriceChange(priceChange, 3)}
          {` (${formatPriceChange(priceChangePercent, 2)}%)`}
        </p>
        <div className={styles.graph_placeholder}></div>
      </main>
    </article>
  );
}

export default Coin;
