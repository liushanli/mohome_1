<template>
	<view class="zhaopin">
		<view class="">
			
			<view class="fpcontl">
				<input type="text" v-model="json.phone" placeholder="请输入联系人电话" name="">
			</view>
			<view class="tijiaoyy" @tap="submitAddress">
					提交
			</view>
		</view>
		<view style="text-align: center;color: #09F975;margin-top:28rem;">摩之家上门按摩，数十万人的选择</view>
	</view>
	
</view>
</template>
<script>
	export default {
		data() {
			return {
				json:{
					phone:'',
					openId:'',
					appleData:''
				},
				userVo:'',
				appleData:''
			}
		},
		 onLoad() {
			 let jsonData = uni.getStorageSync("jsonData");
			 console.log(JSON.stringify(jsonData));
			if(jsonData != null){
				this.json = jsonData;	
			}
			console.log(JSON.stringify(this.json));
		},
		methods: {
			async submitAddress(){
				if (this.json.phone == "") {
					 uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不能为空'
					});
					return;
				}
				if (!/^1\d{10}$/.test(this.json.phone)) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请正确填写手机号'
					});
					return;
				}
				let url = this.$baseUrl + '/user/findUserByPhoneCount?phone='+this.json.phone;
				const res = await this.$myRequest({
					url: url,
					method:"POST"
				});
				var flag = false;
				if(res.data.userList!=null){
					console.log("openId==="+res.data.userList[0].openId);
					if(res.data.userList[0].openId==null || res.data.userList[0].openId==''){
						
						this.updUserInfo();
						
						
						
					}else{
						flag = false;
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '该手机号已被绑定'
						});
					}
				}else{
					flag = true;
					this.addUserInfoWhat();
				}
				
			},
			async updUserInfo(){
				let url = this.$baseUrl+'/user/updWhatUserInfo';
				console.log(url);
				const res = await this.$myRequest({
								url: url,
								data:this.json,
								method:"POST"
							});	
				 console.log("==="+JSON.stringify(res));			
				this.findUserInfo();
			},
			async addUserInfoWhat(){
				let url = this.$baseUrl+'/user/addWhatUserInfo';
				console.log(url);
				const res = await this.$myRequest({
								url: url,
								data:this.json,
								method:"POST"
							});	
				console.log(JSON.stringify(res));
				uni.setStorageSync("userVo",res.data.userVo);
				console.log(JSON.stringify(res));
				uni.setStorageSync("isLogin",true);
				uni.switchTab({
					url:"../my/my"
				})
			},
			async findUserInfo(){
					let url = this.$baseUrl+'/user/findUserByPhone?phone=&sendCode=&openId='+this.json.openId+'&appleData=';
				if(this.json.appleData != ''){
					url = this.$baseUrl+'/user/findUserByPhone?phone=&sendCode=&openId='+"&appleData="+this.json.appleData;
				}
				
				console.log(url+"=="+this.json);				
				let headers={
						  "Content-Type":"application/json"  //设置一下请求头即可
					}
				const res = await this.$myRequest({
								url: url,
								data:this.json,
								method:"GET"
						});	
				uni.setStorageSync("userVo",res.data.userVo);
				console.log(JSON.stringify(res));
				uni.setStorageSync("isLogin",true);
				uni.switchTab({
					url:"../my/my"
				})
			}
		}
	};
</script>
