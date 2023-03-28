<template>
  <div class="stopwatch-list">
    <stopwatch-item
      v-for="item of items"
      :key="item.id"
      @create="createItem"
      :status="item.status"
    />
  </div>
</template>

<script>
import StopwatchItem from "@/components/StopwatchItem";

export default {
  components: {
    StopwatchItem,
  },
  data() {
    return {
      items: [
        { id: 1, status: "start" },
        { id: 2, status: "start" },
        { id: 3, status: "start" },
        { id: 4, status: "start" },
        { id: 5, status: "waiting" },
      ],
    };
  },
  methods: {
    createItem(item) {
      this.items.push(item);
    },
  },
};
</script>

<style scoped>
.stopwatch-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 225px));
  grid-auto-rows: 120px;
  grid-column-gap: 50px;
  grid-row-gap: 45px;
  justify-content: center;
  max-width: 775px;
  margin: 0 auto;
  padding-top: 72px;
}
</style>