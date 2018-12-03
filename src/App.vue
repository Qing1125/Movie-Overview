<template>
  <v-app id="inspire">
   <v-navigation-drawer
    stateless
    app
    value="true"
    >
      <MovieList/>
    </v-navigation-drawer>
    <v-content>
        <v-container fluid fill-height>
          <v-layout >
            <v-flex>
              <MovieDetail/>
            </v-flex>
          </v-layout>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
export default {
  name: "App",
  components: {
    MovieList,
    MovieDetail
  },
  data() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
