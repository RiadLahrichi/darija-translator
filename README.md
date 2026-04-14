\# 🇲🇦 Darija Translator — LLM-Powered RESTful Web Service



An LLM-powered translation service that translates English text into Moroccan Arabic Dialect (Darija). Built with \*\*Jakarta EE RESTful Web Services\*\* and deployed on \*\*WildFly 39\*\*.



\## Architecture



```

\[Chrome Extension]  ──┐

\[Python Client]     ──┤

\[PHP Client]        ──┼──► \[Jakarta REST API on WildFly] ──► \[OpenAI GPT-4o-mini]

\[React Native App]  ──┤

\[Postman/cURL]      ──┘

```



\## Tech Stack



| Component | Technology |

|-----------|-----------|

| Backend | Java 17, Jakarta RESTful Web Services (JAX-RS), WildFly 39 |

| LLM | OpenAI GPT-4o-mini via REST API |

| Chrome Extension | Manifest V3, Side Panel API, Context Menus |

| Python Client | Python 3, requests library |

| PHP Client | PHP 8, file\_get\_contents with stream context |

| Mobile App | React Native |

| Build Tool | Maven |



\## Project Structure



```

├── darija-translator/          # Maven project (Jakarta REST backend)

│   └── src/main/java/ma/aui/cs/

│       ├── RestApplication.java        # JAX-RS application config (@ApplicationPath)

│       ├── TranslateResource.java      # /api/translate endpoint (@POST)

│       └── CorsServletFilter.java      # CORS headers for cross-origin requests

├── darija-chrome-extension/    # Chrome extension (Manifest V3)

│   ├── manifest.json

│   ├── background.js

│   ├── sidepanel.html

│   └── sidepanel.js

├── python-client/              # Python client

│   └── translator\_client.py

├── php-client/                 # PHP client with web UI

│   └── index.php

└── react-native-app/           # React Native mobile client

&#x20;   └── App.js

```



\## Setup \& Running



\### 1. Backend (WildFly)



```bash

\# Set your OpenAI API key

set OPENAI\_API\_KEY=your-key-here    # Windows

export OPENAI\_API\_KEY=your-key-here # Mac/Linux



\# Build the WAR

cd darija-translator

mvn clean package



\# Copy WAR to WildFly and start

cp target/darija-translator.war <WILDFLY\_HOME>/standalone/deployments/

<WILDFLY\_HOME>/bin/standalone.bat   # Windows

<WILDFLY\_HOME>/bin/standalone.sh    # Mac/Linux

```



\### 2. Test with cURL



```bash

curl -X POST http://localhost:8080/darija-translator/api/translate \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{"text": "Hello, how are you?"}'

```



\### 3. Chrome Extension



1\. Open `chrome://extensions/`

2\. Enable "Developer mode"

3\. Click "Load unpacked" → select the `darija-chrome-extension` folder

4\. Select text on any page → Right-click → "Translate to Darija"



\### 4. Python Client



```bash

pip install requests

python python-client/translator\_client.py

```



\### 5. PHP Client



```bash

cd php-client

php -S localhost:8000

\# Open http://localhost:8000 in browser

```



\### 6. React Native App



```bash

cd react-native-app

npx react-native run-android  # or run-ios

```



\## API Endpoint



\*\*POST\*\* `/api/translate`



\*\*Request:\*\*

```json

{

&#x20; "text": "Hello, how are you?"

}

```



\*\*Response:\*\*

```json

{

&#x20; "translation": "سلام، كيداير؟"

}

```



\## Course



CSC3374 — Distributed Systems, Al Akhawayn University in Ifrane

Professor El Habib Nfaoui



\## Author



Riad Lahrichi

