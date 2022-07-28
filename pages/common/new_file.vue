<template>
	<scroll-view class="scrool-more" scroll-x="true" scroll-with-animation="true">
		<text class="label-name" v-for="(item,index) in listTypecont" 
		:key="index">{{item.name }}</text>		
	</scroll-view>
</template>

<script>
	 export default {
		 data() {
		   return {
			listTypecont:[
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
					{name:"张三"},
			]
		   }
		 },
		 onLoad() {
		 	//服务类型
		 	//this.ProgramType();
		 	//this.ProgramInfo(null);
		 	
		 },methods:{
			 
		 }
	 }
</script>

<style>
	.scrool-more{
		white-space: nowrap;
		/* width: 100%;  
		height: 56rpx;
		display: inline-block; */
	}
	/* .scrool-more{
		white-space: nowrap; 必须要这个属性，否者不能出现横线滚动
		width: 100%;  
		height: 56rpx;
		display: inline-block; 
	}
	
	.label-name{
		width: 140rpx;
		height: 40rpx;
		color: #fff;
		
		padding: 20rpx;
		background: pink;
	} */
</style>
