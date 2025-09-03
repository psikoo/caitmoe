<script setup lang="ts">
	import "../../assets/css/util.css";

  import { ref, watchEffect } from "vue";

  const cover = ref("Loading")
  const track = ref("Loading");
  const artist = ref("Loading");
  const album = ref("Loading");
  const song = ref("Loading");

	function getCover() {
		console.log(cover.value);
		return cover.value+'?'+Math.random();
	} 

  async function getURL(url: string) {
		try {
      const headersList = {
        "Accept": "*/*",
      }
      const res = await fetch(url, { 
        method: "GET",
        headers: headersList,
      });
      const data = await res.json();
      const musicData = data.recenttracks.track[0];

			track.value = musicData.name;
			artist.value = musicData.artist['#text'];
			cover.value = musicData.image[2]['#text'];
			album.value = musicData.album['#text'];
			song.value = musicData.url;
    } catch(e) {
      console.log(e);
    }
  }
	
	watchEffect(() => {
		// Force update cover
		if(cover.value == "Loading") getURL("https://cait.moe:8443/api/www/lastfm");
		cover.value = cover.value;
	})
</script>

<template>
	<div class="border">
		<a :href="song" target="_blank" class="notSelectable" draggable="false">
			<img :src="cover" class="cover" draggable="false">
		</a>
		<div class="song">
			<p class="notSelectable">Last played:</p>
			<a :href="song" target="_blank" draggable="false">
				<h1>{{ track }}</h1>
			</a>
			<small>{{ album+" - "+artist }}</small>
		</div>
	</div>
</template>

<style scoped>
	a:active {
		font-size: 100%;
		line-height: inherit;
	}

	.border {
		border-radius: 15px;
		border: 1px solid var(--color-primary);
		display: flex;
		gap: 1rem;
		/* flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem; */
		padding: 1rem;
		margin-inline: 0.5rem;
	}

	.cover {
		border-radius: 15px;
		height: 100px;
	}

	.song {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>