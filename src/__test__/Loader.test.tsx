/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../components/Loader';

describe('Тестирование компонента Loader', () => {
  test('По умолчанию рендерится в один html-элемент (возможны потомки)', () => {
    const { container } = render(
      <Loader />
    );

    expect(container.childElementCount).toBe(1);
  });

  test('Переданный className добавляется в список классов лоадера', () => {
    const testClassName = 'test-class';
    const { container } = render(
      <Loader className={testClassName} />
    );

    expect(container.firstChild).toHaveClass(testClassName);
  });
});
