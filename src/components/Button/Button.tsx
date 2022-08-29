import React from "react";
import styles from "@styles/components/Button/Button.module.scss";
import classNames from "classnames";
import { Loader } from "../Loader/Loader";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  ...rest
}: ButtonProps): JSX.Element {
  let { disabled } = rest;
  if (loading) disabled = true;

  const buttonClass = classNames(
    styles.button,
    className,
    styles[`button_color-${color}`],
    styles[`${(disabled ?? false) || loading ? "button_disabled" : ""}`]
  );

  return (
    <button disabled={disabled} className={buttonClass} {...rest}>
      {loading && <Loader />}
      {children}
    </button>
  );
}
