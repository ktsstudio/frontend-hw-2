import React from 'react';
import { render, screen } from '@testing-library/react';
import { Locators } from './constants';
import userEvent from '@testing-library/user-event';
import CheckBox from '../components/CheckBox';

describe('Тестирование компонента CheckBox', () => {
  test('Значение чекбокса зависит от пропса checked', () => {
    const { rerender } = render(
      <CheckBox
        checked={true}
        onChange={() => {}}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);

    expect(checkBoxElement).toHaveAttribute('checked');

    rerender(
      <CheckBox
        checked={false}
        onChange={() => {}}
        data-testid={Locators.CHECKBOX}
      />
    );
    expect(checkBoxElement).not.toHaveAttribute('checked', 'false');
  });

  test('При клике на чекбокс вызывается onChange со значением', async () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <CheckBox
        checked={true}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);

    await userEvent.click(checkBoxElement);
    expect(mockOnChange).toHaveBeenCalledWith(false);

    rerender(
      <CheckBox
        checked={false}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    await userEvent.click(checkBoxElement);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  test('Компонент CheckBox использует html-тег input', () => {
    render(
      <CheckBox
        checked={true}
        onChange={() => {}}
        data-testid={Locators.CHECKBOX}
      />
    );

    const inputElement = screen.getByTestId(Locators.CHECKBOX);

    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement).toHaveAttribute('type', 'checkbox');
  });

  test('При передаче disabled=true не вызывается onChange', async () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <CheckBox
        disabled
        checked={true}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);

    await userEvent.click(checkBoxElement);
    expect(mockOnChange).not.toHaveBeenCalled();

    rerender(
      <CheckBox
        checked={true}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    await userEvent.click(checkBoxElement);
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('При передаче disabled проставляется атрибут disabled на чекбоксе', () => {
    const { rerender } = render(
      <CheckBox
        disabled={true}
        checked={true}
        onChange={() => {}}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);
    expect(checkBoxElement).toHaveAttribute('disabled');

    rerender(
      <CheckBox
        disabled={false}
        checked={true}
        onChange={() => {}}
        data-testid={Locators.CHECKBOX}
      />
    );

    expect(checkBoxElement).not.toHaveAttribute('disabled', false);
  });
});
