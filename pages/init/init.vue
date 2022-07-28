<template></template>
<script>
	
	export default {
		data() {
			return {
				cur: 0,
				guidelList:[{src:''}],
				tabIndex:0
			}
		},
		onLoad() {
			//从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			const value = uni.getStorageSync('launchFlag');
			console.log("==="+value);
			//获取用户的基本信息
			if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null || uni.getStorageSync("isLogin")==false){
				uni.setStorageSync("meStatus","Y");
				uni.navigateTo({
					url:'../login/login1'
				});
			}else{
				uni.switchTab({
						url: '/pages/index/index'
				});
			}
			/* if (value) {
				//获取用户的基本信息
				if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null || uni.getStorageSync("isLogin")==false){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
				}else{
					uni.switchTab({
							url: '/pages/index/index'
					});
				}
			} else {
			  // 没有值，跳到引导页，并存储，下次打开就不会进去引导页
				  uni.setStorage({
					key: 'launchFlag',
					data: true
				  });
				  uni.redirectTo({
					url: '/pages/guide/guide'
				  });
			} */
		},
		methods: {
		},
	}
</script>

<style>
</style>
