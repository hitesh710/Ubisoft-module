<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if(trim($request->data->title) === '')
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $title = mysqli_real_escape_string($con, trim($request->data->title));
  $description = mysqli_real_escape_string($con, trim($request->data->description));
  $date = mysqli_real_escape_string($con, trim($request->data->date));
  $imagePath = mysqli_real_escape_string($con, trim($request->data->imagePath));
  //$price = mysqli_real_escape_string($con, (int)$request->data->price);
    

  // Store.
  $sql = "INSERT INTO `products`(`id`,`title`,`description`,`imagePath`,`date`) VALUES (null,'{$title}','{$description}','{$imagePath}','{$date}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $car = [
      'title' => $title,
      'description' => $description,
      'imagePath' => $imagePath,
      'date' => $date,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$car]);
  }
  else
  {
    http_response_code(422);
  }
}