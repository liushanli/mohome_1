<template>
	<view class="index">
		<uni-nav-bar title="摩之家" :fixed="true" :status-bar="true" :border="false" :shadow="false" 
		   @clickLeft="">
			<block slot="left">
				<view class="city" @tap="jumbUrl_2">
					<uni-icons type="location-filled" size="20"></uni-icons>
					<view><text class="tpCity">{{pname}}</text></view>
					<uni-icons type="arrowdown" color="#333333" size="18" />
				</view>
			</block>
		</uni-nav-bar>

		<view class="indexIn">
			<view class="searchBar">
				<image src="/static/images/search.png" class="searchIcon"></image>
				<input type="text" placeholder="请输入姓名" :disabled="flag" class="searchInput" @tap="focusFun" name="" />
			</view>
			<view class="swBox">
			
				<swiper class="swiper" :autoplay="true">
			
					<swiper-item v-for="(bannerInfo,bannerIndex) in bannerListArr" :key="bannerIndex">
						<image :src="bannerInfo.imgUrl"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view class="title">
					明星技师
					<view class="lstTxt" style="color: #999999; font-size:0.7rem;position: absolute;right: 15rpx;" hover-class="">
						<navigator url="../jishi/jishi" open-type="switchTab">
							查看更多<uni-icons type="arrowright" size="13" color="#666" style="margin-right: -0.5rem;"></uni-icons><uni-icons type="arrowright" size="13" color="#666" ></uni-icons>
						</navigator>
					</view>
				</view>
			<view class="fujList">
				<view class="fuitem" v-for="(workInfo,workIndex) in worklist" :key="workIndex" style="margin-left: 10rpx;">
			
					<view class="fuitem1" @tap="jumbUrl_1" :data-value="workInfo.workerId">
						<image style="border-radius: 0.3rem;" :src="workInfo.imgUrl"></image>
					</view>
					<view class="fuitem2">{{workInfo.userName}}</view>
					<view class="fuitem3">已接 <text class="text1" style="font-size: 0.7rem;">{{workInfo.sellNum}}</text><text class="text2">单</text></view>
				</view>
			</view> -->
			<!-- <view class="swBox">

				<swiper class="swiper" :autoplay="true">

					<swiper-item v-for="(bannerInfo,bannerIndex) in bannerListArr" :key="bannerIndex">
						<image :src="bannerInfo.imgUrl"></image>
					</swiper-item>
				</swiper>
			</view> -->


			<view class="authbx">
				<view class="auitem">
					<image src="/static/images/renzheng.png"></image> 平台保障
				</view>
				<view class="auitem">
					<image src="/static/images/renzheng.png"></image> 官方认证
				</view>
				<view class="auitem">
					<image src="/static/images/renzheng.png"></image> 收费透明
				</view>
				<view class="auitem">
					<image src="/static/images/renzheng.png"></image> 爽约包赔
				</view>
			</view>


			<view class="notice">
				<image src="/static/images/laba.png" class="laba"></image>
				<view class="noticein">
					<view class="vietemslun">
						<view class="vietems">{{content}}</view>
					</view>
				</view>
			</view>

			<view class="listBox">

				<view class="listItm">
					<view class="lstIcon">
						<image src="/static/images/img.jpg" @tap="jumbUrl" data-value='../vip/vip'></image>
					</view>
					<view class="lstTxt">会员招募</view>
				</view>
				<view class="listItm">
					<view class="lstIcon">
						<image src="/static/images/img_1.jpg" style="border-radius: 3rem;" @tap="jumbUrl" data-value='../recruit/recruit'></image>
					</view>
					<view class="lstTxt">人员招聘</view>
				</view>
				<view class="listItm">
					<view class="lstIcon">
						<image src="/static/images/img_2.jpg" @tap="jumbUrl" data-value='../share/share'></image>
					</view>
					<view class="lstTxt">分享领券</view>
				</view>

				<view class="listItm">
					<view class="lstIcon">
						<image src="/static/images/img_3.jpg" @tap="jumbUrl" data-value='../dingzhi/dingzhi' style="border-radius: 2rem;"></image>
					</view>
					<view class="lstTxt">企业福利</view>
				</view>
				<view class="listItm">
					<view class="lstIcon">
						<image src="/static/images/img_4.jpg" @tap="jumbUrl" data-value='../partner/partner'></image>
					</view>
					<view class="lstTxt">全国招商</view>
				</view>
				<view class="listItm">
					<view class="lstIcon">
						<image src="/static/images/img_5.jpg"  @tap="jumbUrl" data-value="../tencent/tencent"></image>
					</view>
					<view class="lstTxt">公众号</view>
				</view>
				<view class="listItm">
					<view @tap='jmbWebUrl' class="lstIcon">
						<image src="/static/images/img_6.jpg"></image>
					</view>
					<view class="lstTxt">酒店民宿</view>
				</view>
				<view class="listItm">
					<view class="lstIcon" @tap="jumbUrl" data-value='../school/school'>
						<image src="/static/images/img_7.jpg"></image>
					</view>
					<view class="lstTxt">培训学校</view>
				</view>

			</view>


		<!-- 	<view class="title">
				明星技师
				<view class="lstTxt" style="color: #999999; font-size:0.7rem;position: absolute;right: 15rpx;" hover-class="">
					<navigator url="../jishi/jishi" open-type="switchTab">
						查看更多<uni-icons type="arrowright" size="13" color="#666" style="margin-right: -0.5rem;"></uni-icons><uni-icons type="arrowright" size="13" color="#666" ></uni-icons>
					</navigator>
				</view>
			</view>
 -->

			<!-- <view class="fujList">
				<view class="fuitem" v-for="(workInfo,workIndex) in worklist" :key="workIndex" style="margin-left: 10rpx;">

					<view class="fuitem1" @tap="jumbUrl_1" :data-value="workInfo.workerId">
						<image style="border-radius: 0.3rem;" :src="workInfo.imgUrl"></image>
					</view>
					<view class="fuitem2">{{workInfo.userName}}</view>
					<view class="fuitem3">已接 <text class="text1" style="font-size: 0.7rem;">{{workInfo.sellNum}}</text><text class="text2">单</text></view>
				</view>
			</view>
 -->

			<view class="tabBox" style="margin:-2rem 0rem -2rem;">
				<scroll-view scroll-x="true" class="ct_tab">
					<view class="ct_item" :class="{'tbItem':true, 'cur': cur==0}" @tap="ProgramInfo" :data-value="0" :data-row="0">
						所有项目
					</view>
					<view class="ct_item" v-for="(productTypeInfo,productTypeIndex) in productTypeList" :key="productTypeIndex" :class="{'tbItem':true, 'cur': cur==(productTypeIndex+1)}"
					 @tap="ProgramInfo" :data-value="productTypeIndex+1" :data-row="productTypeInfo.productTypeId">
						{{productTypeInfo.productTypeName}}
					</view>
				</scroll-view>
			</view>

			<view class="itemList">
				<view  v-if="productList.length > 0" class="item" v-for="(productInfo,productIndex) in productList" :key="productIndex" :data-value="productInfo.productId"
				 @tap="ProgramDetailInfo" style="border-bottom: 1px dashed #D9D9D9;">
					<view class="itemL">
						<image :src="productInfo.imgUrl"  />
						<view style="color: #09BB07; margin-left: 0.5rem;">{{productInfo.shopName}}</view>
					</view>
					<view class="itemM">
						<view class="itemM1">{{productInfo.productName}}</view>
						<view class="itemM2"  v-if="productInfo.couponType!=1">￥<text class="text">{{productInfo.price}}</text>
							<view v-if="productInfo.couponType!=1" class="vipPc">
								<view class="vipPc1">会员价</view>
								<view class="vipPc2">￥{{productInfo.memberPrice}}</view>
							</view>
						</view>
						<view class="itemM2"  v-if="productInfo.couponType==1"><text class="text" style="font: bold 12px/16px Simsun; text-decoration-line: line-through;">￥{{productInfo.price}}</text>
							<view  class="vipPc" style="">
								<view class="vipPc1" style="font-size: 0.7rem;">秒杀价</view>
								<view class="vipPc2" style="font-size: 0.7rem;">￥{{productInfo.secondPrice}}</view>
							</view>
						</view>
					</view>
					<view class="itemR">
						<view class="itemR1">
							<image src="/static/images/hongicon.png"></image> {{productInfo.productTime}}分钟
						</view>
						<view class="itemR2">已售<span style="color: #F9221D;">{{productInfo.sellNum}}</span>单</view>
					</view>
				</view>
				<view  v-if="productList.length <= 0" style="text-align: center;font-size: 1rem;color: #6D6D72;"> 暂无数据</view>
			</view>
		</view>


	</view>
