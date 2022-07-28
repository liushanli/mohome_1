<template>
	<view class="zhaopin">
		<view class="">
			<view class="fpcontl">
				<view class="fpcontlL"><label style="color: #F9221D;">*</label>退款金额</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" v-model="json.returnMoney" disabled="true"></view>
			</view>

			<view class="fpcontl">
				<view class="fpcontlL"><label style="color: #F9221D;">*</label>退款理由</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><textarea style="width: 14rem;"  class="finput" v-model="json.returnReason" placeholder="请输入申请退款的理由"></textarea></view>
			</view>
			<view class="tijiaoyy" @tap="submitAddress">
					提交
			</view>
		</view>
		<view style="color: #B2B2B2;margin-top: 1rem;"><rich-text :nodes="content"></rich-text></view>
		<view style="text-align: center;color: #09F975;margin-top:13rem;">摩之家上门按摩，数十万人的选择</view>
	</view>
	
</view>
</template>
<script>
	export default {
		data() {
			return {
				json:{
					orderId:'',
					returnMoney:'',
					returnReason:''
				},
				shopId:'',
				content:''
			}
		},
		onLoad() {
			let orderInfo = uni.getStorageSync("orderInfo");
			console.log(JSON.stringify(orderInfo));
			this.json.returnMoney = orderInfo.payOnline;
			this.shopId = orderInfo.shopId;
			this.json.orderId = orderInfo.orderId;
			this.getShopInfo();
		},
		methods: {
			
			async submitAddress(){
				  if(this.json.returnReason==''){
					  uni.showModal({
					  	content:"请填写退款理由",
						showCancel:false
					  });
						return;
				  }
				  //console.log(JSON.stringify(this.json));
				  let that = this;
				  const res = await this.$myRequest({
					  url:that.$baseUrl+"/order/updReturnOrder",
					  data:that.json,
					  method:'POST'
				  });
				  if(res.data.success){
					  /* uni.showToast({
					  	title:"提交成功"
					  }) */
					  uni.showModal({
					  	content:"提交成功",
						showCancel:false,
						success() {
							
							/* uni.navigateBack({
								delta:-1
							}) */
							let pages = getCurrentPages();
							let beforePage = pages[pages.length-2];
							if(beforePage.onLoad){
								beforePage.onLoad();
							}
							uni.setStorageSync("back_Flag",1);
							uni.navigateBack({
								delta:1
							})
							
						}
					  })
					
				  }
			},
			async getShopInfo(){
				let url = this.$baseUrl+"/shop/findShopInfo";
				console.log("==="+this.shopId);
				var that = this;
				const  res = await this.$myRequest({
					url:url,
					data:{
						shopId:that.shopId
					},
					method:'POST'
				});
				//console.log(JSON.stringify(res));
				this.content = res.data.shopList[0].returnInfo;
				
				
			}
		}
	}
</script>
