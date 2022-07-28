<template>
	<view class="jishi">
  
		<view class="jishiList">
			<view disable = "disable" class="jsItem" v-for="(workInfo,workIndex) in worklist" :key="workIndex" @tap="jumbUrl" :data-value="workInfo.userName" :data-img="workInfo.imgUrl" :data-row = "workInfo.workerId"  :data-gender="workInfo.gender" >
				<view class="jsItemL">
					<image :src="workInfo.imgUrl"></image>
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
						<view class="view1"><uni-rate :value="workInfo.star" color="#bbb" active-color="red" size="12" readonly /><!-- {{workInfo.star}} --></view>
						<view class="view2">评价:{{workInfo.evaluateNum}}   好评:{{workInfo.evaluateNumLv}}</view>
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
							<image style="margin-top: -0.1rem;" src="/static/images/mapicon.png"></image> {{workInfo.distance}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="top" >
		  <div class="choiceTime" style="margin-top: 7.5rem;">

		  	 <view class="titemtems">
				 
		  	 	<view :class="{todayTimes:true, cur: index==shopIndex}"  @click="shopIndex=index" v-for="(item, index) in array1" :key="index" style="width: 5rem;margin-left: 0.2rem;">

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
			shopCur:1,
  			cur: 0,
  			cur1: 0,
  			timeCur: 0,
  			productId:'',
  			productInfo:'',
  			productList:[],
  			contentText:'',
  			content:'',
  			today:'',
  			tomorrow:'',
  			after:'',
  			timerStr:'',
  			preTime:'',
			array: [],
			array1: ['全部'],
			array2: ['接单排序','正序','倒序'],
			worklist:[],
			//workOrder:list,
			index: 0,
			index1: 0,
			index2: 0,
			cur: 0,
			shopIndex:-1,
			orderBy:[],
			shopOrder:'arrowdown',
			sortOrder:'arrowdown',
			shopColor:'#000000',
			sortColor:'#000000',
			praiseColor:'#000000',
			shopName:'',
			locationJson:{
				address:"",
				wd:"",
				jd:""
			},
			jsonStr:"",
			shopId:"",
			page:1
      }
    },
    onLoad(option) {
			this.productId = option.productId;
			this.shopName = option.shopName;
			var sshopId = uni.getStorageSync("shopId");
			var status = uni.getStorageSync("status");
			if(sshopId!="" && sshopId!=null && status == "1" ){
				this.shopId = sshopId;
			}else{
				uni.removeStorageSync("shopId");
			}
			uni.showNavigationBarLoading();
			if(uni.getSystemInfoSync().platform == 'ios'){
				this.initLoction();
			}else{
				this.getLocationInfo();
			}
			
    },
	onReachBottom() {
		this.page = this.page+1;
		this.workInfoList();
		
	},
    methods: {
		open(){
			this.change(1);
			 this.$refs.popup.open()
		},
		close(){
			console.log(this.shopIndex);
			this.index1 = this.shopIndex+1;
			this.getJishiCondition();
			this.$refs.popup.close();
		},
		change(status){
			
			if(status==1){
				this.shopColor='#09BB07';
				this.sortColor='#000000';
				this.praiseColor='#000000';
			}else if(status==2){
				this.close();
				this.shopColor='#000000';
				this.sortColor='#09BB07';
				this.praiseColor='#000000';
			}else if(status==3){
				this.close();
				this.shopColor='#000000';
				this.sortColor='#000000';
				this.praiseColor='#09BB07';
			}else{
				this.close();
				this.shopColor='#000000';
				this.sortColor='#000000';
				this.praiseColor='#000000';
			}
		},
		async provinceList(){
					   let params = {
					   	"level":"2",
					   	"pid":""
					   };
					   
					   let headers={
							 "Content-Type":"application/json"  //设置一下请求头即可
						};
					   let url = this.$baseUrl+'/user/findProvinceInfo';
					   const res = await this.$myRequest({
					   					url: url,
					   					data: params,
										method:"POST"
					   				});
						console.log(this.locationJson.address);
						if(res.data.provinceList!=null){
							for(var i = 0;i<res.data.provinceList.length;i++){
								if(this.jsonStr.indexOf(res.data.provinceList[i].name)!=-1){
									this.index = i;
								}
								this.array.push(res.data.provinceList[i].name);
							}
						}	
					uni.hideNavigationBarLoading();
		},
		jumbUrl:function(event){
			let workerId =  event.currentTarget.dataset.row;
			let workName = event.currentTarget.dataset.value;
			let imgurl = event.currentTarget.dataset.img;
			let gender = event.currentTarget.dataset.gender;			
			console.log(workerId+"==="+workName+"===="+imgurl);
			let jsonData={
				workerId:workerId,
				workerName:workName,
				imgUrl:imgurl,
				gender:gender
			};
			uni.setStorageSync("workerInfo",jsonData);
			uni.navigateBack({
			  delta: 1
			});
		},
		async shopInfo(){
			//获取服务商的接口
			let url = this.$baseUrl+'/shop/findShopList';
			const res = await this.$myRequest({
								url: url,
								method:"POST"
				});
							
			for(var i=0;i<res.data.shopList.length;i++){
				this.array1.push(res.data.shopList[i].shopName);
			}				
		},
		//查询技师的信息
		async workInfoList(){
			uni.showNavigationBarLoading();
			//根据距离来排序的技师
			let dataParam = {
				"workerId":"",
				"shopId":this.shopId,
				"shopName":this.shopName,
				"page":this.page,
				"size":10000,
				"productId":this.productId,
				"city":this.locationJson.address,
				"jd":this.locationJson.jd,
				"wd":this.locationJson.wd
				
			};	
			console.log(JSON.stringify(dataParam));
			let url = this.$baseUrl+'/worker/findWorkListByShop_1';
			const res = await this.$myRequest({
					url: url,
					data: dataParam,
					method:"POST"
			});				
			let start = '';
			let end = '';
			let jishiList = [];
			let jishiNum = 0;
			console.log(res.data.workerList.length);
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
		orderByAsc(list) {
			uni.showNavigationBarLoading();
			//从小打大排序
			var results = list;
			var arr = "";
		
			if (results.length > 0) {
				var resultsList = [];
				let k = 0;
				for (var i = 0; i < results.length; i++) {
				
						this.worklist.push(results[i]);
				}
			}
			uni.hideNavigationBarLoading();
		},
      bindPickerChange: function(e) {

        this.index = e.target.value;
		
      },  bindPickerChange1: function(e) {

        this.index1 = e.target.value;
		this.getJishiCondition();
      },  bindPickerChange2: function(e) {
        this.index2 = e.target.value;
		this.getJishiCondition();
	  },
      back() {
        uni.navigateBack({
          delta: 1
        })
      },
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
	  			//this.provinceList();
	  			this.workInfoList();
	  			//this.shopInfo();
	  		}else{
	  			that.getLocationInfo();
	  		}
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
		this.workInfoList();
		//this.shopInfo();
		//uni.hideNavigationBarLoading();
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
	.contion{
		color: #09BB07;
	}
</style>
