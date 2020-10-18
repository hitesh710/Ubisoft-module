<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$products = [];
$sql = "SELECT  description, title, imagePath FROM products";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $products[$cr]['description'] = $row['description'];
    $products[$cr]['title'] = $row['title'];
    $products[$cr]['imagePath'] = $row['imagePath'];
    $cr++;
  }
    
  echo json_encode(['data'=>$products]);
}
else
{
  http_response_code(404);
}