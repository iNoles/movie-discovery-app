<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Movie, MovieDetails } from "../types";
import MovieCard from "./MovieCard.vue";

export default defineComponent({
  name: "MovieList",

  components: { MovieCard },

  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
    movieDetails: {
      type: Object as PropType<Record<string, MovieDetails>>,
      required: true,
    },
  },

  emits: ["movie-click", "load-details"],
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5"
    role="list"
  >
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      :details="movieDetails[movie.imdbID] || null"
      @click="$emit('movie-click', movie.imdbID)"
      @load-details="$emit('load-details', movie.imdbID)"
    />
  </div>
</template>
