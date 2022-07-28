<template>
	<view class="jishi">
		<uni-nav-bar :fixed="true" title="订单" :status-bar="true" :border="false" :shadow="false">
		</uni-nav-bar>
	<view class="orderBox">
		<view class="orderTab">
			<view :class="{'orderItem':true, 'cur': cur==0 }" @tap="retrnIndex(0,null)">
				<view class="orderImg">
					<image src="/static/images/vicon1.png" class="vicon"></image>
					<image src="/static/images/vicon1cur.png" class="viconcur"></image>
				</view>
				<view class="ordetxt">全部</view>
			</view>
		  <view :class="{'orderItem':true, 'cur': cur==1 }" @tap="retrnIndex(1,0)">
				<view class="orderImg">
					<image src="/static/images/vicon2.png" class="vicon"></image>
					<image src="/static/images/vicon2cur.png" class="viconcur"></image>
				</view>
				<view class="ordetxt">待付款</view>
			</view>
			<view :class="{'orderItem':true, 'cur': cur==2 }" @tap="retrnIndex(2,7)">
				<view class="orderImg">
					<image src="/static/images/vicon3.png" class="vicon"></image>
					<image src="/static/images/vicon3cur.png" class="viconcur"></image>
				</view>
				<view class="ordetxt">进行中</view>
			</view>
			<view :class="{'orderItem':true, 'cur': cur==3 }" @tap="retrnIndex(3,8)">
				<view class="orderImg">
					<image src="/static/images/vicon4.png" class="vicon"></image>
					<image src="/static/images/vicon4cur.png" class="viconcur"></image>
				</view>
				<view class="ordetxt">已完成</view>
			</view>
			<view :class="{'orderItem':true, 'cur': cur==4 }" @tap="retrnIndex(4,9)">
				<view class="orderImg">
					<image src="/static/images/vicon5.png" class="vicon"></image>
					<image src="/static/images/vicon5cur.png" class="viconcur"></image>
				</view>
				<view class="ordetxt">待评价</view>
			</view>

		</view>
		<view class="rooded" >
			<view class="roitem">
				<view class="roitem1" @tap="jumpUrl">
				<view class="roitem1a" style="color: #F76260;">充值返现，下单75折哦！</view>
				<view class="roitem1b"><uni-icons type="arrowright" color="#555" size="15"></uni-icons><uni-icons type="arrowright" color="#555" size="15" style="margin-left: -0.5rem;"></uni-icons></view>
				</view>
			</view>
		</view>
		
		<view class="rooded">
			<view v-if="orderList.length > 0" class="roitem" v-for="(orderInfo,orderIndex) in orderList" :key="orderIndex">
			<view class="roitem1">
				<view class="roitem1a">{{orderInfo.shopName}} <uni-icons type="arrowright" color="#555" size="15"></uni-icons></view>
				<view class="roitem1b" @tap="statusUrl" :data-id="orderInfo.orderId" :data-value="orderInfo.status" style="color: #FF0000;">{{orderInfo.statusDesc}}<uni-icons type="arrowright" color="#FF0000" size="15"></uni-icons><uni-icons type="arrowright" color="#FF0000" size="15" style="margin-left: -0.5rem;"></uni-icons></view>
			</view>
			<view class="roitem2" @tap="orderDetailById" :data-value="orderInfo.orderId">
				<view class="roitem2L" >
					<image :src="orderInfo.imgUrl"></image>
					</view>
				<view class="roitem2R">
					<view class="roitem2Ra">
						<view class="roitem2Rax">{{orderInfo.productName}}</view>
						<view class="roitem2Rax">¥{{orderInfo.payOnline}}</view>
					</view>
					<view class="roitem2Rb">
						<view class="roitem2Rbx">{{orderInfo.addTime}}</view>
						<view class="roitem2Rbx">数量：{{orderInfo.serviceNumber}}</view>
					</view>
				</view>
			</view>
			<view class="roitem3">
				<view class="robtn cur" v-if="getStatus(orderInfo.status,3)"  @tap="addProductInfo" :data-value="orderInfo.orderId"  :data-work="orderInfo.workerId" :data-shop="orderInfo.shopId">加项/补差价</view>
				<view class="flex1"></view>
				<view class="robtn" v-if="orderInfo.status == 0" @tap="orderDetailById" :data-value="orderInfo.orderId" data-status="0">去支付</view>	
				<view class="robtn" v-if="getStatus(orderInfo.status,1)" @tap="ProgramDetailInfo" :data-value="orderInfo.productId" data-status="9">再来一单</view>	
				<view class="robtn" v-if="orderInfo.status==6" @tap="sureOrder" :data-value="orderInfo.orderId">确认完成</view>
