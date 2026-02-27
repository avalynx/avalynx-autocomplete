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
    ['key' => 'USR001', 'value' => 'John Doe'],
    ['key' => 'USR002', 'value' => 'Jane Smith'],
    ['key' => 'USR003', 'value' => 'Mark Miller'],
    ['key' => 'USR004', 'value' => 'Mary White'],
    ['key' => 'USR005', 'value' => 'Michael Brown'],
];

$categories = [
    ['key' => 'CAT001', 'value' => 'Computers'],
    ['key' => 'CAT002', 'value' => 'Electronics'],
    ['key' => 'CAT003', 'value' => 'Smartphones'],
    ['key' => 'CAT004', 'value' => 'Tablets'],
    ['key' => 'CAT005', 'value' => 'Accessories'],
];

$tags = [
    ['key' => 'TAG001', 'value' => 'JavaScript'],
    ['key' => 'TAG002', 'value' => 'TypeScript'],
    ['key' => 'TAG003', 'value' => 'Vue.js'],
    ['key' => 'TAG004', 'value' => 'React'],
    ['key' => 'TAG005', 'value' => 'Angular'],
    ['key' => 'TAG006', 'value' => 'PHP'],
    ['key' => 'TAG007', 'value' => 'Python'],
    ['key' => 'TAG008', 'value' => 'Node.js'],
];

$skills = [
    ['key' => 'SKL001', 'value' => 'Frontend Development'],
    ['key' => 'SKL002', 'value' => 'Backend Development'],
    ['key' => 'SKL003', 'value' => 'Database Design'],
    ['key' => 'SKL004', 'value' => 'DevOps'],
    ['key' => 'SKL005', 'value' => 'UI/UX Design'],
    ['key' => 'SKL006', 'value' => 'Project Management'],
    ['key' => 'SKL007', 'value' => 'Agile/Scrum'],
    ['key' => 'SKL008', 'value' => 'Testing/QA'],
    ['key' => 'SKL009', 'value' => 'Security'],
    ['key' => 'SKL010', 'value' => 'Cloud Architecture'],
];

$priorities = [
    ['key' => 'PRI001', 'value' => 'Critical'],
    ['key' => 'PRI002', 'value' => 'High'],
    ['key' => 'PRI003', 'value' => 'Medium'],
    ['key' => 'PRI004', 'value' => 'Low'],
    ['key' => 'PRI005', 'value' => 'Optional'],
    ['key' => 'PRI006', 'value' => 'Backlog'],
];

$languages = [
    ['key' => 'LNG001', 'value' => 'German'],
    ['key' => 'LNG002', 'value' => 'English'],
    ['key' => 'LNG003', 'value' => 'French'],
    ['key' => 'LNG004', 'value' => 'Spanish'],
    ['key' => 'LNG005', 'value' => 'Italian'],
    ['key' => 'LNG006', 'value' => 'Portuguese'],
    ['key' => 'LNG007', 'value' => 'Dutch'],
    ['key' => 'LNG008', 'value' => 'Polish'],
];

$data = [];
if ($type === 'products') {
    $data = $products;
} elseif ($type === 'users') {
    $data = $users;
} elseif ($type === 'categories') {
    $data = $categories;
} elseif ($type === 'tags') {
    $data = $tags;
} elseif ($type === 'skills') {
    $data = $skills;
} elseif ($type === 'priorities') {
    $data = $priorities;
} elseif ($type === 'languages') {
    $data = $languages;
}

if ($search !== '') {
    $data = array_values(array_filter($data, function($item) use ($search) {
        return strpos(strtolower($item['value']), strtolower($search)) !== false;
    }));
}

$result = $data;

header('Content-Type: application/json');
echo json_encode($result);
