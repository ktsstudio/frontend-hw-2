import puppeteer, { Page, Browser } from 'puppeteer';
import http from 'http';
import handler  from 'serve-handler';
import path from 'path';
import fs from 'fs';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import yaml from 'js-yaml';
import { setupScreenshotTesting } from './screenshotUtils/screenshotTesting';
import { BROWSER_OPTIONS } from './screenshotUtils/browserOptions';

let server: any;
let browser: Browser;
let page: Page;

const AVAILABLE_PROJECT_TYPES = ['github', 'e-commerce', 'food', 'crypto'];
const USER_OPTIONS = yaml.load(fs.readFileSync('config.yml', 'utf8')) as { project_type: string};

if (!AVAILABLE_PROJECT_TYPES.includes(USER_OPTIONS.project_type)) {
  throw new Error('Invalid project_type')
}

const SNAPSHOT_DIR = path.join(__dirname, '__image_snapshots__', USER_OPTIONS.project_type);

const MATCH_SNAPSHOT_OPTIONS: MatchImageSnapshotOptions = { customSnapshotsDir: SNAPSHOT_DIR, failureThreshold: 0.05, failureThresholdType: 'percent', customSnapshotIdentifier: ({ currentTestName }) => currentTestName.replaceAll(' ', '_').replaceAll('/', '-')}

const screenshotTesting = setupScreenshotTesting({
  it,
  expect,
  matchOptions: MATCH_SNAPSHOT_OPTIONS,
  getPage: () => page,
})

describe('Screenshot', () => {
  beforeAll(async () => {
    server = http.createServer((req, res) => {
      return handler(req, res, {
        public: path.join(__dirname, '..', '..', 'storybook-static'),
      });
    });

    server.listen(6006);
    browser = await puppeteer.launch(BROWSER_OPTIONS);
    page = await browser.newPage();
  }, 30000)

  screenshotTesting({
    componentName: 'loader',
    props: {
      size: ['l', 'm', 's', undefined],
      loading: [true, false, undefined],
    },
    viewPort: {
      width: 100,
      height: 100,
    },
  });

  screenshotTesting({
    componentName: 'withloader',
    props: {
      children: ['Page content'],
      loading: [true, false, undefined],
    },
    viewPort: {
      width: 200,
      height: 100,
    },
  });

  screenshotTesting({
    componentName: 'button',
    props: {
      children: ['Send', 'Cancel'],
      loading: [true, false, undefined],
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 200,
      height: 80,
    },
  });

  screenshotTesting({
    name: 'button hover',
    componentName: 'button',
    props: {
      children: ['Send', 'Cancel'],
      loading: [true, false, undefined],
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 200,
      height: 80,
    },
    evaluate: async (p: Page) => {
      await p.hover('.button');
      await p.waitForTimeout(300);
    }
  });


  screenshotTesting({
    componentName: 'card',
    props: {
      title: ['kts-school-frontend'],
      subtitle: ['ktsstudio']
    },
    viewPort: {
      width: 380,
      height: 600,
    },
  });

  screenshotTesting({
    name: 'card hover',
    componentName: 'card',
    props: {
      title: ['kts-school-frontend'],
      subtitle: ['ktsstudio']
    },
    viewPort: {
      width: 380,
      height: 600,
    },
    evaluate: async (p: Page) =>
      await p.hover('.card')
  });


  screenshotTesting({
    componentName: 'input',
    props: {
      value: ['text', undefined],
      placeholder: ['text', undefined],
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 400,
      height: 200,
    },
    matchOptions: {
      blur: 2,
      failureThreshold: 0.02,
    }
  });

  screenshotTesting({
    name: 'input focus',
    componentName: 'input',
    props: {
      value: ['text', undefined],
      placeholder: ['text', undefined],
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 400,
      height: 200,
    },
    evaluate: async (p: Page) => {
      await p.focus('.input')
    }
  });


  screenshotTesting({
    componentName: 'multidropdown',
    props: {
      'value[0].key': ['msk'],
      'value[1].key': ['spb'],
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 400,
      height: 200,
    },
  });

  screenshotTesting({
    name: 'multidropdown click',
    componentName: 'multidropdown',
    props: {
      'value[0].key': ['msk'],
      'value[1].key': ['spb'],
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 400,
      height: 600,
    },
    evaluate: async (p: Page) => {
      await p.click('.multi-dropdown')
    },
  });

  screenshotTesting({
    componentName: 'checkbox',
    props: {
      disabled: [true, false, undefined],
      checked: [true, false, undefined],
    },
    viewPort: {
      width: 100,
      height: 100,
    },
    evaluate: async (p: Page) => {
      await p.click('.checkbox');
      await p.waitForTimeout(300);
    },
    matchOptions: {
      blur: 2,
      failureThreshold: 0.02,
    }
  });

  screenshotTesting({
    name: 'checkbox hover',
    componentName: 'checkbox',
    props: {
      disabled: [true, false, undefined],
      checked: [true, false, undefined],
    },
    viewPort: {
      width: 100,
      height: 100,
    },
    evaluate: async (p: Page) => {
      await p.hover('.checkbox');
      await p.waitForTimeout(300);
    },
    matchOptions: {
      blur: 2,
      failureThreshold: 0.02,
    }
  });

  screenshotTesting({
    name: 'checkbox click',
    componentName: 'checkbox',
    props: {
      disabled: [true, false, undefined],
    },
    viewPort: {
      width: 100,
      height: 100,
    },
    evaluate: async (p: Page) => {
      await p.click('.checkbox');
      await p.waitForTimeout(300);
    },
    matchOptions: {
      blur: 2,
      failureThreshold: 0.02,
    }
  });

  afterAll((done) => {
    browser.close();
    server.close(done);
  }, 30000)
});
