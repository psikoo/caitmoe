<script setup lang="ts">
  import { onMounted, ref } from "vue";
  const links: any = ref("Loading");
  const tags: any = ref([]);
  const unorderedLinks: any = ref([]);
  const orderedLinks: any = ref([]);

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
      links.value = data;
      tags.value = [links.value[0].tag];
      getOrderedLinks();
    } catch(e) {
      console.log(e);
    }
  }
  getURL("https://api.cait.moe/api/y2k/urls/");

  async function getOrderedLinks() {
    let unorderedLinksStatic: any = [];
    // Sort links into categories
    for(let i=0; i<links.value.length; i++) {
        let newTag = true;
        for(let j=0; j<tags.value.length; j++) {
          if(links.value[i].tag == tags.value[j]) newTag = false;
        }
        if(newTag) tags.value.push(links.value[i].tag);

    }
    for(let i=0; i<tags.value.length; i++) {
      for(let j=0; j<links.value.length; j++) {
        // console.log(`${tags.value[i]} - ${links.value[j].tag}`)
        if(tags.value[i] == links.value[j].tag) {
          let foundTag = false;
          for(let k=0; k<unorderedLinksStatic.length; k++) {
            // console.log(`> ${tags.value[i]} - ${unorderedLinksStatic[k][0]}`)
            if(tags.value[i] == unorderedLinksStatic[k][0]) {
              unorderedLinksStatic[k][1].push(links.value[j]);
              foundTag = true;
            }
          }
          if(!foundTag) unorderedLinksStatic.push([tags.value[i], [links.value[j]]]);
        }
      }
    }
    // Order categories
    let orderedLinksStatic: any = new Array(6).fill(null);
    for(let i=0; i<unorderedLinksStatic.length; i++) {
      if(unorderedLinksStatic[i][0] == "socials")      orderedLinksStatic[0] = unorderedLinksStatic[i];
      else if(unorderedLinksStatic[i][0] == "aboutme") orderedLinksStatic[1] = unorderedLinksStatic[i];
      else if(unorderedLinksStatic[i][0] == "pages")   orderedLinksStatic[2] = unorderedLinksStatic[i];
      else if(unorderedLinksStatic[i][0] == "league")  orderedLinksStatic[3] = unorderedLinksStatic[i];
      else if(unorderedLinksStatic[i][0] == "osrs")    orderedLinksStatic[4] = unorderedLinksStatic[i];
      else if(unorderedLinksStatic[i][0] == "cool")    orderedLinksStatic[5] = unorderedLinksStatic[i];
      else orderedLinksStatic.push(unorderedLinksStatic[i]);
    }
    // orderedLinksStatic = unorderedLinksStatic;
    orderedLinks.value = orderedLinksStatic;


  }
</script>

<template>
  <div class="main">
    <div v-if="typeof links == 'string'">Loading...</div>
    <div v-else>
      <div class="top">
        <h1 class="title underline">My links!^.^</h1>
      </div>
      <div v-for="(tag, index) in tags" class="linkSection">
        <h1 class="title underline">{{ orderedLinks[index][0] }}</h1>
        <p v-for="(links, jndex) in orderedLinks[index][1]" class="link">
          <a :href="orderedLinks[index][1][jndex].url" target="_blank" class="linkUrl">{{ orderedLinks[index][1][jndex].name }}</a>
        </p>
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
  }

  .top {
    text-align: center;
  }
  .top>.title {
    margin: 0px auto;
  }

  .title {
    max-width: fit-content;
    margin: 0px auto;
    margin-bottom: 15px;
  }

  .linkSection {
    margin: 15px 0px;
  }

  .link {
    text-align: center;
    margin: 5px 0px;
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
