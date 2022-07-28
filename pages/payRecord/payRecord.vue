<template>
	<view class="index">

		<view class="indexIn">
			<view class="itemList">
				<view v-if="orderList.length > 0" class="item" v-for="(productInfo,productIndex) in orderList"
					:key="productIndex">
					<view class="itemL">
						<image src="../../static/images/loginAPP.png"
							style="border-radius: 2rem;width: 3rem;height: 3rem;" />
					</view>
					<view class="itemM">
						<view class="itemM1">{{productInfo.body}}</view>

						<view class="itemM2"><text class="text"
								style="font-size: 0.7rem;">{{productInfo.payTime}}</text>
						</view>
					</view>
					<view class="itemR">
						<view class="itemR1">
							<!-- <view v-if="productInfo.payType==1">-</view>
							<view v-if="productInfo.payType!=1">+</view> -->
							{{productInfo.onlinePay}}
						</view>
					</view>
				</view>
				<view   v-if="orderList.length <= 0" style="text-align: center;font-size: 1rem;color: #6D6D72;">
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
				orderList: []
			}
		},
		onLoad() {
			uni.showNavigationBarLoading();
			this.findOrderPayRecord();
		},
		methods: {
			async findOrderPayRecord() {
				var userVo = uni.getStorageSync("userVo");
				let url = this.$baseUrl + '/order/findPayOrder';
				const res = await this.$myRequest({
					url: url,
					data: {
						userId: userVo.userId
					},
					method: "POST"
				});
				this.orderList = res.data.payRecordList;
				console.log(JSON.stringify(res));
				uni.hideNavigationBarLoading();
			}
		}
	};
</script>
<style>
</style>
