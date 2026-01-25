import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../components/Button/Button';
import { BUTTON_TEXT, Locators } from './constants';
import userEvent from '@testing-library/user-event';

jest.mock('../components/Loader', () => require('./MockLoader'));

describe('Тестирование компонента Button', () => {
  test('Текстовый children пробрасывается корректно', () => {
    render(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toHaveTextContent(BUTTON_TEXT);
  });

  test('Компонент Button использует html-тег button', () => {
    render(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement.tagName).toBe('BUTTON');
  });

  test('Элемент children пробрасывается корректно', () => {
    render(
      <Button data-testid={Locators.BUTTON}>
        <span data-testid={Locators.BUTTON_CHILDREN}>{BUTTON_TEXT}</span>
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    const innerElement = screen.getByTestId(Locators.BUTTON_CHILDREN);

    expect(buttonElement).toContainElement(innerElement);
  });

  test('При передаче loading=true внутри кнопки отображается компонент Loader', () => {
    const { rerender } = render(
      <Button loading data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    const loader = screen.getByTestId(Locators.LOADER);

    expect(buttonElement).toContainElement(loader);

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);
    expect(buttonElement).not.toContainElement(loader);
  });

  test('При передаче loading=true кнопка задизейбленная', () => {
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} loading>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toBeDisabled();

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);
    expect(buttonElement).not.toBeDisabled();
  });

  test('При передаче loading=true при клике на кнопку onClick не вызывается', async () => {
    const mockOnClick = jest.fn();
    render(
      <Button data-testid={Locators.BUTTON} onClick={mockOnClick} loading>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    await userEvent.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('Переданный onClick вызывается при клике', async () => {
    const mockOnClick = jest.fn();
    render(
      <Button onClick={mockOnClick} data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    await userEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('При disabled=true не вызывается onClick', async () => {
    const mockOnClick = jest.fn();
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} onClick={mockOnClick} disabled>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    await userEvent.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();

    rerender(
      <Button data-testid={Locators.BUTTON} onClick={mockOnClick}>
        {BUTTON_TEXT}
      </Button>
    );
    await userEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('При disabled=true проставляется атрибут disabled=true у кнопки', () => {
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} disabled>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toBeDisabled();

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    expect(buttonElement).not.toBeDisabled();
  });

  test('Можно передать дополнительный className', () => {
    const testClassName = 'test-class';
    render(
      <Button className={testClassName} data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toHaveClass(testClassName);
  });

  test('Пробрасываются все пропсы, которые принимает нативная кнопка', async () => {
    const onHover = jest.fn();
    const onUnHover = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const id = 'BUTTON_ID';
    const name = 'BUTTON_NAME';
    const width = '132px';

    render(
      <Button
        onMouseOver={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseOut={onUnHover}
        id={id}
        name={name}
        style={{ width }}
        data-testid={Locators.BUTTON}
      >
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    await userEvent.hover(buttonElement);
    expect(onHover).toHaveBeenCalledTimes(1);

    await userEvent.unhover(buttonElement);
    expect(onUnHover).toHaveBeenCalledTimes(1);

    await userEvent.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);

    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);

    expect(buttonElement).toHaveAttribute('id', id);
    expect(buttonElement).toHaveAttribute('name', name);
    expect(buttonElement).toHaveStyle({ width });
  });
});
