import { createStore } from 'vuex';

import axios from 'axios';

import { AreaPermit, AreaPermitZone, GraphQLResponse } from './types';

function submitQuery<T>(query: unknown) {
  return axios
    .post<GraphQLResponse<T>>('http://localhost:4000/graphql', query, {
      headers: {
        'content-type': 'application/json'
      }
    })
    .catch(() => {
      console.error('Error querying GraphQL server');
      throw Error();
    });
}

export default createStore<{
  loading: boolean;
  zones: Array<AreaPermitZone>;
  permit?: AreaPermit;
}>({
  state: {
    loading: false,
    zones: new Array<AreaPermitZone>(),
    permit: undefined
  },
  mutations: {
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setZones(state, zones: Array<never>) {
      state.zones = zones;
    },
    setPermit(state, permit: AreaPermit) {
      state.permit = permit;
    }
  },
  actions: {
    async retrieveZones({ state, commit }) {
      if (!state.zones.length) {
        const res = await submitQuery<{ areaPermitZone: AreaPermitZone }>({
          query: '{ areaPermitZone { value, text } }'
        });

        commit('setZones', res.data.data?.areaPermitZone);
      }
    },
    async searchLicense({ commit }, { licensePlate, zone }) {
      commit('setLoading', true);
      commit('setPermit', null);

      const res = await submitQuery<{ areaPermit: AreaPermit }>({
        query: `{ areaPermit(licensePlate:"${licensePlate}", zone:"${zone}") {
          licensePlate, zone { value, text }, isValid
        } }`
      });

      commit('setLoading', false);
      commit('setPermit', res.data.data?.areaPermit);
    }
  },
  modules: {}
});
