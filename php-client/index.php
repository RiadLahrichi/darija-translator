<?php
/**
 * Darija Translator - PHP Client
 * Calls the Jakarta REST API to translate text to Moroccan Darija.
 */

$API_URL = "http://localhost:8080/darija-translator/api/translate";

// Handle form submission
$translation = "";
$error = "";
$inputText = "";

if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["text"])) {
    $inputText = $_POST["text"];

    $data = json_encode(["text" => $inputText]);

    $options = [
        "http" => [
            "method"  => "POST",
            "header"  => "Content-Type: application/json\r\n",
            "content" => $data,
            "timeout" => 30
        ]
    ];

    $context = stream_context_create($options);
    $response = @file_get_contents($API_URL, false, $context);

    if ($response === false) {
        $error = "Could not connect to the translation API. Make sure WildFly is running.";
    } else {
        $result = json_decode($response, true);
        if (isset($result["translation"])) {
            $translation = $result["translation"];
        } else {
            $error = $result["error"] ?? "Unknown error";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Darija Translator - PHP Client</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: #1e293b;
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        h1 {
            font-size: 24px;
            margin-bottom: 8px;
            color: #38bdf8;
        }
        p.subtitle {
            color: #94a3b8;
            margin-bottom: 24px;
            font-size: 14px;
        }
        textarea {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #334155;
            background: #0f172a;
            color: #e2e8f0;
            font-size: 16px;
            resize: vertical;
            min-height: 80px;
        }
        button {
            width: 100%;
            padding: 12px;
            margin-top: 12px;
            border: none;
            border-radius: 8px;
            background: #38bdf8;
            color: #0f172a;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
        button:hover { background: #7dd3fc; }
        .result {
            margin-top: 20px;
            padding: 16px;
            background: #0f172a;
            border-radius: 8px;
            border: 1px solid #334155;
            direction: rtl;
            font-size: 18px;
            line-height: 1.6;
        }
        .error {
            margin-top: 20px;
            padding: 12px;
            background: #7f1d1d;
            border-radius: 8px;
            color: #fca5a5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🇲🇦 Darija Translator</h1>
        <p class="subtitle">PHP Client — Powered by Jakarta REST + OpenAI</p>

        <form method="POST">
            <textarea name="text" placeholder="Enter English text..."><?= htmlspecialchars($inputText) ?></textarea>
            <button type="submit">Translate to Darija</button>
        </form>

        <?php if ($translation): ?>
            <div class="result"><?= htmlspecialchars($translation) ?></div>
        <?php endif; ?>

        <?php if ($error): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
    </div>
</body>
</html>
