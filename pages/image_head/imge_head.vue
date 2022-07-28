<template>
	<view class="screen-swiper mask">
		<swiper :hidden="autoplay" class="screen-swiper" indicator-dots="true" circular="true"
		 :autoplay="!autoplay" interval="3500" duration="500">
			<swiper-item >
				<image style="width: 100%;height: 100%;margin-top: -2rem;" :src="imageUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				picList: [],
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				circular: true,
				current: 0,
				isShowSwiper: false,
				videoUrl:"",
				imgNumber:0,
				bgVideo:'',
				imageUrl:''
			}
		},
		onLoad() {
			that = this;
			this.picList = uni.getStorageSync("workerPicList");
			this.imgNumber = this.picList.length;
			this.videoUrl = uni.getStorageSync("workerVideo");
			this.bgVideo = uni.getStorageSync("workerVideoImage");
			console.log(this.videoUrl);
			this.imageUrl = uni.getStorageSync("imageUrl");
			/* if(this.videoUrl!=null && this.videoUrl != ""){
				this.imgNumber = this.imgNumber + 1;
			} */
			console.log(this.bgVideo);
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},

		methods: {
			BoFang(){
				if(that.autoplay==false){
					that.autoplay=true;
					that.videoContext.play();
				}
			},
			ZhanTing(){
				if(that.autoplay==true){
					that.autoplay=false
				}
			}
		}
	}
</script>

<style>
	.screen-swiper {
		/* min-height: 100%; */
		height: 40rem;
		width: 100%;
		
	}
	
	.screen-swiper image,
	.screen-swiper video{
		width: 100%;
		display: block;
		height: 30%;
		margin: 0;
		pointer-events: none;
		border-radius:0.6rem;
		margin-top: 10rem;
	}


</style>
