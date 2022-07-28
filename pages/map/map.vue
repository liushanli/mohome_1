<!--地图选择界面-->
<template>
	<view class="pageMap">
		<view class="head">
			<!-- <WhiteHead :title="title"></WhiteHead> -->
		</view>
		<!--地图-->
		<map 
		id="container" 
		style="width:100%;height:88%;position:absolute;bottom:0;" 
		:latitude="latitude" 
		:longitude="longitude" 
		:markers="covers"
		>
			<cover-view class="serch">
				<cover-view class="serchInput">
					<cover-image class="cover-image" src="https://admin.dajxyl.com/oss?path=img/sousuo_2@2x.png"></cover-image>
					<cover-view class='text'>{{inputInfo}}</cover-view>
					<input class='input' :value='inputModel' focus @input='blurInput'></input>
				</cover-view>
			</cover-view>
			<cover-view class="cover-views" @tap="onControltap"></cover-view>
			<cover-view class="addressDetail">
				<cover-view class="addressDetail_content">
					<cover-view class="addressDetail_content_h4">详细地址：</cover-view>
					<cover-view class="addressDetail_content_p">
						<cover-view class="p">{{description}}</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
			<cover-view class="btn">
				<button type="primary" @click="submit">保存</button>
			</cover-view>
			<cover-view class="poiList" :style="visibal?'':'display:none'">
				<cover-view class="views">
					<cover-view class="poiList_item" @click="selectItem(k)" v-for="(i,k) in poiList.poisData" :key="k">{{i.name}}</cover-view>
				</cover-view>
			</cover-view>
		</map>
	</view>
