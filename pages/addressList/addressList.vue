<template>
	<view class="jishi">
		<view class="jishiList">
			<radio-group>
			<view class="jsItem" v-for="(address,index) in addressList" :key="index">
				<view class="jsItemL"><radio value="1" :checked="address.isDefault==1" @tap="upAddresStatus" :data-value="address.id"  /></view>
				<view class="jsItemR">
					<view class="jsitm1" style="color: #555555; font-size: 1rem;">
						{{address.address}}
					</view>
					<view class="jsitm3">
						{{address.userName}} {{address.userPhone}}
					</view>
					<view class="jsitm1" style="float: right;">
						<label class="edit" @tap="upAddres" :data-value="address.id">编辑</label>
						<label class="delete"  @tap="deleAddres" :data-value="address.id">删除</label>
					</view>
					</view>
				</view>
			</radio-group>
			<view style="text-align: center;border: 1px solid #E5E5E5;width: 150rpx;height: 150rpx;margin-left: 40%;">
				<image src="../../static/images/plus.png" style="width: 150rpx;height: 150rpx;"  @tap="upAddres"/>
			</view>
		</view>
		<!-- <view style="text-align: center;color: #09F975;margin-top:15rem;">摩之家上门按摩，数十万人的选择</view> -->
	</view>
</template>


<script>
  export default {
    data() {
      return {
		  addressList:[],
		  userId:''
      }
    },
	onShow() {
			this.findUserAddress();
	},
    onLoad() {
		let userVo = uni.getStorageSync("userVo");
		this.userId = userVo.userId;
		//this.findUserAddress();
    },
    methods: {
		async upAddresStatus(e){
			let id = e.currentTarget.dataset.value;
		
			let url = this.$baseUrl + "/user/updAddressStatus";
			//修改用户状态
			const res = await this.$myRequest({
				url: url,
				method: 'POST',
				data: {
					id: id,
					userId: this.userId
				}
			});
		},
		upAddres(e){
			uni.navigateTo({
				url:"../address/address?id="+e.currentTarget.dataset.value
			});
		},
		deleAddres(e){
			console.log("del=="+e.currentTarget.dataset.value);
			
			let id = e.currentTarget.dataset.value;
			var me = this;
			uni.showModal({
			    title: '提示',
			    content: '是否确认删除该数据',
			    success: function (res) {
			        if (res.confirm) {
			           me.deleInfo(id);
			        } else if (res.cancel) {
			            console.log('点击取消');
			        }
			    }
			});
		},
		async deleInfo(id){
			let url = this.$baseUrl + "/user/delAddressStatus";
			const res = await this.$myRequest({
				url:url,
				method:'POST',
				data:{
					id:id
				}
			});
			if(res.data.success){
				uni.showToast({
					title:'删除成功'
				});
				this.findUserAddress();
			}
		},
		jumbUrl:function(event){
			let workerId =  event.currentTarget.dataset.row;
			let url = event.currentTarget.dataset.value;
			if(workerId!=null && workerId !='' && workerId != undefined){
				uni.navigateTo({
					url:url+"?workerId="+workerId
				});
			}else{
				uni.navigateTo({
					url:url
				});
			}
		},
		async findUserAddress() {
			let url = this.$baseUrl + "/user/findUserAddress";
			//查询用户信息是否存在
			const res = await this.$myRequest({
				url: url,
				method: 'POST',
				data: {
					id: null,
					userId: this.userId,
					isDefault:null
				}
			});
			console.log(JSON.stringify(res));
			if (res.data.success) {
				this.addressList = res.data.addressList;
			}
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
	.edit,.delete{
		border: 1px solid #DD524D;
		color: #DD524D;
		width: 3rem;
		height: auto;
		text-align: center;
	}
	.edit{
		margin-right: 0.3rem;
	}

</style>
