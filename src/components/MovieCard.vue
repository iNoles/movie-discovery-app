<script lang="ts">
import type { defineComponent, PropType, ref } from "vue";
import type { Movie, MovieDetails } from "../types";

export default defineComponent({
  name: "MovieCard",

  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
    details: {
      type: Object as PropType<MovieDetails | null>,
      default: null,
    },
  },

  emits: {
    click: (id: string) => typeof id === "string",
    "load-details": (id: string) => typeof id === "string",
  },

  setup(props, { emit }) {
    const expanded = ref(false);

    function toggle() {
      expanded.value = !expanded.value;

      if (expanded.value && !props.details) {
        emit("load-details", props.movie.imdbID);
      }
    }

    function posterSrc() {
      return props.movie.Poster === "N/A"
        ? "https://via.placeholder.com/80x120?text=No+Image"
        : props.movie.Poster;
    }

    return { expanded, toggle, posterSrc };
  },
});
</script>

<template>
  <div
    class="border rounded-lg bg-white shadow-md cursor-pointer overflow-hidden transition-all duration-300"
    @click="toggle"
  >
    <div class="flex items-center gap-4 p-4 hover:bg-gray-50">
      <img
        :src="posterSrc()"
        :alt="movie.Title"
        class="w-20 h-30 object-cover rounded-md flex-shrink-0"
        loading="lazy"
      />

      <div class="flex-1">
        <h2 class="text-lg font-semibold text-gray-800 leading-tight">
          {{ movie.Title }}
        </h2>
        <p class="text-sm text-gray-600 mt-1">{{ movie.Year }}</p>
      </div>

      <span
        class="text-gray-500 transition-transform duration-300"
        :class="expanded ? 'rotate-180' : ''"
      >
        ▼
      </span>
    </div>

    <div
      class="grid transition-all duration-300 ease-in-out"
      :class="expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden p-4 border-t bg-gray-50 text-sm text-gray-700">
        <div v-if="details">
          <p><strong>Genre:</strong> {{ details.Genre }}</p>
          <p><strong>Rating:</strong> ⭐ {{ details.imdbRating }}</p>
          <p><strong>Actors:</strong> {{ details.Actors }}</p>
          <p class="mt-2"><strong>Plot:</strong> {{ details.Plot }}</p>
        </div>

        <div v-else class="italic text-gray-500">
          Loading details…
        </div>
      </div>
    </div>
  </div>
</template>
