<template>
	<view class="detail" style="padding-bottom: 120rpx;">

		<view class="detailTu">
			<image :src="bannerUrl"></image>
			<view class="deaimg">
				<navigator url="../vip/vip" open-type="navigate">
					<image src="/static/images/kaitong.png"></image>
				</navigator>
			</view>
		</view>
		<view class="oitems ">
			 <view class="deiimbgs">
			 	<view class="spitels">{{productInfo.productName}}</view>
				 <view class="reiilbx1">
				 	<view class="reiilbx1a" v-if="productInfo.couponType!=1">
				 			￥ <text class="text">{{productInfo.price}}</text>
				 	</view>
					<view class="reiilbx1a" v-if="productInfo.couponType==1" style=" text-decoration-line: line-through;">
							￥ <text class="text" style="font-size: 1rem;">{{productInfo.price}}</text>
					</view>
				 	<view class="itemR1"><image src="/static/images/hongicon.png"></image> {{productInfo.productTime}}分钟</view>
				 	<view class="flex1"></view>
				 	<view class="reiilbx1b">已售<text class="text">{{productInfo.sellSum}}</text>单</view>
				 </view>
				 <view class="view">
				 		<view v-if="productInfo.couponType!=1" class="vipPc">
	      					<view class="vipPc1">会员价</view>
	      					<view class="vipPc2">￥{{productInfo.memberPrice}}</view>
	      				</view>
						<view v-if="productInfo.couponType==1" class="vipPc">
							<view class="vipPc1" style="font-size: 0.85rem;">秒杀价</view>
							<view class="vipPc2" style="font-size: 0.85rem;">￥{{productInfo.secondPrice}}</view>
						</view>
				 </view>
			 </view>
		</view>
		<view class="oitems">
			<view class="vslitm">
				<view class="vslitm1">保障：</view>
				<view class="vslitm2">
					<view class="tltags">
						<view class="tltag"> <image src="/static/images/duigou.png"></image>未服务全额退</view>
						<view class="tltag"> <image src="/static/images/duigou.png"></image>爽约包赔</view>
						<view class="tltag"> <image src="/static/images/duigou.png"></image>不满意重服务</view>
						<view class="tltag"> <image src="/static/images/duigou.png"></image>全场保障</view>
					</view>
				</view>
			</view>
			<view class="vslitm">
				<view class="vslitm1">优惠券</view>
				<view class="vslitm2">
					<text @tap="jumUrlInfo"  v-if="couponInfo!=null" style="color: #F76260;">{{couponInfo}}</text>
					<uni-icons @tap="jumUrlInfo" v-if="couponInfo!=null" type="arrowright"  size="16"></uni-icons>
					<text v-if="couponInfo==null" style="color: #929292;">暂无可领优惠券</text> </view>
			</view>

			<view class="vslitm">
				<view class="vslitm1">技师</view>
				<view class="vslitm2" @tap="chooseJishi">
					<image :src="imgUrl" style="width: 2rem;height: 2rem;border-radius: 3rem;">
					<text style="color: #F76260;font-size: 0.9rem;">{{workerDesc}}</text>	
					<uni-icons type="arrowright"  size="16"></uni-icons>
					</picker>
				</view>
			</view>
		</view>
		<view class="detab">

 			<view class="tabBox">
      	<view :class="{'tbItem':true, 'cur': cur==0}" @tap="detailTab" data-value="0">
      		项目描述
      	</view>
      	<view :class="{'tbItem':true, 'cur': cur==1}" @tap="detailTab" data-value="1">
      		预约须知
      	</view>
      	<view :class="{'tbItem':true, 'cur': cur==2}" @tap="detailTab" data-value="2">
      		服务评价
      	</view>

      </view>
