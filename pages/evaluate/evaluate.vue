<template>
	<view class="orderBox">
		<view class="rooded">
			
			<view v-if="evalList.length<=0" style="text-align: center;">暂无评价数据</view>
			<view v-if="evalList.length>0" class="roitem" v-for="(evalInfo,evalIndex) in evalList" :key="evalIndex">
			<view class="roitem1">
				<view class="roitem1a">{{evalInfo.shopName}} <uni-icons type="arrowright" color="#555" size="15"></uni-icons></view>
			</view>
			<view class="roitem2" style="margin-top: -1rem;">
				<view class="roitem2L">
					<image :src="evalInfo.userImgUrl"></image>
					</view>
				<view class="roitem2R">
					<view class="roitem2Ra">
						<view class="roitem2Rax">{{evalInfo.userName}}</view>
						<image src="../../static/images/edit.png" @tap="deleOrUpEval" :data-id ="evalInfo.id" data-stats ="1" style="width: 1rem;height: 1rem;margin-left: 3rem;margin-top: 0.3rem;"/>编辑
						|<image src="../../static/images/delete.png" @tap="deleOrUpEval" :data-id ="evalInfo.id" data-stats ="2" style="width: 1rem;height: 1rem;margin-top: 0.3rem;" />删除
					</view>
					<view class="roitem2Rb" style="margin-top: 0.1rem">
						<uni-rate :value="evalInfo.star" color="#bbb" size="17"></uni-rate>
						<view class="roitem2Rbx" style="margin-right: 6rem;">{{evalInfo.updateTime}}</view>
					</view>
					<view class="roitem2RC">
						<view class="roitem2RCx">
						<rich-text :nodes="getContent(evalInfo.content,evalInfo.imgUrl)"> </rich-text>
						</view>
					</view>
					<view class="roitem2Rb">
						<view class="roitem2Rbx">{{evalInfo.address}}  {{evalInfo.productName}}</view>
					</view>
					<view class="roitem2Rb">
						<view class="roitem2Rbx">{{evalInfo.workerName}}</view>
					</view>
					<view class="roitem2Rb" v-if="evalInfo.returnContent!='' && evalInfo.returnContent!=null"  style="border-top: 1px solid #1AAD19;">
						<view class="roitem2Rbx" style="color: #000000;">店家回复：{{evalInfo.returnContent}}</view>
					</view>
				</view>
			</view>
		</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 0,
				evalList:[],
				status:'',
				otherUrl:'',
				hide:"none"
				
				
			}
		},
		onLoad() {
			
			uni.showNavigationBarLoading();
			this.findEvalList();
			
			
		} ,
		methods: {
			async findEvalList(){
				var userVo = uni.getStorageSync("userVo");
				let url = this.$baseUrl+"/user/findEvalListInfo";
				const res = await this.$myRequest({
					url:url,
					method:'POST',
					data:{
						userId:userVo.userId
					}
				});
				console.log(JSON.stringify(res));
				if(res.data.success){
					this.evalList = res.data.resultList;
				}
				uni.hideNavigationBarLoading();
				//console.log(JSON.stringify(this.evalList));
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
			deleOrUpEval(e){
				let id = e.currentTarget.dataset.id;
				let status = e.currentTarget.dataset.stats;
				let me = this;
				if(status=='1'){
					uni.navigateTo({
						url:"../feedback/feedback?id="+id
					})
				}else{
					uni.showModal({
						content:"是否删除该评价？",
						success(res) {
							if(res.confirm){
								uni.showNavigationBarLoading();
								me.deleteEvalById(id);
							}
						}
					})
				}
			},
			async deleteEvalById(id){
				let url = this.$baseUrl+"/user/delEvalInfo?id="+id;
				console.log(url);
				
				const reslt = await this.$myRequest({
					url:url,
					method:"POST"
				});
				if(reslt.data.success){
						uni.showToast({
							title:"删除成功"
						})
						uni.showNavigationBarLoading();
						this.findEvalList();
				}else{
					uni.showToast({
						title:"删除失败"
					})
					uni.hideNavigationBarLoading();
				}
				
			}
			
		}
	}
</script>

<style>

</style>
