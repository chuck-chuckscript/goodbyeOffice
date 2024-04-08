<?php
mb_internal_encoding('UTF-8');

function convert($el){
    return iconv(iconv_get_encoding("input_encoding"), "cp1251", $el);
}

try{
    require_once 'connection.php';
    $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
    
    
    $customers = mysqli_query($connect, "SELECT customer_name, customer_phone, customer_email, service_name  FROM Customers INNER JOIN Services ON service_id = customer_service");




    if(mysqli_num_rows($customers) == 0){
        throw new Exception('Нет заказчиков');
    }
    $customers = mysqli_fetch_all($customers, MYSQLI_ASSOC);
    
    $path = preg_split('/(service)/', __DIR__);
    $file = "$path[0]/docs/customers.csv";
    

    $fp = fopen($file, 'w');
    

    
    $head = array_map('convert', ['Имя', 'Телефон', 'Почта', 'Услуга']);
    
    fputcsv($fp, $head, ';');

    foreach($customers as $customer){
        $array = [$customer['customer_name'], $customer['customer_phone'], $customer['customer_email'], $customer['service_name']];
        // var_dump(mb_check_encoding($customer['c/ustomer_name'], "cp1251"));
        $converted = array_map('convert', $array);
        // var_dump();
        fputcsv($fp, $converted, ';');

    }
    fclose($fp);

    // header('location: /assets/docs/customers.csv');
    echo "<a style='border: 1px solid black; padding: 10px; display: block; width: fit-content; margin: 10px auto' href='http://fcgoodod.beget.tech/server/assets/docs/customers.csv'>Скачать csv-файл</a>";
}
catch(Exception $e){
    var_dump($e->getMessage());
}





