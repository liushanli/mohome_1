//let baseUrl = "http://192.168.1.8:8092"; //本地环境
let baseUrl = "http://wx.mzjsh.com:8080/mohome" ; //测试地址
//let baseUrl = "http://wx.mzjsh.com:8080/mohome" ; //正式地址
function versionInfo(){
	let user = uni.getStorageSync("userVo");
	if(user!=null && user != undefined && user != ''){
		update(user.userId);					 
	}
}

function update(userId){
	var version =plus.runtime.version;
	var type = '1';
	console.log("====="+version+"=="+type);

	let url = baseUrl+ '/user/findVersionNew?type='+type+"&userId="+userId+"&version="+version;
	console.log(url);
	// 检测升级
	// #ifdef APP-PLUS
	uni.request({
	url: url,
	method: 'GET',
	success: result => {
		console.log("====="+JSON.stringify(result));
		var data = result.data;
		if (data.success) {
				uni.showModal({
					title: "发现新版本",
					content: "确认下载更新",
					success: (res) => {
						if (res.confirm) {//当用户确定更新，执行更新
							this.doUpData(data.url);
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})	
		}else{
			console.log("佛挡杀佛的");
		}
	},
	complete: () => {
	}
	});
	// #endif
}
function doUpData(wgtUrl) {
	uni.showLoading({
		title: '更新中……'
	})
	uni.downloadFile({//执行下载
		url: wgtUrl,
		success: downloadResult => {//下载成功
			if (downloadResult.statusCode === 200) {
				uni.showModal({
					title: '',
					content: '更新成功，确定现在重启吗？',
					confirmText: '重启',
					confirmColor: '#EE8F57',
					success: function(res) {
						if (res.confirm) {
							plus.runtime.install(//安装
								downloadResult.tempFilePath, {
									force: true
								},
								function() {
										uni.showToast({
											title:"更新成功，重启中"
										})
									plus.runtime.restart();
								},
								function(e) {
									uni.showToast({
										title:"更新失败"+e
									})
								}
							);
						}
					}
				});
			}
		},
		complete: () => {
			uni.hideLoading();
		}
	});
}

export default{ 
	versionInfo
}