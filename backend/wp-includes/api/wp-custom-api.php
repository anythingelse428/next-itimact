<?php

add_action('rest_api_init', 'create_custom_endpoint');

function create_custom_endpoint()
{
  register_rest_route(
    'wp/v2',
    '/load-avatar',
    array(
      'methods' => 'POST',
      'callback' => 'load_avatar',
    )
  );
  register_rest_route(
    'wp/v2',
    '/load-feature',
    array(
      'methods' => 'POST',
      'callback' => 'load_feature',
    )
  );
}


function load_avatar(WP_REST_Request $request)
{
  $content = uploadMedia($request, 'avatars');
  return $content['url'];
}
function load_feature(WP_REST_Request $request)
{
  $content = uploadMedia($request, 'features');
  return $content['url'];
}






function generateRandomString($length = 10)
{
  $characters = '012QRS789abcdefghABCDpqrstuEFGHIijklmnovTUV3456wxyzJKLMNOPWXYZ_';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[random_int(0, $charactersLength - 1)];
  }
  return $randomString;
}
function uploadMedia($request, $path)
{
  $tmp_name = $request->get_file_params()["selectedFile"]["tmp_name"];
  $name = $request->get_file_params()["selectedFile"]["name"];
  $upload_dir = str_replace('index.php', '', $_SERVER['SCRIPT_FILENAME']) . 'wp-content/uploads/' . $path;
  $file_name = str_replace(' ', '_', '[prefix__' . generateRandomString() . ']' . $name);
  $upload = wp_upload_bits($file_name, null, file_get_contents($tmp_name));
  copy($upload['file'], $upload_dir . "/" . $file_name);
  unlink($upload['file']);
  return ['url' => str_replace('wp-json/', '', rest_url()) . 'wp-content/uploads/' . $path . '/' . $file_name, 'name' => $file_name];
}
?>