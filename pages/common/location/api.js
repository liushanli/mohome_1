export const getLocations = ()=>{
	let jsonArr = {
		jd:'',
		wd:'',
		addressList:[]
	};
	return new Promise((resolve, reject)=>{
		// 封装主体：网络请求
		uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					/* console.log(JSON.stringify(res));
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude); */
					jsonArr.jd = res.longitude;
					jsonArr.wd = res.latitude;
					
					var point = new plus.maps.Point(res.longitude, res.latitude);
					plus.maps.Map.reverseGeocode(
						point, {},
						function(event) {
							var address = event.address; // 转换后的地理位置
							var point = event.coord; // 转换后的坐标信息
							var coordType = event.coordType; // 转换后的坐标系类型
							var reg = /.+?(省|市|自治区|自治州|县|区)/g;
							let addressList = address.match(reg).toString().split(",");
							jsonArr.addressList = addressList;
							resolve(jsonArr);
							console.log(JSON.stringify(jsonArr));
						});
						},
						fail:function(e) {
							jsonArr.jd = '121.472999999999999';
							jsonArr.wd = '31.2317';
							jsonArr.addressList = '上海市';
							reject(jsonArr);
						}
					});
		});
	}