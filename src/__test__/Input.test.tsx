import React from 'react';
import { render, screen } from '@testing-library/react';
import { Locators } from './constants';
import userEvent from '@testing-library/user-event';
import { Input, InputProps } from '../components/Input/Input';

const WrappedInput: React.FC<Pick<InputProps, 'onChange'>> = ({ onChange }) => {
  const [value, setValue] = React.useState('');

  const handleChange = (value: string): void => {
    setValue(value);
    onChange(value);
  };

  return (
    <Input value={value} onChange={handleChange} data-testid={Locators.INPUT} />
  );
};

describe('Тестирование компонента Input', () => {
  test('Значение в инпуте зависит от пропса value', () => {
    const { rerender } = render(
      <Input value="п" onChange={() => {}} data-testid={Locators.INPUT} />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveValue('п');

    rerender(
      <Input value="пр" onChange={() => {}} data-testid={Locators.INPUT} />
    );
    expect(inputElement).toHaveValue('пр');

    rerender(
      <Input value="при" onChange={() => {}} data-testid={Locators.INPUT} />
    );
    expect(inputElement).toHaveValue('при');

    rerender(
      <Input value="прив" onChange={() => {}} data-testid={Locators.INPUT} />
    );
    expect(inputElement).toHaveValue('прив');
  });

  test('При вводе значений в input вызывается onChange, принимающий новое значение', () => {
    const mockOnChange = jest.fn();
    render(<WrappedInput onChange={mockOnChange} />);

    userEvent.tab();
    userEvent.keyboard('d');
    expect(mockOnChange).toBeCalledWith('d');
    userEvent.keyboard('i');
    expect(mockOnChange).toBeCalledWith('di');
    userEvent.keyboard('v');
    expect(mockOnChange).toBeCalledWith('div');
  });

  test('Компонент Input использует нативный тег input с типом text', () => {
    render(<Input value="" onChange={() => {}} data-testid={Locators.INPUT} />);

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('При disabled=true добавляется класс input_disabled', () => {
    const { rerender } = render(
      <Input
        value=""
        onChange={() => {}}
        data-testid={Locators.INPUT}
        disabled
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveClass('input_disabled');

    rerender(
      <Input value="" onChange={() => {}} data-testid={Locators.INPUT} />
    );

    expect(inputElement).not.toHaveClass('input_disabled');
  });

  test('При disabled=true добавляется атрибут disabled', () => {
    const { rerender } = render(
      <Input
        value=""
        onChange={() => {}}
        data-testid={Locators.INPUT}
        disabled
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toBeDisabled();

    rerender(
      <Input value="" onChange={() => {}} data-testid={Locators.INPUT} />
    );

    expect(inputElement).not.toBeDisabled();
  });

  test('При передаче disabled=true во время попытки ввода не вызывается onChange', () => {
    const mockOnChange = jest.fn();
    render(
      <Input
        value=""
        onChange={mockOnChange}
        data-testid={Locators.INPUT}
        disabled
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);
    userEvent.type(inputElement, 'some_text');
    expect(mockOnChange).not.toBeCalled();
  });

  test('Можно передать дополнительный className, не влияющий на остальные классы инпута', () => {
    const testClassName = 'test-class';
    render(
      <Input
        value=""
        onChange={() => {}}
        data-testid={Locators.INPUT}
        disabled
        className={testClassName}
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveClass(testClassName, 'input_disabled');
  });

  test('При disabled=true атрибут value передается корректно', () => {
    const testValue = 'some_value';
    render(
      <Input
        value={testValue}
        onChange={() => {}}
        data-testid={Locators.INPUT}
        disabled
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveAttribute('value', testValue);
    expect(inputElement).toHaveValue(testValue);
});

  test('Пробрасываются все пропсы, которые принимает нативный инпут', () => {
    const onHover = jest.fn();
    const onUnHover = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const id = 'INPUT_ID';
    const name = 'INPUT_NAME';
    const width = '132px';

    render(
      <Input
        onChange={() => {}}
        value=""
        onMouseOver={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseOut={onUnHover}
        id={id}
        data-testid={Locators.INPUT}
        name={name}
        style={{ width }}
        readOnly
      />
    );

    const buttonElement = screen.getByTestId(Locators.INPUT);

    userEvent.hover(buttonElement);
    expect(onHover).toBeCalledTimes(1);

    userEvent.unhover(buttonElement);
    expect(onUnHover).toBeCalledTimes(1);

    userEvent.tab();
    expect(onFocus).toBeCalledTimes(1);

    userEvent.tab();
    expect(onBlur).toBeCalledTimes(1);

    expect(buttonElement).toHaveAttribute('id', id);
    expect(buttonElement).toHaveAttribute('name', name);
    expect(buttonElement).toHaveAttribute('readonly');
    expect(buttonElement).toHaveStyle({ width });
  });
});
