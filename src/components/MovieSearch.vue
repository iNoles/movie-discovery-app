<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

export default defineComponent({
  name: "MovieSearch",

  emits: {
    search: (query: string) => typeof query === "string",
  },

  setup(_, { emit }) {
    const query = ref("");

    const debouncedSearch = useDebounceFn(() => {
      const value = query.value.trim();
      if (value.length > 2) emit("search", value);
    }, 300);

    return { query, debouncedSearch };
  },
});
</script>

<template>
  <div class="flex justify-center p-4">
    <input
      v-model="query"
      @input="debouncedSearch"
      placeholder="Search movies..."
      aria-label="Search movies"
      class="w-full max-w-md p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>
