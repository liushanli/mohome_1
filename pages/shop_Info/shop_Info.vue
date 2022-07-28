<template>
	<view class="index">
		<view class="indexIn">
			<view class="swBox">
				<swiper class="swiper">
					<swiper-item>
						<image :src="shopInfo.shopLogoUrl"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view style="color: #FF0000;font-size: 0.8rem;border-bottom: #FF0000 solid 1px; text-align: center;width: 5rem;position:absolute; top: 9rem;left: 1rem;" @tap="makeShopInfo">查看营业资质</view> -->
			<view style="margin-top:1rem; 
			text-align: center;font-size: 1rem;font-weight: bold;">{{shopInfo.shopName}}			
			</view>
			<view style="color: #FF0000;font-size: 0.8rem;border-bottom: #FF0000 solid 1px; text-align: center;width: 4rem;position:absolute; top: 9rem;right: 1rem;" @tap="makePhoneCall">客服电话</view>
			<view @tap="cur=3" style="text-align: center;font-size: 0.8rem;color: #999999;margin-top: 0.5rem;height: 2rem;"><span style="margin-right: 7rem;color: #F0AD4E;font-weight: bolder;" >企业已认证<uni-icons type="arrowright" size="13" color="#F0AD4E" style="margin-right: -0.5rem;"></uni-icons><uni-icons type="arrowright" size="13" color="#F0AD4E" ></uni-icons></span> 
			 服务时间：<span style="color: #1AAD19;">{{shopTime}}</span></view>
			<view class="tabBox" style="margin: -1rem 0rem 0rem -0.5rem ;">
				<scroll-view scroll-x="true" class="ct_tab">
					<view class="ct_item" :class="{'tbItem':true, 'cur': cur==0}" @tap="cur=0" >
						首页
					</view>
					<view class="ct_item" :class="{'tbItem':true, 'cur': cur==1}" @tap="cur=1">
						全部项目
					</view>
					<view class="ct_item" :class="{'tbItem':true, 'cur': cur==2}" @tap="cur=2">
						技师
					</view>
					<view class="ct_item" :class="{'tbItem':true, 'cur': cur==3}" @tap="cur=3">
						关于我们
					</view>
					<view class="ct_item" :class="{'tbItem':true, 'cur': cur==4}" @tap="cur=4">
						用户评价
					</view>
					
				</scroll-view>
			</view>
		<view v-if="cur==0">
			<view class="title">
				明星技师
				<view class="lstTxt" style="color: #999999; font-size:0.7rem;position: absolute;right: 15rpx;"  @tap="cur=2">
				 更多技师<uni-icons type="arrowright" size="13" color="#666"></uni-icons>
				</view>
			</view>
			<scroll-view class="scrool-more" scroll-x="true" scroll-with-animation="true" >
				<view class="fujList">
				<view class="fuitem" v-for="(workInfo,workIndex) in workerInfolist" v-if="workIndex<4" :key="workIndex">
				<view  class="fuitem1" @tap="jumbUrl_1" :data-value="workInfo.workerId" style="float: left;margin-right: 0.3rem;">
					<image :src="workInfo.imgUrl" style="width: 5rem;height: 5rem;border-radius: 0.2rem;"></image>
				</view>	
				<view class="fuitem2">{{workInfo.userName}}
				<span v-if="workInfo.gender==2" style="color: #0FAEFF;font-size: 90%;margin-left: 0.3rem;">女</span>
				<span v-if="workInfo.gender==1" style="color: #0FAEFF;font-size: 90%;margin-left: 0.3rem;">男</span>
				
				</view>
				<view class="fuitem3">已接 <text style="color: #FF0000;">{{workInfo.sellNum}}单</text></view>
				</view>
				</view>
			</scroll-view>
			<view class="title"  style="margin-top: -1rem;">
				服务项目
			</view>
			<view class="itemList">
				<view  v-if="productList.length > 0" class="item" v-for="(productInfo,productIndex) in productList" :key="productIndex" :data-value="productInfo.productId"
				 @tap="ProgramDetailInfo">
					<view class="itemL">
						<image :src="productInfo.imgUrl" style="border-radius: 0.2rem;" />
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
			</view>
			</view>
			
			<view v-if="cur==1">
			
				<view class="itemList">
					<view class="item" v-for="(productInfo,productIndex) in productList" :key="productIndex" :data-value="productInfo.productId"
					 @tap="ProgramDetailInfo">
						<view class="itemL">
							<image :src="productInfo.imgUrl" style="border-radius: 0.2rem;" />
						</view>
						<view class="itemM">
							<view class="itemM1">{{productInfo.productName}}</view>
							<view class="itemM2">￥<text class="text">{{productInfo.price}}</text>
								<view v-if="productInfo.couponType!=1" class="vipPc">
									<view class="vipPc1">会员价</view>
									<view class="vipPc2">￥{{productInfo.memberPrice}}</view>
								</view>
								<view  v-if="productInfo.couponType==1" class="vipPc">
									<view class="vipPc1">秒杀价</view>
									<view class="vipPc2">￥{{productInfo.secondPrice}}</view>
								</view>
							</view>
						</view>
						<view class="itemR">
							<view class="itemR1">
								<image src="/static/images/hongicon.png"></image> {{productInfo.productTime}}分钟
							</view>
							<view class="itemR2">已售<span style="color: #F9221D;">{{productInfo.sellNum}}</span></view>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="cur==2" >
			
				<view class="jishiList">
					<view disable = "disable" class="jsItem" v-for="(workInfo,workIndex) in worklist" :key="workIndex" @tap="jumbUrl_1"  :data-value = "workInfo.workerId">
						<view class="jsItemL"><image style="border-radius: 0.2rem;" :src="workInfo.imgUrl"></image>
						<view style="text-align: center;color: #09BB07;margin-top: 1rem;">{{workInfo.shopName}}</view>
						</view>
						<view class="jsItemR">
							<view class="jsitm1" >
								<view class="view1">{{workInfo.userName}}
								<span v-if="workInfo.gender==2" style="color: #0FAEFF;font-size: 80%;margin-left: 0.3rem;">女</span>
								<span v-if="workInfo.gender==1" style="color: #0FAEFF;font-size: 80%;margin-left: 0.3rem;">男</span>
								
								</view>
								<view class="view2">最近可约：{{workInfo.dateHHmm}}</view>
							</view>
							<view class="jsitm2">
								<view class="view1"><uni-rate :value="workInfo.star" color="#bbb" active-color="red" size="12" readonly /> </view>
								<view class="view2">评价:{{workInfo.evaluateNum}}   好评:{{workInfo.evaluateNumLv}}</view>
							</view>
							<view class="jsitm3">
								{{workInfo.workerTitle}}
							</view>
							<view class="jsitm4">
								<view class="tags">
									<view class="tag">{{workInfo.evalStatus_1}}</view>
									<view class="tag">{{workInfo.evalStatus_2}}</view>
									<view class="tag">{{workInfo.evalStatus_3}}</view>
								</view>
								<view class="juli">
									<image style="margin-top: -0.1rem;" src="/static/images/mapicon.png"></image> {{workInfo.distance}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="cur==4">
				<view class="orderBox">
					<view class="rooded">
						<view class="roitem" v-for="(evalInfo,evalIndex) in evalList" :key="evalIndex">
						<view class="roitem1">
							<view class="roitem1a">{{shopInfo.shopName}} <uni-icons type="arrowright" color="#555" size="15"></uni-icons></view>
						</view>
						<view class="roitem2" style="margin-top: -1rem;">
							<view class="roitem2L">
								<!-- <image :src="evalInfo.userImgUrl"></image> -->
								<image :src="getHeadImg(evalInfo.userImgUrl)"></image>
								
								</view>
							<view class="roitem2R">
								<view class="roitem2Ra">
									<!-- <view class="roitem2Rax">{{evalInfo.userName}}</view> -->
									<view class="roitem2Rax">******</view>
								</view>
								<view class="roitem2Rb" style="margin-top: 0.1rem">
									<uni-rate :value="evalInfo.star" color="#bbb" size="17"></uni-rate>
									<view class="roitem2Rbx" >{{evalInfo.updateTime}}</view>
								</view>
								<view class="roitem2RC">
									<view class="roitem2RCx">
									<rich-text :nodes="getContent(evalInfo.content,evalInfo.imgUrl)"> </rich-text>
									</view>
								</view>
								<view class="roitem2Rb">
									<view class="roitem2Rbx">{{evalInfo.address}}  {{evalInfo.productName}}</view>
								</view>
							</view>
						</view>
					</view>
					</view>
				</view>
			</view>
			<view v-if="cur==3">
				<view class="orderBox">
					<view class="rooded">
						<rich-text  :nodes="contentText|formatRichText"></rich-text>
					</view>
				</view>
			</view>
			
		</view>
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog">
			<uni-popup-dialog title="提示" :content="content" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
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
				page:1,
				contentText:"",
				array: [],
				index: 0,
				cur: 0,
				productTypeList: [],
				productTypeId: '',
				productList: [],
				productId: '',
				workerInfolist:'',
				worklist: [],
				bannerListArr: [],
				title: '',
				hasLocation: false,
				location: {},
				type: '',
				flag: false,
				reFresh: "",
				evalList:[],
				locationJson: {
					address: "",
					wd: "",
					jd: ""
				},
				shopId:'',
				shopInfo:{
					shopName:'',
					shopPhone:''
				},
				shopTime:"",
				content:'',
				userPhone:'',
				evalPage:1
			}
		},
		onLoad() {
			
			console.log(uni.getStorageSync("isLogin"));
			//获取用户的基本信息
			if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null || uni.getStorageSync("isLogin")==false){
				uni.setStorageSync("meStatus","Y");
				uni.navigateTo({
					url:'../login/login1'
				});
				return;
			}
			
			let userVo = uni.getStorageSync("userVo");
			console.log(JSON.stringify(userVo));
			this.userPhone = userVo.phone;
			this.content = "将使用该'"+userVo.phone+"'号码隐藏拨出";
			uni.showNavigationBarLoading();
			this.shopId = uni.getStorageSync("shopId");
			//console.log(this.shopId);
			this.getShopInfo();
			this.getLocationInfo();
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
		onReachBottom() {
			if(this.cur == 2){
				this.page += 1;	
				this.workInfoList();
			}
			
			/* if(this.conStat == 1){
					this.workInfoList();
			}else{
				this.getJishiCondition();
			} */
			if(this.cur == 4){
				this.evalPage += 1;
				this.evalInfoList();
			}
			
			
		},
		filters: {
				/**
				 * 处理富文本里的图片宽度自适应
				 * 1.去掉img标签里的style、width、height属性
				 * 2.img标签添加style属性：max-width:100%;height:auto
				 * 3.修改所有style里的width属性为max-width:100%
				 * 4.去掉<br/>标签
				 * @param html
				 * @returns {void|string|*}
				 */
				formatRichText(html) {
		            if(!html) return
					//控制小程序中图片大小
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					return newContent;
				}
			},
		methods: {
			jumbUrl_2(){
				uni.navigateTo({
					url:"../common/picImage/picImge"
				})
			},
			makeShopInfo(){
				/* uni.setStorageSync("shopIntroduce",this.shopInfo.shopIntroduce);
				uni.navigateTo({
					url:"../shopIntroduce/shopIntroduce"
				}) */
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
				let url = this.$baseUrl + '/order/findAddPhoneUp';
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: {
						phoneA:this.shopInfo.shopPhone,
						phoneB:this.userPhone
					}
				}) ;
				console.log(JSON.stringify(res));
				let phone = res.data.phone; 
				if(phone == null || phone == ""){
					phone = this.shopInfo.shopPhone;
				}
				uni.makePhoneCall({
					phoneNumber: phone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
				/* uni.makePhoneCall({
					phoneNumber: this.shopInfo.shopPhone,
					success: () => {
						console.log("成功拨打电话")
					}
				}) */
				
				
				console.log('点击确认');
				// 需要执行 done 才能关闭对话框
				done()
			},
			getHeadImg(img){
				/* if(img!='' && img!=undefined && img != null){
					return img;
				}else{
					return "/static/images/loginAPP.png";
				} */
				return "/static/images/loginAPP.png";
			},
			makePhoneCall: function () {
				this.msgType = 'success'
				this.$refs.popupDialog.open();
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
			async getShopInfo(){
				
				let url = this.$baseUrl+"/shop/findShopInfo"
				//console.log(url);
				const res = await this.$myRequest({
					url:url,
					data:{
						"shopId":this.shopId
					},
					method:"POST"
				});
				this.shopInfo = res.data.shopList[0];	
				this.shopTime = this.shopInfo.stopStartTime+"-"+this.shopInfo.stopEndTime;
				//uni.setStorageSync("PicList",[{imgUrl:this.shopInfo.serviceLogoUrl}]);
				this.contentText = this.shopInfo.shopIntroduce;
				//console.log(JSON.stringify(this.shopInfo));
			},
			clickCtTab(ctCur) {
				this.tabCur = ctCur
			},
			jmbWebUrl() {
				plus.runtime.openURL('https://hotels.ctrip.com/hotels/detailPage?hotelId=15226365');
			},
			async getLocationInfo() {
					let json = await this.$getLocations();
					this.jsonStr = JSON.stringify(json);
					console.log(this.jsonStr);
					
					//console.log(this.jsonStr.indexOf("商丘市")+"+==="+this.jsonStr.indexOf("永城市"));
					if(uni.getStorageSync("province") != null && uni.getStorageSync("province") != ""){
						this.locationJson.address = uni.getStorageSync("province").name;
						this.locationJson.jd = uni.getStorageSync("province").lng;
						this.locationJson.wd = uni.getStorageSync("province").lat;
					}else{
						let provinceName = "";
						var fruits = ["上海市", "重庆市", "北京市","天津市"];
						if(fruits.indexOf(json.addressList[0])>-1){
							provinceName = json.addressList[0];
						}else{
							provinceName = json.addressList[1];
						}
						this.locationJson.address = provinceName;
						this.locationJson.jd = json.jd;
						this.locationJson.wd = json.wd;
					}
			
					//this.provinceList();
					/* this.workInfoList();
					this.shopInfo(); */
					
					/* uni.hideNavigationBarLoading(); */
					this.workInfoListInfo();
					this.workInfoList();
					this.ProgramType();
					this.ProgramInfo(null);
					uni.hideNavigationBarLoading();
					this.evalInfoList();
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
				let url = this.$baseUrl + '/product/findProductTypeInfoByCon';
				const res = await this.$myRequest({
					url: url,
					method: "POST",
					data:{"shopId":this.shopId}

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
					"typeId": "",
					"shopId": this.shopId,
					"id": "",
					city:this.locationJson.address
				};

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
						if (res.data.success) {
							this.productList = res.data.productList;
							//console.log("==" + JSON.stringify(this.productList));
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
					url: "../detail/detail?productId=" + this.productId+"&staus=1"
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
			//查询技师的信息
			async workInfoListInfo() {
				uni.showNavigationBarLoading();
				//根据距离来排序的技师
				let dataParam = {
					"shopId": this.shopId,
					"city":this.locationJson.address
				};
				let url = this.$baseUrl + '/worker/getWorkerInfo_1';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				//console.log(JSON.stringify(res.data.workerList));
				this.workerInfolist = res.data.workerList;
			},
			
			async provinceList() {
				let params = {
					"level": "2",
					"pid": ""
				};
				let url = this.$baseUrl + '/user/findProvinceInfo';
				const res = await this.$myRequest({
					url: url,
					data: params,
					method: "POST"
				});
				if (res.data.provinceList != null) {
					for (var i = 0; i < res.data.provinceList.length; i++) {
						if (res.data.provinceList[i].name == this.locationJson.address) {
							this.index = i;
						}
						this.array.push(res.data.provinceList[i].name);
					}
				}
				//console.log(this.array);
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

				this.doGetLocation();
			},
			doGetLocation() {
				uni.getLocation({
					success: (res) => {
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						//console.log(res.latitude + "===" + "===" + res.longitude+"=="+JSON.stringify(res));
					},
					fail: (err) => {
						// #ifdef MP-BAIDU
						if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
							this.showConfirm();
						}
						// #endif
						// #ifndef MP-BAIDU
						if (err.errMsg.indexOf("auth deny") >= 0) {
							uni.showToast({
								title: "访问位置被拒绝"
							})
						} else {
							uni.showToast({
								title: err.errMsg
							})
						}
						// #endif
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
			async evalInfoList(){
				uni.showNavigationBarLoading();
				//根据距离来排序的技师
				let dataParam = {
					"shopId": this.shopId,
					"page":this.evalPage
				};
				let url = this.$baseUrl + '/user/findEvalListInfoCon';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				console.log(res.data.resultList.length);
				if(res.data.success){
					for(var i=0;i<res.data.resultList.length;i++){
						this.evalList.push(res.data.resultList[i]);
					}
				}
				uni.hideNavigationBarLoading();
			},
			//查询技师的信息
			async workInfoList() {
				uni.showNavigationBarLoading();
				//根据距离来排序的技师
				let dataParam = {
					"workerId": "",
					"shopId": this.shopId,
					"page": this.page,
					"city":this.locationJson.address,
					"jd":this.locationJson.jd,
					"wd":this.locationJson.wd
				};	
				
				console.log(dataParam);
				let url = this.$baseUrl + '/worker/findWorkListByShop_1';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				console.log(JSON.stringify(res));
				//this.worklist = ;
				let start = '';
				let end = '';
				let jishiList = [];
				let jishiNum = 0;
				/* for(var i=0;i<this.worklist.length;i++){
					if(this.worklist[i].jd != "" && this.worklist[i].jd != null){
						if(i==0){
								//end = '121.22654,31.03241';
								end = this.locationJson.jd+','+this.locationJson.wd;
								start = this.worklist[i].jd+","+this.worklist[i].wd;
						}else{
							start += '|'+this.worklist[i].jd+","+this.worklist[i].wd
						}
						jishiList[jishiNum] = this.worklist[i];
						jishiNum = jishiNum + 1;
					}
				} */
				//this.worklist = jishiList;
				this.orderByAsc(res.data.workerList);
				//uni.hideNavigationBarLoading();
				//this.getDistance(start,end);
			},
			async getDistance(start, end) {
				console.log(start+"=="+end);
				var url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins='+start+'&destination='+end+'&type=3';
				const res = await this.$myRequest({
									url: url
								});	
				
				for(var i = 0;i<res.data.results.length;i++){
					this.worklist[i].distanceLen = res.data.results[i].distance;
				}
				console.log(JSON.stringify(this.worklist));
				this.orderByAsc();
			},
			orderByAsc(list) {
				uni.showNavigationBarLoading();
				//从小打大排序
				var results = list;
				var arr = "";
				
				var lengths = results.length;
				console.log(lengths);
				if (results.length > 0) {
/* 					var resultsList = [];
					let k = 0; */
					for (var i = 0; i < lengths; i++) {
						console.log(i);
						/*results[i].distanceLen = parseFloat(results[i].distanceLen / 1000).toFixed(1);
						let radius = parseFloat(Number(results[i].radius) / 1000).toFixed(1);
						//判断是否服务距离大于店员的服务范围
						 if (Number(results[i].distanceLen) <= radius) {
							if (results[i].distanceLen <= 1) {
								results[i].distanceLen = results[i].distanceLen * 1000 + "m";
							} else {
								results[i].distanceLen = results[i].distanceLen + "km";
							}
							resultsList[k] = results[i];
							resultsList[k].stats = true;
							k = k + 1;
							
							this.worklist.push(results[i]);
						} */
						this.worklist.push(results[i]);
					}
					console.log(this.worklist);
				}
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
		width: 4.7rem;
		padding: 26upx 0;
		display: inline-block;
	}

	.ct_item text {
		padding: 30upx 0;
	}
</style>
