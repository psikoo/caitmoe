<script setup lang="ts">
	import "../../assets/css/util.css";

  import { ref } from "vue";

  const city = "in Madrid Spain";
  const tempC = ref("XX°C");
  const tempF = ref("XX°F");

	let temp = ref("XX°F");
	function swapTemp() {
		if(temp.value.includes("C")) {
			temp.value =  tempF.value;
		} else if(temp.value.includes("F")) {
			temp.value =  tempC.value;
		}
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
      const weatherData = data;

			tempC.value = Math.round(weatherData.main.temp)+"°C";
			tempF.value = Math.round((weatherData.main.temp*1.8)+32)+"°F";
			swapTemp();
    } catch(e) {
      console.log(e);
    }
  }
  await getURL("https://cait.moe:3000/api/www/weather");
</script>

<template>
  <div class="border" @click="swapTemp">
		<h1 class="notSelectable">{{ temp }}</h1>
		<small class="notSelectable">{{ city }}</small>
	</div>
</template>

<style scoped>
	.border {
		flex-basis: 50%;
		border-radius: 15px;
		border: 1px solid var(--color-primary);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		margin-right: 0.5rem;
		cursor: pointer;
	}
</style>