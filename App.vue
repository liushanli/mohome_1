<template></template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.removeStorageSync("province");
			if(uni.getSystemInfoSync().platform == 'ios'){
				//在app.vue中onLaunch写
				// #ifdef APP-PLUS
				plus.globalEvent.addEventListener('newintent', (e)=>{
					 var args= plus.runtime.arguments;
					 /* console.log("==---="+args);
					 if(args){//值就是"myappUrlSchemes://参数xxx"
					 	let argArr=args.split("www.shhaoyuanjk.com://");
					 	uni.redirectTo({
					 		url:'pages/zhifu/zhifu'
					 	})
					 }else{
						 uni.redirectTo({
						 	url:"pages/zhifu/zhifu"
						 })
					 } */
					 uni.redirectTo({
					 	url:"pages/success/success"
					 })
				})
				// #endif
			}
		},
		onShow: function() {
			console.log('App Show');
			
			
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...mapMutations(['login', 'setUniverifyErrorMsg', 'setHideUniverify']),
			preLogin(){
				let that = this;
				uni.preLogin({
					provider: 'univerify',
					success: (res) => {
						this.setUniverifyErrorMsg()
						this.setHideUniverify(false);
						console.log("preLogin success: ", res);
					},
					fail: (err) => {
						that.preLogin();
						/* this.setUniverifyErrorMsg(err.errMsg)
						// 没有开通一键登录
						this.setHideUniverify(true);
						console.log("preLogin fail: ", err); */
					}
				})
			},
			start(){
				uni.showModal({
					content:"2333"
				})
			},
			
		}
	}
</script>

<style lang="scss">
  @import './pages/common/uni.css';
  @import './static/style/global.scss';
</style>
