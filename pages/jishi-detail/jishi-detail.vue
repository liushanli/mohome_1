`<template>
	<view class="jishi-detail">
		<view class="itemde">
			<view class="jsItem" style="height: auto;">
				<view class="jsItemT">
					<view class="jsItemL"><image style="border-radius: 0.3rem;" @tap="searchInfo" :src="workerImageUrl"></image>
					<view class="jsitm3" @tap="jumbUrl_1" style="margin-top: -0.8rem;">
						<view class="juli"><image src="/static/images/au2.png" style="width: 1.3rem;height: 1.3rem;margin-right: 3rpx;"></image>
						<text  style="font-size: 0.8rem;color: #09BB07;border-bottom: 1px solid #09BB07;">
							{{ shopName}}
						</text>
						</view>								
					</view>
					</view>
						<view class="jsItemR">
							<view class="jsitm1">
								<view class="view1">{{userName}}  
								<span v-if="gender=='女'" style="color: #0FAEFF;font-size: 80%;margin-left: 0.3rem;">女</span>
								<span v-if="gender=='男'" style="color: #0FAEFF;font-size: 80%;margin-left: 0.3rem;">男</span>
								
								</view>
								<view class="view2">最近可约：{{dateHHmm}}</view>
							</view>
							<view class="jsitm2">
								<view class="view1"><uni-rate :value="star" color="#bbb" active-color="red" size="12" readonly /></view>
								
							</view>
							<view class="jsitm2" style="margin-top: 0.5rem;">
								<view class="view1" style="color: #999999;font-size: 0.8rem;">服务<span style="color: #F9221D;">{{sellNum}}</span>单</view>
								<view class="juli">
									<image src="/static/images/mapicon.png"></image> {{distanceLen}}
								</view>
							</view>
						</view>
				</view>
				<view class="jsItemB">
					<view class="jsitm4">
						<view class="tags" @tap = "jumbUrl_2()">
							<view class="tag"  v-if="showPicInfo(1)"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.7rem;">实名认证</span></view>
							<view class="tag"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.7rem;">头像认证</span></view>
							<view class="tag" v-if="showPicInfo(3)"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.7rem;">资格证</span></view>
							<view class="tag" v-if="showPicInfo(4)"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.7rem;">健康证</span></view>
						</view>
						<!-- <view class="tags">
							<view class="tag"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.6rem;">健康证</span></view>
							<view class="tag"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.7rem;">资格证</span></view>
							<view class="tag"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.6rem;">手机认证</span></view>
							<view class="tag"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.6rem;">实名认证</span></view>
							<view class="tag"><image src="/static/images/cked.png"></image> <span style="color: #F0AD4E;font-size: 0.6rem;">头像认证</span></view>
						</view> -->
					</view>
					
					<view style="color: #2C405A;">
							<sunui-grand :content="workerTitle" color="#1D82FE" bg="#fff" :clamp='4' expandText="点击展开全文" shinkText="收起"></sunui-grand>
					</view>
				</view>
			</view>
		</view>


		<view class="itemde">
			<!-- <view class="jstelt">
				<view class="jstelt1">
					保障
				</view>
				<view class="jstelt2">
					<view class="tltags">
						<view class="tltag"> <image src="/static/images/duigou.png"></image> 未服务全额退</view>
						<view class="tltag"> <image src="/static/images/duigou.png"></image> 爽约包赔</view>
						<view class="tltag"> <image src="/static/images/duigou.png"></image> 不满意重服务</view>
						<view class="tltag"> <image src="/static/images/duigou.png"></image> 全场保障</view>
					</view>
				</view>
			</view> -->
			<view class="hr"></view>
			<view class="jstelt">
				<view class="jstelt1">
					自我展示
				</view>
				<view class="flex1"></view>
				<view class="jstelt2">
					<view class="tlsmore" @tap="jumbUrl" data-value="0">
						全部{{videoCount}}个照片/视频 <uni-icons type="arrowright" size="16" color="#999" ></uni-icons>
					</view>
				</view>
			</view>

			<view class="desimlst">
				<view v-if="videoUrl!=''" class="fleimg">
					<image :src="videoImage" @tap="jumbUrlVideo"></image>
				</view>
				<view class="fleimg" v-for="(workInfo,workIndex) in workerPicList" :key="workIndex">
					<image :src="workInfo.imgUrl" @tap="jumbUrl" :data-value="workIndex"></image>
				</view>
			</view>
		</view>
		<view class="itemde">
			<view class="jstelt">
				<view class="jstelt1">
					服务项目
				</view>
			</view>
			<view class="seritem" v-for="(productInfo,productIndex) in productList" :key="productIndex" >
				<view class="seritmL" :data-value="productInfo.productId" @tap="ProgramDetailInfo"><image :src="productInfo.imgUrl" style="border-radius: 0.2rem;"></image></view>
				<view class="seritmR">
					<view class="seritmR1" :data-value="productInfo.productId" @tap="ProgramDetailInfo">{{productInfo.productName}}</view>
					<view class="seritmR2" v-if="productInfo.couponType!=1" :data-value="productInfo.productId" @tap="ProgramDetailInfo">¥ <text class="text">{{productInfo.price}} </text> <!-- ￥{{productInfo.memberPrice}} <image src="/static/images/hyj.png"></image> -->
				
					<view  class="vipPc" style=" width: 160rpx;
											  margin-left: 20rpx;display: flex;align-items: center;
											  border-radius: 43rpx;font-size: 20rpx;overflow: hidden;">
						<view class="vipPc1" style=" flex: 1;background: #1b1c24;text-align: center;
											  line-height: 43rpx;color: #f1d8af;font-size: 20rpx;">会员价</view>
						<view class="vipPc2" style="flex: 1;line-height: 43rpx;background: #f1d8af;
											   color: #1b1c24;font-size: 20rpx;">￥{{productInfo.memberPrice}}</view>
					</view>
					
					</view>
					
					<view class="seritmR2" v-if="productInfo.couponType==1" :data-value="productInfo.productId" @tap="ProgramDetailInfo">¥ <text class="text" style="font: bold 12px/16px Simsun; text-decoration-line: line-through;">{{productInfo.price}} </text> <!-- ￥{{productInfo.memberPrice}} <image src="/static/images/hyj.png"></image> -->

					<view  class="vipPc" style=" width: 160rpx;
											  margin-left: 20rpx;display: flex;align-items: center;
											  border-radius: 43rpx;font-size: 20rpx;overflow: hidden;">
						<view class="vipPc1" style=" flex: 1;background: #1b1c24;text-align: center;
											  line-height: 43rpx;color: #f1d8af;font-size: 20rpx;">秒杀价</view>
						<view class="vipPc2" style="flex: 1;line-height: 43rpx;background: #f1d8af;
											   color: #1b1c24;font-size: 20rpx;">￥{{productInfo.secondPrice}}</view>
					</view>
					
					</view>
					
					<view class="seritmR3">
						<view class="seritmR3a">
							<image src="/static/images/hongicon.png"></image> {{productInfo.productTime}}分钟
						</view>
						<view class="seritmR3b">
							90天已售 <span style="color: #F9221D;">{{productInfo.sellNum}}</span>单
						</view>
						<view class="seritmR3c" :style="{display: productInfo.showNumber}">
							<view class="view cur" @tap="btn_minute" :data-value="productIndex"  :data-row="productInfo.price">-</view>
							<input type="text" class="vinput" v-model="productInfo.number">
							<view class="view" @tap="btn_add" :data-value="productIndex" :data-row="productInfo.price">+</view>
						</view>
						<view class="lijibtns" :style="{display: productInfo.showButtons}" :data-row="productInfo.price" :data-price="productInfo.memberPrice"   :data-value='productIndex' :data-id ="productInfo.id"  @tap="dingYu">预约</view>
						<view class="lijibtns_1" :style="{display: productInfo.showButtons_1}">预约</view>
					</view>
				</view>
			</view>
		</view>

		<view class="itemde">
			<view class="jstelt">
				<view class="jstelt1">
					对他的评价
				</view>
				<view class="flex1"></view>
				<view class="jstelt2">
					<view class="tlsmore">
						共{{count}}条 好评100% <uni-icons type="arrowright" size="16" color="#999" ></uni-icons>
					</view>
				</view>
			</view>

			<view class="vsiiatem" v-for="(evals,evalIndex) in evaList" :key="evalIndex">
				<view class="vsiiatemL">
					<image :src="getHeadImg(evals.headImg)"></image>
				</view>
				<view class="vsiiatemR">
					<!-- <view class="vsiiatemR1">{{evals.userName}}</view> -->
					<view class="vsiiatemR1">******</view>
					<view class="vsiiatemR2"><uni-rate :value="evals.star" color="#bbb" active-color="red" size="12" readonly /> <view class="view"> {{evals.updateTime}}</view></view>
						<rich-text :nodes="getContent(evals.content,evals.imgUrl)"></rich-text>
					<view class="tags">
						<view v-if="evals.list!=null" class="tag" style="color: #F9221D;" v-for="(biao,biaoIndex) in evals.list" :key="biaoIndex">{{biao.name}} </view>
					</view>
					<view class="vsiiatemR1" style="font-size: 0.7rem;">{{evals.province}}  {{evals.area}}  {{evals.productName}}  {{evals.workName}}</view>
					<view v-if="evals.returnContent!='' && evals.returnContent!=null" class="vsiiatemR1" style="font-size: 0.8rem;border-top: #09BB07 1px solid;margin-top: 0.1rem;margin-bottom: 0.1rem;">店家回复：{{evals.returnContent}}</view>
				</view>
			</view>
		</view>
		 <view class="fiexFsa">
	  	<view class="fiexFsain">
	  		待支付: <text class="text1">¥</text> <text class="text2">{{momeny}}</text>
	  		<view class="flex1"></view>
	  		<view class="lijibtn"  @tap="nowBuy" style="background-image: linear-gradient(to right, #09BB07, #09BB07);">立即下单</view>
	  	</view>
	  </view>
	</view>
</template>

<script>
	import sunUiGrand from '../../components/sunui-grand/sunui-grand.vue';
	export default {
		data() {
			return {
				workersId:'',
				workerInfo:null,
				workerPicList:[],
				productList:[],
				shopId:'',
				userName:'',
				workerTitle:'',
				workerImageUrl:'',
				numberList:[],
				momeny:0,
				productId:'',
				productName:'',
				productIndex:'',
				memberMoney:0,
				id:'',
				evaList:[],
				count:0,
				imgUrlArr:[],
				showText:false,
				shopName:'',
				dateHHmm:'',
				distanceLen:'',
				star:0,
				startLeng:"",
				videoUrl: "",
				videoImage:"",
				autoplay: true,
				init: true,
				videoContext: '',
				showCenterPlayBtn: false,
				sellNum:0,
				videoCount:0,
				context:'',
				flag:false,
				jian:'',
				zige:'',
				workerPhone:'',
				gender:'',
				jd:'',
				wd:'',
				address:''
			}
			
		},
		components: {
			'sunui-grand': sunUiGrand
		},
		onLoad(option) {

			if(uni.getSystemInfoSync().platform == 'ios'){
				this.initLoction();
			}else{
				this.location();
				this.getLocationInfo();
			}
			uni.showNavigationBarLoading();
			var sshopId = uni.getStorageSync("shopId");
			
			if(sshopId!="" && sshopId!=null ){
				this.shopId = sshopId;
				uni.removeStorageSync("shopId");
			}
			//console.log(this.shopId);
			this.workersId = option.workerId;
			console.log(this.workersId);
			uni.setStorageSync("couponId","");
			this.context = uni.createVideoContext("demoVideo", this);
		},
		methods: {
			showPicInfo(stats){
				if(stats == 4 && this.jian != "" && this.jian != null){
					return true;
				}else if(stats == 3 && this.zige != "" && this.zige != null){
					return true;
				}else if(stats == 1 && ((this.jian!= "" && this.jian != null) || (this.zige!= "" && this.zige != null))){
					return true;
				}	
				else{
					return false;
				}
			},
			searchInfo(){
				//console.log("===="+this.workerImageUrl);
				uni.setStorageSync("imageUrl",this.workerImageUrl);
				uni.navigateTo({
					url:"../image_head/imge_head"
				});
			},
			//截取视频图片
			async jiequVideo(){
				let url = this.$baseUrl+"/worker/uploadVideoImageInfo";
				//console.log(this.videoUrl);
				const res = await this.$myRequest({
					url:url,
					method:'POST',
					data:{
						video:this.videoUrl,
						workerId:this.workerInfo.workerId
					}
				});
				//console.log(JSON.stringify(res));
				this.videoImage = res.data.videoImage;
			},
			jumbUrlVideo(){
				this.flag = true;
					uni.navigateTo({
						url:"../video/video"
					})
				//},
			},
			exitFull(e){
				//console.log("fullscreenchange:" + JSON.stringify(e));
				if(!e.detail.fullScreen){
						this.context.pause();
						this.flag =false;
				}
			},
			timeupdate(e) {
			            if (this.init && e.detail.currentTime > 0) {   //判断播放大于0秒
			                this.init = false  //初始化
			                this.videoContext = uni.createVideoContext('myVideo') //获取id
			                this.videoContext.pause() //调用暂定视频的方法
			            }
			        },
			getLocation(){
				return new Promise((resolve,reject)=>{
					uni.getLocation({
					    type: 'wgs84',
					    success: function (res) {
								/* console.log('当前位置的经度：' + res.longitude);
					             console.log('当前位置的纬度：' + res.latitude); */
								 resolve(res.longitude+","+res.latitude);
					    },fail(err) {
					    	reject("err");
					    }
					});
				}) 
			},
			async location(){
				const res = await this.getLocation();
				this.startLeng = res;
			},
			ProgramDetailInfo(e) {
			
				this.productId = e.currentTarget.dataset.value;
				uni.navigateTo({
					url: "../detail/detail?productId=" + this.productId+"&staus=2"
				});
			
			},
			// 全文展开收起
			toggleDescription (num) {
				this.showText = !this.showText
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
			getHeadImg(img){
				/* if(img!='' && img!=undefined && img != null){
					return img;
				}else{
					return "/static/images/loginAPP.png";
				} */
				return "/static/images/loginAPP.png";
			},
			async findEvant(){				
				let url = this.$baseUrl +"/worker/findWorkEval";
				const res = await this.$myRequest({
					url:url,
					method:'POST',
					data:{
						id:""+this.workersId
					}
				});
				console.log(JSON.stringify(this.workersId));
				uni.hideNavigationBarLoading();
				//console.log(JSON.stringify(res));
				this.evaList = res.data.evalList;
				
				this.count = this.evaList.length;
			},
			nowBuy:function(){
				
				if(this.momeny<=0){				
					uni.showModal({
						title: '提示',
						content: '请选择一个项目',
						success: function (res) {}});					
				}else{
					
					var jsonData = {
						workName:this.userName,
						productPrice:this.momeny,
						productNum:this.productList[this.productIndex].number,
						productName:this.productList[this.productIndex].productName,
						productId:this.productList[this.productIndex].productId,
						workerId:this.workersId,
						productImg:this.productList[this.productIndex].imgUrl,
						gender:this.gender,
						money:this.momeny,
						memberPrice:this.productList[this.productIndex].memberPrice
					};
					
					console.log(this.gender);
					uni.setStorageSync("jsonData",jsonData);
					uni.setStorageSync("detailStatus","2");
					//进入订单页面
					uni.navigateTo({
						url:"../ordering/ordering"
					});
				}
			},
			jumbUrl:function(event){
				uni.navigateTo({
					url:"../common/image/imge?current="+event.currentTarget.dataset.value
				});
			},
			jumbUrl_1(){
				//console.log(this.shopId);
				uni.setStorageSync("shopId",this.shopId);
				uni.navigateTo({
					url:"../shop_Info/shop_Info"
				});
			},
			jumbUrl_2(){
				//console.log(this.shopId);
				if(this.jian != "" || this.zige != ""){
					uni.navigateTo({
						url:"../common/picImage/picImge"
					});
				}
			},
			dingYu(eve){
				
				//获取用户的基本信息
				if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
					return;
				}
				let userVo = uni.getStorageSync("userVo");
				let index = eve.currentTarget.dataset.value;
				if(this.productList[index].couponType==1){
					this.memberMoney = this.productList[index].secondPrice;
				}else{
					if(userVo.level !=0){
						this.memberMoney = eve.currentTarget.dataset.price;
					}else{
						this.memberMoney = eve.currentTarget.dataset.row;
					}
				}
				this.productId = eve.currentTarget.dataset.id;
				this.productIndex = index;
				this.btn_add(eve);
				for(let i=0;i<this.productList.length;i++){
					if(i==index){
							this.productList[index].showNumber = "";
							this.productList[index].showButtons = "none";
							this.productList[index].showButtons_1 = "none";
					}else{
						this.productList[i].showNumber = "none";
						this.productList[i].showButtons = "none";
						this.productList[i].showButtons_1 = "";
					}
					
				}
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
						that.startLeng = res.data.jd+","+res.data.wd;
					}else{
						that.location();
						that.getLocationInfo();
					}
			},
			async getJishiDetail(){
				let dataParam = {
					"workerId":this.workersId,
					"shopId":"",
					"page":1,
					"size":4,
					"city":this.address,
					"jd":this.jd,
					"wd":this.wd
				};	
				console.log(JSON.stringify(dataParam));
				let url = this.$baseUrl+'/worker/findWorkListByShop_1';
				const res = await this.$myRequest({
					url:url,
					method:"POST",
					data:dataParam
				});
				console.log(JSON.stringify(res));
				if(res.data.success){
					if(res.data.workerList.length<=0){
						uni.showModal({
							content:"抱歉，该技师已离职，请选择其他技师",
							showCancel: false,
							success() {
								uni.switchTab({
									url:"../jishi/jishi"
								})
							}
						})
						return;
					}
					 this.workerInfo = res.data.workerList[0];
					 console.log(JSON.stringify(this.workerInfo))
					 this.sellNum = this.workerInfo.sellNum;
					 console.log(JSON.stringify(this.workerInfo));
					 this.shopId = this.workerInfo.shopId;
					 this.workerPicList = res.data.workePicrList;
					this.workerPhone = this.workerInfo.phone;
					 let tempList = [];
					 let picList = [];
					 let imageNums = 0;
					 let picNumber = 0;
					 if(this.workerPicList!= null && this.workerPicList.length>0){
						 for(let i=0;i<this.workerPicList.length;i++){
							if(this.workerPicList[i].imgType=='2'){
								 this.zige = this.workerPicList[i].imgUrl;
								 picList[picNumber] = this.workerPicList[i];
								 picNumber = picNumber + 1;
							}else  if(this.workerPicList[i].imgType=='3'){
								 this.jian = this.workerPicList[i].imgUrl;
								 picList[picNumber] = this.workerPicList[i];
								 picNumber = picNumber + 1;
							}else  if(this.workerPicList[i].imgType=='0'){
								 tempList[imageNums] = this.workerPicList[i];
								 imageNums = imageNums + 1;
							}
						 }
					 }
					 this.workerPicList = tempList;
					 uni.setStorageSync("workerPicList",this.workerPicList);
					 uni.setStorageSync("PicList",picList);
					
					  this.videoCount =  this.workerPicList.length;
					 this.userName = this.workerInfo.userName;
					 this.workerTitle = this.workerInfo.introduce;
					 this.gender =  this.workerInfo.gender == '1'?'男':'女';
					 this.workerTitle=(this.workerInfo.introduce).replace(/<\/?.+?>/g, "");
					 this.workerTitle=( this.workerTitle).replace("&nbsp;", "");
					 this.workerImageUrl = this.workerInfo.imgUrl;
					 this.id = this.workerInfo.id;
					 this.shopName = this.workerInfo.shopName;
					 this.dateHHmm = this.workerInfo.dateHHmm;
					 this.distanceLen = this.workerInfo.distance;
					 this.star = this.workerInfo.star;
					 if(this.workerInfo.video!="" && this.workerInfo.video != null){
						this.videoUrl = this.workerInfo.video;
						this.videoImage = this.workerInfo.videoImage;
						 uni.setStorageSync("workerVideo",this.workerInfo.video);
						 uni.setStorageSync("workerVideoImage",this.workerInfo.videoImage);
						 this.videoCount = this.videoCount + 1;
						 this.jiequVideo();
					 }else{
						  uni.setStorageSync("workerVideo","");
						  uni.setStorageSync("workerVideoImage","");
					 }
					 console.log(this.videoUrl);
					
					 //this.getDistance("",this.workerInfo.jd+","+this.workerInfo.wd);
					 this.findEvant();
					 this.getJishiProduct();
				}
				else{
				  console.log("=错误==="+JSON.stringify(err));
				}
			},
			async getLocationInfo() {
					let json = await this.$getLocations();
					//console.log(this.jsonStr.indexOf("商丘市")+"+==="+this.jsonStr.indexOf("永城市"));
					if(uni.getStorageSync("province") != null && uni.getStorageSync("province") != ""){
						this.address = uni.getStorageSync("province").name;
						this.jd = uni.getStorageSync("province").lng;
						this.wd = uni.getStorageSync("province").lat;
					}else{
						let provinceName = "";
						var fruits = ["上海市", "重庆市", "北京市","天津市"];
						if(fruits.indexOf(json.addressList[0])>-1){
							provinceName = json.addressList[0];
						}else{
							provinceName = json.addressList[1];
						}
						this.address = provinceName;
						this.jd = json.jd;
						this.wd = json.wd;
					}
					console.log(this.address+"=1="+this.jd+"=2="+this.wd);
					//this.provinceList();
					//this.workInfoList();
					//this.shopInfo();
					//uni.hideNavigationBarLoading();
					this.getJishiDetail();
				  },			
			
			util(v){
			   this.xmlClear = function (v) {
				   console.log(v+"====")
			        if (typeof (v) == 'string')
			            return v.replace(/<\/?.+?>/g, "");
			    }
			},
			async getJishiProduct(){
				console.log(JSON.stringify(this.workerInfo));
				let dataParam = {
					"workerId":this.workersId,
					"shopId":this.shopId
				};	
				let url = this.$baseUrl+'/product/findProductInfoByWorkId';
				const res = await this.$myRequest({
					url:url,
					method:'POST',
					data:dataParam
				});
				if(res.data.success){
					this.productList = res.data.productList;
				}else{
					 console.log("=错误==="+JSON.stringify(err));
				}
			},
			//减去
			btn_minute: function(event) {
				var index = event.currentTarget.dataset.value;
				this.productIndex = index;
				var price = this.memberMoney;
				var list = this.productList;
				var num = list[index].number;
				if(num > 1) {
					num = num - 1;
					list[index].number = num;
					this.momeny = num * price;
					console.log(this.momeny);
				}else{
					this.momeny = 0;
					this.productId = "";
					for(let i=0;i<this.productList.length;i++){
							this.productList[index].number = 0;
							this.productList[i].showNumber = "none";
							this.productList[i].showButtons = "";
							this.productList[i].showButtons_1 = "none";
					}
				}
			},
			//添加
			btn_add: function(event) {
				var price = this.memberMoney;
				var index = event.currentTarget.dataset.value;
				this.productIndex = index;
				// 强转int类型
				var num =parseInt(this.productList[index].number);
				num =num + 1;
				//console.log(num+"==="+price);
				this.momeny = num * price;
				this.productList[index].number = num;
			},
			async getDistance(start,end){
				var that = this;
				start = that.startLeng;
				console.log(start+"=="+end);
				var url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins='+start+'&destination='+end+'&type=1';
				const res = await this.$myRequest({
									url: url
								});	
				console.log(res);
				/* var distanceLes = res.data.results[0].distance;
				if(distanceLes>1000){
					that.distanceLen = ((distanceLes/1000).toFixed(2))+"km";
				}else{
					that.distanceLen = distanceLes+"m";
				} */
				that.distanceLen = res.data.results[0].distance;
			}
			
		}
	}
</script>

<style>
.lijibtns{
		width: 3rem;
	    height: 2rem;
	    -webkit-border-radius: 23px;
	    text-align: center;
	    line-height: 2rem;
	    color: #fff;
	    font-size: 0.8rem;
	    background-image: linear-gradient(to right, #F76260, #F76260);
}
video{
      width: 140rpx;
      height: 140rpx;
      border-radius: 15rpx;
    }
.lijibtns_1{
	width: 3rem;
	height: 2rem;
	-webkit-border-radius: 23px;
	border-radius: 1rem;
	text-align: center;
	line-height: 2rem;
	color: #3B4144;
	font-size: 0.8rem;
	background-image: linear-gradient(to right, #C8C7CC, #EEEEEE);
}
</style>