<swiper style="height: 100vh;padding: 0rem 1rem 0rem;" :current="cur" @change="detailTab">
	  	<swiper-item>
	  		<scroll-view scroll-y style="height: 100vh;">
	  			<rich-text  :nodes="contentText|formatRichText"></rich-text>
	  		</scroll-view>
	  	</swiper-item>
	  	<swiper-item>
	  		<scroll-view scroll-y style="height: 100vh;">
	  			<rich-text  :nodes="orderDesc|formatRichText"></rich-text>
	  		</scroll-view>
	  	</swiper-item>	
	  	<swiper-item>
	  		<scroll-view  class="vsiiatem" scroll-y style="height: 100vh;">
	  			
				<view v-for="(evals,evalIndex) in evaList" :key="evalIndex">
						<view class="vsiiatemL">
							<image :src="getHeadImg(evals.headImg)" style="width: 50px;height: 50px;float: left;margin-right: 0.8rem;"></image>
						</view>
						<view class="vsiiatemR" >
							<!-- <view class="vsiiatemR1">{{evals.userName}}</view> -->
							<view class="roitem2Rax">******</view>
							<view class="vsiiatemR2"><uni-rate :value="evals.star" color="#bbb" active-color="red" size="12" readonly /> <view class="view"> {{evals.updateTime}}</view></view>
								<view style="margin-left: 4rem;"><rich-text :nodes="getContent(evals.content,evals.imgUrl)"></rich-text></view>
							<view class="tags" style="padding-left: 3rem;margin-top: 0.3rem;">
								<span  v-if="evals.list!=null" class="tag" style="color: #F9221D;font-size: 0.5rem;" v-for="(biao,biaoIndex) in evals.list" :key="biaoIndex">{{biao.name}} </span>
							</view>
							<view class="vsiiatemR1" style="font-size: 0.75rem;margin-left: 4rem;margin-top:0.1rem;">{{evals.province}}  {{evals.area}}  {{evals.productName}}  {{evals.workName}}</view>
							<view v-if="evals.returnContent !='' && evals.returnContent !=null" style="border-top: 1px solid #C0C8D0;margin-left: 4rem;margin-top: 0.2rem;margin-bottom: 0.3rem;">
								<b>商家回复</b>：{{evals.returnContent}}
							</view>
						</view>
					</view>
	  		</scroll-view>
	  	</swiper-item>			
	  </swiper>
		</view>

	  <view class="fiexFsa">
	  	<view class="fiexFsain">
	  		待支付： <text class="text1">¥</text> <text class="text2">{{money}}</text>
	  		<view class="flex1"></view>
	  		<view class="lijibtn" style=" background-image: linear-gradient(to right,#09BB07, #09BB07);" @tap="busyShop">立即购买</view>
	  	</view>

	  </view>
	</view>
</template>

