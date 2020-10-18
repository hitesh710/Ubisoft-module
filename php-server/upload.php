<?php 
// header('Content-Type: application/json; charset=utf-8');
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: PUT, GET, POST");



$response = array();
$upload_dir = 'images/';
$server_url = 'http://localhost';

if($_FILES['image'])
{
    $image_name = $_FILES["image"]["name"];
    $image_tmp_name = $_FILES["image"]["tmp_name"];
    $error = $_FILES["image"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = rand(1000,1000000)."-".$image_name;
        $upload_name = $upload_dir.$image_name;
        
        if(move_uploaded_file($image_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }



    

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}

echo json_encode($response);
?>