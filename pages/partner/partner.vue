<template>
	<view class="zhaopin">
		<view class="jsBanner"><image src="/static/images/shop_ruzhu.png"></image></view>

    <view class="jsitem">
      <view class="vipboxBtl">我们的优势</view>

      <view class="salgg">
		
        <view class="salggtm">
          <view class="salggtm1">投入少（精力）风险低，回报空间大，来去自由，不耗精力，主业兼职均可</view>
        <!--  <view class="salggtm2">提供线上线下市场推广方案支持，形成技师培训，客户服务，区域代理等完善的行业生态模式。</view> -->
        </view>
		<view class="salggtm">
		  <view class="salggtm1">让每一个有梦想创业的草根都有机会做老板-只要你有梦想，我们为你提供舞台</view>
		<!--  <view class="salggtm2">提供线上线下市场推广方案支持，形成技师培训，客户服务，区域代理等完善的行业生态模式。</view> -->
		</view>
		<view class="salggtm">
		  <view class="salggtm1">分销商，区域代理，有一定资源的云店老板，实体商家入驻降低投资经营成本，扩大经营范围，拓展营销渠道，共享平台资源，增加收益空间，提升核心竞争力。</view>
		<!--  <view class="salggtm2">提供线上线下市场推广方案支持，形成技师培训，客户服务，区域代理等完善的行业生态模式。</view> -->
		</view>
		<view class="salggtm">
		  <view class="salggtm1">忠实的客户群体，高端商旅人士潜力巨大，区域保护，智能化数据分析，不再担心客户流失</view>
		<!--  <view class="salggtm2">提供线上线下市场推广方案支持，形成技师培训，客户服务，区域代理等完善的行业生态模式。</view> -->
		</view>

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
						<input v-model="array[index].name" disabled="true" style="width: 4rem;color: #929292;font-size: 0.9rem;"/>
                      <image src="/static/images/cdBox.png"></image>
                    </view>
                </picker>
            </view>
            <view class="uni-list-cell-db">
                <picker @change="bindPickerChangeCity" :value="index1" :range="array1" range-key="name">
                    <view class="pcbtnz">
                      <!-- <text class="text">{{array1[index1]}}</text> -->
					  <input v-model="array1[index1].name" disabled="true"  style="width: 4rem;color: #929292;font-size: 0.9rem;"/>
                      <image src="/static/images/cdBox.png"></image>
                    </view>
                </picker>
            </view>

          </view>
        </view>
      </view>


      <view class="fpcontl">
        <view class="flex1">
          <view class="fpcontlL">您是否有过团队管理经验？</view>

          <view class="gsixuze">
            <view >
             <radio-group class="radcCont" >
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio   checked  @tap="jsonData.isManager=1"/>
                  </view>
                  <view class="raswsz">是</view>
              </label>
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio    @tap="jsonData.isManager=0" />
                  </view>
                  <view class="raswsz">否</view>
              </label>

            </radio-group>
            </view>
          </view>
        </view>
      </view>


      <view class="fpcontl">
        <view class="flex1">
          <view class="fpcontlL">您从事过推拿按摩行业吗？</view>

          <view class="gsixuze">
            <view >
             <radio-group class="radcCont" >
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio   checked  @tap="jsonData.isMassage=1"/>
                  </view>
                  <view class="raswsz">是</view>
              </label>
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio    @tap="jsonData.isMassage=0" />
                  </view>
                  <view class="raswsz">否</view>
              </label>

            </radio-group>
            </view>
          </view>
        </view>
      </view>


      <view class="fpcontl">
        <view class="flex1">
          <view class="fpcontlL">您愿意缴纳多少金额的保证金？</view>

          <view class="gsixuze">
            <view >
             <radio-group class="radcCont" >
              <label class="dwacle" >
                  <view class="vsirad">
                  </view>
                      <radio   checked @tap="jsonData.deposit=1000"/>
                  <view class="raswsz">1000元</view>
              </label>
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio    @tap="jsonData.deposit=5000" />
                  </view>
                  <view class="raswsz">5000元</view>
              </label>
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio    @tap="jsonData.deposit=-1" />
                  </view>
                  <view class="raswsz">其他</view>
				  <input type="text" v-model="otherMoney" style="border-bottom: #929292 1px solid;width: 3rem;height: 30rpx;"/>
              </label>


            </radio-group>
            </view>
          </view>
        </view>
      </view>
      <view class="fpcontl">
        <view class="flex1">
          <view class="fpcontlL">您的技师团队有多少人？</view>

          <view class="gsixuze">
            <view >
             <radio-group class="radcCont" >
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio   checked  @tap = "teamSizeInfo('5-10')"/>
                  </view>
                  <view class="raswsz">5-10人</view>
              </label>
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio   @tap = "teamSizeInfo('10-15')" />
                  </view>
                  <view class="raswsz">10-15人</view>
              </label>
              <label class="dwacle" >
                  <view class="vsirad">
                      <radio   @tap = "teamSizeInfo('15-20')" />
                  </view>
                  <view class="raswsz">15-20人</view>
              </label>
            </radio-group>
            </view>
          </view>
        </view>
      </view>

      <view class="fpcontl">
        <view class="flex1">
          <view class="fpcontlL">请准确的填写您能的联系方式</view>

          <view class="contnbf">
            <view class="contnitm">
              <view class="contnitm1">姓名</view>
              <view class="contnitm2"><input type="text" class="input" v-model="jsonData.userName" placeholder="请输入您的姓名" name=""></view>
            </view>

            <view class="contnitm">
              <view class="contnitm1">手机号</view>
              <view class="contnitm2"><input type="text" class="input" v-model="jsonData.userPhone" placeholder="请输入手机号" name=""></view>
            </view>

            <view class="contnitm">
              <view class="contnitm1">邮箱</view>
              <view class="contnitm2"><input type="text" class="input" v-model="jsonData.email" placeholder="请输入您的邮箱" name=""></view>
            </view>
            <view class="contnitm">
              <view class="contnitm1">备注</view>
              <view class="contnitm2"><input type="text" class="input" v-model="jsonData.remark" placeholder="其他说明或问题可提前备注" name=""></view>
            </view>
          </view>
        </view>
      </view>
			<view class="tijiaoyy" @tap="submitInfo">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				array: [{name:''}],
				array1: [{name:''}],
				index: 0,
				index1: 0,
				index2: 0,
				cur: 0,
				otherMoney:'',
				jsonData:{
					userName:'',
					userPhone:'',
					email:"",
					remark:"",
					province:"",
					city:"",
					isMassage:1,
					isManager:1,
					deposit:1000,
					teamSize:"5-10"
				}

			}
		},
		onLoad() {
			this.provinceList();
		},
		methods: {
			 bindPickerChange: function(e) {

				this.index = e.target.value;
				this.cityList();
				this.index1 = 0;
			},
			bindPickerChangeCity: function(e) {
				this.index1 = e.target.value;
			},
			teamSizeInfo(e){
				this.teamSize = e;
				console.log(this.teamSize);
			},
			async submitInfo(){
					let url = this.$baseUrl+"/user/addPartnet";
					// 手机号
					let phoneRe = /^1(3|4|5|6|7|8|9)\d{9}$/; 
					let numberRe = /^\d+(\.\d+)?$/;
					console.log(this.jsonData.deposit+"==="+this.otherMoney);
					// 邮箱正则表达式
					let emailRe = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
					if(this.jsonData.deposit == -1 && (this.otherMoney == ''|| this.otherMoney == 0)){
						uni.showModal({
						  content: '请您输入保证金',
						  showCancel: false,
						 });
						return;
					}
					if(this.jsonData.userName==""){
						
						uni.showModal({
						  content: '请您输入姓名',
						  showCancel: false,
						 });
						return;
					}
					if(this.jsonData.userPhone==""){
						uni.showModal({
						  content: '请您输入手机号',
						  showCancel: false,
						 });
						return;
					}
					if(this.jsonData.email==""){
						uni.showModal({
						  content: '请您输入邮箱',
						  showCancel: false,
						 });
						return;
					}
					
					if(this.jsonData.deposit == -1 && (!numberRe.test(this.otherMoney))){
						uni.showModal({
							content:"保证金请您输入数字"
						})
						return;
					}
					if(!phoneRe.test(this.jsonData.userPhone)){
						uni.showModal({
							content:"请您输入合法的手机号"
						})
						return;
					}
					if(!emailRe.test(this.jsonData.email)){
						uni.showModal({
							content:"请您输入合法的邮箱"
						})
						return;
					}
					this.jsonData.province = this.array[this.index].name;
					this.jsonData.city = this.array1[this.index1].name;
					if(this.jsonData.deposit==-1){
						this.jsonData.deposit = this.otherMoney;						
					}

					console.log(JSON.stringify(this.jsonData));				
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
			}
		}
	};
</script>

<style>

</style>