<script>
	import {
			week
		} from '../common/DateUtil.js'
	import {
				yearTime
			} from '../common/DateUtil.js'
	export default {
		data() {
			return {
				shopName:'',
				page:1,
				evaList:[],
				cur: 0,
				cur1: 0,
				timeCur: 0,
				productId:'',
				productInfo:{productName:''},
				productList:[],
				contentText:'',
				content:'',
				today:'',
				tomorrow:'',
				after:'',
				timerStr:'',
				preTime:'',
				money:0,
				productMoney:0,
				worklist:[{userName:""}],
				index:0,
				workerId:'',
				workerName:'请选择技师',
				bannerUrl:'',
				orderDesc:'',
				imgUrl:'',
				workerDesc:'请选择技师',
				gender:'',
				couponInfo:null,
				flag:1
			}
		},
		onShow() {
			let that = this;
			let couponId = uni.getStorageSync("couponId");
			console.log(couponId+"=="+that.flag);
			if(couponId!=null && couponId != ""){
				this.flag = 2;
				this.couponInfo = "50元优惠券";
				this.money = this.productMoney - 50;
				console.log("----==");
			}
			let workerInfo = uni.getStorageSync("workerInfo");
			if(workerInfo!=null && workerInfo!=undefined && workerInfo != ""){
				this.workerId = workerInfo.workerId;
				this.workerName = workerInfo.workerName;
				this.imgUrl = workerInfo.imgUrl;
				this.workerDesc = "";
				if(workerInfo.gender == 1){
					this.gender = "男";
				}else{
					this.gender = "女";
				}
				uni.removeStorageSync("workerInfo");
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
		onLoad(e) {
			this.productId = e.productId;
			if(e.staus=="1"){
				uni.setStorageSync("status","1");
			}else{
				uni.setStorageSync("status","");
			}
			this.productDetailInfo();
			this.findProductInfoByIdList();
			this.findEvant();
			this.couponLists();
			
		},
		onReachBottom() {
			
			if(this.cur == 2){
				this.page += 1;
				this.findEvant();
			}
		},
		methods: {
			jumUrlInfo(){
				uni.navigateTo({
					url:"../coupon_choose/coupon_choose"
				})
			},
			async couponLists(){
				var userVo = uni.getStorageSync("userVo");
				let url = this.$baseUrl + '/user/findUserByInfo?userId='+userVo.userId;
				const res = await this.$myRequest({
					url: url
				});
				console.log(JSON.stringify(res));
				if(res.data.couponList!=null && res.data.couponList.length>=0){
					this.couponInfo="请选择优惠券";
				}
			},
			getHeadImg(img){
				/* if(img!=''){
					return img;
				}else{
					return "/static/images/au3.png";
				} */
				return "/static/images/loginAPP.png";
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
			async findEvant(){
				let url = this.$baseUrl +"/worker/findWorkEvalByProduct";
				const res = await this.$myRequest({
					url:url,
					method:'POST',
					data:{
						productId:this.productId,
						page:this.page
					}
				});
				console.log(res.data.evalList.length);
				uni.hideNavigationBarLoading();
				//console.log(JSON.stringify(res));
				if(res.data.evalList!=null && res.data.evalList.length>0){
					for(let i =0;i<res.data.evalList.length;i++){
						this.evaList.push(res.data.evalList[i]);
					}
				}
				this.count = this.evaList.length;
			},
			chooseJishi(){
				console.log(this.shopName);
				uni.navigateTo({
					url:"../jishi_choose/jishi_choose?productId="+this.productId+"&shopName="+this.shopName
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				this.workerId = this.worklist[this.index].workerId;
			},
			busyShop(){
				//立即购买
				//获取用户的基本信息
				if(uni.getStorageSync("isLogin")=='' || uni.getStorageSync("isLogin")==null){
					uni.setStorageSync("meStatus","Y");
					uni.navigateTo({
						url:'../login/login1'
					});
					return;
				}
				
				if(this.workerId==''){
					uni.showToast({
					  title: "请选择技师"
					});
					return;
				}
				
				var jsonData = {
					workName:this.workerName,
					productPrice:this.productMoney,
					money:this.money,
					productNum:1,
					productName:this.productInfo.productName,
					productId:this.productInfo.productId,
					workerId:this.workerId,
					productImg:this.productInfo.imgUrl,
					gender : this.gender,
					memberPrice:this.productInfo.memberPrice
				};
				uni.setStorageSync("jsonData",jsonData);
				uni.setStorageSync("detailStatus","1");
				//console.log("====ddd==="+JSON.stringify(jsonData));
				uni.navigateTo({
					url:"../ordering/ordering"
				})
				
			},
			open(){
				 this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close();
			},
			//获取项目的相关信息
			async productDetailInfo(){
					  this.cur = 0;
					  this.productTypeId = "";

					 let params = {
						productId:this.productId
					 };
					 let url = this.$baseUrl+'/product/findProductInfoById';
					 const res = await this.$myRequest({
						 url:url,
						 data:params,
						 method:"POST"
					 });
					 console.log(JSON.stringify(res));
					 if(res.data.success){
						 this.productInfo = res.data.product;
						 this.contentText  = this.productInfo.contentText;
						 this.content = this.contentText;
						 let userVo = uni.getStorageSync("userVo");
						 this.orderDesc = this.productInfo.orderInfo;
						 this.shopName = this.productInfo.shopName;
						 if(this.productInfo.couponType==1){
							 this.money = this.productInfo.secondPrice;
							 this.productMoney = this.productInfo.secondPrice;
						 }else{
						  if(userVo.level!=0){
							this.money = this.productInfo.memberPrice;
							this.productMoney = this.productInfo.memberPrice;
						  }else{
							this.money = this.productInfo.price;
							this.productMoney = this.productInfo.price;
						  }	
						}
					 }else{
						 uni.showToast({
						   title: res.data.msg
						 });
					 }
			},
			//获取项目的相关信息
			async findProductInfoByIdList(){
					  this.cur = 0;
					  this.productTypeId = "";
					  console.log(this.productId);
					 let params = {
						productId:this.productId
					 };
					 let url = this.$baseUrl+'/product/findProductInfoByIdList';
					 const res = await this.$myRequest({
						 url:url,
						 data:params,
						 method:"POST"
					 });
					 
					 if(res.data.success){
						 console.log(JSON.stringify(res));
						 if(res.data.productList!="" && res.data.productList!=null){
							this.bannerUrl = res.data.productList[0].imgUrl;
						 }
						 if(this.bannerUrl==""){
							 this.bannerUrl = "/static/images/detail.png";
						 }
					 }else{
						 uni.showToast({
						   title: res.data.msg
						 });
					 }
			},
			//详细描述的几个按钮
			detailTab(e){
				let thisCurr = e.detail.current || e.currentTarget.dataset.value || 0;
				this.cur = thisCurr;
			},
			replaceSpecialChar(detail) {
				console.log(detail);
				var content = detail.replace(/<img[^>]*>/gi, function(match, capture) {
					var match = match.replace(/(style="(.*?)")|(width="(.*?)")|(height="(.*?)")/ig,'width=350rpx');
					return match;
				});
				return content;
			},
			clickInfo(e){
				this.timeCur = event.currentTarget.dataset.value;
				this.preTime = event.currentTarget.dataset.row;
				console.log(this.timeCur+"==="+this.preTime);
				
			},
			//查询技师的信息
			async workInfoList(){
				//根据距离来排序的技师
				let dataParam = {
					"workerId":"",
					"shopId":"",
					"page":1,
					"size":100
				};	
				let url = this.$baseUrl+'/worker/findWorkListByShop';
				const res = await this.$myRequest({
									url: url,
									data: dataParam,
									method:"POST"
								});				
				this.worklist = res.data.workerList;
				
				var start = '';
				var end = '';
				
				for(var i=0;i<this.worklist.length;i++){
					if(i==0){
							end = '121.22654,31.03241';
							start = this.worklist[i].jd+","+this.worklist[i].wd;
					}else{
						start += '|'+this.worklist[i].jd+","+this.worklist[i].wd
					}
				}
				this.getDistance(start,end);
			},
			async getDistance(start,end){
				var url = 'https://restapi.amap.com/v3/distance?key=c26662795f32756d874671ccae9bcdeb&origins='+start+'&destination='+end+'&type=3';
				const res = await this.$myRequest({
									url: url
								});	
				
				for(var i = 0;i<res.data.results.length;i++){
					this.worklist[i].distanceLen = res.data.results[i].distance;
				}
				this.orderByAsc();
			},
			orderByAsc(){
				//从小打大排序
				var results = this.worklist;
				var arr = "";
				for(var i=results.length-1;i>0;i--){
					for(var j=0;j<i;j++){
						if(Number(results[j].distanceLen)>Number(results[j+1].distanceLen)){
							arr += j+",";
							var temp = results[j];
							results[j] = results[j+1];
							results[j+1] = temp;
						}
					}
					
				}
				var resultsList = [];
				for(var i=0;i<results.length;i++){
					results[i].distanceLen = parseFloat(results[i].distanceLen/1000).toFixed(1);
					//判断是否服务距离大于店员的服务范围
					if(Number(results[i].distanceLen) <= Number(results[i].radius)){
							if(results[i].distanceLen<=1){
								results[i].distanceLen =results[i].distanceLen*1000+"m";
							}else{
								results[i].distanceLen = results[i].distanceLen+"km";
							}	
							resultsList.push(results[i]);	
							continue;
					}
				}
				this.worklist = resultsList;
				this.workerId = this.worklist[this.index].workerId;
				console.log(JSON.stringify(this.worklist));
			},
		}
	};
</script>

<style>
.tag{
	margin-left: 0.8rem;
	border: 1px solid #F76260;
	border-radius: 1rem;
	font-size: 0.7rem;
	padding: 0.2rem;
}
</style>
