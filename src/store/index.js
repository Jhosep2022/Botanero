// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import HttpService from '../Servicios/HttpService'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mesas: []
    },
    mutations: {
        setMesas(state, mesas) {
            state.mesas = mesas;
        },
        updateMesa(state, mesaActualizada) {
            const index = state.mesas.findIndex(mesa => mesa.mesa.idMesa === mesaActualizada.mesa.idMesa);
            if (index !== -1) {
                Vue.set(state.mesas, index, mesaActualizada);
            } else {
                state.mesas.push(mesaActualizada);
            }
        }
    },
    actions: {
        fetchMesas({ commit }) {
            HttpService.obtener("obtener_mesas.php").then(mesas => {
                commit('setMesas', mesas);
            });
        },
        updateMesa({ commit }, mesa) {
            HttpService.registrar(mesa, "editar_mesa.php").then(resultado => {
                if (resultado) {
                    commit('updateMesa', mesa);
                }
            });
        }
    }
});
