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
        console.error(error);
      } finally {
        this.cargando = false;
      }
    },
    async cancelarOrden(id) {
      this.cargando = true;
      try {
        await HttpService.eliminar('cancelar_mesa.php', id);
        this.fetchMesas();
      } catch (error) {
        console.error(error);
      } finally {
        this.cargando = false;
      }
    },
    async updateMesa(payload) {
      this.cargando = true;
      try {
        await HttpService.actualizar('update_mesa.php', payload);
        this.fetchMesas();
      } catch (error) {
        console.error(error);
      } finally {
        this.cargando = false;
      }
    },
    async registrarVenta(payload) {
      this.cargando = true;
      try {
        const registrado = await HttpService.registrar(payload, "registrar_venta.php");
        if (registrado) {
          return true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.cargando = false;
      }
      return false;
    }
  },
});
