<template>
	<view class="my_jishi">
		<view class="ov">
			<uni-status-bar  />
		</view>
		<view class="myHeader">
			<button class="lingdan"><uni-icons type="gear"></uni-icons></button>
			<button class="lingdan lingdan1"><uni-icons color="red" type="info-filled"></uni-icons>暂停</button>
			<view class="mytxbx">
				<view class="mytxL"><image src="/static/images/tx.png"></image></view>
				<view class="mytxR">
					<view class="mytxR2"><uni-tag  text="未获得称号"  inverted="true" size="small" type="error"></uni-tag></view>
					<view class="mytxR3">暂未加入快去<text class="text">商家广场</text>看看吧~</view>

				</view>
				<uni-icons type="arrowright" size="18" color="#666"></uni-icons>
			</view>
		</view>



		<view class="myItems">

			<view class="myitetb">
				<view :class="{'orderItem':true}">

					<view class="ordetxt">0</view>
					<view class="ordetxt">关注</view>
				</view>
				<view :class="{'orderItem':true}">

					<view class="ordetxt">0</view>
					<view class="ordetxt">成功接单</view>
				</view>
				<view :class="{'orderItem':true}">

					<view class="ordetxt">--</view>
					<view class="ordetxt">退款率</view>
				</view>
				<view :class="{'orderItem':true}">

					<view class="ordetxt">100%</view>
					<view class="ordetxt">好评率</view>
				</view>
			</view>
		</view>


		<view class="jishban">
			<image src="/static/images/jishiban.png"></image>
		</view>


		<view class="jiscard">
			<view class="ciistl">
				新手上路
			</view>
			<view class="cjiscts">
				<view class="ssjiils">
					<view class="cslimts">
						<view class="cslimtsL">
							<view class="cslimtsL1">信息认证</view>
							<view class="cslimtsL2">信息认证信息认证信息认证信息认证</view>
						</view>
						<view class="cslimtsR"><uni-tag type="primary" size="small" text="去完成"></uni-tag></view>
					</view>
					<view class="cslimts">
						<view class="cslimtsL">
							<view class="cslimtsL1">信息认证</view>
							<view class="cslimtsL2">信息认证信息认证信息认证信息认证</view>
						</view>
						<view class="cslimtsR"><uni-tag type="primary" size="small" text="去完成"></uni-tag></view>
					</view>
					<view class="cslimts">
						<view class="cslimtsL">
							<view class="cslimtsL1">信息认证</view>
							<view class="cslimtsL2">信息认证信息认证信息认证信息认证</view>
						</view>
						<view class="cslimtsR"><uni-tag type="primary" size="small" text="去完成"></uni-tag></view>
					</view>

				</view>
			</view>
		</view>



		<view class="jiscard">
			<view class="ciistl">
				加入商家
				<view class="flex1"></view>
				<view class="djrisj"><text class="red">暂未加入</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				商家广场
				<view class="flex1"></view>
				<view class="djrisj"><text class="hui">这些商家正在招人</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
		</view>

		<view class="jiscard">
			<view class="ciistl">
				个人信息
				<view class="flex1"></view>
				<view class="djrisj"><text class="red"></text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				服务项目
				<view class="flex1"></view>
				<view class="djrisj"><text class="">待设置</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>

			<view class="ciistl">
				服务时间
				<view class="flex1"></view>
				<view class="djrisj"><text class="">00:00 - 00:00 (7天/每周)</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>

			<view class="ciistl">
				服务区域
				<view class="flex1"></view>
				<view class="djrisj"><text class="red">待设置</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>

			<view class="ciistl">
				用户评价
				<view class="flex1"></view>
				<view class="djrisj"><text class="red"></text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				收入统计
				<view class="flex1"></view>
				<view class="djrisj"><text class="red"></text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				我的钱包
				<view class="flex1"></view>
				<view class="djrisj"><text class="red"></text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>
			<view class="ciistl">
				关于上单
				<view class="flex1"></view>
				<view class="djrisj"><text class="">版本1.0.1</text> <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
			</view>


		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	};
</script>

<style>

</style>
