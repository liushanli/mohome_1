<template>
	<view class="login">
		<view id="container"></view>
		
		<view class="item" @click="chooseAddress(1)">
			<text class="title">请选择出发地</text>
		</view>
		<view class="item">
			<text class="color">{{address0.name}}</text>
		</view>
		<view class="item" @click="chooseAddress(2)">
			<text class="title">请选择目的地</text>
		</view>
		<view class="item">
			<text class="color">{{address1.name}}</text>
		</view>
		<view class="item">
			<text class="color" v-if="routes.distance">{{routes.distance/1000}}千米，</text>
			<text class="color" v-if="routes.policy == '速度最快'">出行模式：驾车，</text>
			<text class="color" v-if="routes.time">大约需要{{routes.time/60}}分钟。</text>
		</view>
	</view>
</template>
<script>
	import maps from '../../static/maps.js'
	export default {
		data() {
			return {
				map: null,
				address0: {}, //起点信息
				address1: {}, //终点信息
				star: [], //起点经纬度
				end: [], //终点经纬度
				markers: [], //点标记
				routes: {}, //路线距离时间信息记录
			}
		},

		onLoad() {
			window.onLoad = () => {
				let _this = this;
				_this.map = new AMap.Map('container', {
					zoom: 15, //缩放级别
					resizeEnable: true, //自动定位
				});

				AMap.plugin('AMap.Geolocation', function() {
					uni.showLoading({
						title: '系统正在定位'
					});
					var geolocation = new AMap.Geolocation({
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 10000, //超过10秒后停止定位，默认：5s
						buttonPosition: 'RB', //定位按钮的停靠位置
						buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点

					});
					_this.map.addControl(geolocation);
					geolocation.getCurrentPosition(function(status, result) {
						if (status == 'complete') {
							console.log(result)
							uni.hideLoading();
							uni.showToast({
								title: '定位成功',
							});
							let res = {
								name: result.formattedAddress,
								latitude: result.position.lat,
								longitude: result.position.lng,
							}
							let marker0 = new AMap.Marker({
								map: _this.map,
								position: [res.longitude, res.latitude], //位置
								icon: '/static/images/star.png', // 添加 Icon 图标 URL
								offset: new AMap.Pixel(-15, -42),//偏移量
							});
							_this.markers[0] = marker0; //添加 起点 标记

							_this.address0 = res; //起点数据
							_this.star = [res.longitude, res.latitude]; //起点经纬度

						} else {
							uni.hideLoading();
							uni.showToast({
								title: '定位失败，请手动选择出发地',
							});
							console.log(result)
						}
					});
				});
			}
		},
		methods: {
			//选择地址
			chooseAddress(type) {
				uni.chooseLocation({
					success: res => {
						if (type == 1) {
							this.markers[0].setMap(null); //删除 起点 标记
							let marker0 = new AMap.Marker({
								map: this.map,
								position: [res.longitude, res.latitude], //位置
								icon: '/static/star.png', // 添加 Icon 图标 URL
								offset: new AMap.Pixel(-15, -42),//偏移量
							});
							this.markers[0] = marker0; //覆盖 起点 标记

							this.star = [res.longitude, res.latitude]; //起点经纬度
							this.address0 = res;//起点数据
							if (this.markers.length == 2) {
								this.add_Driving();//重新规划路线
							} else {
								this.map.setFitView(); //自动缩放地图
							}
						} else {
							if (this.markers[1]) {
								this.markers[1].setMap(null);//如果 终点 标记 已存在，就删除
							}

							let marker1 = new AMap.Marker({
								map: this.map,
								position: [res.longitude, res.latitude], //位置
								icon: '/static/images/end.png', // 添加 Icon 图标 URL
								offset: new AMap.Pixel(-15, -42),//偏移量
							});
							this.markers[1] = marker1; //添加 终点 标记

							this.address1 = res;//终点数据
							this.end = [res.longitude, res.latitude]; //终点经纬度
							this.add_Driving();//规划路线
						}
					}
				});
			},
			//规划路线
			add_Driving() {
				let _this = this;
				this.map.plugin('AMap.Driving', () => {
					var driving = new AMap.Driving({
						// 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
						map: this.map,
						policy: AMap.DrivingPolicy.LEAST_TIME
					})
					driving.search(this.star, this.end, function(status, result) {
						console.log(result)
						_this.routes = result.routes[0]
						_this.markers[0].setMap(null);
						_this.markers[1].setMap(null);
					})
				})
			},
		},
	}
</script>
<style>
	#container {
		width: 750rpx;
		height: 750rpx;
	}
	.item {
		font-size: 28rpx;
		padding: 20rpx;
		height: 50rpx;
	}
	.title {
		margin-right: 40rpx;
	}
	.color {
		color: red;
	}
</style>

