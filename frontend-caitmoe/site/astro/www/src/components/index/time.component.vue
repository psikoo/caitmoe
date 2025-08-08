<script setup lang="ts">
  import "../../assets/css/util.css";

  import { ref } from "vue";
	
	const timezone = "Europe/Madrid";
	const time = ref("Loading");
	function formatDate(date: Date) {
		var hours: string | number = date.getHours();
		var minutes: string | number = date.getMinutes();
		var seconds: string | number = date.getSeconds();
		hours = (hours<10) ? "0"+hours : hours;
		minutes = (minutes<10) ? "0"+minutes : minutes;
		seconds = (seconds<10) ? "0"+seconds : seconds;
		var formattedTime = hours+":"+minutes+":"+seconds;
		time.value = formattedTime;
	}
	setInterval(function(){
		formatDate(new Date(new Date().toLocaleString("en-US", {timeZone: timezone}))); 
	}, 1000);
</script>

<template>
  <div class="border">
		<h1 class="notSelectable time">{{ time }}</h1>
		<small class="notSelectable">{{ timezone }}</small>
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
		margin-left: 0.5rem;
	}
</style>