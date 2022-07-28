<template>
	<view class="page">
		<view class="feedback-title">
			<text></text>
		</view>
		<view class="feedback-body"><textarea placeholder="请详细描述你的问题和意见..." v-model="sendDate.content" class="feedback-textare"></textarea></view>
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
				msgContents: ['界面显示错乱', '启动缓慢，卡出翔了', 'UI无法直视，丑哭了', '偶发性崩溃'],
				workList:[{id:'12',userName:'小明'},{id:'32',userName:'小红'}],
				stars: [1, 2, 3, 4, 5],
				imageList: [],
				imgListUrl:[],
				sendDate: {
					content: '',
					userId:'',
					imgUrl:''
				},
				imgPaths:[],
				filePaths:[]
			};
		},
		onLoad() {
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
			this.sendDate = Object.assign(this.deviceInfo, this.sendDate);
		},
		methods: {
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
			
			showWorkList() {
				let workInfoLists = [];
				for(let i = 0;i<this.workList.length;i++){
					workInfoLists.push(this.workList[i].userName);
				}
				uni.showActionSheet({
					itemList: workInfoLists,
					success: res => {
						this.sendDate.workerName = this.workList[res.tapIndex].userName;
						this.sendDate.workerId = this.workList[res.tapIndex].id;
						
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
						                prePath: 'Suggest_ImgUrl'
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
				let url = this.$baseUrl+"/user/addSuggest";
				const res = await this.$myRequest({
							url: url,
							data:this.sendDate,
							method:"POST"						  	
						});
				if(res.data.success){
					uni.showToast({
						title: '提交成功',
					});
					uni.switchTab({
						url:"../my/my"
					})
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
</style>
