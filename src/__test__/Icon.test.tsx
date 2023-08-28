import React from 'react';
import { render, screen } from '@testing-library/react';
import { Locators } from './constants';
import CheckIcon from '../components/icons/CheckIcon';
import ArrowDownIcon from '../components/icons/ArrowDownIcon';

describe('Тестирование компонентов иконок', () => {
  test('Компонент CheckIcon принимает className', () => {
    const className = 'icon-test';

    render(<CheckIcon className={className} data-testid={Locators.ICON}/>);

    const icon = screen.getByTestId(Locators.ICON);

    expect(icon).toHaveClass(className);
  });

  test('Компонент CheckIcon принимает width и height', () => {
    const size = 40;

    render(<CheckIcon width={size} height={size} data-testid={Locators.ICON}/>);

    const icon = screen.getByTestId(Locators.ICON);

    expect(icon).toHaveAttribute('width', `${size}`);
    expect(icon).toHaveAttribute('height', `${size}`);
  });

  test('Компонент ArrowDownIcon принимает classname', () => {
    const className = 'icon-test';

    render(<ArrowDownIcon className={className} data-testid={Locators.ICON}/>);

    const icon = screen.getByTestId(Locators.ICON);

    expect(icon).toHaveClass(className);
  });

  test('Компонент ArrowDownIcon принимает width и height', () => {
    const size = 40;

    render(<ArrowDownIcon width={size} height={size} data-testid={Locators.ICON}/>);

    const icon = screen.getByTestId(Locators.ICON);

    expect(icon).toHaveAttribute('width', `${size}`);
    expect(icon).toHaveAttribute('height', `${size}`);
  });
});
