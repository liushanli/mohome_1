<template>
	<view class="zhaopin">
		<view class="jsBanner"><image src="../../static/images/jishizhao.png"></image></view>

		<view class="jsitem">
			<view class="jstelt">摩之家技师应聘登记表</view>
			<view class="jsjtnr">
				必须填写真实信息，发现填写造假，一律取消应聘资格。如果您的简历符合要求，我们会在一周内主动与您联系，如果您的简历不符合要求，恕不另行通知！请勿多次电话联系询问，谢谢！
			</view>
		</view>

		<view class="">
			<view class="fpcontl">
				<view class="fpcontlL">工作城市</view>
				<view class="flex1"></view>
				<view class="fpcontlR">
					<view class="pcGrop">
						 <view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
                    <view class="pcbtnz">
                    	<text class="text">{{array[index].name}}</text>
                    	<image src="/static/images/cdBox.png"></image>
                    </view>
                </picker>
            </view>
            <view class="uni-list-cell-db">
                <picker @change="bindPickerChange" :value="index" :range="array1" range-key="name">
                    <view class="pcbtnz">
                    	<text class="text">{{array1[index1].name}}</text>

                    	<image src="/static/images/cdBox.png"></image>
                    </view>
                </picker>
            </view>

					</view>
				</view>
			</view>


			<view class="fpcontl">
				<view class="fpcontlL">姓名</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" v-model="jsonData.name" placeholder="请输入联系人姓名" name=""></view>
			</view>



			<view class="fpcontl">
				<view class="fpcontlL">性别</view>
				<view class="flex1"></view>
				<view class="fpcontlR">
				<view >
					<radio-group class="radcCont" >
					<label class="dwacle" >
						<view class="vsirad">
							<radio @tap="jsonData.gender=1"  checked />
						</view>
						<view class="raswsz">男</view>
					</label>
					<label class="dwacle" >
						<view class="vsirad">
							<radio @tap="jsonData.gender=2"/>
						</view>
						<view class="raswsz">女</view>
					</label>
			
					</radio-group>
					</view>
				</view>
			</view>


			<view class="fpcontl">
				<view class="fpcontlL">是否会使用智能手机</view>
				<view class="flex1"></view>
				<view class="fpcontlR">
					<view >
						<radio-group class="radcCont" >
						<label class="dwacle" >
							<view class="vsirad">
								<radio @tap="jsonData.isUser=1"  checked />
							</view>
							<view class="raswsz">会</view>
						</label>
						<label class="dwacle" >
							<view class="vsirad">
								<radio @tap="jsonData.isUser=0"/>
							</view>
							<view class="raswsz">否</view>
						</label>
								
						</radio-group>
						</view>
				</view>
			</view>


			<view class="fpcontl">
				<view class="fpcontlL">年龄</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" placeholder="请输入真实年龄" v-model="jsonData.age"></view>
			</view>




			<view class="fpcontl">
				<view class="fpcontlL">手机号</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" placeholder="请输入真实手机号" v-model="jsonData.phone"></view>
			</view>


			<view class="fpcontl">
				<view class="fpcontlL">现住住址</view>
				<view class="flex1"></view>
				<view class="fpcontlR"><input type="text" class="finput" placeholder="请输入真实现住住址" v-model="jsonData.address"></view>
			</view>




			<view class="fpcontl">
				<view class="fpcontlL">工作经验</view>
				<view class="flex1"></view>
				<view class="fpcontlR">
					<input type="text" class="finput" placeholder="请输入年限" v-model="jsonData.year"/>
				</view>
			</view>

			<view class="fpcontl">
				<view class="fpcontlL">工作经历</view>
				<view class="flex1"></view>
				<view class="fpcontlR">
					 <textarea class="tesdinpt" placeholder="请输入真实工作经历" v-model="jsonData.workExperience"></textarea>
				</view>
			</view>


			<view class="fpcontl">

				<view class="flex1">
					<view class="fpcontlL">请上传真实正面照（有利于提高面试机会）</view>
					<view class="upbtns" @tap="choose">
						<image :src="photoImg" ></image>
					</view>
				</view>

			</view>

			<view class="tijiaoyy" @tap="submitInfo">
				提交预约
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				array: [{name:''}],
				array1: [{name:''}],
				index: 0,
				index1: 0,
				index2: 0,
				cur: 0,
				otherMoney:'',
				photoImg:'/static/images/upimage.png',
				jsonData:{
					name:'',
					phone:'',
					province:"",
					city:"",
					gender:1,
					isUser:1,
					address:'',
					workExperience:'',
					age:0,
					year:0,
					imgUrl:''
				},
				imgPaths:[],
				filePaths:[]
			}
		},
		onLoad() {
			this.provinceList();
		},
		methods: {
			async submitInfo(){
					// 手机号
					let phoneRe = /^1(3|4|5|6|7|8|9)\d{9}$/; 
					let numberRe = /^\d+(\.\d+)?$/;
					
					if(this.jsonData.name==""){
						uni.showModal({
						  content: '请填写你的姓名',
						  showCancel: false
						 });
						return;
					}
					if(this.jsonData.phone==""){
						uni.showModal({
						  content: '请您输入手机号',
						  showCancel: false
						 });
						return;
					}
					
					if(this.jsonData.year >0 && (!numberRe.test(this.jsonData.year))){
						
						uni.showModal({
							content:"请输入年限",
							showCancel: false
						})
						return;
					}
					if(this.jsonData.age >0 && (!numberRe.test(this.jsonData.age))){
						uni.showModal({
							content:"请输入年龄",
							showCancel: false
						})
						return;
					}
					if(!phoneRe.test(this.jsonData.phone)){
						uni.showModal({
							content:"请您输入合法的手机号",
							showCancel: false
						})
						return;
					}
					
					if(this.jsonData.address==""){
						uni.showModal({
						  content: '请您输入现住地址',
						  showCancel: false
						 });
						return;
					}
					if(this.jsonData.workExperience==""){
						uni.showModal({
						  content: '请您输入你的工作经历',
						  showCancel: false
						 });
						return;
					}
					
					this.jsonData.province = this.array[this.index].name;
					this.jsonData.city = this.array1[this.index1].name;
					console.log(JSON.stringify(this.jsonData));				
					let url = this.$baseUrl+"/user/addRecruit"
					const res = await this.$myRequest({
										url: url,
										data:this.jsonData,
										method:"POST"						  	
									});
					if(res.data.success){
						uni.showModal({
						  content: '添加成功',
						  showCancel: false,
						  success: (res) => {
							if (res.confirm) {
								 uni.navigateBack({
								 	delta:-1
								 });
							}
						  }
						});
					}else{
						uni.showModal({
						  content: '添加失败',
						  showCancel: false
						});
					}				
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.cityList();
				this.index1 = 0;
			},
			bindPickerChangeCity: function(e) {
				this.index1 = e.target.value;
			},
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
					this.array = res.data.provinceList;
					
					for(var i = 0;i<this.array.length;i++){
						if(this.array[i].name == '上海市'){
							this.index = i;
						}
					}
				}	
				//根据省份获取城市
				this.cityList();
			},
			async cityList(){
			   let params = {
				"level":"3",
				"pid":""+this.array[this.index].id
			   };
			   let url = this.$baseUrl+'/user/findProvinceInfo';
			   const res = await this.$myRequest({
								url: url,
								data: params,
								method:"POST"
							});	
				if(res.data.provinceList!=null){
					this.array1 = res.data.provinceList;
				}			
			},
			choose(e){
				var me = this;
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera', 'album'], //从相册选择
				    success: function (res) {
						console.log(JSON.stringify(res));
						me.imgPaths = me.imgPaths.concat(res.tempFilePaths);
						me.filePaths = res.tempFilePaths;
						me.photoImg = res.tempFilePaths;	
						console.log("URl=="+me.$baseUrl);
						uni.uploadFile({
						            url: me.$baseUrl+'/worker/uploadImg', //仅为示例，非真实的接口地址
						            filePath: me.filePaths[0],
						            name: 'uploadFile',
						            formData: {
						                prePath: 'recruit'
						            },
									header:{"Content-Type": "multipart/form-data"},
						            success: (res) => {
										let s = JSON.parse(res.data);
										me.jsonData.imgUrl = s.imgUrl;
										//me.updUser();
										console.log(me.jsonData.imgUrl+"==="+s.imgUrl);
						            },fail:(e)=>{
										console.log(e);
									}
						        });
				    }
				});
			}
		},
	};
</script>

<style>

</style>
