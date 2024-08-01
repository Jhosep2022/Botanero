import { defineStore } from 'pinia';
import HttpService from '../Servicios/HttpService';

export const useMesasStore = defineStore('mesas', {
  state: () => ({
    mesas: [],
    cargando: false,
  }),
  actions: {
    async fetchMesas() {
      this.cargando = true;
      try {
        const data = await HttpService.obtener('fetch_mesas.php');
        this.mesas = data;
      } catch (error) {
        console.error("Error fetching mesas:", error);
      } finally {
        this.cargando = false;
      }
    },
    async cancelarOrden(id) {
      this.cargando = true;
      try {
        const resultado = await HttpService.eliminar('cancelar_mesa.php', id);
        if (resultado && resultado.success) {
          this.fetchMesas();
        } else {
          console.error("Error cancelando la orden:", resultado ? resultado.message : "Error desconocido");
        }
      } catch (error) {
        console.error("Error cancelando la orden:", error);
      } finally {
        this.cargando = false;
      }
    },
    async updateMesa(payload) {
      this.cargando = true;
      try {
        const resultado = await HttpService.actualizar('update_mesa.php', payload);
        if (resultado && resultado.success) {
          this.fetchMesas();
        } else {
          console.error("Error actualizando la mesa:", resultado ? resultado.message : "Error desconocido");
        }
      } catch (error) {
        console.error("Error actualizando la mesa:", error);
      } finally {
        this.cargando = false;
      }
    },
    async registrarVenta(payload) {
      this.cargando = true;
      try {
        const registrado = await HttpService.registrar(payload, "registrar_venta.php");
        if (registrado && registrado.success) {
          return true;
        } else {
          console.error("Error registrando la venta:", registrado ? registrado.message : "Error desconocido");
        }
      } catch (error) {
        console.error("Error registrando la venta:", error);
      } finally {
        this.cargando = false;
      }
      return false;
    }
  },
});
