<template>
	<view class="jsOrder">
    <uni-nav-bar :fixed="true" :status-bar="true" :border="false" :shadow="false" color="#333333" title="摩之家" background-color="#FFFFFF" right-icon="search"
      @clickLeft="showCity">
      <block slot="left">
         <view class="letx"><image src="/static/images/ddtu.png"></image></view>
      </block>
    </uni-nav-bar>
    <view class="line"></view>
		 <view class="tabBox">
	    	<view :class="{'tbItem':true, 'cur': cur==0}" @click="cur=0">
	    		工单
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==1}" @click="cur=1">
	    		新订单
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==2}" @click="cur=2">
	    		进行中
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==3}" @click="cur=3">
	    		已完成
	    	</view>
	    	<view :class="{'tbItem':true, 'cur': cur==4}" @click="cur=4">
	    		全部
	    	</view>

	    </view>
	    <view class="line"></view>

	    <view class="ddbgx">
	    	<image src="/static/images/ddbgx.png" class="ddbgxbg"></image>
        <view class="ddbgxin">
          <view class="bigTxt"><image src="/static/images/bigtxt.png"></image></view>
          <view class="ciistl">
						<uni-tag type="error" size="small" text="未认证"></uni-tag>
          	<uni-tag type="error" size="small" text="未获得职称"></uni-tag>

						<view class="djrisj"> <uni-icons type="shop" size="16" color="#f11f22"></uni-icons><text class="red">未加入商家</text></view>
					</view>
          <view class="gensina">
          	个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介
          </view>
          <view class="gedetxt">
          	<view class="sditems">分享主页</view>
          	<view class="sditems">今日签到</view>
          	<view class="sditems">编辑资料</view>
          </view>
        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 0
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
