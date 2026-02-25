// import { type FullConfig } from "@playwright/test";

import { clientEnv, type ClientEnv } from "@innbell/constants/env";

export default async function globalSetup() {
  if (!global.ENV) {
    global.ENV = clientEnv;
  }
  // const { baseURL, storageState } = config.projects[0].use;
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto(baseURL!);
  // await page.getByLabel('User Name').fill('user');
  // await page.getByLabel('Password').fill('password');
  // await page.getByText('Sign in').click();
  // await page.context().storageState({ path: storageState as string });
  // await browser.close();
}

declare global {
  var ENV: ClientEnv;
}
