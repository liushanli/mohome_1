<template>
	
		<video class="video"
		 	id="demoVideo"
		  	:controls="true"  
		   	:enable-progress-gesture="false" 
		   	:show-center-play-btn="true"
			autoplay="true"
		   	 :src="videoUrl">
		</video>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				videoUrl:"",
			}
		},
		onLoad() {
			this.videoUrl = uni.getStorageSync("workerVideo");
			
		},
		methods: {
		}
	}
</script>

<style>
	video{
		height: 40rem;
		width: 23rem;
	}
</style>
