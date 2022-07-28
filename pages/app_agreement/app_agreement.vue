<template>
	<view class="my">
		<view style="text-align: center;">
			<image src="../../static/images/loginAPP.png" style="width: 10rem;height: 10rem;margin-top: 3rem;"/>
		</view>
		<view class="mylist">
			<view class="mysclos"  @tap="jumbUrl" data-value='../subscriber/subscriber'>
				<view class="mysclosL" >
					用户协议
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>

			<!--  -->
			<view class="mysclos" @tap="jumbUrl" data-value='../privacy_url/privacy_url'>
				<view class="mysclosL" >
					隐私政策
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
			<!--  -->
			<view class="mysclos" @tap="jumbUrl" data-value='../declaration/declaration'>
				<view class="mysclosL">
					责任声明
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>

			<view class="mysclos" @tap="jumbUrl" data-value='../tencent/tencent'>
				<view class="mysclosL">
					微信公众号
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">

					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
			<view class="mysclos" @tap="jumbUrl" data-value='../tencent/tencent'>
				<view class="mysclosL">
					版本
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">1.2.1</view>
			</view>
			<button  @tap="$noMultipleClicks(exitLogin)"  style="width: 20rem;height: auto;margin-top: 1rem;border-radius: 3rem;background-color: #C0C8D0;color: #F2F2F2;">注销账户</button>
		</view>
		<view style="text-align: center;color: #555555;margin-top:2rem;font-size: 0.8rem;">高端酒店按摩服务商</view>
	</view>
	
</template>
<script>
	export default {
		data() {
			return {
				noClick:true
			}
		},
		onLoad() {
		},
		methods: {
			jumbUrl:function(event){
				let workerId =  event.currentTarget.dataset.row;
				let url = event.currentTarget.dataset.value;
				if(workerId!=null && workerId !='' && workerId != undefined){
					uni.navigateTo({
						url:url+"?workerId="+workerId
					});
				}else{
					uni.navigateTo({
						url:url
					});
				}
			},
			exitLogin(){
				
				let that = this;
				uni.showModal({
					content:"请谨慎注销您的账户，注销后，您的账户信息与会员信息等都将清零，您对自己的操作负责，摩之家平台将清除您的账户信息数据",
					success: (s) => {
						if(s.confirm){
							that.logout();
							//that.dialogCancel();
							uni.navigateTo({
								url:"../exit_phone/exit_phone"
							})
						}
						that.noClick = true;
					},fail() {
						that.noClick = true;
					}
				})
				
				
			},
			logout(){
				this.noClick = true;
				// 微信登录鉴权服务
				var aweixin=null;
				// 当前环境支持的所有登录鉴权服务
				var auths = {};
				
				// 获取登录鉴权服务列表，单独保存微信登录鉴权服务对象
				// 5+APP在plusready事件中调用，uni-app在vue页面的onLoad中调用
					plus.oauth.getServices(function(services){
						console.log(services);
						for(var i = 0;i<services.length;i++){
							if(services[i].id == 'weixin'){
								aweixin = services[i];

							}						
						}
						aweixin.logout(function(e){
								//plus.nativeUI.alert("注销登录认证成功!");
							}, function(e){
								//plus.nativeUI.alert("注销登录认证失败: "+JSON.stringify(e));
							});
					}, function(e){
						//plus.nativeUI.alert("获取登录鉴权服务列表失败："+JSON.stringify(e));
					} );

			}
			
		}
	};
</script>

<style>

</style>
