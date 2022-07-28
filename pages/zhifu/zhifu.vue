<template>
	<view>
<!-- 	    <web-view :src="url" @message = "message" ></web-view>
		 --><web-view :src="url" @message = "message"></web-view>
		
		<!-- <view :v-html="contents"></view> -->
		<!-- <p :v-html = 'contents'></p> -->
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				orderId:'',
				url:'',
				status:'',
				zhiOrderStatus:'',
				loadUrl:'',
				contents:""
			}
		},
		onLoad() {
			this.orderId = uni.getStorageSync("zhi_orderId");
			/* uni.setStorageSync("zhi_orderStatus","2"); */
			this.zhiOrderStatus = uni.getStorageSync("zhi_orderStatus");
			this.url = "http://www.shhaoyuanjk.com/Default_IOS.aspx?orderId="+this.orderId;
			//this.url = "http://www.shhaoyuanjk.com/Default.aspx?orderId=A202104012015504111684"
			//this.url = "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx25013248080825ff92f3aa99586d440000&package=4238236987&redirect_url=http%3a%2f%2fwww.shhaoyuanjk.com%2fDefault.aspx%3fisPayReturn%3dreturn%26orderId%3dA202104250048180916372";
			//this.wxPay(null);
		},
		methods: {
			getclientIp(){
				let cip = "";
			},
			message(status){
				console.log(JSON.stringify(status));
				if(status.detail.data[0].jsondata.pay_type == '1'){
					if(status.detail.data[0].jsondata.pay_code == '200'){
						this.findOrder(status);
					}else{
						uni.showModal({
							content:'支付失败'
						})	
					}
				}
			},
			async findOrder(status){
				let params = {
					orderId:this.orderId
				};
				let url = this.$baseUrl+'/user/SmsSendMsgOrder';
				const res = await this.$myRequest({
						 url:url,
						 data:params,
						 method:"POST"
				});
				console.log("参数为==="+JSON.stringify(params));
				console.log("获取的值为:"+JSON.stringify(res));
				if(res.data.payTime!=null && res.data.payTime!=""){
					this.updateWorkTime(this.orderId);
					let str = res.data.payTime+" 下给[摩之家]的订单，已支付成功，商家服务人员将与你电话联系，"+
					"请保持手机畅通，如有疑问请拨打商家客服电话,摩登生活，品质到家，摩之家祝您生活愉快";
					
					if(this.zhiOrderStatus == "1"){
						str = "支付成功";
					}
					
					this.status = res.data.status;
					this.findUserInfoById();
					
					uni.showModal({
						content:str,
						title:"摩之家",
						showCancel:false,
						success(res) {
						  if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								uni.switchTab({
									url:"../my/my"
								})
						  }
						}
					})
				}else{
					console.log("支付失败");
					uni.showModal({
						title:"摩之家",
						content:"支付失败",
						showCancel:false
					})
				}
			},
			async updateWorkTime(orderId){
				let url = this.$baseUrl+"/worker/findUpdateOrder";
				const res = await this.$myRequest({
					url: url,
					data:{orderId:orderId},
					method:"POST"						  	
				});
			},
			async findUserInfoById(){
				let user = uni.getStorageSync('userVo');
				console.log(JSON.stringify(user));
				let url = this.$baseUrl+"/user/findUserByUserId";
				const res = await this.$myRequest({
					url: url,
					data:{userId:user.userId},
					method:"POST"						  	
				});
				uni.setStorageSync('userVo',res.data.userVo);
			}
		}
	};
</script>

<style>
</style>