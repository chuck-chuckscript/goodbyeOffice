<?php

require "$_SERVER[DOCUMENT_ROOT]/server/vendor/autoload.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
include_once "$_SERVER[DOCUMENT_ROOT]/server/vendor/firebase/php-jwt/src/BeforeValidException.php";
include_once "$_SERVER[DOCUMENT_ROOT]/server/vendor/firebase/php-jwt/src/ExpiredException.php";
include_once "$_SERVER[DOCUMENT_ROOT]/server/vendor/firebase/php-jwt/src/SignatureInvalidException.php";
include_once "$_SERVER[DOCUMENT_ROOT]/server/vendor/firebase/php-jwt/src/Key.php";
include_once "$_SERVER[DOCUMENT_ROOT]/server/vendor/firebase/php-jwt/src/JWT.php";




header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
mb_internal_encoding("UTF-8");
ini_set('display', 'on');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class Auth{
    static function login(){
        try{
            require_once 'connection.php';
            require_once "config.php";
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            
            $user = mysqli_query($connect, "SELECT user_id, login, password FROM users WHERE users.login = '$_POST[login]'");
            
            
            if(mysqli_num_rows($user) == 0){
                throw new Exception('Извините пользователя не существует', 404);
            }
            $user = mysqli_fetch_assoc($user);
        
            if(!password_verify($_POST['password'], $user['password'])){
                throw new Exception('Неверный логин или пароль', 400);
            }
            
            $checkAuth = mysqli_query($connect,"SELECT auth_user FROM Auth WHERE auth_user = '$user[user_id]'");


            if(mysqli_num_rows($checkAuth) > 0){
                throw new Exception ('Пользователь уже авторизован, выйдите с авторизованного устройства чтобы войти снова', 400);
            }


            $token = [
                "iss" => "http://fcgoodod.beget.tech",
                "aud" => "http://fcgoodod.beget.tech",
                "iat" => 1356999524,
                "nbf" => 1357000000,
                "exp" => time() + 3600,
            ];
            $acesss_token = JWT::encode($token,$conf["private_key"], 'HS256');

            $data = [
                "iss" => "http://fcgoodod.beget.tech",
                "aud" => "http://fcgoodod.beget.tech",
                "iat" => 1356999524,
                "nbf" => 1357000000,
                "exp" => time() + (3600 * 24),
                "data" => [
                    "user_id" => $user['user_id']
                ]
            ];
            $refresh_token = JWT::encode($data, $conf["private_key"], 'HS256');

            mysqli_query($connect,"INSERT INTO Auth (`auth_user`, `auth_refresh`) VALUES ('$user[user_id]', '$refresh_token')");

            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["access_token" => $acesss_token, "refresh_token" => $refresh_token]);
        }
        
        catch(Exception $e){
        
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    static function logout(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            if(!isset($_POST['refresh_token'])){
                throw new Exception('Отсуствует ключ выхода', 400);
            }
            
            mysqli_query($connect, "DELETE FROM Auth WHERE auth_refresh = '$_POST[refresh_token]'");
            mysqli_close($connect);
            http_response_code(200);
            echo json_encode(["status" => 200, "message" => 'ok'], JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }


    static function isAuth($access){
        require "config.php";
        try{

            if(!isset($access)){
                throw new Exception('Отказано в доступе', 403);
            }

            $decoded = JWT::decode($access, new Key($conf["private_key"], 'HS256'));
            
            return true;
        }
        catch(Exception $e){
            return false;
            
        }
    }
    static function checkAuth(){
        require_once "config.php";
        require_once 'connection.php';

        // $_POST = json_decode(file_get_contents("php://input"), true);
        try{

            if(!isset($_POST['access_token'])){
                throw new Exception('Отказано в доступе', 403);
            }
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            
            $checkIsAuth = mysqli_query($connect, "SELECT auth_refresh FROM Auth WHERE auth_refresh = '$_POST[refresh_token]'");
            
            if(mysqli_num_rows($checkIsAuth) == 0){
                throw new Exception('Пользователь не авторизован', 401);
            }
            
            $decoded = JWT::decode($_POST['access_token'], new Key($conf["private_key"], 'HS256'));
            

            http_response_code(200);
            echo json_encode(["access_token" => $_POST['access_token'], "refresh_token" => $_POST['refresh_token']]);
        }
        catch(Exception $e){



            if($e->getMessage() == 'Expired token'){
                try{
                    $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
                    
                    $checkRefresh = mysqli_query($connect, "SELECT auth_refresh FROM Auth WHERE auth_refresh = '$_POST[refresh_token]'");
                
                    if(mysqli_num_rows($checkRefresh) == 0){
                        throw new Exception('Пользователь не авторизован', 401);
                    }

                    $refreshDecode = JWT::decode($_POST['refresh_token'], new Key($conf["private_key"], 'HS256'));

                    $token = [
                        "iss" => "http://fcgoodod.beget.tech",
                        "aud" => "http://fcgoodod.beget.tech",
                        "iat" => 1356999524,
                        "nbf" => 1357000000,
                        "exp" => time() + 3600,
                    ];
                    $newAccess = JWT::encode($token, $conf["private_key"], 'HS256');
                    
                    


                    $data = [
                        "iss" => "http://fcgoodod.beget.tech",
                        "aud" => "http://fcgoodod.beget.tech",
                        "iat" => 1356999524,
                        "nbf" => 1357000000,
                        "exp" => time() + 3600 * 24,
                        "data" => [
                            "user_id" => $refreshDecode->data->user_id
                        ]
                    ];
                    $newRefresh = JWT::encode($data, $conf["private_key"], 'HS256');
                    
                    mysqli_query($connect, "UPDATE Auth SET auth_refresh = '$newRefresh' WHERE auth_refresh = '$_POST[refresh_token]'");
                    mysqli_close($connect);
                    http_response_code(200);
                    echo json_encode(["access_token" => $newAccess, "refresh_token" => $newRefresh]);
                }
                catch(Exception $errRefresh){

                    if($errRefresh->getMessage() == 'Expired token'){
                        $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
                        mysqli_query($connect, "DELETE FROM Auth WHERE auth_refresh = '$_POST[refresh_token]'");
                        mysqli_close($connect);
                        http_response_code(401);
                        echo json_encode(["status" => 401, "message" => "Пользователь не авторизован"], JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        http_response_code($errRefresh->getCode());
                        echo json_encode(["status" => $errRefresh->getCode(), "message" => $errRefresh->getMessage()], JSON_UNESCAPED_UNICODE);
                    }
                    
                }
            
            }
            else{
                http_response_code(401);
                echo json_encode(["status" => 401, "message" => "Отказано в доступе"], JSON_UNESCAPED_UNICODE);
            }
        }


    }
}


$url = preg_split("/(\/)/", $_REQUEST['uri']);

switch($url[0]){
    case 'login': 
        Auth::login();
        break;
    case 'checkAuth': 
        Auth::checkAuth();
        break;
    case 'logout': 
        Auth::logout();
        break;
}