import styles from "@styles/components/Loader/Loader.module.scss";
import React from "react";
import classNames from "classnames";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export interface LoaderProps {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
}

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className = "loader",
}: LoaderProps): JSX.Element => {
  return (
    <>
      {loading && (
        <div
          className={styles[classNames(className, `loader_size-${size}`)]}
        ></div>
      )}
    </>
  );
};
