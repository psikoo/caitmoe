<script setup lang="ts">
  import "../../../assets/css/util.css";

  import { ref } from "vue";
  const pfpUrl = ref("Loading");
  const username = ref("Loading");
  const status = ref("Loading");
  const isOnline = ref(true);
  const isIdle = ref(false);
  const isDnd = ref(false);
  const isOffline = ref(false);
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
      const discordData = data.data;
      pfpUrl.value = "https://cdn.discordapp.com/avatars/"+discordData.discord_user.id+"/"+discordData.discord_user.avatar+".png?size=160";
      username.value = discordData.discord_user.global_name;
      status.value = discordData.discord_status;
      isOnline.value = (status.value == "online")? true : false;
      isIdle.value = (status.value == "idle")? true : false;
      isDnd.value = (status.value == "dnd")? true : false;
      isOffline.value = (status.value == "offline")? true : false;
    } catch(e) {
      console.log(e);
    }
  }
  getURL("https://api.lanyard.rest/v1/users/614870731322425374");
</script>

<template>
  <a href="https://www.cait.moe" class="notSelectable" draggable="false">
    <img class="pfp notSelectable darkHover smallOnClick" draggable="false" :src="pfpUrl" alt="" width="50" height="50">
  </a>
  <div class="user">
    <h1 >{{ username }}</h1>
    <div class="status notIntractable">
      <div :class="{statusIcon: true, online: isOnline, idle: isIdle, dnd: isDnd, offline: isOffline}""></div>
      <h2>{{ status }}</h2>
    </div>
  </div>
</template>

<style scoped>
	.pfp {
		border-radius: 50%;
	}

  .user {
    text-wrap: nowrap;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.2rem;
    flex: 1;
	}

	.status {
		display: flex;
		gap: 0.2rem;
	}

	.statusIcon {
		margin: calc(0.25rem / 2);
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 50%;
	}
	.online 	{ background-color: rgb(65, 160, 90);   }
	.idle 		{ background-color: rgb(200, 150, 85);  }
	.dnd 			{ background-color: rgb(215, 60, 65); 	 }
	.offline 	{ background-color: rgb(130, 130, 140); }
</style>