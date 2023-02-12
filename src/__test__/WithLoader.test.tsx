import { render, screen } from '@testing-library/react';
import React from 'react';
import { WithLoader } from '../components/WithLoader/WithLoader';
import { Locators } from './constants';

jest.mock('../components/Loader/Loader.tsx', () => require('./MockLoader'));

describe('Тестирование компонента WithLoader', () => {
  test('При передаче loading=true отображается Loader', () => {
    const { rerender } = render(
      <WithLoader loading>
        <div>content</div>
      </WithLoader>
    );

    const loaderElement = screen.getByTestId(Locators.LOADER);
    expect(loaderElement).toBeVisible();

    rerender(
      <WithLoader loading={false}>
        <div>content</div>
      </WithLoader>
    );

    expect(loaderElement).not.toBeVisible();
  });

  test('Вложенные элементы отображаются при любых значениях loading', () => {
    const content = 'some_text_content'
    const { rerender } = render(
      <WithLoader loading>
        {content}
      </WithLoader>
    );

    const contentEl = screen.getByText(content);
    expect(contentEl).toBeVisible();

    rerender(
      <WithLoader loading={false}>
        <div>content</div>
      </WithLoader>
    );

    expect(contentEl).toBeVisible();
  });
});
