<?php
include_once "encabezado.php";

$idMesa = json_decode(file_get_contents("php://input"))->id ?? null;

if (!$idMesa) {
    error_log("Invalid input: ID not provided or not valid JSON.");
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

include_once "funciones.php";

try {
    error_log("Attempting to cancel mesa with ID: " . $idMesa);
    $resultado = cancelarMesa($idMesa);
    if ($resultado === false) {
        throw new Exception("Error canceling order");
    } else {
        echo json_encode($resultado);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => $e->getMessage()]);
}
?>
