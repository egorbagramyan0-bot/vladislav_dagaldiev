<?php
// Simple Telegram Proxy to bypass ISP blocking of api.telegram.org in client browsers.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "description" => "Method Not Allowed"]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["ok" => false, "description" => "Bad Request: Invalid JSON"]);
    exit;
}

$token = isset($data['token']) ? $data['token'] : null;
$chatId = isset($data['chat_id']) ? $data['chat_id'] : null;
$text = isset($data['text']) ? $data['text'] : null;
$parseMode = isset($data['parse_mode']) ? $data['parse_mode'] : 'HTML';

if (!$token || !$chatId || !$text) {
    http_response_code(400);
    echo json_encode(["ok" => false, "description" => "Missing required fields (token, chat_id, text)"]);
    exit;
}

// Prepare URL and payload
$url = "https://api.telegram.org/bot" . $token . "/sendMessage";
$payload = json_encode([
    "chat_id" => $chatId,
    "text" => $text,
    "parse_mode" => $parseMode
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($payload)
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode([
        "ok" => false,
        "description" => "Failed to reach Telegram API: " . $error
    ]);
    exit;
}

http_response_code($httpCode);
echo $response;
