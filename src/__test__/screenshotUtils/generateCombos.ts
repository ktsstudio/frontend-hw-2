import { Knobs, KnobValueType } from "./types";

function generateCombos<T>(
  list: T[][],
  n = 0,
  result: Array<Array<[T, number]>> = [],
  current: Array<[T, number]> = [],
) {
  if (n === list.length) {
      result.push(current);
  } else {
      list[n].forEach((item, i) => generateCombos(list, n + 1, result, [...current, [item, i]]));
  }

  return result;
}

export const generate = (knobs: Knobs): [string, Record<string, KnobValueType>][] => {
  const knobValues = Object.values(knobs);
  const knobNames = Object.keys(knobs);

  const combos = generateCombos<any>(
    knobValues.map((v) => (Array.isArray(v) ? v : [v])),
  );

    // Собираем тестовых кейс — имя кейса и словарь из комбинации кнобсов
    const buildTestCase = (knobsCombo: Array<[KnobValueType, number]>) => {
      const knobsVariant: Record<string, KnobValueType> = {};
      let caseName = '';

      knobsCombo.forEach(([knobValue], nameIndex) => {
          const knobName = knobNames[nameIndex];

          knobsVariant[knobName] = knobValue;

          if (Array.isArray(knobValues[nameIndex])) {
              caseName += `${knobName}=${knobValue};`;
          }
      });

      return { caseName, knobsVariant };
  };

  return combos.map((combo) => {
      const { caseName, knobsVariant } = buildTestCase(combo);

      return [
          caseName,
          knobsVariant,
      ];
  });
}
