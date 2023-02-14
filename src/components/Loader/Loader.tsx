import React from 'react';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l'
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = () => null;
