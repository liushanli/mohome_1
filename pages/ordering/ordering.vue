<template>
	<view class="order-detail" style="padding-bottom: 120rpx;">

		<view class="oitems oitemsx">
			<view class="vslitm">
				<view class="vslitm1" style="font-size: 1rem;font-weight: bold;">预约人信息</view>
			</view>
		</view>
		<view class="oitems userInfo">
			<view class="vslitm">
				<view class="vslitm1">姓名</view>
				<view class="vslitm2">
					<input type="text" style="text-align: right;font-size: 0.8rem;" class="finput" v-model="json.userName" placeholder="请输入联系人姓名"
					 name="" />
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">性别</view>
				<view class="vslitm2">
					<radio-group @change="changeSex">
						<label class="radio">
							<radio value="1" :checked="manChecked" name='sex' /><text>先生</text>
						</label>
						<label class="radio" style="margin-right: 2rem;margin-left: 4rem;">
							<radio value="2" :checked="womanChecked" name='sex' /><text>女士</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">手机号码</view>
				<view class="vslitm2">
					<input type="text" style="text-align: right;font-size: 0.8rem;" class="finput" v-model="json.userPhone"
					 placeholder="请输入联系人电话" />
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>

			<view class="vslitm">
				<view class="vslitm1">服务地点</view>
				<view class="vslitm2">
					<input type="text" style="text-align: right;font-size: 0.8rem;" disabled="true" placeholder="请选择服务地点" class="finput"
					 v-model="json.address" @tap="chooseLocation" />
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">详细地址</view>
				<view class="vslitm2">
					<input type="text" style="text-align: right;font-size: 0.8rem;" class="finput" v-model="json.detailAddress"
					 placeholder="如xx号xx室" name="" />
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">备注</view>
				<view class="vslitm2">
					<input type="text" style="text-align: right;font-size: 0.8rem;" class="finput" v-model="json.remarks"
					 placeholder="备注" />
					<uni-icons type="arrowright" size="16"></uni-icons>
					
				</view>
			</view>
		</view>
		<view class="oitems oitemsx">
			<view class="vslitm">
				<view class="vslitm1" style="font-size: 1rem;font-weight: bold;">服务</view>
			</view>
		</view>
		<view class="oitems">
			<view class="vslitm">
				<view class="vslitm1">服务时间</view>
				<view class="vslitm2" @tap="open">
					<input type="text" style="text-align: right;font-size: 0.8rem;color: #DD524D;" disabled="true" placeholder="请选择"
					 class="finput" v-model="timeInfo" @tap="" />
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">服务人员</view>
				<view class="vslitm2">{{jsonData.workName}} {{jsonData.gender}}</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">夜间车费</view>
				<view class="vslitm2" style="color: #F76260;font-size: 1rem;">￥{{CarPrice}}</view>
			</view>
		</view>
		<view class="oitems">
			<view class="item">
				<view class="itemL">
					<image style="border-radius: 3rem;" :src="jsonData.productImg"></image>
				</view>
				<view class="itemM">
					<view class="itemM1">
						{{jsonData.productName}}
					</view>
					<view class="itemM2">￥<text class="text">{{productPriceZh}}</text>
					</view>
				</view>
				<view class="itemR" style="align-self: flex-end">
					<view class="itemR2">数量：{{jsonData.productNum}}</view>
				</view>
			</view>
			<view class="hr"></view>
			<view class="quanbx" @tap="jumUrlInfo">
				<view class="quanbx1">优惠券</view>
				<view class="quanbx2">{{couponInfo}} <uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
		</view>
		<view class="fiexFsa">
			<view class="fiexFsain">
				待支付: <text class="text1">¥</text> <text class="text2">{{jsonData.money}}</text>
				<view class="flex1"></view>
				<view class="lijibtn" @tap="$noMultipleClicks(submitAddress)" style="background-image: linear-gradient(to right, #09BB07,#09BB07);">立即购买</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<div class="choiceTime">
				<view class="timetou">
					<view style="color: #F9221D;font-size: 0.8rem;padding-top: 0.3rem;padding-bottom: 0.3rem;">
						温馨提示：红色为不可预约时间，灰色为可预约时间
					</view>
					<view class="tabBox">
						<view :class="{'tbItem':true, 'cur': cur1==0}" @tap="chooseTime(0)">
							<text class="text">今天
								{{today}}</text>
						</view>
						<view :class="{'tbItem':true, 'cur': cur1==1}" @tap="chooseTime(1)">
							<text class="text">明天
								{{tomorrow}}</text>
						</view>
						<view :class="{'tbItem':true, 'cur': cur1==2}" @tap="chooseTime(2)">
							<text class="text">后天
								{{after}}</text>
						</view>

					</view>
				</view>
				<view class="titemtems">
					<view :class="{todayTimes:true, cur: index==timeCur}" @tap="timeCur=index" v-for="(item, index) in todayTimes" 
					 :key="index" :style="hides(item.busy)">{{item.dateHHmm}}</view>
				</view>
				<view class="tijiaoyy" @tap="close">
					确定预约
				</view>
			</div>
		</uni-popup>
	</view>