</template>
<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	var util = require('../common/util.js');
	var formatLocation = util.formatLocation;
	import permision from "../common/permission.js"

	export default {
		data() {
			return {
				array: [],
				provinceListInfo:[],
				index: 0,
				cur: 0,
				pname:'',
				productTypeList: [],
				productTypeId: '',
				productList: [],
				productId: '',
				worklist: [],
				bannerListArr: [],
				title: '',
				hasLocation: false,
				location: {},
				type: '',
				flag: false,
				reFresh: "",
				city:'',
				locationJson: {
					address: "",
					wd: "",
					jd: ""
				},
				content:""
			}
		},
		onShow: function () {
			this.$versionInfo();
			//获取上一页面的返回值
			var that = this;
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			
			if(uni.getStorageSync("province").name != "" && uni.getStorageSync("province").name != null){
				this.pname = uni.getStorageSync("province").name;
				this.locationJson.address = uni.getStorageSync("province").name;
				this.locationJson.jd = uni.getStorageSync("province").lng;
				this.locationJson.wd = uni.getStorageSync("province").lat;
				//this.workInfoList();
				this.ProgramType();
				this.ProgramInfo(null);
			}
		},
		onLoad(option) {
/* 			uni.showToast({
				title:plus.runtime.version
			}) */
			this.findCont();
			if(option.orderid!='' && option.orderid != null){
				uni.showModal({
					content:option.orderid
				});
			}
			uni.showNavigationBarLoading();
			//console.log(uni.getStorageSync("province"));
			this.getLocation();

		},
		watch: {
			//监听reFresh,如果有修改就执行监听器
			reFresh: function() {
				let status = uni.getStorageSync("status");
				if (status == "1") {
					this.flag = false;
				}
			}
		},
		onPullDownRefresh() {
		        console.log('refresh');
		        /* setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000); */
		},
		methods: {
			async findCont(){


				let url = this.$baseUrl + '/user/findContent';
				const res = await this.$myRequest({
					url: url
				});
				if(res.data.success){
					this.content = res.data.content;
				}
			},
			clickCtTab(ctCur) {
				this.tabCur = ctCur
			},
			jmbWebUrl() {
				uni.navigateTo({
					url:"../hotel/hotel"
				});
			},
			jumbUrl_2(){
				uni.navigateTo({
					url:"../addressi_search/address_search"
				})
			},
			jumbUrl_1: function(event) {
				let workerId = event.currentTarget.dataset.value;
				uni.navigateTo({
					url: "../jishi-detail/jishi-detail?workerId=" + workerId
				});
			},
			jumbUrl: function(event) {
				let url = event.currentTarget.dataset.value;
				uni.navigateTo({
					url: url
				});
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
				uni.setStorageSync("province",this.provinceListInfo[this.index]);
				
				this.locationJson.address = uni.getStorageSync("province").name;
				//this.workInfoList();
				this.ProgramType();
				this.ProgramInfo(null);
			},
			focusFun() {
				this.flag = true;
				uni.navigateTo({
					url: "../jishi_search/jishi_search"
				});
				return;
			},
			//项目列表
			async ProgramType() {

				let headers = {
					"Content-Type": "application/json" //设置一下请求头即可
				}
				//console.log(this.locationJson.address);
				let url = this.$baseUrl + '/product/findProductTypeInfo';
				const res = await this.$myRequest({
					url: url,
					method: "POST",
					data:{city:this.locationJson.address}
				});
				this.productTypeList = res.data.productTypeList;
			},
			//项目信息
			ProgramInfo(event) {
				this.cur = 0;
				this.productTypeId = "";
				if (event != null) {
					this.cur = event.currentTarget.dataset.value;
					this.productTypeId = event.currentTarget.dataset.row;
				}
				let params = {
					"page": 1,
					"typeId": this.productTypeId,
					"shopId": "",
					"id": "",
					city:this.locationJson.address
				};
				//console.log(params);
				let headers = {
					"Content-Type": "application/json" //设置一下请求头即可
				}
				let url = this.$baseUrl + '/product/findProductInfo';

				uni.request({
					url: url,
					method: 'POST',
					data: params,
					header: headers,
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.success) {
							this.productList = res.data.productList;
						} else {
							uni.showToast({
								title: "查询失败"
							});
						}

					},
					fail: (err) => {
						uni.showToast({
							title: "连接失败"
						});
					}
				});

			},
			ProgramDetailInfo(e) {

				this.productId = e.currentTarget.dataset.value;
				uni.navigateTo({
					url: "../detail/detail?productId=" + this.productId+"&staus=2"
				});

			},
			bannerList() {

				let headers = {
					"Content-Type": "application/json" //设置一下请求头即可
				}
				let url = this.$baseUrl + '/user/findBannerList';

				uni.request({
					url: url,
					method: 'POST',
					header: headers,
					success: (res) => {
						this.bannerListArr = res.data.bannerList;
					},
					fail: (err) => {
						uni.showToast({
							title: '系统出错'
						});
					}
				});
			},
			togglePopup(type) {
				this.type = type;
			},
			showConfirm() {
				this.type = 'showpopup';
			},
			hideConfirm() {
				this.type = '';
			},
			async getLocation() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
				// #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
				let status = await this.getSetting();
				if (status === 2) {
					this.showConfirm();
					return;
				}
				// #endif
				if(uni.getSystemInfoSync().platform == 'ios'){
					this.init();
				//uni.hideNavigationBarLoading();
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
						that.bannerList();
						//that.workInfoList();
						that.ProgramType();
						that.ProgramInfo(null);
						uni.hideNavigationBarLoading();
					}else{
						that.doGetLocation();
					}
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
							var fruits = ["上海市","重庆市", "北京市","天津市"];
							if(fruits.indexOf(addressList[0])>-1){
								provinceName = addressList[0];
							}else{
								provinceName = addressList[1];
							}
							if(uni.getStorageSync("province")!=null && uni.getStorageSync("province")!="" ){
								if(uni.getStorageSync("province").name == provinceName){
									that.locationJson.address = provinceName;
									that.locationJson.jd = uni.getStorageSync("province").lng;
									that.locationJson.wd = uni.getStorageSync("province").lat;
									that.pname = uni.getStorageSync("province").name;
								}else{
									that.locationJson.address = provinceName;
									that.locationJson.jd = res.longitude;
									that.locationJson.wd = res.latitude;	
									that.pname = provinceName;
								}					
							}else{
								that.locationJson.address = provinceName;	
								that.locationJson.jd = res.longitude;
								that.locationJson.wd = res.latitude;
								that.pname =  provinceName;
							}
							that.bannerList();
							//that.workInfoList();
							that.ProgramType();
							that.ProgramInfo(null);
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
						
						that.locationJson.address = '上海市';
						that.locationJson.jd = '121.472999999999999';
						that.locationJson.wd = '31.2317';
						that.pname =  '上海市';
						that.bannerList();
						//that.workInfoList();
						that.ProgramType();
						that.ProgramInfo(null);
						uni.hideNavigationBarLoading();
					}
				})
			},
			getSetting: function() {
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success: (res) => {
							if (res.authSetting['scope.userLocation'] === undefined) {
								resolve(0);
								return;
							}
							if (res.authSetting['scope.userLocation']) {
								resolve(1);
							} else {
								resolve(2);
							}
						}
					});
				});
			},
			openSetting: function() {
				this.hideConfirm();
				uni.openSetting({
					success: (res) => {
						if (res.authSetting && res.authSetting['scope.userLocation']) {
							this.doGetLocation();
						}
					},
					fail: (err) => {}
				})
			},
			async checkPermission() {
				let status = permision.isIOS ? await permision.requestIOS('location') :
					await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');

				if (status === null || status === 1) {
					status = 1;
				} else if (status === 2) {
					uni.showModal({
						content: "系统定位已关闭",
						confirmText: "确定",
						showCancel: false,
						success: function(res) {}
					})
				} else if (status.code) {
					uni.showModal({
						content: status.message
					})
				} else {
					uni.showModal({
						content: "需要定位权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			},
			clear: function() {
				this.hasLocation = false
			},
			//查询技师的信息
			async workInfoList() {
				//根据距离来排序的技师
				let dataParam = {
					"workerId": "",
					"shopId": "",
					"page": 1,
					"size": 4,
					"productId":null,
					city:this.locationJson.address
				};
				let url = this.$baseUrl + '/worker/findWorkListByShop';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				this.worklist = res.data.workerList;

				var start = '';
				var end = '';

				for (var i = 0; i < this.worklist.length; i++) {
					if (i == 0) {
						end = this.locationJson.jd + "," + this.locationJson.wd;
						start = this.worklist[i].jd + "," + this.worklist[i].wd;
					} else {
						start += '|' + this.worklist[i].jd + "," + this.worklist[i].wd
					}
				}
				this.getDistance(start, end);

			},
			async getDistance(start, end) {
				var url = 'https://restapi.amap.com/v3/distance?key=9c4ac6befac0d9f329bdde7f3dbe5f35&origins=' + start +
					'&destination=' + end + '&type=3';
				const res = await this.$myRequest({
					url: url
				});
				for (var i = 0; i < res.data.results.length; i++) {
					this.worklist[i].distanceLen = res.data.results[i].distance;
				}
				this.orderByAsc();
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
				for (var i = 0; i < results.length; i++) {
					results[i].distanceLen = parseFloat(results[i].distanceLen / 1000).toFixed(1);
					//判断是否服务距离大于店员的服务范围
					if (Number(results[i].distanceLen) <= Number(results[i].radius)) {
						if (results[i].distanceLen <= 1) {
							results[i].distanceLen = results[i].distanceLen * 1000 + "m";
						} else {
							results[i].distanceLen = results[i].distanceLen + "km";
						}
						resultsList.push(results[i]);
						continue;
					}
				}
				this.worklist = resultsList;
				uni.hideNavigationBarLoading();
			}
		}
	};
</script>
<style>
	 .ct_tab {
		width: 698upx;
		margin: 0 auto;
		padding: 30upx 0;
		font-size: 26upx;
		font-weight: bold;
		color: #c0c8d0;
		white-space: nowrap;
		display: flex;
		overflow: hidden;
	}

	.ct_item {
		width: 20%;
		padding: 26upx 0;
		display: inline-block;
	}

	.ct_item text {
		padding: 30upx 0;
	}
</style>
