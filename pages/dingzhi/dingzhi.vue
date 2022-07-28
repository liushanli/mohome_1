<template>
	<view class="zhaopin">
		<view class="jsBanner"><image src="../../static/images/company_dingzhi.png"></image></view>
		<view class="">
			<view class="fpcontl">
        <view class="fpcontlL">城市</view>
        <view class="flex1"></view>
        <view class="fpcontlR">
          <picker @change="bindPickerChange" :value="index" :range="array">
              <view class="yibntm">
                <input type="text" class="finput" disabled="true"  v-model="array[index]" placeholder="请选择服务城市"  name="">
                <uni-icons type="arrowright" size="15" color="#999"></uni-icons>
              </view>
          </picker>
        </view>
      </view>
      <view class="fpcontl">
        <view class="fpcontlL">服务时间</view>
        <view class="flex1"></view>
		<view class="fpcontlR">
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input" style="color: #999999;">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>
      </view>
		<view class="fpcontl">
			<view class="fpcontlL">姓名</view>
			<view class="flex1"></view>
			<view class="fpcontlR"><input type="text" class="finput" v-model="userName" placeholder="请输入联系人姓名" name=""></view>
		</view>

      <view class="fpcontl">
        <view class="fpcontlL">电话</view>
        <view class="flex1"></view>
        <view class="fpcontlR"><input type="text" class="finput" v-model="userPhone" placeholder="请输入联系人电话" name=""></view>
      </view>
			<view class="fpcontl">
				<view class="fpcontlL">备注</view>
				<view class="flex1"></view>
				<view class="fpcontlR">
					 <textarea class="tesdinpt" placeholder="备注" v-model="remark"></textarea>
				</view>
			</view>

			<view class="tijiaoyy" @tap="addCompanyInfo">
				提交预约
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				array: [],
				index: 0,
				city:'',
				userId:'',
				serviceTime:'',
				userName:'',
				userPhone:'',
				remark:'',
				startDate:getDate('start'),
				endDate:getDate('end'),
				date: getDate({
					format: true
				})
			}
		},
		onLoad() {
			this.provinceList();
		},
		methods: {
			async provinceList(){
						   let params = {
						   	"level":"2",
						   	"pid":""
						   };
						   let url = this.$baseUrl+'/user/findProvinceInfo';
						   const res = await this.$myRequest({
						   					url: url,
						   					data: params,
											method:"POST"
						   				});	
							if(res.data.provinceList!=null){
								for(var i = 0;i<res.data.provinceList.length;i++){
									if(res.data.provinceList[i].name == '上海市'){
										this.index = i;
									}
									this.array.push(res.data.provinceList[i].name);
								}
							}			
			},
			 bindPickerChange: function(e) {

				this.index = e.target.value
			},
			async addCompanyInfo(){
				this.city = this.array[this.index];
				let params = {
					city:this.city,
					userName:this.userName,
					userId:this.userId,
					userPhone:this.userPhone,
					serviceTime:this.date,
					remark:this.remark
					};
				if(this.userName == ''){
					uni.showToast({
					  title: '请填写用户名'
					});
					return;
				}	
				if(this.userPhone == ''){
					uni.showToast({
						title:'请填写手机号'
					});
					return;
				}
				//var reg = '^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$';
				if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
					uni.showToast({
						title:'请正确填写手机号'
					});
					return;
				}
				let url = this.$baseUrl+'/user/addCompanyMade';
				const res = await this.$myRequest({
									url: url,
									method:"POST",
									data:params
								});	
				if(res.data.success){
					this.userPhone = '';
					this.userName = '';
					this.remark = '';
					uni.showToast({
						title:'提交成功'
					});
				}else{
					uni.showToast({
						title:res.data.message
					});
				}
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			}
			
		}
	};
</script>

<style>

</style>
