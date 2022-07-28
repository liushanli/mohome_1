<template>
		<image @tap="get" src="../../static/images/share_1.png" :style="{ width: width + 'px', height: height + 'px'}"></image>
</template>

<script>
	export default {
		data() {
			return {
				width:0,
				height:0
			}
		},
		//获取屏幕可视区域高度
		onReady() {
			let that = this;
			uni.getSystemInfo({
				success: function (res) {
					console.log(res.windowHeight)
					that.height = res.windowHeight-3;
					that.width = res.windowWidth;
				}
			})
		},
		methods:{
			get(){
				var that = this;
				//微信 WXSceneSession
				//朋友圈
				//WXSenceTimeline
				//this.shareToWeixin("WXSenceTimeline");
				let user = uni.getStorageSync('userVo');
				var that = this;
				var shareText = "欢迎下载摩之家上门按摩APP。全国上门按摩服务约单平台，专业按摩，懂你身体，舒爽一刻，自在生活，身体疲劳就找摩之家！";
				let shareOPtions = {
					title: '摩之家',
					provider: 'weixin',
					scene:  'WXSceneSession',  
					type: 0,
					summary:shareText,
					href:'http://wx.mzjsh.com/downApp/down.html?userId='+user.userId,
					imageUrl: that.$imgUrl+'/tent/tent.png',
					success: (e) => {
						//console.log('success', e);
						uni.showModal({
						content: '分享成功',
						showCancel:false
						})
					},
					fail: (e) => {
						uni.showModal({
						content: e.errMsg,
						showCancel:false
						})
					},
					complete:function(){
						//console.log('分享操作结束!')
					}
					};
				uni.showModal({
					content:"将此优惠分享给好友",
					success(e) {
						if(e.confirm){
							uni.share(shareOPtions);
						}
					}
				})
				
					
			},
			shareToWeixin: function () {
			        uni.chooseImage({
			          count: 1,
			          sizeType: ['compressed'],
			          sourceType: ['album'],
			          success: (res) => {
			            uni.share({
			              provider: 'weixin',
			              type: 2,
			              title: 'app微信分享测试',
			              scene: scene,
			              imageUrl: res.tempFilePaths[0],
			              success: (res) => {
			                // console.log(res)
			                uni.showToast({
			                  title: '分享成功！'
			                })
			              },
			              fail: (err) => {
			                // console.log(err)
			              }
			            })
			          }
			        })
			        
			      }
		},
	}
</script>

<style>
	image{
		border-radius: 1rpx;
	}
</style>
