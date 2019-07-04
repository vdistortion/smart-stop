<?php

if (isset($_GET['MR']) || $_GET['DEBUG'] == 'Y') {

    $marsruty = $_GET['MR'] ? : 182;
    $stops = file_get_contents('./marsruty/stops.txt');
    $arStops = explode("\n", $stops);
    $newStops = Array();

    foreach ($arStops as $value) {
        $item = explode(",", $value);
        if ($item[0] == $marsruty) {
            $newStops['name'] = $item[2];
            $newStops['coords'] = Array(
                (float)$item[4],
                (float)$item[5]
            );
        }
    }

    $times = file_get_contents('./marsruty/stop_times.txt');
    $arTimes = explode("\n", $times);
    $newTimes = Array();

    foreach ($arTimes as $value) {
        $item = explode(",", $value);
        if ($item[3] == $marsruty) {
            $newTimes[] = $item[0];
        }
    }

    $trips = file_get_contents('./marsruty/trips.txt');
    $arTrips = explode("\n", $trips);
    $newTrips = Array();

    foreach ($newTimes as $time) {
        foreach ($arTrips as $trip) {
            $item = explode(",", $trip);
            if ($item[2] == $time) {
                $newTrips[] = $item[0];
            }
        }
    }

    $routes = file_get_contents('./marsruty/routes.txt');
    $arRoutes = explode("\n", $routes);
    $newRoutes = Array();

    foreach (array_unique($newTrips) as $uniq) {
        foreach ($arRoutes as $route) {
            $item = explode(",", $route);
            if ($item[0] == $uniq) {
                $id = explode("_", $item[0]);
                $type = $id[1];
                $name = trim($item[1], '"');
                $formatRoute = substr($item[2], 1, -1);
                $newRoutes[$type][] = Array(
                    "name" => $name,
                    "route" => preg_replace('/(\"){2,}/', '$1', $formatRoute)
                );
            }
        }
    }

    if (!array_key_exists('bus', $newRoutes)) {
        $newRoutes['bus'] = Array();
    }

    if (array_key_exists('seasonalbus', $newRoutes)) {
        foreach ($newRoutes['seasonalbus'] as $route) {
            $newRoutes['bus'][] = $route;
        }
        unset($newRoutes['seasonalbus']);
    }

    $result = Array(
        "routes" => $newRoutes,
        "stop" => $newStops
    );

    echo json_encode($result);

}

if (isset($_GET['ID'])) {

    $id = $_GET['ID'] ? : 3510001;
    $str = file_get_contents('http://chelgortrans.ru:33888/boardTest.aspx?id='.$id);
    $result = mb_convert_encoding($str, 'utf-8', 'cp1251');

    echo $result;

}

?>
