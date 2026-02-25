import { expect, test, type APIRequestContext } from "@playwright/test";
import { genAdminRoute, genAppRoute, WwwRoute } from "@innbell/router/routes";

test.describe("static routes", () => {
  const staticRoutes = Object.values(WwwRoute).filter(
    (route) => !route.includes("app") && !route.includes("admin"),
  );

  for (const route of staticRoutes) {
    test("should render route: " + route, async ({ page }) => {
      await page.goto(route);
      expect(page).toBeDefined();
    });
  }
});

test.describe("redirect routes", () => {
  test("app redirect", async ({ request }) => {
    await testRedirect(request, "/app", genAppRoute());
  });

  test("admin redirect", async ({ request }) => {
    await testRedirect(request, "/admin", genAdminRoute());
  });
});

async function testRedirect(
  request: APIRequestContext,
  from: string,
  to: string,
  status = 301,
) {
  const response = await request.get(from, { maxRedirects: 0 });
  const location = response.headers()["location"];

  expect(response.status()).toBe(status);
  expect(location).toBe(to);
}