<!-- 				<view class="robtn" v-if="orderInfo.status==1" @tap="cacelOrder" :data-value="orderInfo.orderId" data-status="-1">退款/售后</view> -->
				<view class="robtn" v-if="orderInfo.status >= 7 && orderInfo.status < 9" @tap="pingjia"  :data-value="orderIndex" >评价</view>
<!-- 				<view class="robtn" v-if="(orderInfo.status >= 3 && orderInfo.status < 7) || orderInfo.status==-1" @tap="returnReadon"  :data-value="orderIndex">申诉/退款</view>	 -->
				<view class="robtn" v-if="(orderInfo.status >= 3 && orderInfo.status < 7) || orderInfo.status==-1 || orderInfo.status== 1" @tap="returnReadon"  :data-value="orderIndex">申诉/退款</view>
			</view>
		</view>
		<view v-if="orderList.length <= 0"  style="text-align: center;font-size: 1rem;color: #6D6D72;">
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
				cur: 0,
				orderList:[],
				status:'',
				otherUrl:'',
				hide:"none"
			}
		},
		onBackPress(options) {  
			//console.log("====---="+JSON.stringify(options));
		}, 
		onShow(){
			this.$versionInfo();
			if(uni.getStorageSync("cur")!=null){
				this.cur = uni.getStorageSync("cur");
				this.index = uni.getStorageSync("index");
				this.retrnIndex(this.cur,this.index);	
			}else{
				this.getOrderInfo();
			}
			//返回的时候，触发的事件
			if(uni.getStorageSync("back_Flag")!=null && uni.getStorageSync("back_Flag") == 1){
				uni.removeStorageSync("back_Flag");
				this.getOrderInfo();
			}
		},
		onTabItemTap(e) {
				if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
					return;
				}
				//console.log(uni.getStorageSync("cur"));
				if(uni.getStorageSync("cur")!=null){
					this.cur = uni.getStorageSync("cur");
					this.index = uni.getStorageSync("index");
					this.retrnIndex(this.cur,this.index);	
				}else{
					this.getOrderInfo();
				}	
		},
		onLoad(options) {
			if(uni.getStorageSync("cur")!=null){
				this.cur = uni.getStorageSync("cur");
				this.index = uni.getStorageSync("index");
				this.retrnIndex(this.cur,this.index);	
			}else{
				this.getOrderInfo();
			}
			
			
		} ,
		methods: {
			checkTime(i) { //将0-9的数字前面加上0，例1变为01
				 if (i < 10) {
					 i = "0" + i;
				 }
				 return i;
			 },
			cacelOrder(e){
				let orderId = e.currentTarget.dataset.value;
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '该订单'+orderId+",是否确认售后退款？",
				    success: function (res) {
				        if (res.confirm) {
							that.updateOrder(orderId,-1)
				            console.log('用户点击确定');
							if(that.cur == 2){
								that.getOrderInfoByCon();
							}else{
								that.getOrderInfo();	
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			sureOrder(e){
				let orderId = e.currentTarget.dataset.value;
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '该订单'+orderId+",是否确认完成？",
				    success: function (res) {
				        if (res.confirm) {
							that.updateOrder(orderId,7);
				            console.log('用户点击确定');
							that.getOrderInfo();
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			addProductInfo(e){
				let orderId = e.currentTarget.dataset.value;
				let workerId = e.currentTarget.dataset.work;
				let shopId = e.currentTarget.dataset.shop;
				uni.setStorageSync("orderId_order",orderId);
				uni.setStorageSync("workerId_order",workerId);
				uni.setStorageSync("shopId_order",shopId);
				uni.navigateTo({
					url:"../add-product/add-product"
				})
			},
			async updateOrder(orderIds,status1){
				let params = {
					orderId:orderIds,
					status:status1
				};
				let url = this.$baseUrl+'/order/updaSerOrder';
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data:params,
				});
			},
			statusUrl(e){
				let status = e.currentTarget.dataset.value;
				let id = e.currentTarget.dataset.id;
				
				uni.setStorageSync("orderStatus",{status:status,orderId:id});
				uni.navigateTo({
					url:"../order_genzong/order_genzong"
				});
			},
			jumpUrl(){
				uni.navigateTo({
					url:"../vip/vip"
				})
			},
			returnReadon(e){
				//console.log("===--");
				let nums = e.currentTarget.dataset.value;
				//console.log(this.orderList[nums].orderId);
				uni.setStorageSync("orderInfo",this.orderList[nums]);
				uni.navigateTo({
					url:"../return_money/return_money"
				})
			},
			ProgramDetailInfo(e) {
				let productId = e.currentTarget.dataset.value;
				let status = e.currentTarget.dataset.status;
				if(status){
					uni.navigateTo({
						url: "../detail/detail?productId=" + productId+"&staus=2"
					});					
				}

			},
			getStatus(status,inde){
				
				if(inde == 1){
					if('0'.indexOf(status)>-1)
						return false;
				}
				else if(inde==2){
					if('1/3/8'.indexOf(status)>-1)
						return true;
					else
						return false;
				}
				else if(inde == 3){
					if(status>=3 && status<=9)
						return true;
					else
						return false;
				}
				
			},
			pingjia(e){
				let index = e.currentTarget.dataset.value;
				let feedArr = {
					workerId:this.orderList[index].workerId,
					workerName:this.orderList[index].workerName,
					orderId:this.orderList[index].orderId
				};
				uni.setStorageSync("feedArr",feedArr);
				uni.navigateTo({
					url:"../feedback/feedback"
				})
			},
			orderDetailById(e){
				//跳转到订单详细详情
				uni.navigateTo({
					url:"../order-detail/order-detail?orderId="+e.currentTarget.dataset.value
				})
			},
			retrnIndex(cur,status){
				this.cur = cur;
				this.status = status;
				uni.setStorageSync("cur",this.cur);
				uni.setStorageSync("index",this.status);
				if(this.cur==2){
					this.getOrderInfoByCon();	
				}else{
					this.getOrderInfo();	
				}
				
			},
			async getOrderInfo(){
				uni.showNavigationBarLoading();
				var userVo = uni.getStorageSync("userVo");
				
				let params = {
					userId:userVo.userId,
					status:this.status,
					page:1
				};
				//console.log(JSON.stringify(params));
				let url = this.$baseUrl+'/order/findOrderInfoByStatus';
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data:params,
				});
				//console.log("==="+JSON.stringify(res));
				this.minute =[];
				this.orderList = res.data.orderList;
				uni.hideNavigationBarLoading();
			},
			async getOrderInfoByCon(){
				//查询订单进行中的数据
				uni.showNavigationBarLoading();
				var userVo = uni.getStorageSync("userVo");
				let params = {
					userId:userVo.userId,
					status:this.status,
					page:1
				};
				let url = this.$baseUrl+'/order/findOrderInfoByStatusByCon';
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data:params,
				});
				this.orderList = res.data.orderList;
				uni.hideNavigationBarLoading();
			}
		}
	}
</script>

<style>
	.robtn{
		width: auto;
		height: 1.5rem;
		text-align: center;
		padding: 0.3rem;
		border-radius: 1rem;
	}
	

</style>
