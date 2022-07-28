<template>
	<view class="zhaopin">
		<view class="">
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<1"></view>
				<view class="fpcontlL"  v-if="status>=3" style="background-color:#B2B2B2"></view>
				<!-- <view class="fpcontlL"  v-if="status=1" style="background-color: #09F975;"></view> -->
				<view class="flex1" style="color: #FF0000;">用户已付款</view>
				<view class="fpcontlR" style="color: #999999;">{{time_1}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<3"></view>
				<view class="fpcontlL"  v-if="status>3" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status == 1" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">服务待接单</view>
				<view class="fpcontlR" style="color: #999999;">{{time_2}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<3"></view>
				<view class="fpcontlL"  v-if="status>3" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==3" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">服务已接单</view>
				<view class="fpcontlR" style="color: #999999;">{{time_3}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<4"></view>
				<view class="fpcontlL"  v-if="status>4" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==4" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">服务人员已出发</view>
				<view class="fpcontlR" style="color: #999999;">{{time_4}}</view>
			</view> 
			 <view class="fpcontl">
				<view class="fpcontlL" v-if="status<5"></view>
				<view class="fpcontlL"  v-if="status>5" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==5" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">服务人员已到达</view>
				<view class="fpcontlR" style="color: #999999;">{{time_5}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<6"></view>
				<view class="fpcontlL"  v-if="status>6" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==6" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">服务人员开始服务</view>
				<view class="fpcontlR" style="color: #999999;">{{time_6}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<7"></view>
				<view class="fpcontlL"  v-if="status>7" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==7" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">服务人员确认完成</view>
				<view class="fpcontlR" style="color: #999999;">{{time_7}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<8"></view>
				<view class="fpcontlL"  v-if="status>8" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==8" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">用户确认完成</view>
				<view class="fpcontlR" style="color: #999999;">{{time_8}}</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL" v-if="status<9"></view>
				<view class="fpcontlL"  v-if="status>9" style="background-color:#B2B2B2"></view>
				<view class="fpcontlL"  v-if="status==9" style="background-color: #09F975;"></view>
				<view class="flex1" style="color: #FF0000;">用户待评价</view>
				<view class="fpcontlR" style="color: #999999;">{{time_9}}</view>
			</view>
		</view>
		<view style="text-align: center;color: #555555;margin-top:1rem;font-size: 0.8rem;">摩之家上门按摩，数十万人的选择</view>
	</view>
	
</view>
</template>
<script>
	export default {
		data() {
			return {
				statusInfo:'',
				list:[],
				time_1:'',
				time_2:'',
				time_3:'',
				time_4:'',
				time_5:'',
				time_6:'',
				time_7:'',
				time_8:'',
				time_9:''
				
			}
		},
		 onLoad() {
			this.statusInfo = uni.getStorageSync("orderStatus");
			this.status =this.statusInfo.status;
			this.orderId = this.statusInfo.orderId;
			this.getOrderStatus();
			
		},
		methods: {
			async getOrderStatus(){
				let url = this.$baseUrl+"/order/orderStatusInfo";
				const res = await this.$myRequest({
					url:url,
					method:"POST",
					data:{orderId:this.orderId}
				});
				if(res.data.orderStatusList!=null){
					let orderStatusList = res.data.orderStatusList;
					this.time_1 = orderStatusList.time_1;				
					this.time_2 = orderStatusList.time_2;
					this.time_3 = orderStatusList.time_3;
					this.time_4 = orderStatusList.time_4;
					this.time_5 = orderStatusList.time_5;
					this.time_6 = orderStatusList.time_6;
					this.time_7 = orderStatusList.time_7;
					this.time_8 = orderStatusList.time_8;
					this.time_9 = orderStatusList.time_9;
				}
				console.log(JSON.stringify(res));
			}
			
		}
	};
</script>
<style>
	.fpcontlL{
		border: 1px solid #F4F5F6;
		border-radius: 0.5rem;
		width: 0.5rem;
		height: 0.5rem;
		background-color:#EEEEEE;
		margin-top: 0.4rem;
		margin-right: 0.2rem;
	}
</style>
