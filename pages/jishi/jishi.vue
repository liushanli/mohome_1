<template>
	<view class="jishi">
		<uni-nav-bar :fixed="true" title="技师" :status-bar="true" :border="false" :shadow="false" >
			<block slot="left">
				<view class="city" @tap="jumbUrl_2">
					<uni-icons type="location-filled" size="20"></uni-icons>
					<view><text class="tpCity">{{pname}}</text></view>
					<uni-icons type="arrowdown" color="#333333" size="18" />
				</view>
			</block>
		</uni-nav-bar>

		<view class="filter" style="position: fixed;z-index: 999;">
			<view class="filterIn">
				<view class="filItemwa" @tap="open">
					<view class="filItem" :style="{color:shopColor}">{{shopName}}
						<uni-icons type="arrowdown" :color="shopColor" style="margin-top: 0.15rem;" size="18" />
					</view>
				</view>


				<view class="filItemwa" @tap="change(2)">
					<picker @change="bindPickerChange2" :value="index2" :range="array2">
						<view class="filItem" :style="{color:sortColor}">{{array2[index2]}}
							<uni-icons type="arrowdown" :color="sortColor" style="margin-top: 0.15rem;" size="18" />
						</view>
					</picker>
				</view>

				<view class="filItemwa" @tap="change(3)">
					<view class="filItem" :style="{color:praiseColor}">
						好评多
					</view>
					<!-- <picker @change="bindPickerChange3" :value="index3" :range="array3">
						<view class="filItem" :style="{color:praiseColor}" >{{array3[index3]}}
							<uni-icons type="arrowdown" :color="praiseColor" style="margin-top: 0.15rem;" size="18" />
						</view>
					</picker> -->
				</view>
			</view>
		</view>

		<view class="jishiList" style="margin-top: 3rem;">
			<view v-if="worklist.length > 0" disable="disable" class="jsItem" v-for="(workInfo,workIndex) in worklist" :key="workIndex"
				@tap="jumbUrl" data-value="../jishi-detail/jishi-detail" :data-row="workInfo.workerId">
				<view class="jsItemL">
					<image :src="workInfo.imgUrl"></image>
					<view style="text-align: center;color: #09BB07;margin-top: 1rem;">{{workInfo.shopName}}</view>
				</view>
				<view class="jsItemR">
					<view class="jsitm1">
						<view class="view1">{{workInfo.userName}}
						<span v-if="workInfo.gender==2" style="color: #0FAEFF;font-size: 80%;margin-left: 0.3rem;">女</span>
						<span v-if="workInfo.gender==1" style="color: #0FAEFF;font-size: 80%;margin-left: 0.3rem;">男</span>
						</view>
						
						<view class="view2">最近可约：{{workInfo.dateHHmm}}</view>
					</view>
					<view class="jsitm2">
						<view>
							<uni-rate :value="workInfo.star" color="#bbb" active-color="red" size="12" readonly />
							<!-- {{workInfo.star}} -->
						</view>
						<view class="view2">评价:{{workInfo.evaluateNum}} 好评:{{workInfo.evaluateNumLv}}</view>
					</view>
					<view class="jsitm2">
						<view class="view1"></view>
						<view class="view2">已接<span style="color: #F9221D;">{{workInfo.sellNum}}</span>单</view>
					</view>
					<view class="jsitm3" style="margin-top: -1.4rem;">
						{{workInfo.workerTitle}}
					</view>
					<view class="jsitm4">
						<view class="tags">
							<view class="tag">{{workInfo.evalStatus_1}}</view>
							<view class="tag">{{workInfo.evalStatus_2}}</view>
							<view class="tag">{{workInfo.evalStatus_3}}</view>
						</view>
						<view class="juli">
							<image style="margin-top: -0.1rem;" src="/static/images/mapicon.png"></image>
							{{workInfo.distance}}
						</view>
					</view>
				</view>
			</view>
			<view v-if="worklist.length <= 0" style="text-align: center;font-size: 1rem;color: #6D6D72;">暂无数据</view>
		</view>

		<uni-popup ref="popup" type="top">
			<div class="choiceTime" style="margin-top: 7.5rem;">

				<view class="titemtems">

					<view :class="{todayTimes:true, cur: index==shopIndex}" @click="shopIndex=index"
						v-for="(item, index) in array1" :key="index" style="width: 5rem;margin-left: 0.2rem;">

						{{item}}
					</view>
				</view>
				<view class="tijiaoyy" @tap="close">
					确定
				</view>
			</div>
		</uni-popup>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				shopCur: 1,
				pname:'',
				provinceListInfo:[],
				cur: 0,
				cur1: 0,
				timeCur: 0,
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
				array: [],
				array1: ['全部'],
				array2: ['全部', '男技师', '女技师'],
				array3: ['好评排序', '正序', '倒序'],
				worklist: [],
				//workOrder:list,
				index: 0,
				index1: 0,
				index2: 0,
				index3: 0,
				cur: 0,
				shopIndex: -1,
				orderBy: [],
				shopOrder: 'arrowdown',
				sortOrder: 'arrowdown',
				shopColor: '#000000',
				sortColor: '#000000',
				praiseColor: '#000000',
				shopName: '选择商家',
				locationJson: {
					address: "",
					wd: "",
					jd: ""
				},
				evalNmsDesc:null,
				jsonStr: "",
				statusIndex:0,
				page:1,
				conStat:1
			}
		},
		onShow: function () {
			//获取上一页面的返回值
			var that = this;
			this.$versionInfo();
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			if(uni.getStorageSync("province").name != "" && uni.getStorageSync("province").name != null){
				this.pname = uni.getStorageSync("province").name;
				this.locationJson.address = uni.getStorageSync("province").name;
				this.locationJson.jd = uni.getStorageSync("province").lng;
				this.locationJson.wd = uni.getStorageSync("province").lat;
				this.page = 1;
				this.worklist= [];
				this.workInfoList();
				this.shopInfo();
			}
		},
		onLoad() {
			uni.showNavigationBarLoading();
			/* if(uni.getSystemInfoSync().platform == 'ios'){
				this.initLoction();
			}else{
				this.getLocationInfo();
			} */
			this.getLocationInfo();
		},
		onReachBottom() {
			this.page += 1;
			if(this.conStat == 1){
					this.workInfoList();
			}else{
				this.getJishiCondition();
			}
		},
		methods: {
			async initLoction(){
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
						this.workInfoList();
						this.shopInfo();
					}else{
						that.getLocationInfo();
					}
			},
			jumbUrl_2(){
				uni.navigateTo({
					url:"../addressi_search/address_search"
				})
			},
			open() {
				this.change(1);
				this.statusIndex = 1;
				this.$refs.popup.open()
			},
			close() {
				this.worklist= [];
				this.page = 1;
				this.statusIndex = 0;
				//console.log("===---");
				//console.log(this.shopIndex);
				this.index1 = this.shopIndex + 1;
				this.getJishiCondition();
				this.$refs.popup.close();
			},
			change(status) {
				if (status == 1) {
					this.evalNmsDesc = null;
					this.shopColor = '#09BB07';
					this.sortColor = '#000000';
					this.praiseColor = '#000000';
				} else if (status == 2) {
					this.evalNmsDesc = null;
					if(this.statusIndex==1){
						this.statusIndex = 0;	
						this.close();						
					}
					
					this.shopColor = '#000000';
					this.sortColor = '#09BB07';
					this.praiseColor = '#000000';
				} else if (status == 3) {
					/* if(this.statusIndex==1){
						this.close();
						this.statusIndex = 0;						
					} */
					this.evalNmsDesc = "desc";
					this.close();
					this.shopColor = '#000000';
					this.sortColor = '#000000';
					this.praiseColor = '#09BB07';
				} else {
					this.evalNmsDesc = null;
					if(this.statusIndex==1){
						this.close();	
						this.statusIndex = 0;	
					}
					this.shopColor = '#000000';
					this.sortColor = '#000000';
					this.praiseColor = '#000000';
				}
			},
			async provinceList() {
				let params = {
					"level": "2",
					"pid": ""
				};

				let headers = {
					"Content-Type": "application/json" //设置一下请求头即可
				};
				let url = this.$baseUrl + '/user/findProvinceInfo';
				const res = await this.$myRequest({
					url: url,
					data: params,
					method: "POST"
				});
				this.provinceListInfo = res.data.provinceList;
				//console.log(this.locationJson.address);
				if (res.data.provinceList != null) {
					for (var i = 0; i < res.data.provinceList.length; i++) {
						if(uni.getStorageSync("province") != null && uni.getStorageSync("province")!=""){
							if (uni.getStorageSync("province").name.indexOf(res.data.provinceList[i].name) != -1) {
								this.index = i;
							}							
						}else{
							if (this.locationJson.address.indexOf(res.data.provinceList[i].name) != -1) {
								this.index = i;
							}
						}

						this.array.push(res.data.provinceList[i].name);
					}
				}
				//uni.hideNavigationBarLoading();
			},
			jumbUrl: function(event) {
				
				let workerId = event.currentTarget.dataset.row;
				let url = event.currentTarget.dataset.value;
				if (workerId != null && workerId != '' && workerId != undefined) {
					uni.navigateTo({
						url: url + "?workerId=" + workerId
					});
				} else {
					uni.navigateTo({
						url: url
					});
				}
			},
			async shopInfo() {
				//获取服务商的接口
				let url = this.$baseUrl + '/shop/findShopList';
				this.array1 = ['全部'];
				const res = await this.$myRequest({
					url: url,
					method: "POST",
					data:{city:this.locationJson.address}
				});

				for (var i = 0; i < res.data.shopList.length; i++) {
					this.array1.push(res.data.shopList[i].shopName);
				}
			},
			//查询技师的信息
			async workInfoList() {
				this.conStat = 1;
				uni.showNavigationBarLoading();
				//根据距离来排序的技师
				let dataParam = {
					"workerId": "",
					"shopId": "",
					"page": this.page,
					"city":this.locationJson.address,
					"jd":this.locationJson.jd,
					"wd":this.locationJson.wd
				};
				console.log(JSON.stringify(dataParam));
				let url = this.$baseUrl + '/worker/findWorkListByShop_1';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				console.log(JSON.stringify(this.locationJson));
				//this.worklist = res.data.workerList;
				let start = '';
				let end = '';
				let jishiList = [];
				let jishiNum = 0;
				//console.log(JSON.stringify(res.data.workerList));
				
				if(res.data.workerList.length<=0){
					uni.showModal({
						content:"您好，数据已经到底了",
						showCancel:false
					})
					uni.hideNavigationBarLoading();
					return;
				}
				for(var i=0;i<res.data.workerList.length;i++){
						this.worklist.push(res.data.workerList[i]);
				}
				uni.hideNavigationBarLoading();
			},
			//根据各个条件来查询技师的信息
			async getJishiCondition() {
				this.conStat = 2;
				//根据距离来排序的技师
				uni.showNavigationBarLoading();
				var shopName_1 = "";
				var userName = "";
				var orderByDesc = "";
				var evalNmsDesc = "";
				var genderDesc = "";
				if (this.index1 != 0) {
					shopName_1 = this.array1[this.shopIndex];
					this.shopName = this.array1[this.shopIndex];
					//console.log(this.shopName);
				}
				if (this.index2 == 1) {
					genderDesc = "1";
				} else if (this.index2 == 2) {
					genderDesc = "2";
				}
				
				/* if (this.index3 == 1) {
					evalNmsDesc = "asc";
				} else if (this.index3 == 2) {
					evalNmsDesc = "desc";
				} */
				if (this.shopIndex == 0) {
					shopName_1 = "";
				}
				let dataParam = {
					"workerId": "",
					"shopId": "",
					"page": this.page,
					"size": 6,
					"genderDesc": genderDesc,
					"evalNmsDesc":"desc",
					"userName": userName,
					"shopName": shopName_1,
					"city":this.locationJson.address,
					"jd":this.locationJson.jd,
					"wd":this.locationJson.wd
				};
				//console.log(dataParam);
				let url = this.$baseUrl + '/worker/findWorkListByShop_1';
				const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method: "POST"
				});
				let start = '';
				let end = '';
				let jishiList = [];
				let jishiNum = 0;
				
				/* for (var i = 0; i < res.data.workerList.length; i++) {
					if (res.data.workerList[i].jd != "" && res.data.workerList[i].jd != null) {
						if (i == 0) {
							//end = '121.22654,31.03241';
							end = this.locationJson.jd + ',' + this.locationJson.wd;
							start = res.data.workerList[i].jd + "," + res.data.workerList[i].wd;
						} else {
							start += '|' + res.data.workerList[i].jd + "," + res.data.workerList[i].wd
						}
						jishiList[jishiNum] = res.data.workerList[i];
						jishiNum = jishiNum + 1;
					}
				} */
				//this.worklist = jishiList;
				//uni.hideNavigationBarLoading();
				console.log(res.data.workerList);
				console.log(res.data.workerList.length);
				if(res.data.workerList.length<=0){
					uni.showModal({
						content:"您好，数据已经到底了",
						showCancel:false
					})
					uni.hideNavigationBarLoading();
					return;
				}
				//this.getDistance(jishiList,start, end);
				this.orderByAsc(res.data.workerList);
				uni.hideNavigationBarLoading();
			},
			async getDistance(list,start, end) {
				
				//console.log(start + "==" + end);
				var url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins=' +
					start + '&destination=' + end + '&type=3';
				const res = await this.$myRequest({
					url: url
				});
				//console.log("==res=="+JSON.stringify(res));
				for (var i = 0; i < res.data.results.length; i++) {
					list[i].distanceLen = res.data.results[i].distance;
				}
				//console.log(JSON.stringify(this.worklist));
				//console.log(JSON.stringify(this.worklist));
				this.orderByAsc(list);
			},
			async getDistanceCon(start, end) {
				var url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins=' +
					start + '&destination=' + end + '&type=3';
				const res = await this.$myRequest({
					url: url
				});
				var resultsList = [];
				for (var i = 0; i < res.data.results.length; i++) {
					this.worklist[i].distanceLen = res.data.results[i].distance;
				}
				this.orderByAsc_1();
				uni.hideNavigationBarLoading();
			},
			orderByAsc_1() {
				uni.showNavigationBarLoading();
				//从小打大排序
				var results = this.worklist;
				var arr = "";
			
				if (results.length > 0) {
					/* for (var i = (results.length - 1); i >= 0; i--) {
						//console.log(""+i);
						for (var j = 0; j < i; j++) {
							if (Number(results[j].distanceLen) >= Number(results[j + 1].distanceLen)) {
								arr += j + ",";
								var temp = results[j];
								results[j] = results[j + 1];
								results[j + 1] = temp;
							}
						}
					} */
					var resultsList = [];
					let k = 0;
					for (var i = 0; i < results.length; i++) {
						results[i].distanceLen = parseFloat(results[i].distanceLen / 1000).toFixed(1);
						//let radius = parseFloat(Number(results[i].radius) / 1000).toFixed(1);
						let radius = parseFloat(Number(results[i].radius)).toFixed(1);
						//判断是否服务距离大于店员的服务范围
						//console.log((Number(results[i].distanceLen) <= Number(results[i].radius)));
						if (Number(results[i].distanceLen) <= radius) {
							if (results[i].distanceLen <= 1) {
								results[i].distanceLen = results[i].distanceLen * 1000 + "m";
							} else {
								results[i].distanceLen = results[i].distanceLen + "km";
							}
							resultsList[k] = results[i];
							resultsList[k].stats = true;
							k = k + 1;
						} else {
							results[i].distanceLen = results[i].distanceLen + "km";
							resultsList[k] = results[i];
							resultsList[k].stats = false;
							k = k + 1;
						}
					}
					this.worklist = resultsList;
					//console.log(JSON.stringify(this.worklist));
			
				}
				uni.hideNavigationBarLoading();
			},

			orderByAsc(list) {
				uni.showNavigationBarLoading();
				//从小打大排序
				var results = list;
				var arr = "";
				
				var lengths = results.length;
				console.log(lengths);
				if (results.length > 0) {
					for (var i = 0; i < lengths; i++) {
						console.log(i);
						this.worklist.push(results[i]);
					}
					console.log(this.worklist);
				}
				uni.hideNavigationBarLoading();
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.locationJson.address = this.provinceListInfo[this.index].name;
				this.locationJson.jd = this.provinceListInfo[this.index].lng;
				this.locationJson.wd = this.provinceListInfo[this.index].lat;
				uni.setStorageSync("province",this.provinceList[this.index]);
				
				
				this.workInfoList();
				this.shopInfo();

			},
			bindPickerChange1: function(e) {

				this.index1 = e.target.value;
				this.page = 1;
				this.worklist = [];
				this.getJishiCondition();
			},
			bindPickerChange2: function(e) {
				this.page = 1;
				this.worklist = [];
				this.index3  = 0;
				this.index2 = e.target.value;
				this.getJishiCondition();
			},
			bindPickerChange3: function(e) {
				this.page = 1;
				this.worklist = [];
				this.index2 = 0;
				this.index3 = e.target.value;
				this.getJishiCondition();
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			async getLocationInfo() {
				let json = await this.$getLocations();
				
				this.jsonStr = JSON.stringify(json);
				//console.log(this.jsonStr);
				//console.log(uni.getStorageSync("province"));
				if(uni.getStorageSync("province")!=null && uni.getStorageSync("province")!=""){
					
					this.locationJson.address = uni.getStorageSync("province").name;	
					this.locationJson.jd = uni.getStorageSync("province").lng;
					this.locationJson.wd = uni.getStorageSync("province").lat;
					this.pname = uni.getStorageSync("province").name;	
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
					this.pname = provinceName;
				}
				//console.log(this.jsonStr.indexOf("商丘市")+"+==="+this.jsonStr.indexOf("永城市"));
				
				
				//this.provinceList();
				this.workInfoList();
				this.shopInfo();
				//uni.hideNavigationBarLoading();
			}
		}
	};
</script>

<style>
	.jsitm3 {
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		height: 1.7rem;
	}

	image {
		margin-top: 1rem;
	}

	.contion {
		color: #09BB07;
	}
</style>
