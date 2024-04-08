<?php
include_once "Auth.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

ini_set('display', 'on');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class Comments{
    
    static function add(){
        
        try{

            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);

        
            
            

            
            $path = preg_split('/(service)/', __DIR__);
            

            if(isset($_FILES['photos'])){


                // var_dump($_FILES);
                // foreach($_FILES['files'] as $file){
                //     var_dump($file);
                // }
                $random = $_POST['name'] . $_POST['stamp'];
                $dir = "$path[0]/comments_md/$random";

                if (!file_exists($dir)) {
                    mkdir($dir, 0777, true);
                    foreach ($_FILES['photos']['tmp_name'] as $key => $temp) {
                        $name = basename($_FILES['photos']['name'][$key]);
                        $target_path = $dir . "/" .$name;
                        move_uploaded_file($temp, $target_path);
                    }


                    $content = mysqli_real_escape_string($connect, $_POST['content']);
                    mysqli_query($connect, "INSERT INTO Comments_MD (`comment_user`,`comment_user_role`,`comment_desc`, `comment_directory`, `comment_stamp`) VALUES ('$_POST[name]','$_POST[role]', '$content', '$random', '$_POST[stamp]')");

                }
                else{
                    throw new Exception('Комментарий существует', 400);
                }
    
                
                

            

               
            }
            else{
                throw new Exception('Комментарий должен содержать 1 фото', 400);
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



    static function allComments(){
        try{
            require_once 'connection.php';
            $path = preg_split('/(service)/', __DIR__);
            $hostname = "http:/localhost/assets/posts";

            $dir = "$path[0]/comments";
            $result = scandir($dir);
            $result = array_diff($result, ['.', '..', '.htaccess']);

            $postAlbum = [];
            
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $request = mysqli_query($connect, "SELECT * FROM Comments ORDER BY comment_stamp DESC");

            if(mysqli_num_rows($request) == 0){
                throw new Exception('Отзывов не найдено', 404);
            }
            $request = mysqli_fetch_all($request, MYSQLI_ASSOC);


            foreach($request as $post){

                if(file_exists($dir."/$post[comment_directory]")){
                    if(is_dir($dir."/$post[comment_directory]")){
                        $thisDir = scandir($dir."/$post[comment_directory]");
                        $thisDir = array_diff($thisDir, ['.', '..']);
    
                        $thisAlbum = ["comment_id" => $post['comment_id'], "user" => $post['comment_user'], 'content' => $post['comment_desc'],"role" => $post['comment_user_role'], "stamp" => $post['comment_stamp'],  "path" => []];
                        
                        foreach($thisDir as $key => $filename){
                            $thisAlbum['path'][] = "/$post[comment_directory]"."/$filename";
                        }
                        $postAlbum[] = $thisAlbum;
                    }
                }
                

                
            }
            http_response_code(200);
            echo json_encode($postAlbum, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
    
    static function allCommentsMd(){
        try{
            require_once 'connection.php';
            $path = preg_split('/(service)/', __DIR__);
            $hostname = "http:/localhost/assets/posts";

            $dir = "$path[0]/comments_md";
            $result = scandir($dir);
            $result = array_diff($result, ['.', '..', '.htaccess']);

            $postAlbum = [];
            
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $request = mysqli_query($connect, "SELECT * FROM Comments_MD ORDER BY comment_stamp DESC");

            if(mysqli_num_rows($request) == 0){
                throw new Exception('Отзывов не найдено', 404);
            }
            $request = mysqli_fetch_all($request, MYSQLI_ASSOC);


            foreach($request as $post){

                if(file_exists($dir."/$post[comment_directory]")){
                    if(is_dir($dir."/$post[comment_directory]")){
                        $thisDir = scandir($dir."/$post[comment_directory]");
                        $thisDir = array_diff($thisDir, ['.', '..']);
    
                        $thisAlbum = ["comment_id" => $post['comment_id'], "user" => $post['comment_user'], 'content' => $post['comment_desc'],"role" => $post['comment_user_role'], "stamp" => $post['comment_stamp'],  "path" => []];
                        
                        foreach($thisDir as $key => $filename){
                            $thisAlbum['path'][] = "/$post[comment_directory]"."/$filename";
                        }
                        $postAlbum[] = $thisAlbum;
                    }
                }
                

                
            }
            http_response_code(200);
            echo json_encode($postAlbum, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
    
    static function lastComment(){
        try{
            require_once 'connection.php';
            $path = preg_split('/(service)/', __DIR__);
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $commentLast = mysqli_query($connect, "SELECT * FROM `Comments` ORDER BY comment_id DESC LIMIT 1");
            
            $commentLast = mysqli_fetch_assoc($commentLast);
            
            $dir = "$path[0]/comments/$commentLast[comment_directory]";
            
            if(file_exists($dir)){

                $thisDir = scandir($dir);
                $thisDir = array_diff($thisDir, ['.', '..']);
                $commentLast['path'] = "/comments/$commentLast[comment_directory]/$thisDir[2]";
                
            }
            
            
            http_response_code(200);
            echo json_encode($commentLast, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
    static function accept(){
        
        try{
            if(!isset($_POST['access_token'])){
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            if(!Auth::isAuth($_POST['access_token'])){
                
                throw new Exception('Упс... Вы не авторизованны', 403);
            }
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $comment = mysqli_query($connect, "SELECT * FROM Comments_MD WHERE comment_id = '$_POST[comment_id]'");
            if(mysqli_num_rows($comment) == 0){
                throw new Exception('Комментария не существует', 404);
            }
            $comment = mysqli_fetch_assoc($comment);
            $path = preg_split('/(service)/', __DIR__);
            
            $dir = "$path[0]/comments_md/$comment[comment_directory]";
            $newDir = "$path[0]/comments/$comment[comment_directory]";
            if(file_exists($dir)){
                rename($dir, $newDir);
                mysqli_query($connect, "INSERT INTO Comments (`comment_user`,`comment_user_role`,`comment_desc`, `comment_directory`, `comment_stamp`) VALUES ('$comment[comment_user]','$comment[comment_user_role]', '$comment[comment_desc]', '$comment[comment_directory]', '$comment[comment_stamp]')");
                mysqli_query($connect, "DELETE FROM Comments_MD WHERE comment_id = $_POST[comment_id]");
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
    static function delete(){
        
        try{
            if(!isset($_POST['access_token'])){
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            if(!Auth::isAuth($_POST['access_token'])){
                
                throw new Exception('Упс... Вы не авторизованны', 403);
            }
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);


            $comment = mysqli_query($connect, "SELECT comment_directory FROM Comments_MD WHERE comment_id = '$_POST[comment_id]'");

            if(mysqli_num_rows($comment) == 0){
                throw new Exception('Комментария не существует', 404);
            }
            $comment = mysqli_fetch_assoc($comment);
            $path = preg_split('/(service)/', __DIR__);

            $dir = "$path[0]/comments_md/$comment[comment_directory]";

            if(!file_exists($dir)){
                mysqli_query($connect, "DELETE FROM Comments_MD WHERE comment_id = $_POST[comment_id]");
                throw new Exception('Комментария не существует (папка)', 404);
                
            }
            else{
                $scanning = scandir($dir);
                $currentDirectory = array_diff($scanning, ['.', '..', '.htaccess']);
    
                foreach($currentDirectory as $file){

                    unlink($dir."/$file");
                }
                
                rmdir($dir);
                mysqli_query($connect, "DELETE FROM Comments_MD WHERE comment_id = $_POST[comment_id]");
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
    case 'commentCreate': 
        Comments::add();
        break;
    case 'allComments': 
        Comments::allComments();
        break;
        
    case 'lastComment': 
        Comments::lastComment();
        break;
    case 'allCommentsMd':
        Comments::allCommentsMd();
        break;
    case 'acceptComment': 
        Comments::accept();
        break;
    case 'deleteComment': 
        Comments::delete();
        break;
;

    
}
