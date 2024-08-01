<?php
include_once "encabezado.php";
include_once "funciones.php";
$host = "killabar.com";
$usuario = "killabar_cristhian";
$password = "cristian2305:v";

$conexion = new PDO("mysql:host=$host", $usuario, $password);
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conexion->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
$conexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$sentencia  = $conexion->query("SELECT COUNT(*) AS resultado FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'killabar_botanero_ventas'");
$resultado = $sentencia->fetchAll();
$conexion = null;
echo json_encode($resultado[0]);