</template>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
	/* import WhiteHead from '../../components/whiteHead/whiteHead.vue'; */
	/* import { mapState,mapMutations } from 'vuex';
	import amapFile from '../../lib/amap-wx.js'; */
	export default {
		/* components:{
			WhiteHead
		}, */
		data() {
			return {
				id:0, // 使用 marker点击事件 需要填写id
				title:'选择地址',
				latitude: 39.909,
				longitude: 116.39742,
				//地图上选点的经纬度
				lie:{
					latitude:0,
					longitude:0,
				},
				inputInfo:'',
				inputModel:'',
				inputFocus:false,
				description:'',
				//省
				province:'',
				city:'',
				township:'',
				//列表循环
				poiList:null,
				//列表控制
				visibal:false,
			}
		},
		computed:{
			/* ...mapState('users',{
				'editorData':'editorData',
				'covers':'covers',
			}) */
		},
		mounted() {
			this.initLocation();
		},
		methods:{
			/*获取用户当前定位*/
			initLocation:function(){
				console.log("==--");
				let that = this;
				uni.getLocation({
				    type: 'gcj02',
				    success: function (res) {
						// console.log(res)
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.lie.latitude = res.latitude;
						that.lie.longitude = res.longitude;
						that.covers[0].latitude = res.latitude;
						that.covers[0].longitude = res.longitude;
						that.getLieData(res);
				    }
				});
			},
			/*移动地图中心点位置改变点击获取当前中心点位置经纬度*/
			onControltap(control) {
			let that = this;
			uni.createMapContext("container", this).getCenterLocation({
					success:(res)=>{
					// console.log(res)
					that.lie.latitude = res.latitude;
					that.lie.longitude = res.longitude;
					that.getLieData(res);
				}
			});
			},
			//经纬度转物理地址
			getLieData:function(val){
				let that = this;
				let myAmapFun = new amapFile.AMapWX({key:'高德key'});
				let longitude = val.longitude;
				let latitude = val.latitude;
				    myAmapFun.getRegeo({
					location:`${longitude},${latitude}`,
				    success: function(data){
					// console.log(data)
					that.description = data[0].name;
					that.province = data[0].regeocodeData.addressComponent.province;
					that.city = data[0].regeocodeData.addressComponent.city;
					that.township = data[0].regeocodeData.addressComponent.district;
				    },
				    fail: function(info){
				    console.log(info)
					uni.showToast({
						title:'获取定位失败',
						icon:'none',
						duration:3000
					})
				    }
				})
			},
			/**
			 * input 失去焦点后将 input 的输入内容给到cover-view
			 */
			blurInput(e) {
				let that = this;
			    this.inputModel = e.detail.value;
				if(this.inputModel !== ''){
					that.inputFocus = true;
					if(!that.inputFocus){ return }
					that.inputFocus = false;
					setTimeout(()=>{
						let myAmapFun = new amapFile.AMapWX({key:'928d7ec62845e85801e2ebea80a36194'});
						let longitude = that.lie.longitude;
						let latitude = that.lie.latitude;
						    myAmapFun.getPoiAround({
							querykeywords: that.inputModel,
							// querytypes: types,
							// location:`${longitude},${latitude}`,
						    success: function(data){
						    //成功回调
							console.log(data)
							that.poiList = data;
							that.visibal = true;
						    },
						    fail: function(info){
						    //失败回调
						    console.log(info)
							uni.showToast({
								title:'获取定位失败',
								icon:'none',
								duration:3000
							})
						    }
						})
						that.inputFocus = true;
					},2000)
				}else{
					this.inputFocus = false;
				}
			},
			selectItem:function(k){
				this.visibal = false;
				this.description = this.poiList.poisData[k].address;
				this.province = this.poiList.poisData[k].pname;
				this.city = this.poiList.poisData[k].cityname;
				this.township = this.poiList.poisData[k].adname;
				this.lie.latitude = this.poiList.markers[k].latitude;
				this.lie.longitude = this.poiList.markers[k].longitude;
				this.inputModel = this.poiList.poisData[k].name;
			},
			submit:function(){
				let obj = {
					desc:this.description,
					province:this.province,
					city:this.city,
					area:this.township,
					lie:this.lie
				}
				if(this.province !== '' && this.city !== '' && this.township !== ''){
					uni.redirectTo({
						url:'/pages/addAddress/addAddress?obj=' + JSON.stringify(obj)
					})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@item:{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pageMap{
		width: 100%;
		height: 100%;
		@item();
		flex-wrap: wrap;
		.head{
			width: 100%;
			height: 5rem;
			display: flex;
		}
		#container {
			width: 100%;
			min-height: 11.25rem;
			.serch{
				width: 100%;
				height: 3.4375rem;
				@item();
				margin-top: 0.9375rem;
				.serchInput{
					width: 94%;
					height: 100%;
					background: #FFFFFF;
					box-shadow: 0.625rem 0.625rem 0.625rem 0.625rem rgba(155, 155, 155, 0.12);
					border-radius: 1.875rem;
					@item();
					justify-content: flex-start;
					.cover-image{
						width: 1.95625rem;
						height: 1.95625rem;
						margin-left: 1.725rem;
					}
				}
			}
			.cover-views {
			    width: 2.7375rem;
			    height: 2.7375rem;
			    // border-radius: 50%;
			    background-image: url("https://admin.dajxyl.com/oss?path=img/dingweiditu@2x.png");
			    background-size: 2.7375rem 2.7375rem;
			    background-position: center center;
			    position: absolute;
			    bottom: 50%;
			    left: 50%;
			  }
			  .addressDetail{
				  width: 100%;
				  height: 6.69rem;
				  @item();
				  position: fixed;
				  bottom: 7.3875rem;
				.addressDetail_content{
					width: 94%;
					height: 100%;
					background: #FFFFFF;
					box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem rgba(155, 155, 155, 0.12);
					border-radius: 0.5rem;
					@item();
					flex-wrap: wrap;
					.addressDetail_content_h4{
						width: 94%;
						height: 1.285rem;
						font-size: 0.815rem;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						@item();
						align-items: flex-end;
						justify-content: flex-start;
					}
					.addressDetail_content_p{
						width: 94%;
						height: 3.44rem;
						background: rgba(64,140,255,0.1);
						// opacity: 0.1;
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						flex-wrap: wrap;
						.p{
							font-size: 0.875rem;
							font-family: PingFang SC;
							font-weight: 400;
							color: #343434;
							//cover-view标签内容换行
							word-break: break-all;
							word-wrap:break-word;
							white-space:pre-line;
							padding: 0.66rem 0.345rem;
						}
					}
				}
			 }
			 .btn{
				 width: 100%;
				 height: 4.44rem;
				 background: #FFFFFF;
				 box-shadow: 0.5rem 0.5rem 0rem 0rem rgba(154, 154, 154, 0.2);
				 @item();
				 position: absolute;
				 bottom: 0;
				 button{
					 width: 94%;
					 height: 2.875rem;
					 background: #408CFF;
					 border-radius: 1.5rem;
					 font-size: 1.065rem;
					 color: #FFFFFF;
				 }
			 }
			 .poiList{
				 width: 100%;
				 height: 60%;
				 position: absolute;
				 bottom: 0;
				 background: #FFFFFF;
				 border-radius: 1rem 1rem 0 0;
				 @item();
				 // flex-wrap: wrap;
				 .views{
					width: 100%;
					height: 90%;
					@item();
					flex-wrap: wrap;
					overflow-y: scroll;
					.poiList_item{
						width: 80%;
						height: 2rem;
						display: flex;
						align-items: center;
					}
				 }
				 
			 }
		}
	}
</style>