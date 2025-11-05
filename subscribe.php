<?php
// Simple email capture endpoint. No dependencies.
// Stores emails to storage/subscribers.csv with timestamp and IP.

header('Content-Type: application/json');
header('Cache-Control: no-store');

// Basic POST enforcement
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit;
}

// Honeypot field
$hp = isset($_POST['website']) ? trim($_POST['website']) : '';
if ($hp !== '') {
  echo json_encode(['success' => true, 'message' => 'Thanks!']);
  exit;
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['success' => false, 'message' => 'Please enter a valid email.']);
  exit;
}

// Prepare storage
$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
  mkdir($storageDir, 0755, true);
}
$file = $storageDir . '/subscribers.csv';
$isNew = !file_exists($file);

// Append row
$fp = fopen($file, 'a');
if ($fp === false) {
  echo json_encode(['success' => false, 'message' => 'Unable to save.']);
  exit;
}
if ($isNew) {
  fputcsv($fp, ['timestamp_iso', 'email', 'ip']);
}
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$timestamp = gmdate('c');
fputcsv($fp, [$timestamp, strtolower($email), $ip]);
fclose($fp);

echo json_encode(['success' => true, 'message' => 'Subscribed']);
exit;
?>


