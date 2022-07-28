<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header" style="margin-top: 2rem;">
				<image src="../../static/images/loginAPP.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					@blur="methodBlur()"
					placeholder="手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="text"
					isShowCode="true"
					maxlength="11"
					placeholder="验证码"></wInput>
			</view>
			<view class="action-row">
				未注册的手机号码验证后自动注册
			</view>
			<button  @tap="$noMultipleClicks(startLogin)"  style="width: 20rem;height: auto;margin-top: 1rem;border-radius: 3rem;background-color: #007AFF;color: #F2F2F2;">登录</button>
			<view style="text-align: center;">
						<view style="color: #929292;margin-top: 2rem;">第三方登录</view>
						<!-- <image  @tap="$noMultipleClicks(wechatOnlogin)" src="/static/images/payicon2.png" style="width: 2rem;height: 2rem;margin-top: 5rem;"></image>
						<image  @tap="$noMultipleClicks(toLogin)" src="/static/img/univerify.png" style="width: 2.2rem;height: 2.2rem;margin-top: 5rem;margin-left: 0.4rem;"></image>
						<image  @tap="$noMultipleClicks(appleOnlogin)" v-if="plusFlag==1" src="/static/images/apple1.jpg" style="width: 2.2rem;height: 2.2rem;margin-top: 5.7rem;margin-left:0.3rem; border-radius: 3rem;"></image> -->
						<view style="border: 1px solid #C0C8D0; border-radius: 10rem;width: 2.4rem;height: 2.4rem;display: inline-block;margin-top: 1rem;text-align: center;margin-right: 1rem;">
							<image  @tap="$noMultipleClicks(wechatOnlogin)" src="/static/images/payicon2.png" style="width: 1.6rem;height: 1.6rem;margin-top: 0.4rem;"></image>
						</view>
						<view style="border: 1px solid #C0C8D0; border-radius: 10rem;width: 2.4rem;height: 2.4rem;text-align: center;display: inline-block;margin-top: 1rem;">
						<image  @tap="$noMultipleClicks(toLogin)" src="/static/img/univerify.png" style="width: 1.6rem;height: 1.6rem;margin-top: 0.4rem;"></image>
						</view>
						<view v-if="plusFlag==1" style="border: 1px solid #C0C8D0; border-radius: 10rem;width: 2.4rem;height: 2.4rem;text-align: center;display: inline-block;margin-top: 1rem;margin-left: 1rem;">
						<image  @tap="$noMultipleClicks(appleOnlogin)"  src="/static/images/apple1.jpg" style="width: 1.6rem;height: 1.6rem;margin-top: 0.4rem; border-radius: 4rem;"></image>	
						</view>
			</view>
			<view class="action-row" style="margin-top: 1rem;">
				<checkbox  :checked="flag" @tap="choose" style="transform:translate(25%, 0%) scale(0.5);"/>您已阅读同意<label style="color: #007AFF;" @tap="jumbUrl" data-value="../subscriber/subscriber">《用户协议》</label>和<label style="color: #007AFF;" @tap="jumbUrl" data-value="../privacy_url/privacy_url">《隐私政策》</label>
			</view>
			<view style="text-align: center;color: #09F975;">摩之家上门按摩，数十万人的选择</view>
		</view>
	</view>	
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import {
		univerifyLogin,
		univerifyErrorHandler
	} from '@/pages/common/univerify.js'
	import {
		getDeviceUUID
	} from '@/pages/common/utils.js'

	let weixinAuthService;
	const captchaOptions = {
		deviceId: getDeviceUUID(),
		scene: 'login'
	}

	export default {
		components: {
			mInput,
			wInput,
			wButton,
		},
		data() {
			return {
				platform: uni.getSystemInfoSync().platform,
				loginType: 0,
				loginTypeList: ['免密登录', '密码登录'],
				mobile: '',
				code: '',
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				codeDuration: 0,
				loginBtnLoading: false,
				hasAppleLogin: false,
				needCaptcha: uni.getStorageSync('uni-needCaptcha'),
				captchaing: false,
				captchaBase64: '',
				captchaText: '',
				noClick:true,
				//logo图片 base64
				logoImage: '',
				phoneData:'', //用户/电话
				passData:'', //验证码
				isRotate: false, //是否加载旋转,
				userVo:null,
				jsonData:{
					openId:'',
					imgUrl:'',
					nickName:'',
					sex:'',
					phone:'',
					appleData:''
				},
				json:{
					phone:'',
					openId:'',
					appleData:''
				},
				flag:false,
				plusFlag:0
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'univerifyErrorMsg', 'hideUniverify']),
		onLoad() {
			
			if(uni.getSystemInfoSync().platform == 'ios'){
				this.plusFlag = 1;
				var that = this;
				uni.getSystemInfo({
					success:(res) => {
						console.log("手机系统信息",JSON.stringify(res))
						//this.system = res.system  // 14.4.1
						let system = res.system.substring(4,6);
						if(system>=13){
							that.plusFlag = 1;
						}else{
							that.plusFlag = 0;
						}
					}
				})
			}else{
				this.plusFlag = 0;
			}
			
			let meStatus = uni.getStorageSync("meStatus");
			if(meStatus != null && meStatus != ''){
				uni.setStorageSync("meStatus","");
				uni.showToast({
					icon: 'none',
					position: 'center',
					title: '请先登录您的账户'
				});
				this.noClick = true;
			}
			this.toLogin();
		},
		onShow() {
			var userPhone  = uni.getStorageSync("username");
			console.log("=====4="+userPhone)
			if(userPhone != '' && userPhone != null && userPhone != undefined){
				uni.setStorageSync("username","");
				this.univerifyTologin(userPhone);
			}
		},
		mounted() {
			uni.setStorageSync("phoneData","");
			_this= this;
			this.isLogin();
		},
		onBackPress(options){
			console.log("===---1");
			if (options.from === 'navigateBack') {
				  return false;
				}
				this.gotoPre();
				return true;
		},
		methods: {
			...mapMutations(['login']),
			choose(){
				if(this.flag){
					this.flag = false;
				}else{
					this.flag = true;
				}
			},
			jumbUrl(e){
				let url = e.currentTarget.dataset.value;
				uni.navigateTo({
					url:url
				});
			},
			univerifyTologin(phone){
				uni.showNavigationBarLoading();
				let that = this;
				let headers={
					 "Content-Type":"application/json"  //设置一下请求头即可
				}
				let url = that.$baseUrl+'/user/addPhoneUserInfo?phone='+phone;
				uni.request({
					 url: url,
					 method: 'GET',
					 header: headers,
					 success: (res)=>{
					  uni.setStorageSync("isLogin",true);
					  that.userVo = res.data.userVo;
					  uni.setStorageSync("userVo",that.userVo);
					  that.isRotate=false;
					  console.log(JSON.stringify(res));
					  uni.hideNavigationBarLoading();
					  if(res.data.success && that.userVo!=null && that.userVo != ""){
						  uni.showToast({
							  icon: 'none',
							  position: 'bottom',
							  title: '登录成功'
						  });
						  uni.switchTab({
								url:"../my/my"
						  });
					  }else{
						  uni.showToast({
							  icon: 'none',
							  position: 'bottom',
							  title: '登录失败'
						  });
					  }
					  
					  
				  },
					 fail: (err)=>{
						 that.noClick = true;
					  uni.hideNavigationBarLoading();
					  uni.setStorageSync("isLogin",false);
					  uni.showToast({
						  icon: 'none',
						  position: 'bottom',
						  title: '登录错误'
					  });
					  console.log("=错误==="+JSON.stringify(err));
				  }
			   });
			},
			wechatOnlogin(){
				if(!this.flag){
					uni.showModal({
						content:"请先阅读并同意协议"
					})
					this.noClick = true;
					return;
				}
				uni.showNavigationBarLoading();
				let that = this;
				let we = uni.login({
					success: res_login => {
						console.log('-------获取code-------')
						console.log(res_login.code);
						uni.getUserInfo({
							success: info => {
								 that.noClick = true;
							   console.log('-------获取sessionKey、openid(unionid)-------')
							   console.log(JSON.stringify(info));
							   that.jsonData.openId = info.userInfo.openId;
							   that.jsonData.imgUrl = info.userInfo.avatarUrl;
							   that.jsonData.nickName = info.userInfo.nickName;
							   that.jsonData.sex = info.userInfo.gender;
							   that.json.openId = info.userInfo.openId;
							   uni.setStorageSync("jsonData",that.jsonData);
							   console.log(JSON.stringify(that.jsonData));
							   let headers={
										 "Content-Type":"application/json"  //设置一下请求头即可
								}
							   let url = that.$baseUrl+'/user/findUserByPhone?phone=&sendCode=&openId='+that.jsonData.openId+"&appleData=";
							   uni.request({
										 url: url,
										 method: 'GET',
										 header: headers,
										 success: (res)=>{
										  uni.setStorageSync("isLogin",true);
										  that.userVo = res.data.userVo;
										  uni.setStorageSync("userVo",that.userVo);
										  that.isRotate=false;
										  console.log(JSON.stringify(res));
										  uni.hideNavigationBarLoading();
										  if(res.data.success && that.userVo!=null && that.userVo != ""){
											  uni.showToast({
												  icon: 'none',
												  position: 'bottom',
												  title: '登录成功'
											  });
											  uni.setStorageSync("we",we);
											 uni.switchTab({
													url:"../my/my"
											  });
										  }else{
											  //微信登录且查询不到登陆信息的时候
											  that.addUserInfoWhat(); 
										  }
										  
									  },
										 fail: (err)=>{
											 that.noClick = true;
										  uni.hideNavigationBarLoading();
										  uni.setStorageSync("isLogin",false);
										  uni.showToast({
											  icon: 'none',
											  position: 'bottom',
											  title: '登录错误'
										  });
										  console.log("=错误==="+JSON.stringify(err));
									  }
								   });
							}
						});
					},fail(e) {
						this.noClick = true;
						console.log("ffff:{}",e);
					}
				});
			},
			async getUserInfo(token){
				let url = this.$baseUrl+'/user/getUserInfo';
				console.log(url);
				const res = await this.$myRequest({
							url: url,
							data:{
								"identityToken":token
							},
							method:"POST"
						});	
			},
			appleOnlogin(){
				if(!this.flag){
					uni.showModal({
						content:"请先阅读并同意协议"
					})
					this.noClick = true;
					return;
				}
				let that = this 
				uni.showNavigationBarLoading();
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						 if(~res.provider.indexOf('apple')){
							 uni.login({
									provider: 'apple',
									success: loginRes => {
										uni.getUserInfo({
											provider: 'apple',
											success: userInfoRes => {
												uni.hideNavigationBarLoading();
												if(userInfoRes.userInfo!=null){													
													that.jsonData.appleData = userInfoRes.userInfo.openId;
													let headers={
														"Content-Type":"application/json"  //设置一下请求头即可
													 }
													let url = that.$baseUrl+'/user/findUserByPhone?phone=&sendCode=&openId=&appleData='+userInfoRes.userInfo.openId;
													uni.request({
													  url: url,
													  method: 'GET',
													  header: headers,
													  success: (res)=>{
														  uni.setStorageSync("isLogin",true);
														  that.userVo = res.data.userVo;
														  uni.setStorageSync("userVo",that.userVo);
														  that.isRotate=false;
														  console.log(JSON.stringify(res));
														  
														  if(res.data.success && that.userVo!=null && that.userVo != ""){
															  uni.showToast({
																	icon: 'none',
																	position: 'bottom',
																	title: '登录成功'
															  });
															  uni.switchTab({
																url:"../my/my"
															  })
														  }else{
															 //苹果登录且查询不到登陆信息的时候
															 that.addUserInfoWhat();
														  }
														   uni.hideNavigationBarLoading();
													  },
													  fail: (err)=>{
														  that.noClick = true;
														  uni.hideNavigationBarLoading();
														  uni.setStorageSync("isLogin",false);
														  uni.showToast({
															  icon: 'none',
															  position: 'bottom',
															  title: '登录错误'
														  });
														  console.log("=错误==="+JSON.stringify(err));
													  }
													});
												}else{
													 uni.hideNavigationBarLoading();
													that.noClick = true;
													uni.showToast({
														title:"授权失败"
													})
												}
											},
											fail:err => {
												that.noClick = true;
												uni.hideNavigationBarLoading();
												uni.showToast({
													title:"授权失败"
												})
											}
										});
									},
									fail: err => {
										that.noClick = true;
										uni.hideNavigationBarLoading();
										uni.showModal({
											content:'授权失败'
										})
									}
								});
						 }else{
							 that.noClick = true;
							 uni.hideNavigationBarLoading();
							 uni.showModal({
								content:'授权失败'
							 })
						 }
					},
					fail: err => {
						that.noClick = true;
						uni.hideNavigationBarLoading();
						uni.showToast({
							title:'登录失败',
							icon:'none'
						})
					}
				})
			},
			async addUserInfoWhat(){				
				let url = this.$baseUrl+'/user/addWhatUserInfo';
				console.log(url);
				const res = await this.$myRequest({
								url: url,
								data:this.jsonData,
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
			async addUserInfoUnverify(phone){
				let url = this.$baseUrl+'/user/addPhoneUserInfo';
				console.log(url);
				const res = await this.$myRequest({
								url: url,
								data:{phone:phone},
								method:"POST"
							});	
				console.log(JSON.stringify(res));
				//uni.setStorageSync("userVo",res.data.userVo);
				console.log(JSON.stringify(res));
				uni.setStorageSync("isLogin",true);
				uni.switchTab({
					url:"../my/my"
				})
			},
			//click事件函数
			gotoPre:function(){
				uni.switchTab({
					url:"../index/index"
				})
			},
			methodBlur(){
				uni.setStorageSync("phoneData",this.phoneData);
			},
			startLogin(){
				
				if(!this.flag){
					uni.showModal({
						content:"请先阅读并同意协议"
					})
					this.noClick = true;
					return;
				}
				
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
					if (this.phoneData.trim() == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '手机号不能为空'
						});
						return;
					}
					if (!/^1\d{10}$/.test(this.phoneData)) {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '请正确填写手机号'
						});
						this.noClick = true;
						return;
					}
					
					if (this.passData.length == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '验证码不能为空'
						});
						this.noClick = true;
						return;
					}
				uni.showNavigationBarLoading();	
				let headers={
						  "Content-Type":"application/json"  //设置一下请求头即可
					}
				let url = this.$baseUrl+'/user/findUserByPhone?phone='+this.phoneData+"&sendCode="+this.passData+"&openId="+this.jsonData.openId+"&appleData=";
				uni.request({
						  url: url,
						  method: 'GET',
						  header: headers,
						  success: (res)=>{
							  uni.setStorageSync("isLogin",true);
							  this.userVo = res.data.userVo;
							  uni.setStorageSync("userVo",this.userVo);
							  this.isRotate=false;
							  console.log(JSON.stringify(res));
							  
							  if(res.data.success && this.userVo!=null && this.userVo != ""){
								  uni.showToast({
									  icon: 'none',
									  position: 'bottom',
									  title: '登录成功'
								  });
								  uni.switchTab({
									url:"../my/my"
								  });
							  }else{
								  uni.showToast({
									  icon: 'none',
									  position: 'bottom',
									  title: '手机号/验证码不对'
								  });
								  this.noClick = true;
							  }
							  uni.hideNavigationBarLoading();
						  },
						  fail: (err)=>{
							  this.noClick = true;
							  uni.hideNavigationBarLoading();
							  uni.setStorageSync("isLogin",false);
							  uni.showToast({
								  icon: 'none',
								  position: 'bottom',
								  title: '登录错误'
							  });
							  console.log("=错误==="+JSON.stringify(err));
						  }
					});
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo', 'univerify'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							if (res.provider.indexOf('apple') !== -1) {
								this.hasAppleLogin = true;
							}
							for (let i = 0; i < res.provider.length; i++) {
								const curProvider = res.provider[i];
								if (~filters.indexOf(curProvider)) {
									this.providerList.push({
										value: curProvider,
										image: '../../static/img/' + curProvider + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			sendSmsCode() {
				if (this.codeDuration) {
					uni.showModal({
						content: `请在${this.codeDuration}秒后重试`,
						showCancel: false
					})
				}
				if (!/^1\d{10}$/.test(this.mobile)) {
					uni.showModal({
						content: '手机号码填写错误',
						showCancel: false
					})
					return
				}
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'sendSmsCode',
						params: {
							mobile: this.mobile,
							type: 'login'
						}
					},
					success: (e) => {
						if (e.result.code == 0) {
							uni.showModal({
								content: '验证码发送成功，请注意查收',
								showCancel: false
							})
							this.codeDuration = 60
							this.codeInterVal = setInterval(() => {
								this.codeDuration--
								if (this.codeDuration === 0) {
									if (this.codeInterVal) {
										clearInterval(this.codeInterVal)
										this.codeInterVal = null
									}
								}
							}, 1000)
						} else {
							uni.showModal({
								content: '验证码发送失败：' + e.result.msg,
								showCancel: false
							})
						}

					},
					fail(e) {
						uni.showModal({
							content: '验证码发送失败',
							showCancel: false
						})
					}
				})
			},
			async loginByPwd() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				const data = {
					username: this.username,
					password: this.password,
					captcha: this.captchaText,
					...captchaOptions
				};
				this.loginBtnLoading = true
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'login',
						params: data
					},
					success: (e) => {
						if (e.result.code == 0) {
							this.needCaptcha = false;
							uni.setStorageSync('uni-needCaptcha', this.needCaptcha)

							uni.setStorageSync('uni_id_token', e.result.token)
							uni.setStorageSync('username', e.result.username)
							uni.setStorageSync('login_type', 'online')
							uni.setStorageSync('uni_id_has_pwd', true)
							this.toMain(this.username);
						} else {
							uni.showModal({
								content: e.result.message,
								showCancel: false
							})

							this.needCaptcha = e.result.needCaptcha;
							uni.setStorageSync('uni-needCaptcha', this.needCaptcha)
							if (this.needCaptcha) {
								this.captcha('createCaptcha')
							}
						}
					},
					fail: (e) => {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					},
					complete: () => {
						this.loginBtnLoading = false
					}
				})
			},
			loginBySms() {
				if (!/^1\d{10}$/.test(this.mobile)) {
					uni.showModal({
						content: '手机号码填写错误',
						showCancel: false
					})
					return
				}
				if (!/^\d{6}$/.test(this.code)) {
					uni.showModal({
						title: '验证码为6位纯数字',
						showCancel: false
					});
					return;
				}

				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'loginBySms',
						params: {
							mobile: this.mobile,
							code: this.code
						}
					},
					success: (e) => {

						console.log('login success', e);

						if (e.result.code == 0) {
							const username = e.result.username || '新用户'
							uni.setStorageSync('uni_id_token', e.result.token)
							uni.setStorageSync('username', username)
							uni.setStorageSync('login_type', 'online')
							this.toMain(username);
						} else {
							uni.showModal({
								content: e.result.msg,
								showCancel: false
							})
							console.log('登录失败', e);
						}

					},
					fail(e) {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					}
				})
			},
			bindLogin() {
				switch (this.loginType) {
					case 0:
						this.loginBySms()
						break;
					case 1:
						this.loginByPwd()
						break;
					default:
						break;
				}
			},
			oauth(value) {
				return new Promise((resolve, reject) => {
					// #ifdef APP-PLUS
					weixinAuthService.authorize(function(res) {
						resolve(res.code)
					}, function(err) {
						console.error(err)
						reject(new Error('微信登录失败'))
					});
					// #endif
					// #ifdef MP-WEIXIN
					uni.login({
						provider: 'weixin',
						success(res) {
							resolve(res.code)
						},
						fail(err) {
							console.error('授权登录失败：' + JSON.stringify(err));
							reject(new Error('微信登录失败'))
						}
					})
					// #endif
				})
			},
			getUserInfo({
				detail
			}) {
				console.log('三方登录只演示登录api能力，暂未关联云端数据');
				if (detail.userInfo) {
					this.loginLocal(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			loginLocal(nickName) {
				uni.setStorageSync('login_type', 'local')
				uni.setStorageSync('username', nickName)
				this.toMain(nickName);
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '../main/main',
				});
			},
			toLogin() {
				this.noClick = true;
				uni.showNavigationBarLoading();
				univerifyLogin().catch(err => {
					if (typeof err === 'boolean'){
						return;
					}
					univerifyErrorHandler(err);
				})
				uni.hideNavigationBarLoading();
			},
			loginByWeixin(value) {
				this.oauth(value).then((code) => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'loginByWeixin',
							params: {
								code,
							}
						}
					})
				}).then((res) => {
					if (res.result.code === 0) {

						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.setStorageSync('login_type', 'online')
						uni.setStorageSync('username', '微信用户')
						this.toMain('微信用户')
					}
				}).catch((e) => {
					console.error(e)
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					})
				})
			},
			async loginByApple(value) {
				if (!this.hasAppleLogin) {
					uni.showModal({
						showCancel: false,
						content: `暂无法使用苹果登录，Apple登录集成教程：\nhttps://ask.dcloud.net.cn/article/36651`
					})
					return
				};
				let Provider = value;
				const [loginErr, loginData] = await uni.login({
					provider: Provider
				});
				if (loginErr) {
					uni.showModal({
						showCancel: false,
						content: '苹果登录失败，请稍后再试'
					})
					return;
				}
				// 获取用户信息
				const [getUserInfoErr, result] = await uni.getUserInfo({
					provider: Provider
				});
				if (getUserInfoErr) {
					let content = getUserInfoErr.errMsg;
					if (~content.indexOf('uni.login')) {
						content = '请先完成登录操作';
					}
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + content,
						showCancel: false
					});
					return;
				}
				// uni-id 苹果登录
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'loginByApple',
						params: result.userInfo
					},
					success: (e) => {
						console.log('loginByApple success', e);
						if (!e.success) {
							uni.showModal({
								showCancel: false,
								content: JSON.stringify(e.message)
							})
							return;
						}
						const username = e.result.username || e.result.nickname;

						uni.setStorageSync('uni_id_token', e.result.token)
						uni.setStorageSync('login_type', 'online')

						this.toMain(username);
					},
					fail: (e) => {
						uni.showModal({
							content: `苹果登录失败: ${JSON.stringify(e)}`,
							showCancel: false
						})
					}
				})
			},
			async captcha(action, args) {
				if (this.captchaing) return;

				// 验证不loading
				this.captchaing = true;

				let {
					result: res
				} = await uniCloud.callFunction({
					name: 'user-center',
					data: {
						action,
						params: {
							...captchaOptions,
							...args
						}
					}
				})
				this.captchaing = false;
				if (res.code === 0) {
					this.captchaBase64 = res.captchaBase64
				} else {
					uni.showToast({
						icon: 'none',
						title: res.message,
						duration: 1000
					})
				}
				return res;
			}
			}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
	.action-row {
		color: #999999;
		font-size: 25rpx;
		padding-left: 2rem;
	}
	.login-type {
		display: flex;
		justify-content: center;
	}

	.login-type-btn {
		line-height: 30px;
		margin: 0px 15px;
	}

	.login-type-btn.act {
		color: #0FAEFF;
		border-bottom: solid 1px #0FAEFF;
	}

	.send-code-btn {
		width: 120px;
		text-align: center;
		background-color: #0FAEFF;
		color: #FFFFFF;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.captcha-view {
		line-height: 0;
		justify-content: center;
		align-items: center;
		display: flex;
		position: relative;
		background-color: #f3f3f3;
	}
</style>
