<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
header('Access-Control-Allow-Credentials: true');

include_once "encabezado.php";

// Para manejar la solicitud OPTIONS que envían los navegadores en las solicitudes CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$venta = json_decode(file_get_contents("php://input"));
if (!$venta) {
    http_response_code(400); // Cambiado a 400 porque 500 implica un error del servidor, no del cliente
    echo json_encode(["error" => "No se recibieron los datos correctamente"]);
    exit;
}

include_once "funciones.php";

$resultado = registrarVenta($venta);
echo json_encode($resultado);
?>
