<?php

$result = [];

if (($handle = fopen('http://transport.gis.inf74.ru/getroutes', 'r')) !== FALSE) {

    $associations = ['', 'trol', 'bus', 'tram', 'taxi', 'seasonbus'];
    $associations_ru = ['', 'Троллейбус', 'Автобус', 'Трамвай', 'Маршрутка', 'Садовый автобус'];
    $colors = ['', '#4b7cd7', '#fe623b', 'green', 'gray', 'yellow'];

    $row = 0;

    while (($data = fgetcsv($handle, 0, ',')) !== FALSE) {
        if ($row) {
            $type = preg_replace('/[^0-9]/', '', $data[0]);
            $lng = ($data[2])? intval($data[2])/1000000 : $data[2];
            $lat = ($data[3])? intval($data[3])/1000000 : $data[3];
            $result[$data[6]] = [
                'id' => $data[6],
                'type' => $associations[$type],
                'name' => $associations_ru[$type],
                'color' => $colors[$type],
                'number' => $data[1],
                'coords' => [$lat, $lng],
                'azimuth' => intval($data[5])
            ];
        }
        $row++;
    }
    fclose($handle);
}

echo json_encode($result);

// 2.1.Данные о GPS/ГЛОНАСС-треке передаются в виде набора параметров, в следующем формате:
// -2,103,61385971,55199203,52,177,борт 0171 Нефаз (ва161 74),30.10.2014 9:42:17
// -1 поле - тип транспорта (1 - троллейбус, 2 - автобус, 3 – трамвай, 5 - садовые автобусы, 4 - маршрутки )
// -2 поле - маршрут, по которому едет машина
// -3 поле - х координата машины (longitude) в градусах, умноженных на 1000000
// -4 поле - y координата машины (latitude) в градусах, умноженных на 1000000
// -5 поле - скорость машины
// -6 поле - азимут движения машины в
// -7 поле - номер машины
// -8 поле – дата и время в часовом поясе Челябинска
