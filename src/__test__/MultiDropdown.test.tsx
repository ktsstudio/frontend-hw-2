import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MultiDropdown, {
  MultiDropdownProps,
  Option,
} from '../components/MultiDropdown/MultiDropdown';

const options: Option[] = [
  { key: 'msk', value: 'Москва' },
  { key: 'spb', value: 'Санкт-Петербург' },
  { key: 'ekb', value: 'Екатеринбург' },
];

const defaultGetTitle = (elements: Option[]) =>
  elements.map((el: Option) => el.key).join();

const WrappedDropdown: React.FC<
  Omit<MultiDropdownProps, 'value' | 'onChange'>
> = (props) => {
  const [value, setValue] = React.useState<Option[]>([]);
  return <MultiDropdown {...props} value={value} onChange={setValue} />;
};

describe('Тестирование компонента MultiDropdown', () => {
  test('Проверка отображения результата выполнения getTitle', () => {
    const getTitle = jest
      .fn()
      .mockImplementation(defaultGetTitle);
    const { rerender } = render(
      <MultiDropdown
        onChange={() => {}}
        value={options}
        options={options}
        getTitle={getTitle}
      />
    );

    const dropdownElement = screen.getByDisplayValue('msk,spb,ekb');

    expect(dropdownElement).toBeInTheDocument();
    expect(getTitle).toBeCalled();

    rerender(
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={options}
        getTitle={getTitle}
      />
    );

    expect(dropdownElement).toHaveTextContent('');
  });

  test('Проверка синхронизации значения value', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <MultiDropdown
        onChange={mockOnChange}
        value={options}
        options={options}
        getTitle={defaultGetTitle}
      />
    );

    const dropdownElement = screen.getByDisplayValue('msk,spb,ekb');
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    userEvent.click(firstOption);

    expect(mockOnChange).toBeCalledWith([options[1], options[2]]);

    rerender(
      <MultiDropdown
        onChange={mockOnChange}
        value={[]}
        options={options}
        getTitle={defaultGetTitle}
      />
    );

    userEvent.click(firstOption);
    expect(mockOnChange).toBeCalledWith([options[0]]);
  });

  test('Проверка закрытия списка опций при клике вне', () => {
    const title = 'TEST_TITLE';
    render(
      <>
        <button data-testid="outside">some</button>
        <WrappedDropdown options={options} getTitle={() => title} />
      </>
    );

    const dropdownElement = screen.getByDisplayValue('');
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    expect(firstOption).toBeInTheDocument();

    const outside = screen.getByTestId('outside')
    userEvent.click(outside);
    expect(firstOption).not.toBeInTheDocument();
  });

  test('Проверка открытия/закрытия списка опций при клике', () => {
    const title = 'TEST_TITLE';
    render(
      <WrappedDropdown options={options} getTitle={() => title} />
    );

    const dropdownElement = screen.getByDisplayValue('');
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    expect(firstOption).toBeInTheDocument();

    userEvent.click(dropdownElement);
    expect(firstOption).toBeInTheDocument();
  });

  test('Отображаются все переданные options', () => {
    const title = 'TEST_TITLE';
    render(
      <WrappedDropdown options={options} getTitle={() => title} />
    );

    const dropdownElement = screen.getByDisplayValue('');
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    const secondOption = screen.getByText(options[1].value);
    const thirdOption = screen.getByText(options[2].value);

    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();
  });

  test('При disabled=true не открывается список опций', () => {
    const title = 'TEST_TITLE';
    const { rerender } = render(
      <WrappedDropdown options={options} getTitle={() => title} />
    );

    const dropdownElement = screen.getByDisplayValue('');
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    expect(firstOption).toBeInTheDocument();

    rerender(
      <WrappedDropdown
        options={options}
        getTitle={() => title}
        disabled
      />
    );

    expect(firstOption).not.toBeInTheDocument();

    userEvent.click(dropdownElement);
    expect(firstOption).not.toBeInTheDocument();
  });

  test('При клике на опцию вызывается onChange с добавленной опцией', () => {
    const mockOnChange = jest.fn();
    const title = 'TEST_TITLE';
    render(
      <MultiDropdown
        onChange={mockOnChange}
        value={[]}
        options={options}
        getTitle={() => title}
      />
    );

    const dropdownElement = screen.getByDisplayValue('');
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    userEvent.click(firstOption);
    expect(mockOnChange).toBeCalledWith([options[0]]);

    const secondOption = screen.getByText(options[1].value);
    userEvent.click(secondOption);
    expect(mockOnChange).toBeCalledWith([options[1]]);
  });

  test('При клике на уже выбранную опцию вызывается onChange без этой опции', () => {
    const mockOnChange = jest.fn();
    render(
      <MultiDropdown
        onChange={mockOnChange}
        value={options}
        options={options}
        getTitle={defaultGetTitle}
      />
    );

    const dropdownElement = screen.getByDisplayValue('msk,spb,ekb');
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    userEvent.click(firstOption);

    expect(mockOnChange).toBeCalledWith([options[1], options[2]]);
  });

  test('Проверка перерендера при изменении options (key)', () => {
    const title = 'TEST_TITLE';
    const { rerender } = render(
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={options}
        getTitle={() => title}
      />
    );

    const dropdownElement = screen.getByDisplayValue('');
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(options[0].value);
    const secondOption = screen.getByText(options[1].value);
    const thirdOption = screen.getByText(options[2].value);

    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();

    rerender(
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={[options[0], options[2]]}
        getTitle={() => title}
      />
    );

    expect(firstOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();

    expect(secondOption).not.toBeInTheDocument();
  });
});
