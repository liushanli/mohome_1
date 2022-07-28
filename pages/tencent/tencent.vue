<template>
	<view>
		<view style="text-align: center;margin-top: 4rem;">
			<p style="color: #4CD964;">摩之家上门服务</p>
			<canvas style="width: 13rem;height: 13rem;margin:0 auto;" canvas-id="code" @longtap="bc_code">
				<image :src="codeImg" style="width: 13rem;height: 13rem;"></image>
			</canvas>
			<p style="color: #B2B2B2;font-size: 0.6rem;">长按保存图片</p>
			<p style="color: #B2B2B2;font-size: 0.6rem;">通过微信“扫一扫”二维码，找到我们</p>
		</view>
		<view style="text-align: center;color: #555555;margin-top:18rem;font-size: 0.8rem;">摩之家上门按摩，数十万人的选择</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				codeImg: this.$imgUrl+'/tent/tent.png'
			}
		},
		onLoad() {},
		methods: {
			//长按保存二维码
			bc_code() {
				/* var that = this;
				uni.downloadFile({
					url: that.codeImg,
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.statusCode === 200) {
							plus.barcode.scan(res.tempFilePath, (type, res) => {
								uni.hideLoading()
								if (type == 0) {
									plus.runtime.openURL(res)
								}
							}, (e) => {
								uni.hideLoading()
								if (e.code == 3) {
									tools.showToast('未识别到二维码')
								} else {
									tools.showToast('无法识别此图片')
								}
							})
						}
					}
				}) */
				let that = this;
				console.log('保存二维码')
				uni.downloadFile({ //获得二维码的临时地址
					url: that.codeImg,
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.statusCode == 400 || res.statusCode == 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath, //传入临时地址
								success() {
									uni.showToast({
										title:"保存成功"
									})
								},
								fail() {
									uni.showToast({
										title:"保存失败"
									})
								}
							})
						}
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})
			}
		}
	}
</script>
