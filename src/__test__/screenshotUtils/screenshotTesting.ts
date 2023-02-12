import { MatchImageSnapshotOptions } from "jest-image-snapshot";
import path from "path";
import { Page } from "puppeteer";
import { generate } from "./generateCombos";
import { getStorybookUrl } from "./getStorybookUrl";
import { Knobs } from "./types";

type Params = {
  name?: string,
  componentName: string;
  props: Knobs;
  viewPort: {
    width: number;
    height: number;
  };
  evaluate?: (page: Page) => Promise<void>;
  matchOptions?: MatchImageSnapshotOptions;
}

export const setupScreenshotTesting  = ({ it, expect, matchOptions, getPage }: {
  it: jest.It;
  expect: jest.Expect;
  matchOptions: MatchImageSnapshotOptions;
  getPage: () => Page;
}) => ({ name, componentName, props, viewPort, evaluate, matchOptions: matchOptionsLast }: Params) => {
  const cases = generate(props);

  it.each(cases)(`${name || componentName}-%s`, async (_, variants) => {
    const page = getPage();

    await page.goto(getStorybookUrl(componentName, variants), { waitUntil: 'load'});
    page.setViewport(viewPort);
    page.addStyleTag({content: '* {animation: none !important; transition: none !important; }'});

    if (evaluate) {
      await evaluate(page);
    }

    const screenshot = await page.screenshot();

    expect(screenshot).toMatchImageSnapshot({...matchOptions, ...matchOptionsLast, customSnapshotsDir: path.resolve(matchOptions.customSnapshotsDir as string, componentName)});
  });
}
