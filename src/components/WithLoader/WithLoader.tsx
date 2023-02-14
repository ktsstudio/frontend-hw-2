import React from 'react';

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = () => null
