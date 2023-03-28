<template>
  <div class="stopwatch-item__container">
    <div
      class="stopwatch-item"
      :class="{ start: statusCurrent === 'pause' }"
      v-if="statusCurrent !== 'waiting'"
    >
      <div class="stopwatch-item__time">{{ formatSeconds }}</div>
      <div class="stopwatch-item__btns btns">
        <div
          class="btn"
          :class="{
            btns__start: statusCurrent === 'start',
            btns__pause: statusCurrent === 'pause',
          }"
          @click="toggleStopwatch"
        ></div>
        <div class="btn btns__reset" @click="reset"></div>
      </div>
    </div>
    <div v-else class="stopwatch-item__plus" @click="createItem">+</div>
  </div>
</template>

<script>
import formatSecondsInTime from "@/utils/formatSecondsInTime";
export default {
  data() {
    return {
      seconds: 0,
      timeoutID: null,
      statusCurrent: this.status,
    };
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleStopwatch() {
      if (this.statusCurrent === "start") {
        this.start();
      } else {
        this.stop();
      }
    },
    start() {
      this.statusCurrent = "pause";
      if (!this.timeoutID) {
        this.timeoutID = setTimeout(() => {
          this.stop();
          this.seconds += 1;
          this.start();
        }, 1000);
      }
    },
    stop() {
      this.statusCurrent = "start";
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }
    },
    reset() {
      this.statusCurrent = "start";
      this.seconds = 0;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }
    },
    createItem() {
      const item = { id: Date.now(), status: "waiting" };
      this.$emit("create", item);
      this.statusCurrent = "start";
    },
  },
  computed: {
    formatSeconds() {
      return formatSecondsInTime(this.seconds);
    },
  },
};
</script>

<style scoped>
.stopwatch-item__container {
  display: flex;
  width: 100%;
  height: 100%;
  color: #9e9e9e;
  background-color: #696969;
}
.stopwatch-item__plus {
  font-size: 30px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
}
.stopwatch-item {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-size: 22px;
  background-color: #696969;
}
.stopwatch-item.start {
  color: #fff;
}

.start > .stopwatch-item__time {
  border-color: #fff;
}

.start .btn {
  background-color: #fff;
}

.stopwatch-item > * {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.stopwatch-item__time {
  border-bottom: solid #9e9e9e;
}

.btn {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: #9e9e9e;
}

.btns__start {
  clip-path: polygon(
    0 0,
    50% 25%,
    50% 75%,
    50% 75%,
    50% 25%,
    100% 50%,
    100% 50%,
    0 100%
  );
}

.btns__pause {
  clip-path: polygon(
    0 0,
    40% 0,
    40% 100%,
    60% 100%,
    60% 0,
    100% 0,
    100% 100%,
    0 100%
  );
}

.btns__reset {
  width: 20px;
  height: 20px;
  margin-left: 48px;
}
</style>