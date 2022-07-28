<template>
	
	<view class="jishi">
		<view>dfsafdasdf</view>
		<view class="jishiList">
			<view v-if="couponListInfo==null" disable = "disable" class="jsItem" >
				<view class="jsItemL">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>


<script>
  export default {
  	data() {
  		return {
			couponListInfo:null
      }
    },
    onLoad() {
			this.couponList();
    },
    methods: {

		async couponList(){
				//let user = uni.getStorageSync('userVo');
				//user.userId
				let userId = '8337733083DB4DA8B6C3E318AA007B38';
				let url = this.$baseUrl+'/user/findUserByInfo?userId='+userId;
				const res = await this.$myRequest({
								url: url,
								method:"GET"
				});
				console.log(JSON.stringify(res));
				/* this.couponListInfo = res.data.couponList;
				console.log("==="+JSON.stringify(res));	
				uni.hideNavigationBarLoading(); */
		},
		jumbUrl:function(event){
			let workerId =  event.currentTarget.dataset.row;
			let workName = event.currentTarget.dataset.value;
			let imgurl = event.currentTarget.dataset.img;
			let gender = event.currentTarget.dataset.gender;
			console.log(workerId+"==="+workName+"===="+imgurl);
			let jsonData={
				workerId:workerId,
				workerName:workName,
				imgUrl:imgurl,
				gender:gender
			};
			uni.setStorageSync("workerInfo",jsonData);
			uni.navigateBack({
			  delta: 1
			});
		},
      back() {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  };
</script>

<style>
	.jsitm3{
		overflow: hidden;
		-webkit-line-clamp:2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		height: 1.7rem;
	}
	image{
		margin-top:1rem;
	}
	.contion{
		color: #09BB07;
	}
</style>
