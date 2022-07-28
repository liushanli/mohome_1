<template>
	<view class="jishi-detail">
		<view class="itemde">
			<view style="color: #F76260; text-align: center;">
				在线补差价，售后有保障。随机立返0.1~99元！
			</view>
			<view style="font-size: 1rem;font-weight: bold;margin: 1rem 0rem;">
				补差价金额
			</view>
			<view>
				<input type="number" placeholder="0.00" v-model="buchaMoney" @blur="changeMoney" style="border-bottom: #999999 1px solid;font-size: 0.8rem;" />
			</view>
			<view style="font-size: 1rem;font-weight: bold;margin: 1rem 0rem;">补差价备注</view>
			<view>
				<input type="text" placeholder="请填写备注" v-model="fillReason" style="border-bottom: #999999 1px solid;font-size: 0.8rem;" />
			</view>
			<view style="color: #F76260;margin: 0.7rem 0rem 1rem;">
				<text>简短注明补差价项目或缘由,为了便于售后服务</text>
			</view>
	
		</view>
		<view class="itemde">
			<view class="seritem" v-for="(productInfo,productIndex) in productList" :key="productIndex">
				<view class="seritmL"><image :src="productInfo.imgUrl" style="border-radius: 3rem;"></image></view>
				<view class="seritmR">
					<view class="seritmR1">{{productInfo.productName}}</view>
					<view class="seritmR2">¥ <text class="text">{{productInfo.price}} </text> ￥{{productInfo.memberPrice}} <image src="/static/images/hyj.png"></image></view>
					<view class="seritmR3">
						<view class="seritmR3a">
							<image src="/static/images/hongicon.png"></image> {{productInfo.productTime}}分钟
						</view>
						<view class="seritmR3b">
							90天已售 {{productInfo.serviceNumber}}
						</view>
						<view class="seritmR3c" :style="{display: productInfo.showNumber}">
							<view class="view cur" @tap="btn_minute" :data-value="productIndex"  :data-row="productInfo.price">-</view>
							<input type="text" class="vinput" v-model="productInfo.number">
							<view class="view" @tap="btn_add" :data-value="productIndex" :data-row="productInfo.price">+</view>
						</view>
						<view class="lijibtns" :style="{display: productInfo.showButtons}" :data-row="productInfo.price" :data-price="productInfo.memberPrice"  :data-value='productIndex' :data-id ="productInfo.id"  @tap="dingYu">预约</view>
						<view class="lijibtns_1" :style="{display: productInfo.showButtons_1}">预约</view>
					</view>
				</view>
			</view>
		</view>
		 <view class="fiexFsa">
	  	<view class="fiexFsain">
	  		 合计：<text class="text1">¥</text> <text class="text2">{{momeny}}</text>
	  		<view class="flex1"></view>
	  		<button @tap="nowBuy" style="border: 1px solid #09BB07;width: 5rem;height: 2rem;font-size: 0.8rem;">去支付</button>
	  	</view>
	  </view>
	  
	  <uni-popup ref="popup" type="bottom">
	  	<div class="choiceTime">
	  		
	  		<!-- <view class="titemtems">
	  			<view>1111</view>
	  		</view> -->
			<view class="vip">
				
				<view class="vipdemm">
					<view class="zahilist">
						<view style="margin-left: -4rem;font-size: 1rem;font-weight: bold;">请选择支付方式：</view>
						<radio-group>
							<label>
								<view class="payitem">
									<radio value="1" :checked = "orderPayType==1" @tap="orderPayType=1" />
									<image src="/static/images/payicon1.png"></image>
									<view class="view">支付宝</view>
								</view>
							</label>
							<label>
								<view class="payitem">
									<radio value="2" :checked = "orderPayType==2" @tap="orderPayType=2"/>
									<image src="/static/images/payicon2.png"></image>
									<view class="view">微信</view>
								</view>
							</label>
							<label>
								<view class="payitem">
									<radio value="3" :checked = "orderPayType==3" @tap="orderPayType=3"  />
									<image src="/static/images/nvicon3.png"></image>
									<view class="view">储值余额</view>
								</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="tijiaoyy" @tap="close">
				确定购买
			</view>
	  	</div>
	  </uni-popup>
	  
	</view>
</template>

