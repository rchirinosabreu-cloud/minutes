from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        print("Navigating to http://localhost:3001...")
        page.goto("http://localhost:3001", timeout=30000)
        print("Page loaded.")

        # Wait a bit for initial data fetch (which will fail but we want to capture that state)
        page.wait_for_timeout(5000)

        page.screenshot(path="verification.png")
        print("Screenshot saved to verification.png")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
