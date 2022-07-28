<template>
	<view class="zhaopin">
		<view class="">
			<view class="fpcontl">
				<view class="fpcontlL">姓名</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" v-model="json.userName" placeholder="请输入联系人姓名" name=""></view>
			</view>
			<view class="fpcontl">
				<view class="flex1"></view>
				<view class="fpcontlR">
					<radio-group @change="changeSex">
						<label class="radio">
							<radio value="1" :checked="manChecked"  name = 'sex'/><text>先生</text>
						</label>
						<label class="radio" style="margin-right: 2rem;margin-left: 4rem;">
							<radio value="2" :checked="womanChecked" name = 'sex' /><text>女士</text>
						</label>					
					</radio-group>
				</view>
			</view>
			<view class="fpcontl">
				<view class="fpcontlL">手机号</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" v-model="json.phone" placeholder="请输入联系人电话" name=""></view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					
					
				</view>
			</view>
			<view class="fpcontl">
			    <view class="fpcontlL">服务地点</view>
			    <view class="flex1"></view>
			    <view class="fpcontlR">
			      <!-- <picker> -->
			         <view class="yibntm">
			           <input type="text" class="finput" disabled="true" placeholder="请选择服务地点" v-model="json.locationAddress" @tap="chooseLocation" >
			           <uni-icons type="arrowright" size="15" color="#999"></uni-icons>
			         </view>
			      <!-- </picker> -->
			    </view>
			  </view>
			<view class="fpcontl">
				<view class="fpcontlL">详细地址</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" v-model="json.address" placeholder="如xx号xx室" name=""></view>
			</view>
			<button type="primary" @tap="submitAddress">
					提交
			</button>
		</view>
		<view style="text-align: center;color: #555555;margin-top:10rem;font-size: 0.8rem;">摩之家上门按摩，数十万人的选择</view>
	</view>
	
