	<template>
	<view class="my-detail">
		<view class="line"></view>
		<view class="jiscard">
			<view class="ciistl">
				<view class="vsllt1">姓名</view>
				<view class="flex1 hui"><input type="text" v-model="workerJson.userName" /></view>
				<view class="djrisj"><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				<view class="vsllt1">身份证号：</view>
				<view class="flex1 hui"><input type="text" v-model="workerJson.nickName" /></view>
				<view class="djrisj"><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				<view class="vsllt1">昵称</view>
				<view class="flex1 hui"><input type="text" v-model="workerJson.nickName" /></view>
				<view class="djrisj"><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				<view class="vsllt1">性别</view>
				<view class="flex1 hui">
					<radio-group>
						<radio :checked="gender==1" @tap="gender=1">男</radio>
						<radio :checked="gender==2" @tap="gender=2">女</radio>
					</radio-group>
					
					
				</view>
				<view class="djrisj"><uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			
			<view class="ciistl">
				<view class="vsllt1">工装头像</view>
				<view class="flex1">
					<image :src="workerJson.imgUrl" class="uptxt"></image>
				</view>
				<view class="djrisj"> <text class="red">未认证</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				<view class="vsllt1">资质照片</view>
				<view class="flex1 hui">上传资质照片，加速得职称</view>
				<view class="djrisj"><text class="text"></text><text class="red">（0/4）</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>

		</view>


		<view class="jiscard">

			<view class="ciistl">
				<view class="vsllt1">职称</view>
				<view class="flex1 hui">{{workerJson.workerTitle}}</view>
				<!-- <view class="djrisj"><text class="hui">这些商家正在招人</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view> -->
			</view>

			<view class="ciistl">

				<view class="vsllt1">手机</view>
				<view class="flex1 ">{{workerJson.phone}}</view>
				<!-- <view class="djrisj"><text class="hui">这些商家正在招人</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view> -->
			</view>

			<!-- <view class="ciistl">
				<view class="vsllt1">职业技能</view>
				<view class="flex1 hui shenglue">上传资质照片，加速得职称上传资质照片，加速得职称</view>
				<view class="djrisj"><text class="text"></text><text class="red">未认证</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view> -->

			<view class="ciistl">
				<view class="vsllt1">个人简介</view>
				<view class="flex1 hui shenglue"></view>
				<view class="djrisj">
					<textarea v-model="workerJson.introduce"></textarea>
					<uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				workerJson:{
					gender:1,
					userName:'',
					nickName:'',
					phone:'',
					imgUrl:'/static/images/uptxt.png',
					introduce:'',
					workerTitle:'个人信息尚未审核，无法获得职称'
				}
			}
		},
		onLoad() {
			this.workerJson.phone = this.$worker.phone;
			
		},
		methods: {
			
		}
	};
</script>

<style>

</style>
