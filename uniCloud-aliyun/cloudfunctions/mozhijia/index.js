'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const res = await uniCloud.getPhoneNumber({
		appid:'__UNI__E620529',
		provider:'univerify',
		apiKey:'e6ca8b3067f3d07be9801031ad7f3d60',
		apiSecret:'e62973699b6041fa0564a2c8de732bc6',
		access_token:event.access_token,
		openid:event.openid
	})	
	//返回数据给客户端
	return res
};
