
const STORYBOOK_URL = 'http://localhost:6006/iframe';

const normalizeValue = (v: any) => {
  return String(v);
}

export const getStorybookUrl = (name: string, props: Record<string, any>) => {
  const args = props ? Object.entries(props).map((k) => [k[0], normalizeValue(k[1])].join(':')).join(';') : '';

  return encodeURI(`${STORYBOOK_URL}?viewMode=story&id=${name}--default&args=${args}`);
}