</template>

<script>
	var util = require('../common/util.js');
	import {
		week
	} from '../common/DateUtil.js'
	import {
		yearTime
	} from '../common/DateUtil.js'
	var formatLocation = util.formatLocation;

	export default {
		data() {
			return {
				point:{
					point:{},
					city:'',
					address:'',
					name:''
				},
				noClick:true,
				workName: '',
				productName: '',
				productNum: '',
				jsonData: {},
				agend: '',
				content: '',
				showHide: 'none',
				userAddreJson: {
					userName: '',
					sex: '',
					phone: '',
					address: ''
				},
				json: {
					userName: '',
					userPhone: '',
					gender: 1,
					userId: '',
					provice: '',
					city: '',
					area: '',
					address: '',
					detailAddress: '',
					jd: 0,
					wd: 0,
					isDefault: '1',
					remarks:'',
					addressNum:''
				},
				womanChecked: false,
				manChecked: false,
				title: 'chooseLocation',
				hasLocation: false,
				locationAddress: '',
				index: 0,
				timeInfo: '请选择服务时间',
				CarPrice: 0,
				cur: 0,
				cur1: 0,
				timeCur: 99,
				towoTimeCur: '',
				startTime:'',
				endTime:'',
				times: [],
				todayTimes: [],
				tomorrowTimes: [],
				productId: '',
				productInfo: '',
				productList: [],
				contentText: '',
				content: '',
				today: '',
				tomorrow: '',
				after: '',
				timerStr: '',
				preTime: '',
				addressArr: {
					userId: '',
					provice: '',
					city: '',
					area: '',
					address: '',
					jd: 0,
					wd: 0,
					isDefault: '1'
				},
				loading: false,
				price_1: 0.01,
				providerList: [],
				content: '开通会员',
				subject: '',
				totalAmount: 0.01,
				userInfo: null,
				orderId_1: '',
				orderPayType:1,
				orderAddInfo: {
					orderId: '',
					userId: '',
					productId: '',
					workerId: '',
					payOnline:0,
					status:0,
					serviceNumber:0,
					orderPayType:0,
					orderPayTime:'',
					aboutTime:'',
					trafficPrice:'',
					json:{},
					subject:'',
					body:'',
					remarks:''
				},
				productPriceZh:'',
				trfficPrice:'',
				couponInfo:"暂无优惠券",
				couponId:""
			}
		},
		onShow(){
			this.userInfo = uni.getStorageSync("userVo");
			let couponIs = uni.getStorageSync("couponId")
			if(couponIs!= "" && couponIs!= null){
				this.couponInfo = "50元优惠券";
				let da = uni.getStorageSync("jsonData");
				//console.log(da);
				//console.log(this.jsonData);
				this.jsonData.couponPrice = 50;
				/* if(da.money == da.memberPrice || (da.money+50) ==da.memberPrice){
					console.log("==会员价==");
					this.jsonData.money = da.memberPrice-50+this.trfficPrice;
				}else if(da.money == da.price_1 || (da.money+50)==da.price_1){
					console.log("普通价="+this.trfficPrice);
					this.jsonData.money = da.price_1-50+this.trfficPrice;
				} */
				
				if(da.money == da.memberPrice || da.money == da.productPrice){
					this.jsonData.money = da.money-50+this.jsonData.CarPrice;
				}
				
				//console.log(this.jsonData.money);
			}
			if(this.point.city != ""){
				this.json.address = this.point.city +" "+ this.point.address +" "+ this.point.name;
				this.json.detailAddress = "";
			}
			//获取当前时间
			this.getTime(); 
			
			//console.log(this.userInfo);
			this.json.userId = this.userInfo.userId;
			if(this.point.city == ""){
				this.findUserAddress();	
			}
		},
		onLoad() {
			//获取当前时间
			this.getTime(); 
			this.userInfo = uni.getStorageSync("userVo");
			this.json.userId = this.userInfo.userId;
			this.findUserAddress();
			
			
			this.jsonData = uni.getStorageSync("jsonData");
			this.jsonData.CarPrice = 0;
			this.jsonData.couponPrice = 0;
			//console.log("===="+JSON.stringify(this.jsonData));
			this.getTimeList();
			if (this.jsonData == "" || this.jsonData == null) {
				this.jsonData = {
					workName: '',
					productName: '',
					productPrice: 0,
					productNum: 0,
					productImg:'/static/images/cp.png',
					gender:""
				}
			}
			this.productPriceZh = this.jsonData.productPrice;
			
			let userAddreJson_1 = uni.getStorageSync("addressJson");
			if (userAddreJson_1 != null && userAddreJson_1 != '') {
				this.userAddreJson = userAddreJson_1;
				this.agend = this.userAddreJson.sex == "1" ? '男' : '女';
				this.content = "";
				this.showHide = "none";
			} else {
				this.showHide = "";
				this.content = "请填写服务地址";
			}
			this.couponLists();
		},
		methods: {
			jumUrlInfo(){
				uni.navigateTo({
					url:"../coupon_choose/coupon_choose"
				})
			},
			async couponLists(){
				var userVo = uni.getStorageSync("userVo");
				let url = this.$baseUrl + '/user/findUserByInfo?userId='+userVo.userId;
				const res = await this.$myRequest({
					url: url
				});
				let detailStatus = uni.getStorageSync("detailStatus")
				this.couponId = uni.getStorageSync("couponId")
				
				console.log(detailStatus+"=="+this.couponId);
				
				console.log(JSON.stringify(res));
				if(res.data.couponList!=null && res.data.couponList.length>=0){
					if(detailStatus=="1" && this.couponId != null && this.couponId != ""){
						this.couponInfo="50元优惠券";						
					}else{
						this.couponInfo="请选择优惠券";						
					}
				}else{
					this.couponInfo="暂无优惠券";		
				}
			},
			hides(obj){
				if(obj==0){
					return "width:2.5rem;";
				}else{
					return 'pointer-events: none;border:1px solid red;color:red; width:2.5rem;margin-left:0.2rem;';
				}
			},
			chooseTime(inde){
				this.cur1 = inde;
				this.cur = inde;
				this.getTimeList();
			},
			async getShopInfo(){
				let param = {
					workerId:this.jsonData.workerId
				};
				//console.log("==="+this.jsonData.workerId);
				let url = this.$baseUrl + "/shop/findShopInfoByWorker"
				const res = await this.$myRequest({
					url:url,
					data:param,
					method:'POST'
				});
				let shopInfo = res.data.shopInfo;
				this.startTime = shopInfo.trafficStartTime;
				this.endTime = shopInfo.trafficEndTime;
				//console.log(JSON.stringify(shopInfo));
				this.getTheFare(shopInfo.trafficPice);
			},
			async getTimeList(){
				let param = {
					workerId:this.jsonData.workerId,
					cur:this.cur
				};
				let url = this.$baseUrl + "/worker/findWorkTimeById"
				const res = await this.$myRequest({
					url:url,
					data:param,
					method:'POST'
				});
				this.todayTimes = res.data.workerTimeList;
				if(this.todayTimes[this.timeCur].busy==0){
					this.timeInfo = this.todayTimes[this.timeCur].dateHHmm;	
				}else{
					console.log(this.todayTimes[this.timeCur].busy);
				}
				this.getShopInfo();
			},
			
			async getTime(){
				//获取最近三天的时间
				let url = this.$baseUrl + "/worker/getWorkNearTime"
				 const res = await this.$myRequest({
				 	url:url,
				 	method:'POST'
				 });
				 if(res.data.success){
					 this.today = res.data.today;
					 this.tomorrow = res.data.tomorrow;
					 this.after = res.data.after;
				 }
			},
			//获取车费
			getTheFare(trafficPrice) {
				let mons = uni.getStorageSync("jsonData");
				//console.log(this.timeInfo+"=="+trafficPrice);
				let demoPrice =  Number(mons.money);
				//判断是否有夜间车费
				if (this.timeInfo != null && this.timeInfo != "") {
					let carArr = this.timeInfo.split(":");
					let timeBuy = Number(carArr[0]);
					let minBuy = Number(carArr[1]);
					
					//console.log(carArr+"=="+this.startTime+"=="+this.endTime);
					//去的时候，是否算车费
					if (this.CompareDate(this.startTime,this.timeInfo) || this.CompareDate(this.timeInfo,this.endTime)){
						this.CarPrice = trafficPrice;
					}							
					else{this.CarPrice = 0;}
					//回来的时候，是否算车费
					timeBuy = timeBuy + 2;
					if (timeBuy >= 24) {
						timeBuy = timeBuy - 24;
					}
					timeBuy = timeBuy+":"+minBuy;
					if (this.CompareDate(this.startTime,timeBuy) || this.CompareDate(timeBuy,this.endTime)){
						this.CarPrice += trafficPrice;
					}
					else
						this.CarPrice += 0;
				}
				demoPrice += this.CarPrice;
				//this.jsonData.productPrice = demoPrice;
				let couponIs = uni.getStorageSync("couponId");
				if(couponIs!= "" && couponIs!= null){
					if(mons.money == mons.memberPrice || mons.money == mons.productPrice){
						this.jsonData.money = demoPrice-50;
					}else{
						this.jsonData.money = demoPrice;	
					}
				}else{
						this.jsonData.money = demoPrice;	
					}
				this.jsonData.CarPrice = this.CarPrice;
				
			},
			CompareDate(t1,t2)
			{
				var date = new Date();
				var a = t1.split(":");
				var b = t2.split(":");
				return date.setHours(a[0],a[1]) <= date.setHours(b[0],b[1]);
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
				//console.log(this.index);
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.timeInfo = this.todayTimes[this.timeCur].dateHHmm;

				this.$refs.popup.close();
				this.getShopInfo();
			},
			nowBuy() {
				this.open();
			},
			submitAddress: function(e) {
				if (this.json.userName.trim() == '') {
					uni.showToast({
						title: "请填写姓名"
					});
					this.noClick = true;
					return;
				}
				if (this.json.gender == 0) {
					uni.showToast({
						title: "请选择性别"
					});
					this.noClick = true;
					return;
				}
				if (this.json.userPhone.trim() == '') {
					uni.showToast({
						title: "请填写手机号"
					});
					this.noClick = true;
					return;
				}
				if (!/^1\d{10}$/.test(this.json.userPhone)) {
					uni.showToast({
						title: "请正确填写手机号"
					});
					this.noClick = true;
					return;
				}
				if(this.json.address.trim() == '' || this.json.address == undefined || this.json.address == null){
					uni.showToast({
						title: "请选择地点"
					});
					this.noClick = true;
					return;
				}
				console.log(this.json.detailAddress);
				if(this.json.detailAddress.trim() == '' || this.json.detailAddress.trim() == undefined || this.json.detailAddress.trim() == null){
					uni.showToast({
						title: "请填写详细地址"
					});
					this.noClick = true;
					return;
				}
				
				
				if (this.timeInfo == '请选择服务时间' || this.timeInfo ==''){
					uni.showToast({
						title: "请选择服务时间"
					});
					this.noClick = true;
					return;
				}
				//this.getShopInfo();
				this.getWJ();
				
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
			},
			changeSex: function(eve) {
				this.json.gender = eve.detail.value;
			},
			chooseLocation: function() {
				/* uni.chooseLocation({
					success: (res) => {
						console.log(JSON.stringify(res));
						this.hasLocation = true;
						this.json.address = res.address;
					}
				}) */
				uni.navigateTo({
					url:"../choose-address/choose-address"
				})
			},
			clear: function() {
				this.hasLocation = false;

			},
			async getWJ() {
				uni.showNavigationBarLoading();
				let localAddress = this.json.address + this.json.detailAddress;
				let url = 'http://restapi.amap.com/v3/geocode/geo?key='+this.$webKey+'&s=rsv3&city=35&address=' +
					localAddress;
				let jsonInfoList = this.json;
				//根据地址来获取经纬度
				const res = await this.$myRequest({
					url: url,
					method: 'GET'
				});
				//console.log(JSON.stringify(res));
				if (res.data.geocodes != null) {
					if (res.data.geocodes.length >= 1) {
						let gecodes = res.data.geocodes[0];
						let locaStr = gecodes.location;
						let locaArr = locaStr.split(",");
						this.json.jd = locaArr[0];
						this.json.wd = locaArr[1];

						this.json.provice = gecodes.province;
						this.json.city = gecodes.city;
						this.json.area = gecodes.district;
						if(this.json.detailAddress.trim() != "" && this.json.detailAddress != null){
							this.json.address = this.json.address +"|"+this.json.detailAddress.trim();
						}
						this.addressArr.provice = gecodes.province;
						this.addressArr.city = gecodes.city;
						this.addressArr.area = gecodes.district;
						//this.addressArr.address = gecodes.formatted_address;
						this.addressArr.address = this.json.address;
						this.addressArr.jd = locaArr[0];
						this.addressArr.wd = locaArr[1];
					}
				}
				//console.log(JSON.stringify(this.addressArr));
				this.content = this.jsonData.productName;
				this.subject = this.jsonData.productName + "为" + this.jsonData.productPrice;
				this.totalAmount = this.jsonData.money;
				this.addUpdAddress();
			},
			get_distance(s, e) {
				return myPromise = new Promise(function(resolve, reject) {
					var my_distance;
					var directionsService = new qq.maps.DrivingService({
						complete: function(response) {
							var distance = JSON.stringify(response.detail.routes[0].distance);
							my_distance = distance + '米';
							//console.log(my_distance);
							resolve(my_distance);
						}
					});
					var start = s.split(","); //起点经纬度
					var end = e.split(","); //目的地经纬度
					directionsService.setPolicy(qq.maps.DrivingPolicy['LEAST_DISTANCE']); //"LEAST_TIME">最少时间     LEAST_DISTANCE">最短距离    "AVOID_HIGHWAYS">避开高速			
					directionsService.search(new qq.maps.LatLng(start[0], start[1]),
						new qq.maps.LatLng(end[0], end[1]));
				}).then(function(resolve_finish) {
					return resolve_finish
				})
			},
			async requestPayment() {
				
				this.loading = true;
				const provider = 'alipay'
				let order_1 = await this.getOrderInfo(provider);
				let orderInfo = order_1.data;
				//console.log(JSON.stringify(orderInfo));


				if (!orderInfo) {
					uni.showModal({
						content: '获取支付信息失败',
						showCancel: false
					})
					return
				}
				//this.orderAddInfo.orderId = order_1.out_trade_no;
				this.orderAddInfo.orderPayType = 1;
				this.orderAddInfo.aboutTime = this.todayTimes[this.timeCur].dateStr+" "+this.todayTimes[this.timeCur].dateHHmm;
				this.orderAddInfo.trafficPrice = this.CarPrice;
				
				uni.requestPayment({
				        provider: 'alipay',
				        orderInfo:orderInfo,
				        success: function(res) {
				            console.log('success:' + JSON.stringify(res));
				        },
				        fail: function(err) {
				            console.log('fail:' + JSON.stringify(err));
				        }
				    });
				
			},
			getOrderInfo(provider) {
				console.log(provider+"=="+this.openid);
				return new Promise((resolve, reject) => {
					console.log(this.content + "==" + this.subject + "===" + this.totalAmount);
					uni.request({
						method: 'GET',
						url: 'http://wx.mzjsh.com:8090/Default.aspx?action=pay&out_trade_no=202103112125016612&subject=摩之家A套餐&body=精油开背&total_amout=0.01',
						data: {
							provider,
							/* openid: this.openid, */
							totalFee: 0.01, // 转为以分为单位
							// #ifdef APP-PLUS
							platform: 'app-plus',
							// #endif
							// #ifdef MP-WEIXIN
							platform: 'mp-weixin',
							// #endif
							/* content: this.content,
							subject: this.subject, */
							totalAmount: 0.01
						},
						success(res) {
							console.log(res);
							if (res!=null) {
								resolve(res)
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
			async addUpdAddress() {
				let url = this.$baseUrl + "/user/addUpUserAddress";
				//console.log(JSON.stringify(this.json));
				//添加或者修改
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: this.json
				});
				if(res.data.success && this.json.address!="" && this.json.address!=null){
					this.orderUserInfo();
				}
			},
			async findUserAddress() {
				let url = this.$baseUrl + "/user/findUserAddress";
				//查询用户信息是否存在
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: {
						id: null,
						userId: this.userInfo.userId,
						isDefault:"1"
					}
				});
				if (res.data.success) {
					let addressVo = res.data.addressList[0];
					let addreArrs = addressVo.address.split("|");
					this.json.provice = addressVo.province;
					this.json.city = addressVo.city;
					this.json.area = addressVo.area;
					this.json.id = addressVo.id;
					this.json.address = addreArrs[0];
					this.json.detailAddress = addreArrs[1];
					this.json.jd = addressVo.jd;
					this.json.wd = addressVo.wd;
					this.json.gender = addressVo.gender;
					this.json.userPhone = addressVo.userPhone;
					this.json.userName = addressVo.userName;
					if (this.json.gender == 1) {
						this.manChecked = true;
						this.womanChecked = false;
					} else if (this.json.gender == 2) {
						this.manChecked = false;
						this.womanChecked = true;
					}

				}
			},
			//添加订单，同步
			async orderUserInfo(){
				this.orderAddInfo.aboutTime = this.todayTimes[this.timeCur].dateStr+" "+this.todayTimes[this.timeCur].dateHHmm;
				this.orderAddInfo.trafficPrice = this.CarPrice;
				this.orderAddInfo.userId = this.userInfo.userId;
				this.orderAddInfo.productId = this.jsonData.productId;
				this.orderAddInfo.workerId = this.jsonData.workerId;
				this.orderAddInfo.payOnline = this.totalAmount;
				this.orderAddInfo.serviceNumber = this.jsonData.productNum;
				this.orderAddInfo.json = this.json;
				this.orderAddInfo.subject = this.jsonData.productName;
				this.orderAddInfo.body = '养生理疗产品'
				let paramInfo = this.orderAddInfo;
				//console.log("----------------" + JSON.stringify(paramInfo));
				let url = this.$baseUrl + "/order/addUserOrder";
				
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: paramInfo
				});
				this.noClick = true;
				
				if (res.data.success) {
					uni.setStorageSync("zhi_orderStatus","2");
					uni.setStorageSync("zhi_orderId",res.data.orderId);
					
					let couponId = uni.getStorageSync("couponId");
					if(couponId!=null && couponId != ""){
						this.updUserCoupon(couponId,res.data.orderId);	
					}
					//安卓和ios支付
					/* console.log(uni.getSystemInfoSync().platform);
					uni.navigateTo({
						url:"../zhifu/zhifu"
					}) */ 
					uni.hideNavigationBarLoading();
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
			async updUserCoupon(couponId,orderId) {
				let url = this.$baseUrl + "/user/updateTbCoupon?id="+couponId+"&orderId="+orderId
				//添加或者修改
				const res = await this.$myRequest({
					url: url
				});
				uni.setStorageSync("couponId","");
			
			},
			async updUser() {
				let param = {
					id: this.userInfo.id,
					surplusMoney: this.totalAmount
				}
				let url = this.$baseUrl + "/user/updUserInfo"
				//添加或者修改
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: param
				});

			}
		}
	};
</script>

<style>
	.userInfo {
		margin-bottom: 1rem;
	}
</style>
