<?php 
   

class Route {

    private function simpleRoute($file, $route){

        
        //replacing first and last forward slashes
        // $_REQUEST['uri'] will be empty if req uri is /

        if(!empty($_REQUEST['uri'])){
            $route = preg_replace("/(^\/)|(\/$)/","",$route);
            $reqUri =  preg_replace("/(^\/)|(\/$)/","",$_REQUEST['uri']);
        }else{
            $reqUri = "/";
        }

        if($reqUri == $route){
            $params = [];
            include $file;
            exit();

        }

    }

    function add($route,$file){

        //will store all the parameters value in this array
        $params = [];

        //will store all the parameters names in this array
        $paramKey = [];

        //finding if there is any {?} parameter in $route
        preg_match_all("/(?<={).+?(?=})/", $route, $paramMatches);

        //if the route does not contain any param call simpleRoute();
        if(empty($paramMatches[0])){
            $this->simpleRoute($file,$route);
            return;
        }

        //setting parameters names
        foreach($paramMatches[0] as $key){
            $paramKey[] = $key;
        }

        
        //replacing first and last forward slashes
        //$_REQUEST['uri'] will be empty if req uri is /

        if(!empty($_REQUEST['uri'])){
            $route = preg_replace("/(^\/)|(\/$)/","",$route);
            $reqUri =  preg_replace("/(^\/)|(\/$)/","",$_REQUEST['uri']);
        }else{
            $reqUri = "/";
        }

        //exploding route address
        $uri = explode("/", $route);

        //will store index number where {?} parameter is required in the $route 
        $indexNum = []; 

        //storing index number, where {?} parameter is required with the help of regex
        foreach($uri as $index => $param){
            if(preg_match("/{.*}/", $param)){
                $indexNum[] = $index;
            }
        }

        //exploding request uri string to array to get
        //the exact index number value of parameter from $_REQUEST['uri']
        $reqUri = explode("/", $reqUri);

        //running for each loop to set the exact index number with reg expression
        //this will help in matching route
        foreach($indexNum as $key => $index){

                //in case if req uri with param index is empty then return
            //because url is not valid for this route
            if(empty($reqUri[$index])){
                return;
            }

            //setting params with params names
            $params[$paramKey[$key]] = $reqUri[$index];

            //this is to create a regex for comparing route address
            $reqUri[$index] = "{.*}";
        }

        //converting array to sting
        $reqUri = implode("/",$reqUri);

        //replace all / with \/ for reg expression
        //regex to match route is ready !
        $reqUri = str_replace("/", '\\/', $reqUri);

        //now matching route with regex
        if(preg_match("/$reqUri/", $route))
        {
            include $file;
            exit();

        }
    }

    function notFound($file){
        include $file;
        exit();
    }
}
 
    $router = new Route();



    $router->add('/sendDataUser', './assets/service/UserService.php');
    $router->add('/addTraining', './assets/service/UserService.php');
    $router->add('/addUniform', './assets/service/UserService.php');
    $router->add('/unsubMail', './assets/service/UserService.php');
    
    $router->add('/login', './assets/service/Auth.php');
    $router->add('/checkAuth', './assets/service/Auth.php');
    $router->add('/logout', './assets/service/Auth.php');

    $router->add('/eventAdd', './assets/service/Events.php');
    $router->add('/allEvents', './assets/service/Events.php');
    $router->add('/deleteEvent', './assets/service/Events.php');

    $router->add('/albumAdd', './assets/service/Albums.php');
    $router->add('/allAlbums', './assets/service/Albums.php');
    $router->add('/albumsList', './assets/service/Albums.php');
    $router->add('/album/{id}', './assets/service/Albums.php');
    $router->add('/deleteAlb', './assets/service/Albums.php');

    $router->add('/postAdd', './assets/service/Posts.php');
    $router->add('/postListPrev', './assets/service/Posts.php');
    $router->add('/postList', './assets/service/Posts.php');
    $router->add('/allPosts', './assets/service/Posts.php');
    $router->add('/post/{id}', './assets/service/Posts.php');
    $router->add('/deletePost', './assets/service/Posts.php');

    $router->add('/serviceAdd', './assets/service/Service.php');
    $router->add('/changeServiceById', './assets/service/Service.php');
    $router->add('/serviceList', './assets/service/Service.php');
    $router->add('/allServices', './assets/service/Service.php');
    $router->add('/serviceById/{id}', './assets/service/Service.php');
    $router->add('/serviceDelete', './assets/service/Service.php');
    $router->add('/customers', './assets/service/Doc.php');
    
    


    $router->add('/commentCreate', './assets/service/Comments.php');
    $router->add('/acceptComment', './assets/service/Comments.php');
    $router->add('/deleteComment', './assets/service/Comments.php');
    $router->add('/allComments', './assets/service/Comments.php');
    $router->add('/allCommentsMd', './assets/service/Comments.php');
    $router->add('/lastComment', './assets/service/Comments.php');
    

    $router->add('/{something}', './assets/service/NotFound.php');





