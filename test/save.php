<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

// تحديد مسار ملف البيانات (تأكد من الصلاحيات)
$dataFile = __DIR__ . '/data.json';

if ($action === 'load') {
    // تحميل بيانات المستخدمين
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([]);
    }
} 
elseif ($action === 'save') {
    // حفظ بيانات المستخدمين
    $users = $data['users'] ?? [];
    if (!empty($users)) {
        file_put_contents($dataFile, json_encode($users, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'success', 'message' => 'تم حفظ البيانات بنجاح']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'لا توجد بيانات للحفظ']);
    }
}
else {
    echo json_encode(['status' => 'error', 'message' => 'إجراء غير معروف']);
}
?>