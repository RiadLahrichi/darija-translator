import requests
import json

API_URL = "http://localhost:8080/darija-translator/api/translate"

def translate(text):
    """Send text to the Darija translator REST API and return the translation."""
    response = requests.post(
        API_URL,
        headers={"Content-Type": "application/json"},
        json={"text": text}
    )
    return response.json()

if __name__ == "__main__":
    print("=== Darija Translator (Python Client) ===")
    print("Type 'quit' to exit.\n")

    while True:
        text = input("Enter text to translate: ")
        if text.lower() == "quit":
            break

        result = translate(text)

        if "translation" in result:
            print(f"Darija: {result['translation']}\n")
        else:
            print(f"Error: {result.get('error', 'Unknown error')}\n")
