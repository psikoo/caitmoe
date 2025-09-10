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
  // stamps
  const base: string = "/out/img/stamps/"; // Compiler fucks the relative rout
  const stamps: any =  ['CatFeet.gif','Cats.gif','ComputerLove.webp','Discord.gif','EyesLove.webp','FrogLove.gif',
                        'Gender.webp','IsopodLove.webp','KuromiLove.gif','LuckyStar.webp','PhysicalMedia.webp','MikuDance.gif','MonsterLove.webp',
                        'Scene.webp','NyanCat.gif','OldWeb.webp','OwO.gif','WindowsXP.gif','ParkingLot.webp','Pompompurin.gif',
                        'Vore.webp','SleepPlushies.gif','Support.gif','UndertaleDog.gif','XD.webp'];
  function shuffle(array: any) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
  shuffle(stamps);
</script>
<template>
  <div class="main">
    <div v-if="typeof user == 'string'">Loading...</div>
    <div v-else>
      <h1 class="intro">About Me!</h1>
      <h1 class="introText">{{ user.intro }}</h1>
      <div class="stamps">
        <img v-for="(stamp, index)  in stamps" :src="base+stamp" alt="stamp" class="stamp"/>
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

  .intro {
    margin-bottom: 5px;
    font-size: smaller;
    text-align: center;
  }

  .introText {
    margin-bottom: 15px;
    font-size: smaller;
    text-align: center;
  }

  .stamps {
    max-width: 500px;
    margin: 0px auto;
  }

  .stamp {
    height: 55px;
    width: 100px;
  }
</style>
