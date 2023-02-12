import React from 'react';

import { WithLoader, WithLoaderProps } from './WithLoader';

export default {
  title: 'WithLoader',
  component: WithLoader,
  args: {
    children: ''
  }
};

export const Default = (props: WithLoaderProps) => (
  <WithLoader {...props} />
);
