<template>
	
	<view>
		<uni-nav-bar :fixed="true" title="我的" :status-bar="true" :border="false" :shadow="false">
			<!-- <block slot="left">
				<view class="city" @tap="jumbUrl_2">
					<uni-icons type="location-filled" size="20"></uni-icons>
					<view><text class="tpCity">{{pname}}</text></view>
					<uni-icons type="arrowdown" color="#333333" size="18" />
				</view>
			</block> -->
		</uni-nav-bar>
	
	<view class="my">
		
		<view class="myHeader" style="margin-bottom: -2rem;">
			<view class="mytxbx" @tap="jumpInfo">
					<view class="mytxL"><image :src="headImage" style="border-radius: 0.2rem;"></image></view>
					<view class="mytxR">
						<view class="mytxR1">{{nickName}}</view>
						<view class="mytxR2" style="border-radius:0.3rem;border: 1px solid #BBBBBB;">{{vipIsName}}</view>	
					</view>
					<uni-icons type="arrowright" size="18" color="#666"></uni-icons>
			</view>
		</view>


		<view class="myCard">
			<view class="mycardT" @tap="jumbUrl" data-value='../vip/vip'>
				<view class="mycardTL"><image src="/static/images/mylogo.png"></image></view>
				<view class="mycardTR">{{nowName}}</view>
			</view>
			<view class="mycardB" style="margin-top: 0.8rem;" @tap = "recordInfo">
				<text class="text">钱包余额</text>
				<text class="text" style="color: #F9221D;">{{surplusMoney}}</text>
			</view>
		</view>


		<view class="myItems" style="margin-top: -1rem;">
			<view class="myitemTl">明星技师</view>
			<view class="fujList">
				<view class="fuitem" v-for="(workInfo,workIndex) in worklist" v-if="workIndex<4" :key="workIndex" style="margin-left: 10rpx;">
			
					<view class="fuitem1" @tap="jumbUrl_1" :data-value="workInfo.workerId">
						<image style="border-radius: 0.3rem;" :src="workInfo.imgUrl"></image>
					</view>
					<view class="fuitem2">{{workInfo.userName}}
					
					</view>
					<view class="fuitem3">服务 <text style="color: #FF0000;">{{workInfo.sellNum}}单</text></view>
				</view>
			</view>
			<!-- <view class="myitetb">
				<view :class="{'orderItem':true}" @tap="jumbUrl_Swtich" data-value='../orders/orders' data-cur="1" data-index="0">
					<view class="orderImg">
						<image src="/static/images/vicon2cur.png" class="vicon"></image>
					</view>
					<view class="ordetxt">待付款</view>
				</view>
				<view :class="{'orderItem':true}" @tap="jumbUrl_Swtich" data-value='../orders/orders' data-cur="2" data-index="8">
					<view class="orderImg">
						<image src="/static/images/vicon3cur.png" class="vicon"></image>
					</view>
					<view class="ordetxt">进行中</view>
				</view>
				<view :class="{'orderItem':true}" @tap="jumbUrl_Swtich" data-value='../orders/orders' data-cur="3" data-index="4">
					<view class="orderImg">
						<image src="/static/images/vicon4cur.png" class="vicon"></image>
					</view>
					<view class="ordetxt">已完成</view>
				</view>
				<view :class="{'orderItem':true}" @tap="jumbUrl_Swtich" data-value='../orders/orders' data-cur="4" data-index="9">
					<view class="orderImg">
						<image src="/static/images/vicon5cur.png" class="vicon"></image>
					</view>
					<view class="ordetxt">待评价</view>
				</view>
			</view> -->
			
		</view>


		<view class="mylist">
			<view class="mysclos" @tap="jumbUrl" data-value='../option/option'>
				<view class="mysclosL">
					<image src="/static/images/myicon1.png"></image>
					优惠券
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<span style="color: #F76260;">{{count}}</span>
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>

			<view class="mysclos"  @tap="jumbUrl" data-value='../share/share'>
				<view class="mysclosL" >
					<image src="/static/images/myicon2.png"></image>
					邀请有奖
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>

			<!--  -->
			<view class="mysclos"  @tap="jumbUrl" data-value='../evaluate/evaluate'>
				<view class="mysclosL" >
					<image src="/static/images/myicon3.png"></image>
					我的评价
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>

			<!--  -->
			<view class="mysclos" @tap="makePhoneCall">
				<view class="mysclosL">
					<image src="/static/images/icon11.png"></image>
					联系客服
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
			<!--  -->
			<view class="mysclos" @tap="jumbUrl" data-value='../suggest/suggest'>
				<view class="mysclosL">
					<image src="/static/images/myicon5.png"></image>
					投诉建议
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">

					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
			<!-- <view class="mysclos" @tap="logout">
				<view class="mysclosL">
					<image src="/static/images/myicon6.png"></image>
					退出
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">

					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view> -->
			<view class="mysclos" @tap="jumbUrl" data-value='../addressList/addressList'>
				<view class="mysclosL">
					<image src="/static/images/myicon6.png"></image>
					地址管理
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">

					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
			<view class="mysclos" @tap="jumbUrl" data-value='../app_agreement/app_agreement'>
				<view class="mysclosL">
					<image src="../../static/images/myicon4.png" style="background-color: #09BB07;" ></image>
					关于我们
				</view>
				<view class="flex1"></view>
				<view class="mysclosR">
			
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
		</view>
		<view style="text-align: center;color: #555555;margin-top:1rem;font-size: 0.8rem;">摩之家上门按摩，数十万人的选择</view>
		 <uni-popup id="popupDialog" ref="popupDialog" type="dialog">
			<uni-popup-dialog title="提示" content="是否拨打电话联系客服" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
	</view>
