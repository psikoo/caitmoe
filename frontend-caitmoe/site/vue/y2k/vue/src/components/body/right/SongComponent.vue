<script setup lang="ts">
  import { onMounted, ref } from "vue";
  const songs: any = ref("Loading");
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
      shuffle(data);
      songs.value = data;
    } catch(e) {
      console.log(e);
    }
  }
  getURL("https://cait.moe:8443/api/y2k/songs/");
  function shuffle(array: any) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
</script>

<template>
  <div class="main">
    <div v-if="typeof songs == 'string'">Loading...</div>
    <div v-else>
      <h1 class="tittleTop underline">Music ^///^</h1>
      <!-- Amazing code from: https://www.kazimariusz.com/codesnippets/vinyl-showcase -->
      <div id="vinyl-gallery">
        <div v-for="(song, index) in songs" class="vinyl">
          <img :src="songs[index].cover" alt="Song Cover">
          <div class="title">
            <a :href="songs[index].url" target="_blank"><p class="link">{{ songs[index].name }} - {{ songs[index].tag }}</p></a>
          </div>
        </div>
      </div>
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

  .tittleTop {
    max-width: fit-content;
    margin: 0px auto;
    margin-bottom: 10px;
  }

  /* Amazing code from: https://www.kazimariusz.com/codesnippets/vinyl-showcase */
  #vinyl-gallery {
    all: initial;
    width: 100%;
    height: 230px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    position: relative;
    margin-left: -6px;
    transform: translateX(-15px);
  }

  #vinyl-gallery .vinyl {
    perspective: 500px !important;
    width: 18px;
    transition: width 0.5s;
  }

  #vinyl-gallery .vinyl:hover {
    width: 180px;
  }

  #vinyl-gallery img {
    transition: transform 0.5s, width 0.5s, height 0.5s, margin-top 0.5s;
    width: 180px;
    height: 180px;
    transform: rotateX(0deg) rotateY(25deg);
    transform-style: preserve-3d;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }

  #vinyl-gallery .vinyl:hover img {
    transform: rotateX(0deg) rotateY(10deg);
    width: 188px;
    height: 188px;
    margin-top: -2px;
  }

  #vinyl-gallery .title {
    display: block;
    visibility: hidden;
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
    padding-left: 6px;
  }

  .title>p, .title>a {
    text-wrap: nowrap;
    font-family: "PT Mono", serif;
    font-weight: 400;
    font-style: normal;
    color: var(--text-color);
    animation: textShadow 1.5s infinite;
  }

  #vinyl-gallery .vinyl:nth-child(n):hover .title {
    visibility: visible;
  }
</style>
