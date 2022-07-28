<template>
	<view class="jishi">
		<view class="searchBar">
		 <!-- <image src="/static/images/search.png" class="searchIcon"></image> -->
		  <input type="text" placeholder="请输入技师的名称" class="searchInput" focus @input="onInput" />
		</view>

		<view class="jishiList" style="margin-top: 1rem;">
			<view v-if="worklist.length > 0" disable="disable" class="jsItem" v-for="(workInfo,workIndex) in worklist" :key="workIndex"
				@tap="jumbUrl" data-value="../jishi-detail/jishi-detail" :data-row="workInfo.workerId" >
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
						<view class="view1">
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
	</view>
</template>


<script>
  export default {
    data() {
      return {
		userName:'',	
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
		array2: ['接单排序', '正序', '倒序'],
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
		jsonStr: "",
		statusIndex:0,
		page:1
      }
    },
	onReachBottom() {
		this.page = this.page + 1;
		this.getJishiCondition();
	},
    onLoad() {
			
			if(uni.getSystemInfoSync().platform == 'ios'){
				this.initLoction();
			}else{
				this.init();
			}
    },
	onBackPress(options){
		if (options.from === 'navigateBack') {
		      return false;
		    }
		    this.gotoPre();
		    return true;
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
					this.getJishiCondition();
				}else{
					that.init();
				}
		},
		async init(){
			if(uni.getStorageSync("province").name != "" && uni.getStorageSync("province").name != null){
				this.pname = uni.getStorageSync("province").name;
				this.locationJson.address = uni.getStorageSync("province").name;
				this.locationJson.jd = uni.getStorageSync("province").lng;
				this.locationJson.wd = uni.getStorageSync("province").lat;
				this.getJishiCondition();
				return;
			}
			let json = await this.$getLocations();
			
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
			console.log(JSON.stringify(json));
			this.getJishiCondition();
		},
		//click事件函数
		gotoPre:function(){
		    let pages = getCurrentPages()//页面栈
		    let prePage = pages[pages.length - 2]//上一页
		    prePage.$vm.reFresh = Math.random()//触发上一页监听器
		    uni.setStorageSync("status","1");
		    uni.navigateBack()//返回上一页
		},
		onInput(e) {
			this.userName = e.detail.value;
			this.worklist = [];
			this.page = 1;
			this.getJishiCondition();
			
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
		//根据各个条件来查询技师的信息
		async getJishiCondition() {
			
			//根据距离来排序的技师
			uni.showNavigationBarLoading();
			var shopName_1 = "";
			var userName = this.userName;
			var orderByDesc = "";
			var evalNmsDesc = "";
			
			let dataParam = {
				"workerId": "",
				"shopId": "",
				"page":this.page,
				"evalNmsDesc":evalNmsDesc,
				"userName": userName,
				"shopName": shopName_1,
				"city":this.locationJson.address,
				"jd":this.locationJson.jd,
				"wd":this.locationJson.wd
			};
			//console.log(dataParam);
			let url = this.$baseUrl + '/worker/findWorkListByShop_1'
			const res = await this.$myRequest({
				url: url,
				data: dataParam,
				method: "POST"
			});
			let start = '';
			let end = '';
			let jishiList = [];
			let jishiNum = 0;
			
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
			//this.getDistanceCon(jishiList,start, end);
			uni.hideNavigationBarLoading();
		},
		async getDistanceCon(jishiList,start,end){
			var url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins='+start+'&destination='+end+'&type=3';
			const res = await this.$myRequest({
							url: url
						});	
			var resultsList = [];				
			for(var i = 0;i<res.data.results.length;i++){
				var distanceInfo= res.data.results[i].distance;
				var distanceLen  = parseFloat(distanceInfo/1000).toFixed(1);
				
				//let radius = parseFloat(Number(jishiList[i].radius) / 1000).toFixed(1);
				let radius = parseFloat(Number(jishiList[i].radius)).toFixed(1);
				console.log(distanceLen+"===="+radius);
				if(Number(distanceLen) <= radius){
						if(Number(distanceLen)<=1){
							jishiList[i].distanceLen =distanceLen*1000+"m";
						}else{
							jishiList[i].distanceLen = distanceLen+"km";
						}
						this.worklist.push(jishiList[i])	
						//resultsList.push(this.worklist[i]);	
						continue;	
				}
			}
			
		}
    }
  };
</script>

<style>

	.jsitm3{
		overflow: hidden;
		-webkit-line-clamp:2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		height: 1.7rem;
	}
	image{
		margin-top:1rem;
	}

</style>
