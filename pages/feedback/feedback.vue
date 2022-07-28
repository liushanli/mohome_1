<template>
	<view class="page">
		<view class="feedback-title">
			<view class="slsimte">
				<view :class="{sshitm:true, cur:item.cur}" v-for="(item,index) in chooseStatus" :key="index" @click="setarrCur(index)" style="width: auto;height: 2rem;padding: 0rem 0.4rem 0rem;margin: 0.2rem 0.2rem 0.2rem;">
					<view class="sshitm1">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="feedback-body"><textarea placeholder="请详细描述你的评价..." v-model="sendDate.content" class="feedback-textare"></textarea></view>
		<view class="feedback-title"><text>图片(选填,提供环境或服务照片,总大小10M以下)</text></view>
		<view class="feedback-body feedback-uploader">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">点击预览图片</view>
					<view class="uni-uploader-info">{{ imageList.length }}/5</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;">
								<image class="uni-uploader__img" :src="image" @tap="previewImage(index)"></image>
								<view class="close-view" @click="close(index)">x</view>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-show="imageList.length < 5">
							<view class="uni-uploader__input" @tap="chooseImg"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="feedback-title"><text>技师</text></view>
		<view class="feedback-body"><input class="feedback-input" disabled="true"  v-model="sendDate.workerName" /></view>
		<view class="feedback-title feedback-star-view">
			<text>应用评分</text>
			<view class="feedback-star-view">
				<uni-rate v-model="sendDate.score" color="#bbb"></uni-rate>
			</view>
		</view>
		<button class="feedback-submit" @tap="send">提交</button>
	</view>
</template>

