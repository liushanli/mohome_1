<template>
	
    <view>
       <swiper @change="changeTab" :style="style">
			<swiper-item >
				<image src="../../static/images/202011291558407142.png" :style="style"></image>
			</swiper-item>
			<swiper-item >
				<image src="../../static/images/202011291558407142.png" :style="style"></image>
			</swiper-item>
        </swiper>
   
		<!-- <image @change="changeTab" src="../../static/images/202011291558407141.png"  style="width: 360px;height: 643px;"></image> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				cur: 0,
				guidelList:[{src:''}],
				tabIndex:0,
				style:''
			}
		},
		onReady() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.style = "width: "+res.windowWidth+"px;height: "+res.windowHeight+"px;border-radius:0px;";
					console.log(res.windowHeight+"=="+res.windowWidth);
				}
			})
		},
		onLoad() {
			
		},
		methods: {
			changeTab(){
				this.cur += 1;
				/* if(this.cur>=2){
					console.log("==="+this.cur);
					uni.switchTab({
						url:"../index/index"
					})
				} */
				if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null || uni.getStorageSync("isLogin")==false){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
					return;
				}else{
					uni.switchTab({
						url:"../index/index"
					})
				}
				
			}
		},
	}
</script>