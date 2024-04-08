<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
mb_internal_encoding("UTF-8");
ini_set('display', 'on');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class EventAgent{
    static function add(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            try{
                require_once('connection.php');
                $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

                if(!isset($_POST['name']) or !isset($_POST['time']) or !isset($_POST['start'])){
                    throw new Exception('Данные не полны для добавления', 400);
                }
                mysqli_query($connect, "INSERT INTO Events (`event_name`, `event_time`, `event_start`) VALUES ('$_POST[name]', '$_POST[time]', '$_POST[start]')");
                mysqli_close($connect);
                http_response_code(200);
                echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
            }
            catch(Exception $e){

                http_response_code($e->getCode());
                echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            }
        }
        else{
            http_response_code(404);
            echo json_encode(["status" => 404, "message" => 'Невозможно добавить событие, поставьте POST'], JSON_UNESCAPED_UNICODE);
        }   

    }
    static function delete(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            try{
                require_once('connection.php');
                $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

                if(!isset($_POST['event_id'])){
                    throw new Exception('Данные не полны для удаления', 400);
                }
                mysqli_query($connect, "DELETE FROM Events WHERE event_id = '$_POST[event_id]'");
                mysqli_close($connect);
                http_response_code(200);
                echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
            }
            catch(Exception $e){

                http_response_code($e->getCode());
                echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            }
        }
        else{
            http_response_code(404);
            echo json_encode(["status" => 404, "message" => 'Невозможно добавить событие, поставьте POST'], JSON_UNESCAPED_UNICODE);
        }   

    }
    static function getAll(){
        if($_SERVER['REQUEST_METHOD'] === 'GET'){
            try{
                require_once('connection.php');
                $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
    
                $currentDate = ['day' => date('m'), 'year' => date('Y')];

                $data = mysqli_query($connect, "SELECT * FROM `Events` WHERE MONTH(event_time) = $currentDate[day] AND YEAR(event_time) = $currentDate[year]");
                
    
                if(mysqli_num_rows($data) == 0){
                    throw new Exception('На данный месяц событий не найдено', 404);
                }
                $data = mysqli_fetch_all($data, MYSQLI_ASSOC);
                mysqli_close($connect);
                http_response_code(200);
                echo json_encode(["status" => 200, "body" => $data], JSON_UNESCAPED_UNICODE);
            }
            catch(Exception $e){
    
                http_response_code(500);
                echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            }
        }
        

    }
}

$url = preg_split("/(\/)/", $_REQUEST['uri']);

switch($url[0]){
    case 'eventAdd': 
        EventAgent::add();
        break;
    case 'allEvents': 
        EventAgent::getAll();
        break;
    case 'deleteEvent': 
        EventAgent::delete();
        break;
}
?>