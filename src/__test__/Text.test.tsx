/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import Text from '../components/Text/Text';

describe('Тестирование компонента Text', () => {
  test('По умолчанию рендерится в один html-элемент (возможны потомки)', () => {
    const { container } = render(
      <Text>Текст</Text>
    );

    expect(container.childElementCount).toBe(1);
  });

  test('Переданный className добавляется в список классов компонента', () => {
    const testClassName = 'test-class';
    const { container } = render(
      <Text className={testClassName}>Текст</Text>
    );

    expect(container.firstChild).toHaveClass(testClassName);
  });

  test('Переданный tag=h1 рендерится в компоненте', () => {
    const { container } = render(
      <Text tag="h1">Текст</Text>
    );

    expect((container.firstChild as HTMLElement).tagName).toBe('H1');
  });
});
