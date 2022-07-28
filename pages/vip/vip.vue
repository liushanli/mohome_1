<template>
	<view class="vip">
		<view class="viptop">
			<image src="/static/images/hybg.jpg" class="hybg" ></image>
			<view @tap = 'back'>
				<uni-nav-bar :fixed="true" :status-bar="true" :border="false" :shadow="false" color="#fff" title="开通会员" backgroundColor="transparent" left-icon="arrowleft">
				</uni-nav-bar>
			</view>
	    <view class="vipboxT">
	    	<view class="vipboxT1"><image :src="headImg" style="border-radius: 3rem;"></image></view>
	    	<view class="vipboxT2">
	    		<view class="vipboxT2a">
	    			<view class="view1">{{nickName}}</view>
					<view class="view2" @tap="vipDetail">会员卡协议 <image src="/static/images/qes.png"></image></view>				
	    		</view>
	    		<view class="vipboxT2b">{{openInfo}}</view>
	    	</view>
	    </view>
	    
    </view>


    <view class="vipdemm">
		<radio-group>
			<view class="viptitle" style="color: #F1F1F1;"><radio   value="2" :checked="chooseFirst=='2'" @tap ="radio_first('2')"/>充值返现
			 <label style="position: absolute; right: 1rem;color: #D8D8D8;font-size: 0.8rem;">最低7.5折</label>
			</view>
			<view class="fnaxin taocanlist">
				<view class="fanitem" v-for="(four,fourIndex) in checkFourArr" :key="fourIndex"  :class="{taoitem: true, 'cur': indexCur==fourIndex}" @tap="checkFour(fourIndex)">{{four.title}}</view>
			</view>
    	 <view class="viptitle"><radio value="1" :checked="chooseFirst=='1'" @tap ="radio_first('1')" />选择会员套餐
		 <label style="position: absolute; right: 1rem;color: #6D6D72;font-size: 0.8rem;">下单9.5折</label>
		 </view>
	    	<view class="taocanlist">
	    		<view v-for="(vipg,ticeIndex) in checkTiceArr" :key="ticeIndex"  :class="{taoitem: true, 'cur': cur==ticeIndex}" @tap="checkTice(ticeIndex)">
	    			<view class="taoitem1">¥<text class="text">{{vipg.price}}</text></view>
	    			<view class="taoitem2">{{vipg.cardName}}</view>
	    		</view>
	    	</view>
    	
		
		</radio-group>
		<view class="vipboxB">
			<view class="vipboxBtl">会员优享特权</view>
		
			<view class="vipboxBtb">
				<view class="vsbItem">
					<view class="vsbItem1"><image src="/static/images/tequan1.png"></image></view>
					<view class="vsbItem2">会员专享价</view>
				</view>
		
				<view class="vsbItem">
					<view class="vsbItem1"><image src="/static/images/tequan2.png"></image></view>
					<view class="vsbItem2">极速退款</view>
				</view>
		
				<view class="vsbItem">
					<view class="vsbItem1"><image src="/static/images/tequan3.png"></image></view>
					<view class="vsbItem2">专属客服</view>
				</view>
		
				<view class="vsbItem">
					<view class="vsbItem1"><image src="/static/images/tequan4.png"></image></view>
					<view class="vsbItem2">优惠次数不限</view>
				</view>
		
		
			</view>
		</view>
    	
    	<view class="viptitle">需支付：{{totalAmount}}元</view>
			<button type="primary" @tap="$noMultipleClicks(sureLogin)">确定</button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick:true,
				cur: -1,
				indexCur:0,
				nickName:'',
				title: 'request-payment',
				loading: false,
				price_1: 0,
				providerList: [],
				content:'开通会员',
				subject:'',
				totalAmount:0,
				chooseFirst:'2',
				openInfo:'未开通',
				chooseTwo:'1',
				user:'',
				checkTiceArr:[],
				checkFourArr:[],
				headImg:"",
				bodyInfo:'',
				status:1,
				flag:'true'
			}
		},
		onLoad() {
			
			if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null){
				uni.setStorageSync("meStatus","Y");
				uni.navigateTo({
					url:'../login/login1'
				});
				return;
			}
			this.findCheckFourArr();
	
			this.user = uni.getStorageSync("userVo");
			//console.log(JSON.stringify(this.user));
			this.nickName = this.user.nickName;
			if(this.user.level!=0){
				this.openInfo = '已开通'
			}
			if(this.user.imgUrl==""){
				this.headImg="/static/images/hybg.jpg";
			}else{
				this.headImg = this.user.imgUrl;
			}
			console.log(this.chooseFirst);
			
		},
		methods: {
			vipDetail(){
				uni.navigateTo({
					url:'../vipDetail/vipDetail'
				})
			},
			async findCheckFourArr(){
					let headers = {
						"Content-Type": "application/json" //设置一下请求头即可
					}
					let url = this.$baseUrl + '/user/findAccountInfo';
					const res = await this.$myRequest({
						url: url,
						method: "POST"
					
					});
					//console.log(JSON.stringify(res));
					for(var i=0;i<res.data.list.length;i++){
						this.checkFourArr[i] = res.data.list[i]; 
					}
					this.findCardList();
					
			},
			radio_first(e){
				console.log(e);
				//1:选择会员套餐 2:选择充值返现
				this.chooseFirst = e;
				if(e=='1'){
					this.indexCur = -1;
					if(this.cur==-1){
						this.cur = 0;
					}
					this.totalAmount = this.checkTiceArr[this.cur].price;
					this.subject = "会员："+this.checkTiceArr[this.cur].cardName+"为"+this.checkTiceArr[this.cur].price;
					this.content = '开通会员';
					this.price_1 = this.checkTiceArr[this.cur].price;
					this.bodyInfo = this.checkTiceArr[this.cur].describe;
					this.status = 1;
				}else if(e=='2'){
					this.cur = -1;
					if(this.indexCur==-1){
						this.indexCur = 0;
					}
					this.totalAmount = this.checkFourArr[this.indexCur].price; 				
					this.subject = this.checkFourArr[this.indexCur].title;
					this.content = '充值返现';
					this.price_1 = this.checkFourArr[this.indexCur].price+this.checkFourArr[this.indexCur].sendMoney;
					this.bodyInfo = this.checkFourArr[this.indexCur].title;
					this.status = 2;
				}
			},
			radio_Twice(e){
				this.chooseTwo = e;
			},
			checkTice(index){
				//会员套餐
				this.cur = index;
				this.indexCur = -1;
				this.chooseFirst = '1';
				if(this.chooseFirst == '1'){
					this.totalAmount = this.checkTiceArr[this.cur].price;
					this.subject = "会员"+this.checkTiceArr[this.cur].cardName+"为"+this.checkTiceArr[this.cur].price;
					this.content = '开通会员';
					this.price_1 = this.checkTiceArr[this.cur].price;
					this.bodyInfo = this.checkTiceArr[this.cur].describe;
					this.status = 1;
				}
			},
			checkFour(index){
				//充值返现
				this.indexCur = index;
				this.cur = -1;
				this.chooseFirst = '2';
				
				if(this.chooseFirst == '2'){
					this.totalAmount = this.checkFourArr[this.indexCur].price; 
					this.subject = this.checkFourArr[this.indexCur].title;
					this.content = '充值返现'
					this.price_1 = this.checkFourArr[this.indexCur].price+this.checkFourArr[this.indexCur].sendMoney;
					this.bodyInfo = this.checkFourArr[this.indexCur].title;
					this.status = 2;
				}
			},
			//确定购买会员
			sureLogin(){
				this.user = uni.getStorageSync("userVo");
				//console.log(this.user.cardId+"==="+this.user.nickName+this.user.surplusMoney+"==="+this.chooseFirst);
				if(this.user.level != 0 && this.chooseFirst == '1'){
					uni.showModal({
						content: '抱歉，您已购买会员',
						showCancel: false
					});
					this.noClick = true;
					return;
				}
				this.updUser();
			},
			async requestPayment() {
			
				//更改用户
				this.updUser();
				
			},
			getOrderInfo(provider) {
				return new Promise((resolve, reject) => {
					if (!this.price_1) {
						reject(new Error('请输入金额'))
					}
					//console.log(this.openid);
					//console.log(this.content+"=="+this.subject+"==="+this.totalAmount);
					uni.request({
						method: 'POST',
						url: this.$baseUrl+'/user/findRepayList',
						data: {
							provider,
							openid: this.openid,
							totalFee: Number(this.price_1) * 100, // 转为以分为单位
							// #ifdef APP-PLUS
							platform: 'app-plus',
							// #endif
							// #ifdef MP-WEIXIN
							platform: 'mp-weixin',
							// #endif
							content:this.content,
							subject:this.subject,
							totalAmount:this.totalAmount
						},
						success(res) {
							//console.log(res.data.order);
							if(res.data.order!= null){
								resolve(res.data.order)
							}else{
								reject(new Error('获取支付信息失败'))
							}
						},
						fail(err) {
							reject(new Error('请求支付接口失败' + err))
						}
					})
				})
			},
			async updUser(){
				let user = uni.getStorageSync('userVo');
				let url = this.$baseUrl+"/user/updUserInfoCard";
				//console.log(this.price_1+"==="+user.id);
				let param = {
								userId:user.userId,
								surplusMoney:this.price_1,
								month:0,
								cardId:null,
								cardName:null,
								body:this.bodyInfo,
								payOnline:this.totalAmount,
								status:this.status,
							}
				if(this.chooseFirst == '1'){
					param.cardId = this.checkTiceArr[this.cur].cardId;
					param.cardName = this.checkTiceArr[this.cur].cardName;
					param.month = this.checkTiceArr[this.cur].month;
					user.cardId = param.cardId;
					user.cardName = param.cardName;
					this.openInfo = '已开通'
				}			
				//console.log(JSON.stringify(param));
				const res = await this.$myRequest({
									url: url,
									data:param,
									method:"POST"						  	
								});
				console.log(JSON.stringify(res));
				/* user.surplusMoney = user.surplusMoney+this.price_1;				
				uni.setStorageSync('userVo',user);
				console.log(JSON.stringify(res)); */
				this.noClick = true;
				
				if(res.data.success){
					uni.setStorageSync("zhi_orderId",res.data.orderId);
					uni.setStorageSync("zhi_orderStatus","1");

					//安卓和ios支付
					console.log(uni.getSystemInfoSync().platform);
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
			},
			back(){
				let pages = getCurrentPages(); // 当前页面
				 let beforePage = pages[pages.length - 2]; // 前一个页面
				
				 uni.navigateBack({
				     success: function() {
				        // beforePage.onLoad(); // 执行前一个页面的onLoad方法
				     }
				 });
			},
			async findCardList(){
				let url = this.$baseUrl+"/user/findCardList";
				const res = await this.$myRequest({
							url: url,
							method:"POST"						  	
						});
				this.checkTiceArr = res.data.cardList;
				//console.log(JSON.stringify(this.checkTiceArr));
				//this.checkTice(this.indexCur);
				this.checkFour(this.indexCur);
			}
		}
	}
</script>

<style>

</style>
