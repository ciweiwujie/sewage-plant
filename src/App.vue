<script setup>
import { RouterView } from 'vue-router'
import './input.css'
</script>

<template>

  <div class="wrapper">
    <div>
    </div>
  </div>
  <!-- <KeepAlive>
    <router-view />
  </KeepAlive> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>



<style scoped></style>
