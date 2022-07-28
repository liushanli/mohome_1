<template>
	<view class="index">

		<view class="indexIn">
			<view class="itemList">
				<view v-if="couponList != null" class="item" v-for="(coupon,couponIndex) in couponList"
					:key="couponIndex">
					<view class="itemL">
						<image src="../../static/images/loginAPP.png"
							style="border-radius: 2rem;width: 3rem;height: 3rem;" />
					</view>
					<view class="itemM">
						<view class="itemM1">{{coupon.couponYuan}}</view>

						<view class="itemM2"><text class="text"
								style="font-size: 0.7rem;">{{coupon.addTime}}</text>
						</view>
					</view>
				</view>
				<view   v-if="couponList== null" style="text-align: center;font-size: 1rem;color: #6D6D72;">
					暂无数据
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				couponList: [{
					"couponYuan":"",
					"addTime":""
				}]
			}
		},
		onLoad() {
			uni.showNavigationBarLoading();
			this.findOrderPayRecord();
		},
		methods: {
			async findOrderPayRecord() {
				var userVo = uni.getStorageSync("userVo");
				let url = this.$baseUrl + '/user/findUserByInfo?userId='+userVo.userId;
				const res = await this.$myRequest({
					url: url
				});
				console.log(JSON.stringify(res));
				this.couponList = res.data.couponList;
				console.log(this.couponList);
				uni.hideNavigationBarLoading();
			}
		}
	};
</script>
<style>
</style>