</template>
<script>
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	var util = require('../common/util.js');
	var formatLocation = util.formatLocation;
	import permision from "../common/permission.js"
	export default {
		components: {
				uniPopupDialog
			},
		data() {
			return {
				count:0,
				phone:'',
				headImage:'/static/images/userLogo.png',
				vipIsName:'',
				nowName:'立即开通',
				surplusMoney:'0.00' ,//账户余额
				reFresh:"",
				nickName:"",
				vipLevel:0,
				type: 'top',
				msgType: 'success',
				message: '这是一条成功消息提示',
				value: '默认输入的内容',
				contentInfo:'',
				worklist: [],
				locationJson: {
					address: "",
					wd: "",
					jd: ""
				},
				city:''
			}
		},
		onTabItemTap(e) {
		            // tab 点击时执行，此处直接接收单击事件
		            this.getUserInfo();
					this.findUserInfoById();
		        },
		onLoad(option) {
			if(option.cid!=null && option.cid!=''){
				uni.showToast({
					title:"==--"+option.cid
				})				
			}
			let univerifyStatus = uni.getStorageSync("univerifyStatus");
			this.getUserInfo();
			this.findUserInfoById();
		},
		watch:{
		    //监听reFresh,如果有修改就执行监听器
		    reFresh:function(){
		    }
		},
		onShow() {
			this.$versionInfo();
			this.getUserInfo();
		},
		methods: {
			logout(){
				
				var aweixin = plus.oauth.getServices;
				
				uni.showModal({
					content: aweixin
				});
				if(!aweixin){
						plus.nativeUI.alert("当前环境不支持微信登录");
						return;
				}
				aweixin.logout(function(e){
					plus.nativeUI.alert("注销登录认证成功!");
				}, function(e){
					plus.nativeUI.alert("注销登录认证失败: "+JSON.stringify(e));
				});
			},
			getDistanceTwo(start_jd,start_wd,end_jd,end_wd){
				//start:121.24339,31.0584
				//end:116.340788,39.973319
				//获取两点经纬度之间的距离
				let distans = "";
				var point1 = new plus.maps.Point(start_jd,start_wd);
				var point2 = new plus.maps.Point(end_jd,end_wd);
				plus.maps.Map.calculateDistance(point1,point2,function(event){
					distans = event.distance;  // 转换后的距离值
					
				},function(e){
					alert("Failed:"+JSON.stringify(e));
				});
				
				return distans;
			},
			jumbUrl_1: function(event) {
				let workerId = event.currentTarget.dataset.value;
				uni.navigateTo({
					url: "../jishi-detail/jishi-detail?workerId=" + workerId
				});
			},
			doGetLocation() {
				var that = this;
				uni.getLocation({
					success: (res) => {
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						var point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(
						point, {},
						function(event) {
							var address = event.address; // 转换后的地理位置
							//var point = event.coord; // 转换后的坐标信息
							var coordType = event.coordType; // 转换后的坐标系类型
							var reg = /.+?(省|市|自治区|自治州|县|区)/g;
							let addressList = address.match(reg).toString().split(",");
							let provinceName = "";
							var fruits = ["上海市", "重庆市", "北京市","天津市"];
							if(fruits.indexOf(addressList[0])>-1){
								provinceName = addressList[0];
							}else{
								provinceName = addressList[1];
							}
							if(uni.getStorageSync("province")!=null && uni.getStorageSync("province")!="" ){
								that.locationJson.address = uni.getStorageSync("province").name;
								that.locationJson.jd = uni.getStorageSync("province").lng;
								that.locationJson.wd = uni.getStorageSync("province").lat;
								that.pname = uni.getStorageSync("province").name;
								/* if(uni.getStorageSync("province").name == addressList[0]){
									that.locationJson.address = addressList[1];
									that.locationJson.jd = uni.getStorageSync("province").lng;
									that.locationJson.wd = uni.getStorageSync("province").lat;
									that.pname = uni.getStorageSync("province").name;
								}else{
									that.locationJson.address = addressList[1];
									that.locationJson.jd = res.longitude;
									that.locationJson.wd = res.latitude;	
									that.pname = addressList[1];
								} */					
							}else{
								that.locationJson.address = provinceName;	
								that.locationJson.jd = res.longitude;
								that.locationJson.wd = res.latitude;
								that.pname =  provinceName;
							}			
							that.workInfoList();
							uni.hideNavigationBarLoading();
						});
					},
					fail: (err) => {
						// #ifdef MP-BAIDU
						if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
							uni.showModal({
								content:JSON.stringify(err)
							})
							this.showConfirm();
						}
						// #endif
						// #ifndef MP-BAIDU
						if (err.errMsg.indexOf("auth deny") >= 0) {
							uni.showModal({
								content:"访问位置被拒绝"
							})
						} else {
							/* uni.showModal({
								content:"获取不到地理位置，请重启="+err.errMsg
							}) */
						}
						// #endif
						uni.hideNavigationBarLoading();
					}
				})
			},
			//查询技师的信息
			async workInfoList() {
				uni.showNavigationBarLoading();
				//根据距离来排序的技师
				let dataParam = {
					"shopId":null,
					"city":this.locationJson.address
				};
				let url = this.$baseUrl + '/worker/getWorkerInfo_1';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				this.worklist = res.data.workerList;
			},
			orderByAsc() {
				//从小打大排序
				var results = this.worklist;
				var arr = "";
				for (var i = results.length - 1; i > 0; i--) {
					for (var j = 0; j < i; j++) {
						if (Number(results[j].distanceLen) > Number(results[j + 1].distanceLen)) {
							arr += j + ",";
							var temp = results[j];
							results[j] = results[j + 1];
							results[j + 1] = temp;
						}
					}
				}
				var resultsList = [];
				let num = 0;
				for (var i = 0; i < results.length; i++) {
					results[i].distanceLen = parseFloat(results[i].distanceLen / 1000).toFixed(1);
					//判断是否服务距离大于店员的服务范围
					if (Number(results[i].distanceLen) <= Number(results[i].radius) && num<4) {
						if (results[i].distanceLen <= 1) {
							results[i].distanceLen = results[i].distanceLen * 1000 + "m";
						} else {
							results[i].distanceLen = results[i].distanceLen + "km";
						}
						resultsList.push(results[i]);
						num = num + 1;
						continue;
					}
				}
				this.worklist = resultsList;
				uni.hideNavigationBarLoading();
			},
			recordInfo(){
				uni.navigateTo({
					url:"../payRecord/payRecord"
				})
			},
			jumpInfo(){
				uni.navigateTo({
					url:"../user-cog/user-cog"
				});
			},
			async findUserInfoById(){
				let user = uni.getStorageSync('userVo');
				let url = this.$baseUrl+"/user/findUserByUserId";
				let version =plus.runtime.version;
				console.log(version);
				const res = await this.$myRequest({
					url: url,
					data:{userId:user.userId,version:version},
					method:"POST"						  	
				});
				this.count = res.data.count;
				uni.setStorageSync('userVo',res.data.userVo);
				this.surplusMoney = res.data.userVo.surplusMoney;
				this.vipIsName = res.data.userVo.levelName;
				if(res.data.userVo.level != 0){
					this.nowName = "已开通";
				}
			},
			getUserInfo(){
				//获取用户的基本信息
				if(uni.getStorageSync("isLogin")==undefined || uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null || uni.getStorageSync("isLogin")==false){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
					return;
				}
				this.userVo = uni.getStorageSync("userVo");
				this.phone = this.userVo.phone;
				this.headImage = this.userVo.imgUrl;
				this.nickName = this.userVo.nickName;
				//let vipId = this.userVo.cardId;
				this.vipLevel = this.userVo.level;
				this.vipIsName = this.userVo.levelName;
				this.surplusMoney = this.userVo.surplusMoney;
				if(this.headImage == null || this.headImage == ""){
					this.headImage = '/static/images/userLogo.png';
				}
				if(this.phone == null || this.phone == ""){
					this.phone = "暂未登录";
				}
				if(this.surplusMoney==null || this.surplusMoney == ''){
					this.surplusMoney = '0.00';
				}
				
				let vipStatus = uni.getStorageSync("vipStatus")
				if(this.headImage == null || this.headImage == ""){
					this.headImage = '/static/images/userLogo.png';
				}
				if(this.phone == null || this.phone == ""){
					this.phone = "暂未登录";
				}
				
				if(uni.getSystemInfoSync().platform == 'ios'){
					this.init();
				}else{
					this.doGetLocation();
				}
			},
			async init(){
					//判断是否是苹果手机
					let url = this.$baseUrl+'/user/findIPhoneByStatus';
					const res = await this.$myRequest({
						url:url,
						type:"POST"
					});
					
					let that = this;
					if(res.data.cityName != ""){
						that.locationJson.address = res.data.cityName;
						that.locationJson.jd = res.data.jd;
						that.locationJson.wd = res.data.wd;
						that.pname =  res.data.cityName;
						that.workInfoList();
						uni.hideNavigationBarLoading();
					}else{
						that.doGetLocation();
					}
			},
			jumbUrl:function(event){
				let workerId =  event.currentTarget.dataset.row;
				let url = event.currentTarget.dataset.value;
				if(workerId!=null && workerId !='' && workerId != undefined){
					uni.navigateTo({
						url:url+"?workerId="+workerId
					});
				}else{
					uni.navigateTo({
						url:url
					});
				}
			},
			jumbUrl_Swtich:function(event){
				let url = event.currentTarget.dataset.value;
				let cur = event.currentTarget.dataset.cur;
				let index = event.currentTarget.dataset.index;
				uni.setStorageSync("cur",cur);
				uni.setStorageSync("index",index);
				uni.switchTab({
					url:url
				})
			},
			makePhoneCall: function () {
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
			dialogConfirm(done) {
				uni.makePhoneCall({
					phoneNumber: "4000799688",
					success: () => {
						console.log("成功拨打电话")
					}
				})
				done()
			}
		}
	};
</script>

<style>

</style>
