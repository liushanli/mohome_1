<template>
	<view class="otemcpg">
		<view class="line"></view>
		 <view class="tabBox">
	    	<view :class="{'tbItem':true, 'cur': cur==0}" @click="cur=0">
	    		<text class="text">
	    		11-15</text>
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==1}" @click="cur=1">
	    		<text class="text">
	    		11-16</text>
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==2}" @click="cur=2">
	    		<text class="text">
	    		11-17</text>
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==3}" @click="cur=3">
	    		<text class="text">
	    		11-18</text>
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==4}" @click="cur=4">
	    		<text class="text">
	    		11-19</text>
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==5}" @click="cur=5">
	    		<text class="text">
	    		11-20</text>
	    	</view>


	    </view>
	    <view class="huige">

	    </view>

	    <view class="timshez">
	    	<view class="timsztl1">点击一下时段设置/取消忙时</view>
	    	<view class="timsztl2">及时设置忙时,才能避免拒单;来单必接,订单才能滚滚来</view>
	    	<view class="slsimte">
	    		<view :class="{sshitm:true, cur: item.cur}" v-for="(item,index) in arr" :key="index" @click="setarrCur(index)">
	    			<view class="sshitm1">17:30</view>
	    			<view class="sshitm1">|</view>
	    			<view class="sshitm1">18:30</view>
	    		</view>
	    		<view  :class="{sshitm:true, cur: all}"    @click="all=!all">

            <view class="sshitm1">全部</view>
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
				all: false,
        arr: [
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
          {cur: false,time: ''},
        ]
			}
		},
		methods: {
      setarrCur(index){
        let item = this.arr[index];
        item.cur = !item.cur;
        this.$set(this.arr, index, item)
      }
		}
	}
</script>

<style>

</style>
