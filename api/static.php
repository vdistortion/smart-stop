<?php

// Файлы слишком большие
ini_set('memory_limit', '512M');

$json = [];
$ID = (isset($_GET['ID'])) ? $_GET['ID'] : '199';

// csv in file => array
$STOPS = getArrayInFile('stops');
$STOP_TIMES = getArrayInFile('stop_times');
$TRIPS = getArrayInFile('trips');
$SHAPES = getArrayInFile('shapes');
$ROUTES = getArrayInFile('routes');

// Информация об остановке
foreach ($STOPS as $stop) {
    if ($stop[0] === $ID) {
        $json['stop'] = [
            'name' => $stop[2],
            'coords' => [ (float)$stop[4], (float)$stop[5] ]
        ];
        break;
    }
}

// Маршруты
$new_times = [];
foreach ($STOP_TIMES as $time) {
    if ($time[3] === $ID) $new_times[] = $time[0];
}

$new_trips = [];
$new_shapes = [];
foreach ($new_times as $time) {
    foreach ($TRIPS as $trip) {
        if ($trip[2] === $time) {
            $new_trips[$trip[0]][] = $trip[6];

            $new_shapes[$trip[0]] = array_unique($new_trips[$trip[0]]);
        }
    }
}

foreach ($new_shapes as $key => $new_shape) {
    foreach ($new_shape as $new) {
        foreach ($SHAPES as $shape) {
            if ($shape[0] === $new) {
                $json['shapes'][$key][$shape[0]][] = [ (float)$shape[1], (float)$shape[2] ];

                foreach ($STOPS as $stop) {
                    if ($stop[4] === $shape[1] && $stop[5] === $shape[2]) {
                        $json['stops'][$stop[4]."".$stop[5]] = [
                            'name' => $stop[2],
                            'coords' => [ (float)$stop[4], (float)$stop[5] ]
                        ];
                        break;
                    }
                }
            }
        }
    }
}

foreach ($new_trips as $trip => $v) {
    foreach ($ROUTES as $route) {
        if ($route[0] === $trip) {
            $arRoute = explode("_", $route[0]);
            $json['routes'][] = [
                'id' => $route[0],
                'type' => ($arRoute[1] === "seasonalbus") ? "bus" : $arRoute[1],
                'name' => $route[1],
                'route' => $route[2]
            ];
        }
    }
}

echo json_encode($json);


function getArrayInFile($fileName) {
    $result = [];
    if (($handle = fopen('./marsruty/'.$fileName.'.txt', 'r')) !== FALSE) {
        $row = 0;
        while (($data = fgetcsv($handle, 0, ',')) !== FALSE) {
            if ($row !== 0) {
                $temp = [];
                foreach ($data as $key => $item) $temp[$key] = $item;
                array_push($result, $temp);
            }
            $row++;
        }
        fclose($handle);
    }
    return $result;
}
