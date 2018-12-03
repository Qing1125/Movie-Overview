<template>
    <v-card>
        <v-toolbar color="blue" dark>
            <v-text-field
                v-model="text"
                placeholder="Search"
                append-outer-icon="search"
                @click:append-outer="onSearchKeyChanged"
                @click:clear="resetSearchKey"
                clearable
            >
            </v-text-field>
        </v-toolbar>
    
        <v-list two-line v-if="movieList.Response == 'True'">
            <template v-for="(item, index) in items">
                <v-list-tile
                    :key="item.imdbID"
                    avatar
                    ripple
                    @click="onSelectMovie(item)"
                >
                <v-list-tile-content>
                    <v-list-tile-title>{{item.Title}}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-icon v-if="(selectedMovie && selectedMovie.imdbID == item.imdbID)" color="yellow darken-2">
                    star
                    </v-icon>
                    <v-icon v-else color="grey lighten-1">
                    star_border
                    </v-icon>
                    <v-list-tile-action-text>{{item.Year}}</v-list-tile-action-text>
                </v-list-tile-action>
                </v-list-tile>
                <v-divider :key="index"></v-divider>
            </template>

            <div class="text-xs-center" v-if="total>10" >
                <v-chip small outline>Total: {{total}}</v-chip><br/>
                <v-pagination 
                    circle
                    :value="pageNum"
                    :length="Math.ceil(total/10)"
                    :total-visible = "5"
                    @input="onPageNumChange"
                ></v-pagination>
            </div>
        </v-list>

        <div v-else>
            <v-card-text>{{movieList.Error}}</v-card-text>
        </div>
    </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    text: ""
  }),
  computed: {
    ...mapState(["movieList", "selectedMovie", "searchKey", "pageNum"]),
    items() {
      return this.movieList.Search;
    },
    total() {
      return this.movieList.totalResults;
    }
  },
  watch: {
      text(val){
          if(val == "")
            this.$store.dispatch('resetSearchKey')
      }
  },
  methods: {
    onSelectMovie(item) {
        this.selectedId = item.imdbID;
        this.$store.dispatch("setSelectedMovie", item);
    },
    onPageNumChange(pageNum) {
        this.$store.dispatch("setPageNum", pageNum);
    },
    onSearchKeyChanged() {
        this.$store.dispatch('setSearchKey', this.text)
    },
    resetSearchKey() {
        this.text = ""
        this.$store.dispatch('resetSearchKey')
    }
  },
  created() {
    this.$store.dispatch("fetchMovieList");
  }
};
</script>

<style>
.v-list {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
