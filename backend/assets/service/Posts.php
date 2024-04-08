<?php
include_once "Auth.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

ini_set('display', 'on');
error_reporting(E_ALL);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

class Post{
    
    static function add(){
        
        try{

            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            mysqli_set_charset($connect,'utf8mb4');
            

            if(!isset($_POST['access_token'])){
                throw new Exception('Упс... Вы не авторизованны', 403);
            }

            if(!Auth::isAuth($_POST['access_token'])){
                
                throw new Exception('Упс... Вы не авторизованны', 403);
            }
        
            

            
            
            $path = preg_split('/(service)/', __DIR__);
            
            $random = $_POST['title'];
            $content = mysqli_real_escape_string($connect, $_POST['content']);

            if(isset($_FILES['files'])){


                // var_dump($_FILES);
                // foreach($_FILES['files'] as $file){
                //     var_dump($file);
                // }
                
                $dir = "$path[0]/posts/$random";
                $uploadedFiles = [];
                $errors = [];
                if (!file_exists($dir)) {
                    mkdir($dir, 0777, true);
                    foreach ($_FILES['files']['tmp_name'] as $key => $temp) {
                        $name = basename($_FILES['files']['name'][$key]);
                        $target_path = $dir . "/" .$name;
                        move_uploaded_file($temp, $target_path);
                    }


  
                    

                    mysqli_query($connect, "INSERT INTO Posts (`post_title`,`post_content`, `post_directory`) VALUES ('$random', '$content','$random')");

                }
                else{
                    throw new Exception('Пост существует', 400);
                }
    
                
                
            

               
            }
            else{
                

                mysqli_query($connect, "INSERT INTO Posts (`post_title`,`post_content`, `post_directory`) VALUES ('$random', '$content','$random')");
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

    static function getPostList(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);


            $result = mysqli_query($connect, "SELECT post_id, post_title FROM Posts");

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
    static function getPostListPreview(){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $path = preg_split('/(service)/', __DIR__);

            $result = mysqli_query($connect, "SELECT post_id, post_title FROM Posts ORDER BY post_id DESC LIMIT 4");
            $previews = [];
            if(mysqli_num_rows($result) == 0){
                throw new Error('Посты отсутствуют', 404);
            }
            $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
            foreach($result as $post){
                $dir = "$path[0]/posts/$post[post_title]";
                $thisPost = ["post_id" => $post['post_id'], "post_title" => $post['post_title'], "post_prev" => "" ];
                if(file_exists($dir)){
                    $thisDir = scandir($dir);
                    $thisDir = array_diff($thisDir, ['.', '..']);
                    $thisPost["post_prev"] = "posts/$post[post_title]/$thisDir[2]";
                }
                
                $previews[] = $thisPost;
            }
            
            
            mysqli_close($connect);
            http_response_code(200);
            echo json_encode($previews, JSON_UNESCAPED_UNICODE);

          
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()]);
        }
    }
    static function getPostById($id){
        try{
            require_once 'connection.php';
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $connect->set_charset('utf8mb4');
            $request = mysqli_query($connect, "SELECT * FROM Posts WHERE post_id = $id");
            $path = preg_split('/(service)/', __DIR__);
            $dir = "$path[0]/posts";

            if(mysqli_num_rows($request) == 0){
                throw new Exception('Пост не найден', 404);
            }
            $request = mysqli_fetch_assoc($request);
            
            


            mysqli_close($connect);
            http_response_code(200);
            echo json_encode($request, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code($e->getCode());
            echo json_encode(["status" => $e->getCode(), "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
    static function allPosts(){
        try{
            require_once 'connection.php';
            $path = preg_split('/(service)/', __DIR__);
            $hostname = "http:/localhost/assets/posts";

            $dir = "$path[0]/posts";
            $result = scandir($dir);
            $result = array_diff($result, ['.', '..', '.htaccess']);

            $postAlbum = [];
            
            $connect = mysqli_connect($con["host"], $con["user"], $con["password"], $con["db"]);
            $connect->set_charset('utf8mb4');
            $request = mysqli_query($connect, "SELECT * FROM Posts");

            if(mysqli_num_rows($request) == 0){
                throw new Exception('Постов не найдено', 404);
            }
            $request = mysqli_fetch_all($request, MYSQLI_ASSOC);


            foreach($request as $post){

                if(file_exists($dir."/$post[post_title]")){
                    if(is_dir($dir."/$post[post_title]")){
                        $thisDir = scandir($dir."/$post[post_title]");
                        $thisDir = array_diff($thisDir, ['.', '..']);
    
                        $thisAlbum = ["post_id" => $post['post_id'], "name" => $post['post_title'], 'content' => $post['post_content'], "path" => []];
                        
                        foreach($thisDir as $key => $filename){
                            $thisAlbum['path'][] = "/$post[post_title]"."/$filename";
                        }
                        $postAlbum[] = $thisAlbum;
                    }
                }
                

                
            }
            http_response_code(200);
            echo json_encode($postAlbum, JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e){
            http_response_code(500);
            echo json_encode(["status" => $e->getCode(), 'message' => $e->getMessage()]);
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

        
            $post = mysqli_query($connect, "SELECT post_directory FROM Posts WHERE post_id = '$_POST[post_id]'");

            if(mysqli_num_rows($post) == 0){
                throw new Exception('Статьи не существует', 404);
            }
            $post = mysqli_fetch_assoc($post);
            $path = preg_split('/(service)/', __DIR__);

            $dir = "$path[0]/posts/$post[post_directory]";

            if(!file_exists($dir)){
                mysqli_query($connect, "DELETE FROM Posts WHERE post_id = '$_POST[post_id]'");
                throw new Exception('Статьи не существует (папка)', 404);
                
            }
            else{
                $scanning = scandir($dir);
                $currentDirectory = array_diff($scanning, ['.', '..', '.htaccess']);
    
                foreach($currentDirectory as $file){

                    unlink($dir."/$file");
                }
                
                rmdir($dir);
                mysqli_query($connect, "DELETE FROM Posts WHERE post_id = '$_POST[post_id]'");
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
    case 'postAdd': 
        Post::add();
        break;
    case 'allPosts': 
        Post::allPosts();
        break;
    case 'postList': 
        Post::getPostList();
        break;
    case 'post': 
        Post::getPostById($url[1]);
        break;
    case 'deletePost': 
        Post::delete();
        break;
    case 'postListPrev':
        Post::getPostListPreview();
        break;
}
