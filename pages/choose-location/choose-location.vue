<template>
	<view class="zhaopin">
		<!-- <page-head :title="title"></page-head> -->
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
		<view class="fpcontl">
		    <view class="fpcontlL">服务地点</view>
		    <view class="flex1"></view>
		    <view class="fpcontlR">
		      <!-- <picker> -->
		          <view class="yibntm">
		            <input type="text" class="finput"  placeholder="请选择服务地点" v-model="locationAddress" @tap="chooseLocation" >
		            <uni-icons type="arrowright" size="15" color="#999"></uni-icons>
		          </view>
		      <!-- </picker> -->
		    </view>
		  </view>
		<view class="uni-padding-wrap">
			<view style="background:#FFFFFF; padding:40rpx; display: none;">
				<!-- <view class="uni-hello-text uni-center">当前位置信息</view> -->
			<!-- 	<block v-if="hasLocation === false">
					<view class="uni-h2 uni-center uni-common-mt">未选择位置</view>
				</block> -->
				<block v-if="hasLocation === true">
					<!-- <view class="uni-hello-text uni-center" style="margin-top:10px;">
						{{locationAddress}}
					</view> -->
					<!--N表示北纬,E表示东经-->
					<view class="uni-h2 uni-center uni-common-mt">
						<text class="E">{{location.longitude[0]}}°{{location.longitude[1]}}′</text>
						<text class="N">{{location.latitude[0]}}°{{location.latitude[1]}}′</text>
					</view>
				</block>
			</view>
			<!-- <view class="uni-btn-v">
				<button type="primary" @tap="chooseLocation">选择位置</button>
				<button @tap="clear">清空</button>
			</view> -->
		</view>
	</view>
</template>
<script>
	var util = require('../common/util.js');
	var formatLocation = util.formatLocation;

	export default {
		data() {
			return {
				title: 'chooseLocation',
				hasLocation: false,
				location: {},
				locationAddress: '',
				E:'', //经度
				N:'' //纬度
			}
		},
		onLoad() {
			this.aaa();
		},
		methods: {
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
							this.hasLocation = true;
							this.location = formatLocation(res.longitude, res.latitude);
							this.locationAddress = res.address;
							this.E = this.location.longitude[0]+"°"+this.location.longitude[1]+"′";
							this.N = this.location.latitude[0]+"°"+this.location.latitude[1]+"′";
							console.log("距离=="+this.locationAddress+"===经度："+this.E+"=维度=="+this.N);
					}
				})
			},
			clear: function () {
				this.hasLocation = false;
				
			},
			aaa(){
/* 				this.get_distance('21.660388, 110.938697', '21.66701, 110.92245').then(function(resolve_finish) {
								console.log('距离:' + resolve_finish)
							}); */
							//地铁九号线台儿庄地铁站B2
							//华山路922号（镇宁路）
							let url = "https://m.amap.com/navi/?start=116.403124,39.940693&dest=116.481488,39.990464&destName=阜通西&naviBy=car&key=c26662795f32756d874671ccae9bcdeb";
							//url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins=121.44,31.21&destination=121.60,31.25&type=3';
							uni.request({
							url:url, 
							success: (res) => {
							console.log(res.data.results);
							}
							});
							
							
			},
			get_distance(s,e){
				return myPromise = new Promise(function(resolve, reject) {
									var my_distance;
									var directionsService = new qq.maps.DrivingService({
										complete: function(response) {
											var distance = JSON.stringify(response.detail.routes[0].distance);
											my_distance = distance + '米';
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
	}
</script>

<style>
	.page-body-info {
		padding-bottom: 0;
		height: 440rpx;
	}
</style>
