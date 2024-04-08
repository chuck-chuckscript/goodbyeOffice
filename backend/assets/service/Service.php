<?php
include_once "Auth.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

ini_set('display', 'on');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class Service{
    
    static function add(){
        
        try{
            
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

        
            $connect->set_charset('utf8mb4');
            if(!isset($_POST['access_token'])){
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            if(!Auth::isAuth($_POST['access_token'])){
                
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            
            $path = preg_split('/(service)/', __DIR__);
            

            if(isset($_FILES['file'])){


                // var_dump($_FILES);
                // foreach($_FILES['files'] as $file){
                //     var_dump($file);
                // }
                $name = basename($_FILES['file']['name']);
                $dir = "$path[0]/services/$name";
                $price = isset($_POST['price']) ? $_POST['price'] : null;

                if (!file_exists($dir)) {
                    $temp = $_FILES['file']['tmp_name'];
                    $target_path = $dir;
                    $content = mysqli_real_escape_string($connect, $_POST['desc']);
                    mysqli_query($connect, "INSERT INTO Services (`service_name`,`service_price`,`service_desc`, `service_image`) VALUES ('$_POST[name]','$price', '$content', '$name')");
                    move_uploaded_file($temp, $target_path);
                }
                else{
                    throw new Exception('Такое фото уже содержится в другой услуге, выберите другое', 400);
                }
    
                
                
            

               
            }
            else{
                throw new Exception('Для карточки услуги необходимо 1 фото', 400);
            }
            

            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){

            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }

    }

    static function getServiceList(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $connect->set_charset('utf8mb4');

            $result = mysqli_query($connect, "SELECT service_id, service_name FROM Services");

            if(mysqli_num_rows($result) === 0){
                throw new Error('Услуги отсутствуют', 404);
            }
            $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

            mysqli_close($connect);
            http_response_code(200);
            echo json_encode($result, JSON_UNESCAPED_UNICODE);

          
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()]);
        }
    }

    static function allServices(){
        try{
            require_once 'connection.php';
            $path = preg_split('/(service)/', __DIR__);

            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $connect->set_charset('utf8mb4');
            $request = mysqli_query($connect, "SELECT * FROM Services");

            if(mysqli_num_rows($request) == 0){
                throw new Exception('Услуг не найдено', 404);
            }
            $request = mysqli_fetch_all($request, MYSQLI_ASSOC);


            
            http_response_code(200);
            echo json_encode($request, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code(500);
            echo json_encode(["status" => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }
    
    static function changeServiceById(){
        try{
            require_once 'connection.php';
                
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $connect->set_charset('utf8mb4');
            
            $request = mysqli_query($connect, "SELECT service_image FROM Services WHERE service_id = '$_POST[service_id]'");
            
            if(mysqli_num_rows($request) == 0){
                throw new Exception('Услуга не найдена', 404);
            }
            $request = mysqli_fetch_assoc($request);
            $path = preg_split('/(service)/', __DIR__);

            $content = mysqli_real_escape_string($connect, $_POST['desc']);
            if(isset($_FILES['file'])){
                $name = basename($_FILES['file']['name']);
                $temp = $_FILES['file']['tmp_name'];
                var_dump($temp);
                if(file_exists("$path[0]services/$request[service_image]")){
                    unlink("$path[0]services/$request[service_image]");
                    
                    
                    move_uploaded_file($temp, "$path[0]services/$name");
                    mysqli_query($connect, "UPDATE Services SET service_name = '$_POST[title]', service_desc = '$content', service_price = '$_POST[price]', service_image = '$name' WHERE service_id = '$_POST[service_id]'");
                    
                }
                else{
                    

                    move_uploaded_file($temp, "$path[0]services/$name");
   
                    mysqli_query($connect, "UPDATE Services SET service_name = '$_POST[title]', service_desc = '$content', service_price = '$_POST[price]', service_image = '$name' WHERE service_id = '$_POST[service_id]'");
                }
            }
            else{
                mysqli_query($connect, "UPDATE Services SET service_name = '$_POST[title]', service_desc = '$content', service_price = '$_POST[price]' WHERE service_id = '$_POST[service_id]'");
            }
            
            
            
            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code(500);

            echo json_encode(["status" => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }
    
    static function getServiceById($id){
        
        try{
            require_once 'connection.php';
                
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $connect->set_charset('utf8mb4');
            
            $request = mysqli_query($connect, "SELECT * FROM Services WHERE service_id = $id");
            
            if(mysqli_num_rows($request) == 0){
                throw new Exception('Услуга не найдена', 404);
            }
            $request = mysqli_fetch_assoc($request);
    
    
    
            http_response_code(200);
            echo json_encode($request, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code(500);
            echo json_encode(["status" => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }
    
    static function delete(){
        
        try{
    
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            if(!isset($_POST['access_token'])){
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            if(!Auth::isAuth($_POST['access_token'])){
                
                throw new Exception('Упс... Вы не авторизованны', 403);
            }
            $service = mysqli_query($connect, "SELECT service_image FROM Services WHERE service_id = '$_POST[service_id]'");
            $path = preg_split('/(service)/', __DIR__);
            if(mysqli_num_rows($service) == 0){
                throw new Exception('Услуги не существует', 404);
            }
            $service = mysqli_fetch_assoc($service);
            $file = "$path[0]/services/$service[service_image]";
            if(file_exists($file)){
                unlink($file);
            }
            mysqli_query($connect, "DELETE FROM Services WHERE service_id = '$_POST[service_id]'");
            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){

            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }

    }
}

$url = preg_split("/(\/)/", $_REQUEST['uri']);

switch($url[0]){
    case 'serviceAdd': 
        Service::add();
        break;
    case 'allServices': 
        Service::allServices();
        break;
    case 'serviceById': 
        Service::getServiceById($url[1]);
        break;
    case 'serviceList': 
        Service::getServiceList();
        break;
    case 'serviceDelete': 
        Service::delete();
        break;
    case 'changeServiceById':
        Service::changeServiceById();
        break;
        

    
}
