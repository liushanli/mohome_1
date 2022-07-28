<template>
	<view class="my-detail">
		<view class="line"></view>
		<view class="jiscard">
			<view class="ciistl">
				<view class="vsllt1">头像</view>
				<view class="flex1 hui"></view>
				<view class="djrisj" @tap="choose"><image :src="headImage" style="width:3rem;height:3rem"/><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				<view class="vsllt1">昵称</view>
				<view class="flex1 hui"></view>
				<view class="djrisj"><input type="text" class="finput" v-model="nickName"  @input="updUser"  /><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				<view class="vsllt1">手机号</view>
				<view class="flex1">
				</view>
				<view class="djrisj"><input type="text" disabled="true" class="finput" v-model="phone" /><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
		</view>
		<view class="jiscard" >
			<view class="ciistl" @tap="exitLogin">
				<view class="flex1   tac">
					退出登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				headImage:'/static/images/userLogo.png',
				vipIsName:'普通用户',
				nickName:"",
				userVo:null,
				imgPaths:[],
				filePaths:[]
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			exitLogin(){
						//清楚缓存
						uni.clearStorageSync();
						uni.switchTab({
							url:"../index/index"
						});
			},
			getUserInfo(){
				this.userVo = uni.getStorageSync("userVo");
				var reg=/(\d{3})\d{4}(\d{4})/;
				if(this.userVo.phone != null && this.userVo.phone != ""){
					this.phone = (this.userVo.phone).replace(reg, "$1****$2");
				}
				this.headImage = this.userVo.imgUrl;
				this.nickName = this.userVo.nickName;
				if(this.headImage == null || this.headImage == ""){
					this.headImage = '/static/images/userLogo.png';
				}
				if(this.phone == null || this.phone == ""){
					this.phone = "";
				}
			},
			async updUser(){
				let user = uni.getStorageSync('userVo');
				let url = this.$baseUrl+"/user/updUserInfo";
				let param = {
								id:user.id,
								imgUrl:this.headImage,
								nickName:this.nickName
							}
				console.log(JSON.stringify(param));		
				const res = await this.$myRequest({
									url: url,
									data:param,
									method:"POST"						  	
								});
				user.imgUrl = this.headImage;	
				user.nickName = this.nickName;
				uni.setStorageSync('userVo',user);
				console.log("更改成功");
			},
			choose(e){
				var me = this;
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera', 'album'], //从相册选择
				    success: function (res) {
						console.log(JSON.stringify(res));
						me.imgPaths = me.imgPaths.concat(res.tempFilePaths);
						me.filePaths = res.tempFilePaths;
						console.log(me.imgPaths);
						console.log("URl=="+me.$baseUrl);
						uni.uploadFile({
						            url: me.$baseUrl+'/worker/uploadImg', //仅为示例，非真实的接口地址
						            filePath: me.filePaths[0],
						            name: 'uploadFile',
						            formData: {
						                prePath: 'User_Head'
						            },
									header:{"Content-Type": "multipart/form-data"},
						            success: (res) => {
										let s = JSON.parse(res.data);
										me.headImage = s.imgUrl;
										me.updUser();
										console.log(me.headImage+"==="+s.imgUrl);
						            },fail:(e)=>{
										console.log(e);
									}
						        });
				    }
				});
			}
		}
	};
</script>

<style>
	.finput{
		text-align: right;
	}
</style>