<script>
	import uniRate from '../../components/uni-rate/uni-rate.vue';
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				msgContents: [],
				workList:[],
				stars: [1, 2, 3, 4, 5],
				imageList: [],
				imgListUrl:[],
				sendDate: {
					id:'',
					score: 0,
					content: '',
					contact: '',
					workerId:'',
					workerName:'',
					userId:'',
					imgUrl:'',
					orderId:'',
					chooseId:''
				},
				imgPaths:[],
				filePaths:[],
				chooseStatus:[]
			};
		},
		onLoad(option) {
			uni.showNavigationBarLoading();
			this.findEvalDetail();
			this.deviceInfo = {
				appid: '__UNI__5D0B0CA',
				imei: plus.device.imei, //设备标识
				p: plus.os.name === 'Android' ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
				md: plus.device.model, //设备型号
				app_version: plus.runtime.version,
				plus_version: plus.runtime.innerVersion, //基座版本号
				os: plus.os.version,
				net: '' + plus.networkinfo.getCurrentType()
			};
			console.log(option.id);
			if(option.id!=null && option.id != "" && option.id!=undefined){
				this.sendDate.id = option.id;
				this.findEvalById();
			}
			this.sendDate = Object.assign(this.deviceInfo, this.sendDate);
			let feedArr = uni.getStorageSync("feedArr");
			if(feedArr!="" && feedArr != null && feedArr != undefined){
				this.sendDate.workerName = feedArr.workerName;
				this.sendDate.workerId = feedArr.workerId;	
				this.sendDate.orderId = feedArr.orderId;	
				console.log(JSON.stringify(this.sendDate));
			}
			//this.workInfoList();
			uni.hideNavigationBarLoading();
		},
		methods: {
			setarrCur(index){
						let item = this.chooseStatus[index];
						item.cur = !item.cur;
						if(item.cur){
							this.sendDate.content += "  "+item.name;
						}else{
							this.sendDate.content = this.sendDate.content.replace("  "+item.name,"");
						}
						this.$set(this.chooseStatus, index, item);
			},	
			/**
			 * 关闭图片
			 * @param {Object} e
			 */
			close(e) {
				this.imageList.splice(e, 1);
				this.imgListUrl.splice(e,1);
			},
			/**
			 * 快速输入
			 */
			chooseMsg() {
				uni.showActionSheet({
					itemList: this.msgContents,
					success: res => {
						if(this.sendDate.content==''){
								this.sendDate.content += this.msgContents[res.tapIndex];
						}else{
							this.sendDate.content += ","+this.msgContents[res.tapIndex];
						}
						
					}
				});
			},
			/**
			 * 选择图片
			 */
			chooseImg() {
				var me = this;
				//选择图片
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: 'compressed',
					count: 5 - this.imageList.length,
					success: res => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						me.imgPaths = me.imgPaths.concat(res.tempFilePaths);
						me.filePaths = res.tempFilePaths;
						uni.uploadFile({
						            url: me.$baseUrl+'/worker/uploadImg', //仅为示例，非真实的接口地址
						            filePath: me.filePaths[0],
						            name: 'uploadFile',
						            formData: {
						                prePath: 'Eval_ImgUrl'
						            },
									header:{"Content-Type": "multipart/form-data"},
						            success: (res) => {
										let s = JSON.parse(res.data);
										me.headImage = s.imgUrl;

										me.imgListUrl = me.imgListUrl.concat(s.imgUrl);
						            },fail:(e)=>{
										console.log(e);
									}
						        });
					}
				});
			},
			async findEvalById(){
				let url = this.$baseUrl+"/user/findEvalInfoById?id="+this.sendDate.id;
				const res = await this.$myRequest({
					url:url,
					method:'POST'
				});
				if(res.data.success){
					this.sendDate.workerId = res.data.evaluate.workId;
					this.sendDate.content = res.data.evaluate.content;
					this.sendDate.imgUrl = res.data.evaluate.imgUrl;
					console.log(this.sendDate.imgUrl);
					if(this.sendDate.imgUrl!=null && this.sendDate.imgUrl != ""){
						this.imageList = this.sendDate.imgUrl.split("|");
						
					}
					this.sendDate.score = res.data.evaluate.star;
					this.sendDate.workerName = res.data.evaluate.userName;
	
					
				}
			},

			/**
			 * 评分
			 * @param {Object} e
			 */
			chooseStar(e) {
				//点击评星
				this.sendDate.score = e;
			},
			/**
			 * 预览图片
			 * @param {Object} index
			 */
			previewImage(index) {
				uni.previewImage({
					urls: this.imageList,
					current: this.imageList[index]
				});
			},
			
			/**
			 * 提交
			 */
			async send() {
				//发送反馈
				if (this.sendDate.content.length === 0) {
					uni.showModal({
						content: '评价意见',
						showCancel: false
					});
					return;
				}
				if(this.sendDate.score==0){
					uni.showModal({
						content: '请选择星级',
						showCancel: false
					});
					return;
				}
				
				
				for(var i=0;i<this.chooseStatus.length;i++){
					if(this.chooseStatus[i].cur){
						this.sendDate.chooseId += this.chooseStatus[i].id+",";
					}
				}

				var imgUrl = "";
				for(let i =0;i<this.imgListUrl.length;i++){
					if(i==0){
						imgUrl = this.imgListUrl[i];	
					}else{
						imgUrl += "|"+this.imgListUrl[i];
					}
				}

				let userVo = uni.getStorageSync("userVo");
				this.sendDate.userId = userVo.userId;
				this.sendDate.imgUrl = imgUrl;
				let url = this.$baseUrl+"/user/addEvaluate";
				const res = await this.$myRequest({
							url: url,
							data:this.sendDate,
							method:"POST"						  	
						});
				if(res.data.success){
					uni.showToast({
						title: '提交成功',
					});
					uni.navigateTo({
						url:"../evaluate/evaluate"
					});
				}
			},
			async findEvalDetail(){
				let url = this.$baseUrl+"/order/findEvalDetail";
				const res = await this.$myRequest({
							url: url,
							method:"POST"						  	
						});
						this.chooseStatus = res.data.resultList;
			},
			getBooleanByContent(nums){
				if(nums == 1){
					this.cur1 = (this.cur1==true)?false:true;
					return this.cur1;
				}else if(nums == 2){
					this.cur2 = (this.cur2==true)?false:true;
					return this.cur2;
				}else if(nums == 3){
					this.cur3 = (this.cur3==true)?false:true;
					return this.cur3;
				}else if(nums == 4){
					this.cur4 = (this.cur4==true)?false:true;
					return this.cur4;
				}else if(nums == 5){
					this.cur5 = (this.cur5==true)?false:true;
					return this.cur5;
				}else if(nums == 6){
					this.cur6 = (this.cur6==true)?false:true;
					return this.cur6;
				}else if(nums == 7){
					this.cur7 = (this.cur7==true)?false:true;
					return this.cur7;
				}else if(nums == 8){
					this.cur8 = (this.cur8==true)?false:true;
					return this.cur8;
				}else if(nums == 9){
					this.cur9 = (this.cur9==true)?false:true;
					return this.cur9;
				}else if(nums == 10){
					this.cur10 = (this.cur10==true)?false:true;
					return this.cur10;
				}else if(nums == 11){
					this.cur11 = (this.cur11==true)?false:true;
					return this.cur11;
				}else if(nums == 12){
					this.cur12 = (this.cur12==true)?false:true;
					return this.cur12;
				}else if(nums == 13){
					this.cur13 = (this.cur13==true)?false:true;
					return this.cur13;
				}else if(nums == 14){
					this.cur14 = (this.cur14==true)?false:true;
					return this.cur14;
				}else if(nums == 15){
					this.cur15 = (this.cur15==true)?false:true;
					return this.cur15;
				}else if(nums == 16){
					this.cur16 = (this.cur16==true)?false:true;
					return this.cur16;
				}
			}
			
		}
	};
</script>

<style>
	page {
		background-color: #efeff4;
	}

	.input-view {
		font-size: 28rpx;
	}

	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ff5053;
		color: #ffffff;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
	}
	.twoFont{
		border:1rpx solid #C0C8D0;
		width: auto;
		height: 50rpx;
		text-align: center;
		border-radius: 0.5rem;
		float: left;
		margin: 0.1rem 0.2rem 0.1rem;
		padding:0 0.3rem 0;
	}
</style>
