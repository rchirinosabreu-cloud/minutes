
from playwright.sync_api import sync_playwright, expect
import os

def test_document_upload():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to localhost
        page.goto("http://localhost:3000")

        # Check if the Test Header is visible
        expect(page.get_by_text("TESTING DOCUMENT UPLOAD")).to_be_visible()

        # Locate the file input and upload
        # React dropzone usually has an input[type='file']
        page.set_input_files("input[type='file']", "test_doc.txt")

        # Wait for toast processing
        # toast.loading(`Procesando...`)
        try:
             expect(page.get_by_text("Procesando")).to_be_visible(timeout=5000)
        except:
             print("Toast 'Procesando' missed or too fast")

        # Wait for success toast or file in list
        # toast.success(`✅ ${newDocs.length} documento(s) listo(s)`)
        # This might be fast, so we wait for the file to appear in the list
        expect(page.get_by_text("test_doc.txt")).to_be_visible()

        # Take screenshot
        page.screenshot(path="verification/upload_success.png")

        browser.close()

if __name__ == "__main__":
    test_document_upload()
