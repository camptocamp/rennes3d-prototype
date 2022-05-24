<template>
  <div class="home_container">
    <img src="../assets/map.png" alt="map" class="w-32">
    <label>
        3D <t-toggle checked />
    </label>
    <button class="btn btn-blue">
      <router-link to="/map">Go to map</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: "MainPage",
};
</script>

<style scoped lang="scss">
.home_container {
  @apply flex flex-col h-full w-full justify-center items-center;
  * {
    @apply my-2.5
  }
}

.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>