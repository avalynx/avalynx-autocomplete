<?php

$search = isset($_GET['search']) ? $_GET['search'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';

$products = [
    ['key' => 'PRD001', 'value' => 'MacBook Pro 16"'],
    ['key' => 'PRD002', 'value' => 'MacBook Air M2'],
    ['key' => 'PRD003', 'value' => 'iPhone 15 Pro'],
    ['key' => 'PRD004', 'value' => 'iPad Pro 12.9"'],
    ['key' => 'PRD005', 'value' => 'Apple Watch Ultra'],
    ['key' => 'PRD006', 'value' => 'AirPods Pro'],
    ['key' => 'PRD007', 'value' => 'Magic Keyboard'],
    ['key' => 'PRD008', 'value' => 'Studio Display'],
];

$users = [
    ['key' => 'USR001', 'value' => 'Max Mustermann'],
    ['key' => 'USR002', 'value' => 'Maria Schmidt'],
    ['key' => 'USR003', 'value' => 'Martin Meier'],
    ['key' => 'USR004', 'value' => 'Monika Weber'],
    ['key' => 'USR005', 'value' => 'Michael Braun'],
];

$data = [];
if ($type === 'products') {
    $data = $products;
} elseif ($type === 'users') {
    $data = $users;
}

if ($search !== '') {
    $data = array_values(array_filter($data, function($item) use ($search) {
        return strpos(strtolower($item['value']), strtolower($search)) !== false;
    }));
}

$result = $data;

header('Content-Type: application/json');
echo json_encode($result);
