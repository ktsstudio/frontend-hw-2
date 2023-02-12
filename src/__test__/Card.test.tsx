import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card/Card';
import userEvent from '@testing-library/user-event';
import { CARD_SUBTITLE, CARD_TITLE, Locators } from './constants';

describe('Тестирование компонента Card', () => {
  test('Пропсы title, subtitle передаются и отображаются', () => {
    render(<Card title={CARD_TITLE} subtitle={CARD_SUBTITLE} image="--" />);

    const title = screen.getByText(CARD_TITLE);
    const subtitle = screen.getByText(CARD_SUBTITLE);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  test('Пропс title в виде элемента передается и отображается', () => {
    render(
      <Card
      // @ts-ignore
        title={<div data-testid={Locators.CARD_TITLE} />}
        subtitle={CARD_SUBTITLE}
        image="--"
      />
    );

    const title = screen.getByTestId(Locators.CARD_TITLE);

    expect(title).toBeInTheDocument();
  });

  test('Пропс subtitle в виде элемента передается и отображается', () => {
    render(
      <Card
        title={CARD_TITLE}
        subtitle={<div data-testid={Locators.CARD_SUBTITLE} />}
        image="--"
      />
    );

    const title = screen.getByTestId(Locators.CARD_SUBTITLE);

    expect(title).toBeInTheDocument();
  });

  test('Пропс image передаются корректно в картинку', () => {
    const testImageSrc = 'https://www.google.com/favicon.ico';
    render(
      <Card image={testImageSrc} title={CARD_TITLE} subtitle={CARD_SUBTITLE} />
    );

    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', testImageSrc);
  });

  test('Для изображения используется html-тег img', () => {
    const testImageSrc = 'https://www.google.com/favicon.ico';
    const { baseElement } = render(
      <Card image={testImageSrc} title={CARD_TITLE} subtitle={CARD_SUBTITLE} />
    );

    const imageElement = baseElement.querySelector('img')

    expect(imageElement).toHaveAttribute('src', testImageSrc);
  });

  test('Пропс content передаются и отображается', () => {
    const { rerender } = render(
      <Card
        content={<div data-testid={Locators.CARD_CONTENT}>content</div>}
        image="-"
        title={CARD_TITLE}
        subtitle={CARD_SUBTITLE}
      />
    );

    const content = screen.getByTestId(Locators.CARD_CONTENT);
    expect(content).toBeInTheDocument();

    rerender(<Card image="-" title={CARD_TITLE} subtitle={CARD_SUBTITLE} />);
    expect(content).not.toBeInTheDocument();
  });

  test('При клике вызывается onClick, если передан', () => {
    const mockOnClick = jest.fn();
    render(
      <div data-testid={Locators.TEST_CONTAINER}>
        <Card
          onClick={mockOnClick}
          title={CARD_TITLE}
          subtitle={CARD_SUBTITLE}
          image="-"
        />
      </div>
    );

    const container = screen.getByTestId(Locators.TEST_CONTAINER);
    const cardElement = container.firstChild;

    expect(cardElement).toBeInTheDocument();
    userEvent.click(cardElement as Element);
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
