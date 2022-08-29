import React, { useState, useEffect } from "react";
import { Card } from "@components/Card/Card";
import { Loader, LoaderSize } from "@components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import coingecko from "@utils/coingecko";
import styles from "@styles/components/CardsList/CardsList.module.scss";
import { useNavigate } from "react-router-dom";

export interface ICoins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange: number;
  vsCurrency: string;
}

export interface CardListProps {
  vsCurrency: string;
  // Number of coins per page
  perPage: number;
}

function CardsList({ vsCurrency, perPage }: CardListProps): JSX.Element {
  const [coins, setCoins] = useState<ICoins[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCoins(vsCurrency: string): Promise<any> {
      const response = await coingecko.get("/coins/markets", {
        params: {
          per_page: perPage,
          vs_currency: vsCurrency,
        },
      });

      const coinsData = response.data.map(
        (raw: any): ICoins => ({
          id: raw.id,
          symbol: raw.symbol,
          name: raw.name,
          image: raw.image,
          currentPrice: raw.current_price,
          priceChange: raw.price_change_percentage_24h,
          vsCurrency,
        })
      );

      setCoins(coinsData);
    }

    setCurrentPage(currentPage + 1);
    fetchCoins(vsCurrency).catch((err) => err);
  }, []);

  function fetchDataOnScroll(): void {
    setCurrentPage(currentPage + 1);

    async function fetchCoins(vsCurrency: string): Promise<any> {
      const response = await coingecko.get("/coins/markets", {
        params: {
          per_page: perPage,
          page: currentPage,
          vs_currency: vsCurrency,
        },
      });

      const coinsData = response.data.map(
        (raw: any): ICoins => ({
          id: raw.id,
          symbol: raw.symbol,
          name: raw.name,
          image: raw.image,
          currentPrice: raw.current_price,
          priceChange: raw.price_change_percentage_24h,
          vsCurrency,
        })
      );

      setCoins((prevState) => [...prevState, ...coinsData]);
    }

    fetchCoins(vsCurrency).catch((err) => err);
  }

  const navigate = useNavigate();

  return (
    <div>
      <InfiniteScroll
        dataLength={coins.length}
        hasMore={true}
        next={fetchDataOnScroll}
        className={styles.cards_list}
        loader={<Loader size={LoaderSize.m} />}
        scrollThreshold={0.7}
      >
        {coins.map((coin: ICoins) => (
          <Card
            key={`id-${coin.id}`}
            image={coin.image}
            title={coin.name}
            subtitle={coin.symbol}
            content={[coin.currentPrice, coin.priceChange, coin.vsCurrency]}
            onClick={() => navigate(`/coin/${coin.id}`)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CardsList;
