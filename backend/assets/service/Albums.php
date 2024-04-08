<?php
include_once "Auth.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

ini_set('display', 'on');
error_reporting(E_ALL);
mb_internal_encoding('UTF-8');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class Albums{
    
    static function add(){
        
        try{

            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

            if(!isset($_POST['access_token'])){
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            if(!Auth::isAuth($_POST['access_token'])){
                
                throw new Exception('Упс... Вы не авторизованны', 403);
            }
            


            
            $path = preg_split('/(service)/', __DIR__);
            

            if(isset($_FILES['filesUpload'])){


                // var_dump($_FILES);
                // foreach($_FILES['files'] as $file){
                //     var_dump($file);
                // }
                $random = $_POST['name'];
                $dir = "$path[0]/albums/$random";
                $uploadedFiles = [];
                $errors = [];

                if (!file_exists($dir)) {
                    mkdir($dir, 0777, true);
                    foreach ($_FILES['filesUpload']['tmp_name'] as $key => $temp) {
                        $name = basename($_FILES['filesUpload']['name'][$key]);
                        $target_path = $dir . "/" .$name;
                        move_uploaded_file($temp, $target_path);
                    }
    
                    mysqli_query($connect, "INSERT INTO Albums (`album_name`) VALUES ('$random')");
    
                }
                else{
    
                    throw new Exception('Альбом существует', 400);
                }
    
                
                
            

               
            }
            else{
                 throw new Exception('Не возможно создать альбом. Фотографии отсутствуют', 400);
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

    static function getAlbumList(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);


            $result = mysqli_query($connect, "SELECT * FROM Albums");

            if(mysqli_num_rows($result) === 0){
                throw new Error('Альбомы отсутствуют', 404);
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
    static function getAlbumById($id){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $request = mysqli_query($connect, "SELECT * FROM Albums WHERE album_id = $id");
            
            $path = dirname(__DIR__); 
            $dir = "$path/albums/";

            if(mysqli_num_rows($request) == 0){
                throw new Exception('Альбом не найден', 404);
            }
            $request = mysqli_fetch_assoc($request);

           if(!file_exists($dir.$request['album_name'])){
               throw new Exception('Альбом не найден (папка)', 404);
           }
            $thisDir = scandir($dir."/$request[album_name]");
            $thisDir = array_diff($thisDir, ['.', '..']);

            $thisAlbum = ["album_id" => $request['album_id'], "name" => $request['album_name'], "path" => []];
            
            foreach($thisDir as $key => $filename){
                $thisAlbum['path'][] = "/$request[album_name]"."/$filename";
            }


            mysqli_close($connect);
            http_response_code(200);
            echo json_encode($thisAlbum, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
    static function allAlbums(){
        try{
            require_once 'connection.php';
            $path = preg_split('/(service)/', __DIR__);
            $hostname = "http:/localhost/assets/albums";
            
            $dir = "$path[0]/albums";
            $result = scandir($dir);
            $result = array_diff($result, ['.', '..', '.htaccess']);
            
            $albums = [];
            
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $request = mysqli_query($connect, "SELECT * FROM Albums");
            
            if(mysqli_num_rows($request) == 0){
                throw new Exception('Альбомов не найдено', 404);
            }
            $request = mysqli_fetch_all($request, MYSQLI_ASSOC);
            
            
            foreach($request as $album){
            
            
                if(is_dir($dir."/$album[album_name]")){
                    $thisDir = scandir($dir."/$album[album_name]");
                    $thisDir = array_diff($thisDir, ['.', '..']);
            
                    $thisAlbum = ["album_id" => $album['album_id'], "name" => $album['album_name'], "path" => ""];

                    $thisAlbum['path'] = "/$album[album_name]"."/$thisDir[2]";
                    $albums[] = $thisAlbum;
                }
            
                
            }

            http_response_code(200);
            echo json_encode($albums, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
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

            $album = mysqli_query($connect, "SELECT album_name FROM Albums WHERE album_id = '$_POST[album_id]'");

            if(mysqli_num_rows($album) == 0){
                throw new Exception('Альбома не существует', 404);
            }
            $album = mysqli_fetch_assoc($album);
            $path = preg_split('/(service)/', __DIR__);

            $dir = "$path[0]/albums/$album[album_name]";

            if(!file_exists($dir)){
                mysqli_query($connect, "DELETE FROM Albums WHERE album_id = $_POST[album_id]");
                throw new Exception('Альбома не существует (папка)', 404);
                
            }
            else{
                $scanning = scandir($dir);
                $currentDirectory = array_diff($scanning, ['.', '..', '.htaccess']);
    
                foreach($currentDirectory as $file){

                    unlink($dir."/$file");
                }
                
                rmdir($dir);
                mysqli_query($connect, "DELETE FROM Albums WHERE album_id = $_POST[album_id]");
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
}

$url = preg_split("/(\/)/", $_REQUEST['uri']);

switch($url[0]){
    case 'albumAdd': 
        Albums::add();
        break;
    case 'allAlbums': 
        Albums::allAlbums();
        break;
    case 'albumsList': 
        Albums::getAlbumList();
        break;
    case 'album': 
        Albums::getAlbumById($url[1]);
        break;
    case 'deleteAlb':
        Albums::delete();
        break;
}
