<template>
    <v-container grid-list-md v-if="Object.keys(selectedMovie).length != 0">
        <v-layout row wrap>
            <v-flex xs6>
                <v-card flat>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{selectedMovie.Title}}</h3>
                            <div>{{selectedMovie.Genre}}</div>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        {{selectedMovie.Plot}}
                    </v-card-text>
                    <v-card-text>
                        <strong>Language: </strong>{{selectedMovie.Language}} <br/>
                        <strong>Director: </strong>{{selectedMovie.Director}} <br/>
                        <strong>Actors: </strong>{{selectedMovie.Actors}} <br/>
                        <strong>Duration: </strong>{{selectedMovie.Runtime}} <br/>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card flat>
                    <v-img v-if="selectedMovie.Poster!='N/A'"
                    :src="selectedMovie.Poster"
                    :lazy-src="selectedMovie.Poster"
                    aspect-ratio="0.5"
                    :max-height= 650
                    :max-width= 500
                    ></v-img>
                    <v-card-title v-else>No poster available</v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState(["selectedMovie"])
  }
};
</script>

<style>
</style>