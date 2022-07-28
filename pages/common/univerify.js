import Vuex from '@/pages/store/index.js'

export function univerifyLogin() {
	const commit = Vuex.commit;
	const PROVIDER = 'univerify';
	
	/**
	 * reject(true) 点击其他登录方式
	 * reject(false) 关闭登录框
	 */
	return new Promise((resolve, reject) => {
		uni.getProvider({
			service: 'oauth',
			success: (res) => {
				if (res.provider.indexOf(PROVIDER) !== -1) {
					// 一键登录已在APP onLaunch的时候进行了预登陆，可以显著提高登录速度。登录成功后，预登陆状态会重置
					uni.login({
						provider: PROVIDER,
						setPrivacyState:true,
						univerifyStyle: {
							"fullScreen": true,
							"privacyTerms": {  
							        "defaultCheckBoxState":false // 条款勾选框初始状态 默认值： true 
							}
						},
						success: (res) => {
							console.log(JSON.stringify(res));
							uni.showLoading();
							uniCloud.callFunction({
								name: 'mozhijia',
								data: {
									access_token: res.authResult.access_token, // 客户端一键登录接口返回的access_token
									openid: res.authResult.openid // 客户端一键登录接口返回的openid
								},
								success: (e) => {
									console.log('login success', e);

									if (e.result.code == 0) {
										const username = e.result.phoneNumber

										//uni.setStorageSync('uni_id_token', e.result.token)
										uni.setStorageSync('username', username)
										//uni.setStorageSync('login_type', 'online')
										console.log("===username=="+username);
										uni.setStorageSync('univerifyStatus', "1")
										/* uni.navigateTo({
											url:"/pages/my/my"
										}); */
										commit('login', username)
										
										resolve();
										uni.closeAuthView();
										
										
									} else {
										uni.showModal({
											title: `登录失败: ${e.result.code}`,
											content: e.result.message,
											showCancel: false
										})
										console.log('登录失败', e);

										e.result.errMsg = e.result.message;
										uni.closeAuthView();
									}
								},
								fail: (e) => {
									uni.showModal({
										title: '登录失败',
										content: e.errMsg,
										showCancel: false
									})
									uni.closeAuthView();
								},
								complete: () => {
									console.log("==hideLoading==");
									uni.hideLoading()
									uni.closeAuthView();
								}
							})
						},
						fail: (err) => {
							console.error('授权登录失败：' + JSON.stringify(err));
							// 一键登录点击其他登录方式
							if (err.code == 30002) {
								uni.closeAuthView();
								reject(true);
								return;
							}
							
							// 关闭登录
							if (err.code == 30003) {
								uni.closeAuthView();
								reject(false);
								return;
							}

							reject(err);
						}
					})
				} else {
					reject();
				}
			},
			fail: (err) => {
				console.error('获取服务供应商失败：' + err.errMsg);
				reject(err)
			}
		});
	})
}

export function univerifyErrorHandler(err, cb) {
	if (!err) {
		cb && cb()
		return
	};

	const state = Vuex.state;
	const obj = {
		/* showCancel: true,
		cancelText: '其他登录方式',
		success(res) {
			if (res.cancel) {
				cb && cb()
			}
		} */
	}

	switch (true) {
		// 未开通
		case err.code == 1000:
			uni.showModal(Object.assign({
				title: `登录失败`,
				content: `${err.errMsg}，错误码：${err.code}\n开通指南：https://ask.dcloud.net.cn/article/37965`,
			}, obj));
			break;
			// 预登陆失败
		case err.code == 30005:
			/* uni.showModal(Object.assign({
				showCancel: false,
				title: `预登录失败`,
				content: "请您手动点击登陆"
			}, obj)); */
			
			break;
			//用户关闭验证界面
		case err.code != 30003:
			uni.showModal(Object.assign({
				showCancel: false,
				title: `登录失败`,
				content: `${err.errMsg}，错误码：${err.code}`,
			}, obj));
			break;
	}
}