<script>
	import sunUiGrand from '../../components/sunui-grand/sunui-grand.vue';
	export default {
		data() {
			return {
				workersId:'',
				workerInfo:null,
				workerPicList:[],
				productList:[],
				shopId:'',
				userName:'',
				workerTitle:'',
				workerImageUrl:'',
				numberList:[],
				momeny:0,
				productId:'',
				productName:'',
				productIndex:'',
				memberMoney:0,
				id:'',
				evaList:[],
				count:0,
				imgUrlArr:[],
				showText:false,
				orderPayType:1,
				buchaMoney:"",
				orderId:'',
				fillReason:''
				
			}
			
		},
		components: {
			'sunui-grand': sunUiGrand
		},
		onLoad() {
			uni.showNavigationBarLoading();
			this.workersId = uni.getStorageSync("workerId_order");
			this.shopId = uni.getStorageSync("shopId_order");
			this.orderId = uni.getStorageSync("orderId_order");
			
			//this.getJishiDetail();
			this.getJishiProduct();
			//uni.hideNavigationBarLoading();
		},
		methods: {
			changeMoney(){
				if(this.buchaMoney!=''){
					this.momeny = Number(this.buchaMoney);
				}
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				console.log("==="+this.orderPayType);
				if(this.orderPayType==1){
					this.requestPayment();
				}else if(this.orderPayType==2){
					
				}else if(this.orderPayType == 3){
					this.busSurplus();
				}
				this.$refs.popup.close();
			},
			// 全文展开收起
			toggleDescription (num) {
				this.showText = !this.showText
			},
			getContent(content,img){
				
				let contentUrl = content+"<br/>";
				if(img!=''){
					let	arr = img.split("|");
					
					for(var i=0;i<arr.length;i++){
						contentUrl += "<img src='"+arr[i]+"' height='180rpx' width='auto'/>";
					}
				}
				return contentUrl;
			},
			getHeadImg(img){
				if(img!=''){
					return img;
				}else{
					return "/static/images/tx.png";
				}
			},
			async nowBuy(){
				var userVo = uni.getStorageSync("userVo");
				if(this.momeny<=0){				
					uni.showModal({
						title: '提示',
						content: '请选择一个项目或填写金额',
						});					
				}else{
					
					var jsonData = {
						orderId:this.orderId,
						body:this.fillReason,
						userId:userVo.userId,
						payOnline:this.momeny
					}
					console.log(JSON.stringify(jsonData));
					let url = this.$baseUrl+"/user/addPayRecordInfo";
					const res = await this.$myRequest({
						url: url,
						method: 'POST',
						data:jsonData,
					});
					//console.log(res.data.orderId);
					if(res.data.orderId!="" && res.data.orderId!=null){
						console.log(res.data.orderId);
						uni.setStorageSync("zhi_orderId",res.data.orderId);
						uni.setStorageSync("old_orderId",res.data.orderId);
						uni.setStorageSync("zhi_orderStatus","2");
						/* uni.navigateTo({
							url:"../zhifu/zhifu"
						}) */
						if(uni.getSystemInfoSync().platform == 'ios'){
							uni.navigateTo({
								url:"../zhifu/zhifu"
							})
						}else{
							uni.navigateTo({
								url:"../zhifu-android/zhifu-android"
							})
						}
					}
				}
			},
			jumbUrl:function(event){
				uni.navigateTo({
					url:"../common/image/imge?current="+event.currentTarget.dataset.value
				});
			},
			dingYu(eve){
				
				//获取用户的基本信息
				if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
					return;
				}
				let userVo = uni.getStorageSync("userVo");
				if(userVo.cardId !='' && userVo.cardId !=null){
					this.memberMoney = eve.currentTarget.dataset.price;
				}else{
					this.memberMoney = eve.currentTarget.dataset.row;
				}
				let index = eve.currentTarget.dataset.value;
				this.productId = eve.currentTarget.dataset.id;
				this.productIndex = index;
				this.btn_add(eve);
				for(let i=0;i<this.productList.length;i++){
					if(i==index){
							this.productList[index].showNumber = "";
							this.productList[index].showButtons = "none";
							this.productList[index].showButtons_1 = "none";
					}else{
						this.productList[i].showNumber = "none";
						this.productList[i].showButtons = "none";
						this.productList[i].showButtons_1 = "";
					}
					
				}
			},
			async getJishiDetail(){
				let dataParam = {
					"workerId":this.workersId,
					"shopId":"",
					"page":1,
					"size":4
				};	
				let url = this.$baseUrl+'/worker/findWorkListByShop';
				const res = await this.$myRequest({
					url:url,
					method:"POST",
					data:dataParam
				});
				if(res.data.success){
					 this.workerInfo = res.data.workerList[0];
					 console.log(JSON.stringify(this.workerInfo));
					 this.shopId = this.workerInfo.shopId;
					 this.workerPicList = res.data.workePicrList;
					 uni.setStorageSync("workerPicList",this.workerPicList);
					 this.userName = this.workerInfo.userName;
					 this.workerTitle = this.workerInfo.introduce;
					 console.log(this.workerTitle);
					 this.workerTitle=(this.workerInfo.introduce).replace(/<\/?.+?>/g, "");
					 this.workerImageUrl = this.workerInfo.imgUrl;
					 this.id = this.workerInfo.id;
					 this.findEvant();
				}
				else{
				  console.log("=错误==="+JSON.stringify(err));
				}
			},
			util(v){
			   this.xmlClear = function (v) {
				   console.log(v+"====")
			        if (typeof (v) == 'string')
			            return v.replace(/<\/?.+?>/g, "");
			    }
			 
			},
			async getJishiProduct(){
			
				let dataParam = {
					"workerId":this.workersId,
					"shopId":this.shopId
				};	
				let url = this.$baseUrl+'/product/findProductInfoByWorkId';
				const res = await this.$myRequest({
					url:url,
					method:'POST',
					data:dataParam
				});
				if(res.data.success){
					this.productList = res.data.productList;
				}else{
					 console.log("=错误==="+JSON.stringify(err));
				}
				uni.hideNavigationBarLoading();
			},
			//减去
			btn_minute: function(event) {
				var index = event.currentTarget.dataset.value;
				this.productIndex = index;
				var price = this.memberMoney;
				var list = this.productList;
				var num = list[index].number;
				if(num > 1) {
					num = num - 1;
					list[index].number = num;
					this.momeny = num * price;
					console.log(this.momeny);
				}else{
					this.momeny = 0;
					this.productId = "";
					for(let i=0;i<this.productList.length;i++){
								this.productList[index].number = 0;
								this.productList[i].showNumber = "none";
								this.productList[i].showButtons = "";
								this.productList[i].showButtons_1 = "none";
					}
				}
			},
			//添加
			btn_add: function(event) {
				var price = this.memberMoney;
				var index = event.currentTarget.dataset.value;
				this.productIndex = index;
				// 强转int类型
				var num =parseInt(this.productList[index].number);
				num =num + 1;
				console.log(num+"==="+price);
				this.momeny = num * price;
				this.productList[index].number = num;
			},
			async requestPayment() {
				
				this.loading = true;
				const provider = 'alipay'
			
				let order_1 = await this.getOrderInfo(provider);
				let orderInfo = order_1.order;
				console.log(JSON.stringify(order_1));
			
				if (!orderInfo) {
					uni.showModal({
						content: '获取支付信息失败',
						showCancel: false
					})
					return
				}
				this.orderAddInfo.orderId = order_1.out_trade_no;
				this.orderAddInfo.orderPayType = 1;
				this.orderAddInfo.aboutTime = this.todayTimes[this.timeCur].dateStr+" "+this.todayTimes[this.timeCur].dateHHmm;
				this.orderAddInfo.trafficPrice = this.CarPrice;
				
				uni.requestPayment({
					provider,
					orderInfo: orderInfo,
					success: (e) => {
						console.log("success", e);
						uni.showToast({
							title: "支付成功"
						});
						
						var d = new Date();
						var date = d.getFullYear() + "-" +(d.getMonth() + 1) + "-" + d.getDate() + " "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
						this.orderAddInfo.orderPayTime = date;
						this.orderAddInfo.status = 1;
						this.addOrder();
						//更改用户
						this.updUser();
						
						uni.navigateTo({
							url:"../order-detail/order-detail"
						});
						
						
					},
					fail: (e) => {
						this.orderAddInfo.status = 2;
						this.addOrder();
						console.log("fail", e.errMsg);
						uni.showToast({
							title: "支付取消"
						});
					},
					complete: () => {
						this.loading = false;
					}
				});
				
			},
			getOrderInfo(provider) {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: this.$baseUrl + '/user/findRepayList',
						data: {
							provider,
							openid: this.openid,
							totalFee: 0.01, // 转为以分为单位
							// #ifdef APP-PLUS
							platform: 'app-plus',
							// #endif
							// #ifdef MP-WEIXIN
							platform: 'mp-weixin',
							// #endif
							content: "加价/补差价",
							subject: "加价/补差价",
							totalAmount: 0.01
						},
						success(res) {
							if (res.data.order != null) {
								resolve(res.data)
							} else {
								reject(new Error('获取支付信息失败'))
							}
						},
						fail(err) {
							reject(new Error('请求支付接口失败' + err))
						}
					})
				})
			},
			busSurplus(){
				//余额购买项目
				if(this.userInfo<this.jsonData.productPrice){
					uni.showModal({
						content: '余额不足，请先充值',
						showCancel: false
					})
					return;
				}
			}
			
		}
	}
</script>

<style>
.lijibtns{
		width: 3rem;
	    height: 2rem;
	    -webkit-border-radius: 23px;
	    border-radius: 1rem;
	    text-align: center;
	    line-height: 2rem;
	    color: #fff;
	    font-size: 0.8rem;
	    background-image: linear-gradient(to right, #09f975, #029f3e);
}
.lijibtns_1{
	width: 3rem;
	height: 2rem;
	-webkit-border-radius: 23px;
	border-radius: 1rem;
	text-align: center;
	line-height: 2rem;
	color: #3B4144;
	font-size: 0.8rem;
	background-image: linear-gradient(to right, #C8C7CC, #EEEEEE);
}
</style>
