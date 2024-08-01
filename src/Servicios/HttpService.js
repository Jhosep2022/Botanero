const RUTA_GLOBAL = "https://killabar.com/botanero-ventas/api/"

const HttpService = {
  async registrar(datos, ruta) {
      console.log("Registrando datos en:", RUTA_GLOBAL + ruta, "con datos:", datos);
      const respuesta = await fetch(RUTA_GLOBAL + ruta, {
          method: "post",
          body: JSON.stringify(datos),
      });
      console.log("Respuesta del servidor:", respuesta);
      let resultado = await respuesta.json();
      console.log("Resultado de la operación:", resultado);
      return resultado;
  },

  async obtenerConDatos(datos, ruta) {
      console.log("Obteniendo datos de:", RUTA_GLOBAL + ruta, "con datos:", datos);
      const respuesta = await fetch(RUTA_GLOBAL + ruta, {
          method: "post",
          body: JSON.stringify(datos),
      });
      let resultado = await respuesta.json();
      console.log("Datos obtenidos:", resultado);
      return resultado;
  },

  async obtener(ruta) {
      console.log("Obteniendo datos de:", RUTA_GLOBAL + ruta);
      let respuesta = await fetch(RUTA_GLOBAL + ruta);
      let datos = await respuesta.json();
      console.log("Datos obtenidos:", datos);
      return datos;
  },

  async eliminar(ruta, id) {
    console.log("Eliminando recurso en:", RUTA_GLOBAL + ruta, "con ID:", id);
    try {
        const respuesta = await fetch(RUTA_GLOBAL + ruta, {
            method: "post",
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            console.error(`Error HTTP: ${respuesta.status}`);
            console.error(`Error detalle: ${errorText}`);
            return null;
        }
        let resultado = await respuesta.json();
        console.log("Resultado de eliminar:", resultado);
        return resultado;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}
}

export default HttpService

