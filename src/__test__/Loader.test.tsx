import React from 'react';
import { render, screen } from '@testing-library/react';
import { Locators } from './constants';
import { Loader } from '../components/Loader/Loader';

describe('Тестирование компонента Loader', () => {
  test('По умолчанию рендерится в один html-элемент (возможны потомки)', () => {
    render(
      <div data-testid={Locators.TEST_CONTAINER}>
        <Loader />
      </div>
    );

    const container = screen.getByTestId(Locators.TEST_CONTAINER);

    expect(container.childElementCount).toBe(1);
  });

  test('При передаче loading=false не рендерится ни один html-элемент', () => {
    render(
      <div data-testid={Locators.TEST_CONTAINER}>
        <Loader loading={false} />
      </div>
    );

    const container = screen.getByTestId(Locators.TEST_CONTAINER);

    expect(container.childElementCount).toBe(0);
  });

  test('Переданный className добавляется в список классов лоадера', () => {
    const testClassName = 'test-class';
    render(
      <div data-testid={Locators.TEST_CONTAINER}>
        <Loader className={testClassName} />
      </div>
    );

    const container = screen.getByTestId(Locators.TEST_CONTAINER);

    expect(container.firstChild).toHaveClass(testClassName);
  });
});
