# Начинающий React разработчик. Домашнее задание №2

В данном домашнем задании Вам необходимо реализовать React-компоненты для вашего будущего проекта.

[Макеты](https://www.figma.com/file/DXNsHlF1UVkRo2Iu2bWayQ/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B-New?type=design&node-id=0%3A1&mode=design&t=JUz4jfQkgF4W8oBP-1)

**Требования:**
1. Все цвета и отступы должны быть заданы в переменных (указаны в макете)
![Переменные](./public//styles.png)

## 1. Loader
Реализуйте компонент Лоадер

```typescript
type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};
```

**Примеры использования:**
```typescript
<Loader />  // стандартный лоадер

<Loader size="l" />  // лоадер размера L
```

## 2. Text
Реализуйте компонент Text

**Требования:**
1. По умолчанию должен иметь цвет родителя
1. Пропс `weight` имеет больший приоритет чем `view`
1. При указании `tag` рендерится соответствующий тег, по умолчанию `p`

```typescript
type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};
```

**Примеры использования:**
```typescript
<Text tag="p" weight="medium">Жирный текст</Text>
<Text tag="h1" view="title" maxLines={2}>Заголовок</Text>
```

## 3. Icons
Реализуйте компоненты иконок. (Назвать их CheckIcon и ArrowDownIcon)

1. Все компоненты иконок лежат в директории `components/icons/` (Пример импорта: `import CheckIcon from 'components/icons/CheckIcon'`)
1. Все компоненты иконок имеют одинаковый базовый набор пропсов `IconProps`. (Лучше всего сделать компонент-обертку `Icon` и использовать в компонентах иконок, но это не обязательно).
1. По умолчанию имеют цвет родителя а при указании `color`, красятся в указанный стиль цвета.
1. Можно указать ширину и высоту иконки (по умолчанию 24px)

```typescript
type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};
```

**Примеры использования:**
```typescript
<CheckIcon width={40} height={40} />
<ArrowDownIcon color="accent" />
```

## 4. Button
Реализуйте компонент Кнопка

**Требования:**
1. Кнопка использует html-тег button и принимает все его пропсы
1. Кнопка принимает пропсы ButtonProps и удовлетворяет их требованиям, описанным ниже
1. Текст кнопки/дочерний элемент передается в качестве `children`
1. При передаче дополнительного `className` не должны сбрасываться внутренние (описанные вами в стилях) классы кнопки
1. Компонент должен быть реактивным, то есть реагировать на изменение любых пропсов
1. Для управления классами необходимо использовать библиотеку `classnames`
1. При loading=true, на кнопке должен появляться атрибут disabled

```typescript
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};
```

**Примеры использования:**
```typescript
// Кнопка с текстом "Отправить", логирующая в консоль "Письмо отправлено" при клике
<Button onClick={() => console.log('Письмо отправлено')}>
  Отправить
</Button>

// Кнопка, отображающая компонент Loader при загрузке каких-то данных
<Button
  loading={isLoading}
>
  Отправить
</Button>

// Кнопка с элементом в качестве содержимого
<Button>
  <span>Модная кнопка</span>
</Button>

// Заблокированная кнопка с дополнительным классом
<Button className="some-outer-class" disabled>
  Отправить
</Button>

// Кнопка с пропсом нативной кнопки
<Button onMouseOver={() => console.log('Убери от меня курсор!')}>
  Отправить
</Button>
```

## 5. Card
Реализуйте компонент Карточка (Элемент списка)

**Требования:**
1. Для изображения используется html-тег `img`
1. В заголовке может быть максимум 2 строки
1. В описании может быть максимум 3 строки
1. Контент над заголовком необязательный (кол-во строк не ограничено)
1. При клике на карточку должен выполняться `onClick`
1. Для текстов используется компонент `Text`
1. При расширении/сужении карточки, изображение должно сохранять пропорции

```typescript
type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};
```

**Примеры использования:**
```typescript
<Card
    image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
    title="Мандарин"
    subtitle="Марокко"
    onClick={() => console.log('Мандарин куплен!')}
/>

<Card
    image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
    title="Мандарин"
    subtitle={<a href="/morocco">Марокко</a>}
    contentSlot={<>299р</>}
    actionSlot={<Button>В корзину</Button>}
/>
```

## 7. Input
Реализуйте компонент Поле ввода

**Требования:**
1. Необходимо использовать html-тег `input`
2. Должен быть слот для иконки справа

```typescript
type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};
```

**Примеры использования:**
```typescript
// Простое поле
<Input
    value="Кто такой биткоин?"
    onChange={(value: string) => console.log(value)}
/>

// Заблокированное поле с плейсхолдером
<Input
    value=""
    onChange={(value: string) => console.log(value)}
    placeholder="Начните набирать свой вопрос"
    disabled
/>

// Поле с иконкой
<Input
  value="Кто такой биткоин?"
  onChange={(value: string) => console.log(value)}
  afterSlot={<ArrowDownIcon color="secondary" />
/>
```

## 8. MultiDropdown
Реализуйте компонент Выпадающий список с множественным выбором (Фильтр).

**Требования:**
1. Должен использовать компонент `Input`
1. При вводе в поле, опции должны фильтроваться
1. Опции должны пропадать из DOM-дерева при клике вне поля

```typescript
type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};
```

**Примеры использования:**
```typescript
// Простой фильтр
<MultiDropdown
    options={[
        { key: 'msk', value: 'Москва' },
        { key: 'spb', value: 'Санкт-Петербург' },
        { key: 'ekb', value: 'Екатеринбург' }
    ]}
    value={[{ key: 'msk', value: 'Москва' }]}
    onChange={({ key, value }: Option) => console.log('Выбрано:', key, value)}
    getTitle={() => ''}
/>

// Заблокированный фильтр
<MultiDropdown
    disabled
    options={someOptions}
    value={currentValue}
    onChange={onChange}
    getTitle={(values: Option[]) => values.length === 0 ? 'Выберите город' : `Выбрано: ${values.length}`}
/>

// Фильтр, отображающий количество выбранных вариантов
<MultiDropdown
    options={someOptions}
    value={currentValue}
    onChange={onChange}
    getTitle={(values: Option[]) => `Выбрано: ${values.length}`}
/>
```

## 9. CheckBox
Реализуйте компонент Чекбокс

**Требования:**
1. Необходимо использовать html-тег `input` с типом "чекбокс"

```typescript
type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};
```

**Примеры использования:**
```typescript
// Простой чекбокс
<CheckBox
  checked={checked}
  onChange={setChecked}
/>

// Заблокированный чекбокс
<CheckBox
  disabled
  checked={checked}
  onChange={setChecked}
/>
```

## Перед отправкой дз на проверку
1. Укажите личный ключ `user_token` в файле config.yml
Пример config.yml:
```
user_token: e3631261-c636-42458-ab0b-g8e534e984ee
```
3. Выполните команду запуска тестов
```
yarn test
```
4. Если не прошел визуальный тест `screenshot.test.ts`
- Обновите Google Chrome до последне стабильной версии (>=110.0.5478.0)
- Убедитесь что не меняли файлы *.stories.tsx
- Посмотрите различия в папке `src/__test__/__image_snapshots__/<НАЗВАНИЕ КОМПОНЕНТА>/__diff_output__` и исправьте их
5. Отправьте изменения в свой репозиторий
