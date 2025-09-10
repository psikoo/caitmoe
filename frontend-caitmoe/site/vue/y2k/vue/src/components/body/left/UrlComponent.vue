<script setup lang="ts">
  import { onMounted, ref } from "vue";
  const user: any = ref("Loading");
  async function getURL(url: string) {
      try {
      const headersList = {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      }
      const res = await fetch(url, {
        method: "GET",
        headers: headersList
      });
      const data = await res.json();
      user.value = data;
    } catch(e) {
      console.log(e);
    }
  }
  getURL("https://www.cait.moe:8443/api/y2k/users/1");
</script>

<template>
  <div class="main">
    <div v-if="typeof user == 'string'">Loading...</div>
    <div v-else>
      <h1 class="linkName underline">{{ user.linkName }}&lt3</h1>
      <p><a :href="user.urlString" target="_blank" class="linkUrl">{{ user.urlString }}</a></p>
    </div>
  </div>
</template>

<style scoped>
  .main {
    padding: 15px;
    contain: content;
    background-color: var(--bg-color);
    border: 6px double var(--border-color);
    text-align: center;
  }

  .linkName {
    max-width: fit-content;
    margin: 0px auto;
    margin-bottom: 10px;
  }

  .linkUrl, .linkUrl:visited {
    padding: 2px 4px;
    text-decoration: none;
    color: var(--text-color);
  }
  .linkUrl:hover {
    padding: 2px 4px;
    text-decoration: underline;
    background-color: var(--hover-color);
    border-radius: 5px;
  }
</style>
