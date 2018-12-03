import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    movieList: [],
    selectedMovie: {},
    pageNum: 1,
    searchKey: 'All'
  },

  mutations: {
    initMovieList(state, payload) {
      state.movieList = payload
    },

    setSelectedMovie(state, payload) {
      state.selectedMovie = payload
    },

    setSearchKey(state, payload) {
      state.searchKey = payload
    },

    setPageNum(state, payload) {
      state.pageNum = payload
    }
  },

  actions: {
    fetchMovieList({ commit, state }) {
      if(Object.keys(state.selectedMovie).length !=0)
        commit('setSelectedMovie', {}) //clear selected movie
      
      axios.get('http://www.omdbapi.com/?apikey=767b8f5f&', {
        params: {
          s: state.searchKey,
          page: state.pageNum
        }
      })
        .then(function (response) {
          commit('initMovieList', response.data)
        });
    },

    setSelectedMovie({ commit }, payload) {
      axios.get('http://www.omdbapi.com/?apikey=767b8f5f&', {
        params: {
          i: payload.imdbID,
          plot: 'full'
        }
      })
        .then(function (response) {
          commit('setSelectedMovie', response.data)
        });
    },

    setSearchKey({ commit, dispatch }, payload) {
      commit('setSearchKey', payload)
      commit('setPageNum', 1) //reset page number
      dispatch('fetchMovieList')
    },

    resetSearchKey({commit, dispatch}) {
      commit('setSearchKey', 'All')
      commit('setPageNum', 1) //reset page number
      dispatch('fetchMovieList')
    },

    setPageNum({ commit, dispatch }, payload) {
      commit('setPageNum', payload)
      dispatch('fetchMovieList')
    }
  }
})
