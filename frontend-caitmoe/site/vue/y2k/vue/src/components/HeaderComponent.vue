<script setup lang="ts">
  import { ref } from "vue";
  const url = "cait.moe/";
  const subdomains = ["www", "cmd"];
  const counter: any = ref("Loading");
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
      counter.value = data;
    } catch(e) {
      console.log(e);
    }
  }
  getURL("https://cait.moe:8443/api/y2k/counter");
</script>

<template>
  <div class="main">
    <nav>
      <a :href="'https://y2k.'+url"><img src="https://avatars.githubusercontent.com/psikoo" alt="profile picture image" class="smallImage"></a>
      <div class="center">
        <div class="top">
          <h1 class="navText">Welcome to my y2k themed about me site!</h1>
        </div>
        <div class="bottom">
          <h2 class="navText">Other sites:</h2>
          <div v-for="(subdomain, index)  in subdomains">
            <a :href="'https://'+subdomain+'.'+url"><h2 class="navText">{{ subdomain }}</h2></a>
            <h2 v-if="index < subdomains.length-1" class="navText">•</h2>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-if="typeof counter == 'string'">Loading...</div>
        <div v-else>
          <h1>
            {{ counter.count }}
          </h1>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .main {
    width: calc(100% - 12px);
    background-color: var(--bg-color);
    border: 6px double var(--border-color);
    margin-top: 15px;
  }

  nav {
    width: 100%;
    display: flex;
  }

  .center {
    flex: auto;
    display: flex;
    flex-direction: column;
  }

  .top{
    flex: 1;
    display: flex;
    align-items: end;
  }
  .bottom{
    flex: 1;
    display: inline-flex;
    align-items: start;
  }

  .bottom>div>a {
    text-decoration: none;
    text-decoration-color: rgb(255, 255, 255);
  }

  .right {
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-size: small;
  }

  .smallImage {
    padding: 0px;
    margin: 15px;
    height: 2.5vw;
    border-radius: 50%;
    display:block;
  }

  .navText {
    padding: 2px;
    display: inline-block;
    font-size: small;
    color: var(--text-color);
    text-align: center;
  }

  a>.navText:hover {
    background-color: var(--hover-color);
    border-radius: 15%;
    text-decoration: underline;
  }
</style>
