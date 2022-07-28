<template>
	<view class="content">
		<!-- 轮播图 -->
		<swiper class="image-container" :style="{'height':height+'px','width':width+'px'}"
		   @change="swiperChange"  circular autoplay>
			<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" v-for="(item, index) in imgList" :key="index" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''">
				<image class="image" :src="item.imgUrl" mode=""></image>
			</swiper-item>
		</swiper>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				picList:[],
				errorImage: '',
				height:0,
				width:0,
				imgList: [],
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		//获取屏幕可视区域高度
		onReady() {
			
			this.imgList = uni.getStorageSync("PicList");
			
			let that = this;
			uni.getSystemInfo({
				success: function (res) {
					that.height = res.windowHeight;
					that.width = res.windowWidth;
				}
			})
			
			
			
			
		},

		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
		}
	}
</script>
 
<style lang="scss" scoped>
	.content {
		
		// 轮播图
		.image-container {
			margin-top: 30%;
		}
		
		.image {
			width: 100%;
			height: 60%;
			/* border-radius: 2rem;
			border: 2rpx solid #FFFFFF; */
		}
	}
</style>