</view>
</template>
<script>
	var util = require('../common/util.js');
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
				json:{
					userName:'',
					sex:'',
					phone:'',
					address:'',
					locationAddress:'',
					E:'', //经度
					N:'' //纬度
				},
				addJson: {
					id:'',
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
					isDefault: '1'
				},
				womanChecked:false,
				manChecked:false,
				title: 'chooseLocation',
				hasLocation: false,
				locationAddress: '',
				index: 0,
				addressId:'',
				userId:''
			}
		},
		 onLoad(options) {
			 this.addressId = options.id;
			 this.addJson.id = options.id;
			let userVo = uni.getStorageSync("userVo");
			this.userId = userVo.userId;
			this.findUserAddress();
		},
		onShow() {
			this.json.locationAddress = this.point.city +" "+ this.point.address +" "+ this.point.name;
			//console.log("==="+JSON.stringify(this.point));
		},
		methods: {
			async findUserAddress() {
				let url = this.$baseUrl + "/user/findUserAddress";
				//查询用户信息是否存在
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: {
						id: this.addressId,
						userId: this.userId,
						isDefault:null
					}
				});
				if (res.data.success) {
					
					let jsonArr = res.data.addressList;
					this.json.userName = jsonArr[0].userName;
					this.json.phone = jsonArr[0].userPhone;
					this.json.E = jsonArr[0].jd;
					this.json.N = jsonArr[0].wd;
					let arr = jsonArr[0].address.split("|");
					this.json.locationAddress = arr[0];
					if(arr.length>1){
						this.json.address = arr[1];
					}
					this.json.sex = jsonArr[0].gender;
					if(this.json.sex=="1"){
						this.manChecked = true;
					}else{
						this.womanChecked = true;
					}
					console.log(JSON.stringify(this.json));
				}
			},
			submitAddress:function(e){
				  if(this.json.userName.trim()==''){
					  uni.showToast({
					  	title:"请填写姓名"
					  });
						return;
				  }
				  if(this.json.sex==''){
						uni.showToast({
							title:"请选择性别"
						});
				  		return;
				  }
				  if(this.json.phone.trim()==''){
						 uni.showToast({
							title:"请填写手机号"
						 });
						return;
				  }
				  if(!/^1\d{10}$/.test(this.json.phone)){
					 uni.showModal({
						 content:"请正确填写手机号"
					 });
					return;
				  }
				  
				  if(this.json.locationAddress.trim()==''){
						uni.showToast({
							title:"请选择地点"
						});
				  		return;
				  }
				  
				  console.log(this.json.address);
				  if(this.json.address.trim() == '' || this.json.address.trim() == undefined || this.json.address.trim() == null){
				  	uni.showToast({
				  		title: "请填写详细地址"
				  	});
				  	this.noClick = true;
				  	return;
				  }
				  
				 /* if(this.json.address.trim()==''){
						uni.showToast({
							title:"请填写详细地址"
						});
				  		return;
				  } */
				  
					this.useExchange();
					
				},
			  changeSex:function(eve){
				  this.json.sex = eve.detail.value;
			  },
			chooseLocation: function () {
						/* uni.chooseLocation({
							success: (res) => {
									this.hasLocation = true;
									this.json.locationAddress = res.address;
							}
						}) */
						uni.navigateTo({
							url:"../choose-address/choose-address"
						})
					},
			clear: function () {
				this.hasLocation = false;
				
			},
			async addUpdAddress() {
				let url = this.$baseUrl + "/user/addUpUserAddress";
				this.addJson.userName = this.json.userName;
				this.addJson.userPhone = this.json.phone;
				this.addJson.gender = this.json.sex;
				this.addJson.address = this.json.locationAddress+"|"+this.json.address;
				this.addJson.userId = this.userId;
				if(this.addJson.id == undefined || this.addJson.id == "undefined"){
					this.addJson.id = "";
				}
				console.log(JSON.stringify(this.addJson));

				//添加或者修改
				const res = await this.$myRequest({
					url: url,
					method: 'POST',
					data: this.addJson
				});
				console.log(JSON.stringify(res));
				if(res.data.success){
					uni.showToast({
						title:"操作成功"
					});
					uni.setStorageSync("addressJson",this.json);
					uni.navigateTo({
						url:"../addressList/addressList"
					})
				}else{
					uni.showToast({
						title:"操作失败"
					});
				}
				
			},
			async useExchange(){
				//调用接口
				const res = this.getWJ();
				//this.json = uni.getStorageSync("addressJson");
				console.log(JSON.stringify(this.json));
				
			},
			async getWJ(){
				
				let localAddress = this.json.locationAddress+this.json.address;
				console.log(localAddress);
				let url = 'https://restapi.amap.com/v3/geocode/geo?output=json&key=c26662795f32756d874671ccae9bcdeb&address='+localAddress;
				//console.log(url);
				let jsonInfoList = this.json;
				console.log(jsonInfoList);
				var me = this;
				//根据地址来获取经纬度
				return new Promise(function(resolve, reject) {
					let headers={
					          "Content-Type":"application/json"  //设置一下请求头即可
					    }	
					uni.request({
					          url: url,
					          method: 'GET',
							  header: headers,
					          success: (res)=>{
								   let locaStr = res.data.geocodes[0].location;
								   console.log(JSON.stringify(res));
								   let locaArr = locaStr.split(",");
								   jsonInfoList.E = locaArr[0];
								   jsonInfoList.N = locaArr[1];
								   uni.setStorageSync("addressJson",jsonInfoList);
								  me.addJson.provice = res.data.geocodes[0].province;
								  me.addJson.city = res.data.geocodes[0].city;
								  me.addJson.area = res.data.geocodes[0].district;
								  me.addJson.address = res.data.geocodes[0].formatted_address;
								  me.addJson.detailAddress = res.data.geocodes[0].formatted_address;
								  me.addJson.jd = locaArr[0];
								  me.addJson.wd = locaArr[1];
								  me.addUpdAddress();
							  },fail: (e) => {
							  	console.log(JSON.stringify(e));
							  }
					    });
					resolve('suc');
				}).then(function(resolve_finish) {
					return resolve_finish
				});
				
			},
			get_distance(s,e){
				return myPromise = new Promise(function(resolve, reject) {
					var my_distance;
					var directionsService = new qq.maps.DrivingService({
						complete: function(response) {
							var distance = JSON.stringify(response.detail.routes[0].distance);
							
							my_distance = distance + '米';
							console.log(my_distance);
							resolve(my_distance);
						}
					});
					var start = s.split(","); //起点经纬度
					var end = e.split(","); //目的地经纬度
					directionsService.setPolicy(qq.maps.DrivingPolicy['LEAST_DISTANCE']);//"LEAST_TIME">最少时间     LEAST_DISTANCE">最短距离    "AVOID_HIGHWAYS">避开高速			
					directionsService.search(new qq.maps.LatLng(start[0], start[1]),
						new qq.maps.LatLng(end[0], end[1]));
				}).then(function(resolve_finish) {
					return resolve_finish
				})
			}
			
		}
	};
</script>
