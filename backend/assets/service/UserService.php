<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

ini_set('display', 'on');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class UserAgent{
    static function send(){
        
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

        
            if($_POST['subscribe'] == "true"){
                
                $checkSub = mysqli_query($connect, "SELECT mail_email FROM Mails WHERE mail_email = '$_POST[email]'");
                
                if(mysqli_num_rows($checkSub) == 0){
                    mysqli_query($connect, "INSERT INTO Mails (`mail_name`, `mail_email`) VALUES ('$_POST[name]', '$_POST[email]')");
                }
                
                 
            }
        
            mysqli_query($connect, "INSERT INTO Customers (`customer_name`, `customer_phone`, `customer_email`, `customer_service`) VALUES ('$_POST[name]', '$_POST[phone]', '$_POST[email]', '$_POST[service]')");

            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){

            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }

    }
    static function addUniform(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

            
        
            mysqli_query($connect, "INSERT INTO Uniform (`uniform_fio`, `uniform_phone`, `uniform_email`) VALUES ('$_POST[fio]', '$_POST[phone]', '$_POST[email]')");

            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){

            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
        
        
        
    }
    static function addTraining(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

            if($_POST['subscribe'] == "true"){
                
                $checkSub = mysqli_query($connect, "SELECT mail_email FROM Mails WHERE mail_email = '$_POST[email]'");
                
                if(mysqli_num_rows($checkSub) == 0){
                    mysqli_query($connect, "INSERT INTO Mails (`mail_name`, `mail_email`) VALUES ('$_POST[name]', '$_POST[email]')");
                }
                
                 
            }
        
            mysqli_query($connect, "INSERT INTO Training (`training_user_name`, `training_user_phone`) VALUES ('$_POST[name]', '$_POST[phone]')");

            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){

            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
        
        
        
    }
    
    static function unsub(){
        
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

        
            $checkSub = mysqli_query($connect, "SELECT mail_email FROM Mails WHERE mail_email = '$_POST[email]'");
                
            if(mysqli_num_rows($checkSub) == 0){
               throw new Exception('Не можем найти почту', 404);
            }
             mysqli_query($connect, "DELETE FROM Mails WHERE mail_email = '$_POST[email]'");
             
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
    case 'sendDataUser': 
        UserAgent::send();
        break;
    case 'unsubMail': 
        UserAgent::unsub();
        break;
    case 'addTraining': 
        UserAgent::addTraining();
        break;
    case 'addUniform': 
        UserAgent::addUniform();
        break;
}
