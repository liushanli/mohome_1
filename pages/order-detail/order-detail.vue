<template>
	<view class="order-detail">
		<view class="oitems" v-if="orderList[0].status == 0">
			<view class="vslitm">
				<view class="vslitm1" style="color: #F9221D;margin-left: 5rem;font-size: 1rem;">待支付：{{times}}</view>
				<view class="vslitm2"></view>
			</view>
		</view>
		
		<view class="oitems">
			<view class="item">
				<view class="itemL">
					<image :src="orderList[0].imgUrl" style="border-radius: 2rem;"></image>
				</view>
				<view class="itemM">
					<view class="itemM1">
						{{orderList[0].productName}}
					</view>
					<view class="itemR1">
						<image src="/static/images/clock.png"></image> {{orderList[0].productTime}}分钟
					</view>
				</view>
				<view class="itemR">
					<view class="itemM2">￥<text class="text">{{productMoney}}</text>

					</view>
				</view>
			</view>
			<view class="hr"></view>
		</view>

		<view class="oitems">
			<view class="vslitm">
				<view class="vslitm1">合计(实付)</view>
				<view class="vslitm2">￥{{totalMoney}}</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">夜间车费</view>
				<view class="vslitm2">￥{{orderList[0].trafficPrice}}</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">补差价</view>
				<view class="vslitm2">￥{{orderList[0].fillMoney}}</view>
			</view>
		</view>

		<view class="oitems">
			<view class="vslitm">
				<view class="vslitm1">订单号</view>
				<view class="vslitm2">{{orderList[0].orderId}}</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">预约时间</view>
				<view class="vslitm2">{{this.orderList[0].aboutTime}}</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">备注</view>
				<view class="vslitm2">{{this.orderList[0].remarks}}</view>
			</view>
		</view>

		<view class="oitems">
			<view class="vslitm">
				<view class="vslitm1" @tap="makePhoneCall"  :data-value='orderList[0].servicePhone' style="color: #007AFF;border-bottom: #007AFF 1rpx solid;">联系客服</view>
				<view v-if="orderList[0].status == 1 || (orderList[0].status>=3 && orderList[0].status<=6)" class="vslitm2" :data-value='orderList[0].workerPhone' @tap="makePhoneCall" style="color: #007AFF;border-bottom: #007AFF 1rpx solid;">联系技师</view>
			</view>
		</view>

		<view class="oitems">
			<view class="zaici">
				<view class="zaici1">
					<image :src="orderList[0].workerImg"></image>
				</view>
				<view class="zaici2">{{orderList[0].workerName}}</view>
				<navigator :url="url" open-type="navigate" v-if="orderList[0].status!=0">
				<view  class="zaici3">再来一单</view>
				</navigator>
				<view v-if="orderList[0].status==0" class="zaici3" @tap="nowZhi">立即支付</view>
			</view>
		</view>
		<view style="text-align: center;color: #555555;margin-top:2.7rem;font-size: 0.8rem;">摩之家上门按摩，数十万人的选择</view>
		
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog">
			<uni-popup-dialog title="提示" :content="content" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	
	</view>
</template>

<script>
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
				uniPopupDialog
			},
		data() {
			return {
				orderList: [{
					productName: '',
					imgUrl: '',
					productTime: '',
					serviceNumber: '',
					payOnline: '',
					trafficPrice: '',
					orderId: '',
					aboutTime: '',
					workerName: '',
					workerId: '',
					totalMoney:0,
					productMoney:0,
					workerPhone:'',
					status:'0'
				}],
				times:'00:00',
				orderId: '',
				totalMoney:0,
				productMoney:0,
				url:'../jishi-detail/jishi-detail',
				content:'',
				phoneNumber:''
			}
		},
		onLoad(option) {
			console.log(option.orderId);
			this.orderId = option.orderId;
			this.getOrderInfo();
			
		},
		methods: {
			nowZhi(){
				uni.setStorageSync("zhi_orderId",this.orderList[0].orderId);
				uni.setStorageSync("zhi_orderStatus","2");
				uni.navigateTo({
					url:"../zhifu/zhifu"
				})
			},
			timeArr(){
				console.log(new Date());
				let curData = new Date();
				let date = new Date(this.orderList[0].addTime)
				//解决
				//
				console.log(uni.getSystemInfoSync().platform);
				if(uni.getSystemInfoSync().platform=='ios'){
					date = new Date(this.orderList[0].addTime.replace(/-/g, '/'));
				}
				date.setSeconds(date.getSeconds() + 15*60);
				var time = new Date();
				var leftTime = date - curData;
				//console.log(leftTime+"==="+date+"==="+this.orderList[0].addTime);
				let that = this;
				var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
				var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
				if((minutes == 0 && seconds >0) || ((minutes > 0 && seconds >=0))){
					let cont = setInterval(function(){
						if(seconds == 0 && minutes > 0){
							seconds = 60;
						}	
						seconds=seconds-1;
						if(seconds<10){
							that.times = minutes+':'+'0'+seconds;	
						}else if(minutes<10){
							that.times = "0"+minutes+':'+seconds;	
						}
						else{
							that.times = minutes+':'+seconds;
						}
						if(minutes==0 && seconds <= 0){
							 clearInterval(cont);
						}
						//console.log(minutes+":"+seconds);
					},1000);
				}
				
			},
			makePhoneCall: function (e) {
				this.phoneNumber = e.currentTarget.dataset.value;
				this.msgType = 'success'
				this.$refs.popupDialog.open();
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				this.msgType = 'info'
				this.message = '点击了对话框的取消按钮'
				
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框点击确认按钮
			 */
			async dialogConfirm(done) {
				console.log(this.orderList[0].workerPhone+"==="+this.orderList[0].phone);
				let url = this.$baseUrl + '/order/findAddPhoneUp';
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: {
						phoneA:this.phoneNumber,
						phoneB:this.orderList[0].phone
					},
				}) ;
				console.log(JSON.stringify(res));
				let phone = res.data.phone;
				if(phone == null || phone == ""){
					phone = this.phoneNumber;
				}
				uni.makePhoneCall({
					phoneNumber: phone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
				/* uni.makePhoneCall({
					phoneNumber: this.phoneNumber,
					success: () => {
						console.log("成功拨打电话")
					}
				}) */
				console.log('点击确认');
				// 需要执行 done 才能关闭对话框
				done()
			},
			async getOrderInfo() {
				var userVo = uni.getStorageSync("userVo");
				let params = {
					userId: "",
					status: "",
					page: 1,
					orderId: this.orderId
				};
				let url = this.$baseUrl + '/order/findOrderInfoByStatus';
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: params,
				});
				this.orderList = res.data.orderList;
				//console.log(JSON.stringify(this.orderList));
				console.log(this.orderList[0].payOnline);
				this.url += "?workerId="+this.orderList[0].workerId;
				this.totalMoney = ((Number(this.orderList[0].fillMoney)+Number(this.orderList[0].payOnline))-Number(this.orderList[0].returnMoney)).toFixed(1);
				this.productMoney = (Number(this.orderList[0].payOnline)-Number(this.orderList[0].trafficPrice)).toFixed(1);
				console.log(this.productMoney);
				this.content = "将使用该'"+this.orderList[0].phone+"'号码隐藏拨出";
				if(this.orderList[0].status==0){
					this.timeArr();	
				}
				
			}
		}
	};
</script>
<style>
</style>
