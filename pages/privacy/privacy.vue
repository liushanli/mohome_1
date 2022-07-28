<template>
	<view style="padding: 0.5rem 1rem;">
		<view style="font-weight: bold;text-align: center;">摩之家客户端隐私政策</view>
		<view style="font-weight: bold;text-align: right;">2021年7月29日更新</view>
		<view style="font-weight: bold;text-align: right;">2021年8月1日生效</view>
		<view>本协议适用于摩之家软件，在以下内容中简称“本应用”。
		本应用尊重并保护所有使用服务用户的个人隐私权。为了
		给您提供更准确、更有个性化的服务，本应用会按照本隐私权
		政策的规定使用和披露您的个人信息。但本应用将以高度的勤
		勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在
		未征得您事先许可的情况下，本应用不会将这些信息对外披露
		或向第三方提供。本应用会不时更新本隐私权政策。您在同意
		本应用服务使用协议之时，即视为您已经同意本隐私权政策全
		部内容。本隐私权政策属于本应用服务使用协议不可分割的一
		部分。</view>
		<view style="font-weight: bold;">1.适用范围</view>
		<view>(a) 在您注册本应用帐号时，您根据本应用要求提供的个人
		注册信息；</view>
		<view>(b) 在您使用本应用网络服务，或访问本应用平台网页时，
		本应用自动接收并记录的您的浏览器和计算机上的信息，包括
		但不限于您的IP地址、浏览器的类型、使用的语言、访问日期
		和时间、软硬件特征信息及您需求的网页记录等数据；</view>
		<view>(c) 本应用通过合法途径从商业伙伴处取得的用户个人数
		据。</view>
		<view style="font-weight: bold;">您了解并同意，以下信息不适用本隐私权政策：</view>
		<view>(a) 您在使用本应用平台提供的搜索服务时输入的关键字信
		息；</view>
		<view>(b) 本应用收集到的您在本应用发布的有关信息数据，包括
		但不限于参与活动、成交信息及评价详情；</view>
		<view>(c )违反法律规定或违反本应用规则行为及本应用已对您采
		取的措施。</view>
		<view style="font-weight: bold;">2.信息使用</view>
		<view>(a ) 本应用不会向任何无关第三方提供、出售、出租、分享
		或交易您的个人信息，除非事先得到您的许可，或该第三方和
		本应用（含本应用关联公司）单独或共同为您提供服务，且在
		该服务结束后，其将被禁止访问包括其以前能够访问的所有这
		些资料。</view>
		<view>(b) 本应用亦不允许任何第三方以任何手段收集、编辑、出
		售或者无偿传播您的个人信息。任何本应用平台用户如从事上
		述活动，一经发现，本应用有权立即终止与该用户的服务协
		议。</view>
		<view>(c )为服务用户的目的，本应用可能通过使用您的个人信
		息，向您提供您感兴趣的信息，包括但不限于向您发出产品和
		服务信息，或者与本应用合作伙伴共享信息以便他们向您发送
		有关其产品和服务的信息（后者需要您的事先同意）。</view>
		<view style="font-weight: bold;">3.信息披露</view>
		<view>在如下情况下，本应用将依据您的个人意愿或法律的规定
		全部或部分的披露您的个人信息：</view>
		<view>(a )经您事先同意，向第三方披露；</view>
		<view>(b ) 为提供您所要求的产品和服务，而必须和第三方分享您
		的个人信息；</view>
		<view>(c ) 根据法律的有关规定，或者行政或司法机构的要求，向
		第三方或者行政、司法机构披露；</view>
		<view>(d) 如您出现违反中国有关法律、法规或者本应用服务协议
		或相关规则的情况，需要向第三方披露；</view>
		<view>(e)如您是适格的知识产权投诉人并已提起投诉，应被投诉
		人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</view>
		<view>(f)在本应用平台上创建的某一交易中，如交易任何一方履
		行或部分履行了交易义务并提出信息披露请求的，本应用有权
		决定向该用户提供其交易对方的联络方式等必要信息，以促成
		交易的完成或纠纷的解决。</view>
		<view>(g)其它本应用根据法律、法规或者网站政策认为合适的披
		露。</view>
		<view>设备权限调用</view>
		<view>为确保相关业务功能的正常实现，我们需要根据具体的使用场景调用对应的必要权限，
		并在调用前向您弹窗询问，具体的权限调用说明请见下表</view>
		<view>摩之家权限列表</view>
		<view style="font-weight: bold;">1、IOS 系统权限调用说明</view>
			<t-table>
				<t-tr>
					<t-th style="font-size: 0.6rem">设备权限</t-th>
					<t-th style="font-size: 0.6rem">使用目的</t-th>
					<t-th style="font-size: 0.6rem">是否询问</t-th>
					<t-th style="font-size: 0.6rem">是否可关闭</t-th>
				</t-tr>
				<t-tr v-for="item in tableList_ios" :key="item.id">
					<t-td style="font-size: 0.6rem">{{ item.id }}</t-td>
					<t-td style="font-size: 0.6rem">{{ item.name }}</t-td>
					<t-td style="font-size: 0.6rem">{{ item.age }}</t-td>
					<t-td style="font-size: 0.6rem">{{ item.hobby }}</t-td>
				</t-tr>
			</t-table>
			<view style="font-weight: bold;">2、Android系统权限调用说明</view>
			<t-table>
				<t-tr>
					<t-th style="font-size: 0.6rem">设备权限</t-th>
					<t-th style="font-size: 0.6rem">使用目的</t-th>
					<t-th style="font-size: 0.6rem">是否询问</t-th>
					<t-th style="font-size: 0.6rem">是否可关闭</t-th>
				</t-tr>
				<t-tr v-for="item in tableList_android" :key="item.id">
					<t-td style="font-size: 0.6rem">{{ item.id }}</t-td>
					<t-td style="font-size: 0.6rem">{{ item.name }}</t-td>
					<t-td style="font-size: 0.6rem">{{ item.age }}</t-td>
					<t-td style="font-size: 0.6rem">{{ item.hobby }}</t-td>
				</t-tr>
			</t-table>
		<view style="font-weight: bold;">4. 信息存储和交换</view>
		<view>本应用收集的有关您的信息和资料将保存在本应用及
		(或）其关联公司的服务器上，这些信息和资料可能传送至您
		所在国家、地区或本应用收集信息和资料所在地的境外并在境
		外被访问、存储和展示。</view>
		<view>5. Cookie的使用</view>
		<view>(a) 在您未拒绝接受cookies的情况下，本应用会在您的计算
		机上设定或取用cookies ,以便您能登录或使用依赖于cookies
		的本应用平台服务或功能。本应用使用cookies可为您提供更加
		周到的个性化服务，包括推广服务。</view>
		<view>(b) 您有权选择接受或拒绝接受cookies。您可以通过修改浏
		览器设置的方式拒绝接受cookies。但如果您选择拒绝接受
		cookies,则您可能无法登录或使用依赖于cookies的本应用网络
		服务或功能。</view>
		<view>(c) 通过本应用所设cookies所取得的有关信息，将适用本政
		策。</view>
		<view>我们会通过应用程序接口（ API ）、软件工具开发包( SDK ) 与第三方进行必要的数据共享,不同版本的第三方 SDK 会有所不同，一般包括第三方账号登录类、第三方支付类、地图导航类等，我们会对第三方进行严格的安全检测并约定数据保护措施，以保障数据安全。您可以查看以下第三方的数据使用和保护规则。</view>
		<t-table>
			<t-tr>
				<t-th style="font-size: 0.6rem">SDK名称</t-th>
				<t-th style="font-size: 0.6rem">SDK用途</t-th>
				<t-th style="font-size: 0.6rem">SDK收集的个人信息类型</t-th>
				<t-th style="font-size: 0.6rem">官网链接</t-th>
			</t-tr>
			<t-tr v-for="item in tableList_cookie" :key="item.id">
				<t-td style="font-size: 0.6rem;width: 25%;">{{ item.id }}</t-td>
				<t-td style="font-size: 0.6rem;width: 25%;">{{ item.name }}</t-td>
				<t-td style="font-size: 0.6rem;width: 25%;">{{ item.age }}</t-td>
				<t-td style="font-size: 0.6rem;width: 25%;color: #007AFF;"><span @tap="jumUrl" :data-value="item.hobby">点击链接</span></t-td>
			</t-tr>
		</t-table>
		<view>6. 信息安全</view>
		<view>(a) 本应用帐号均有安全保护功能，请妥善保管您的用户名
		及密码信息。本应用将通过对用户密码进行加密等安全措施确
		保您的信息不丟失，不被滥用和变造。尽管有前述安全措施，
		但同时也请您注意在信息网络上不存在“完善的安全措施”。</view>
		<view>(b) 在使用本应用网络服务进行网上交易时，您不可避免的
		要向交易对方或潜在的交易对</view>
		<view style="font-weight: bold;">7.本隐私政策的更改</view>
		<view>(a) 如果决定更改隐私政策，我们会在本政策中、本公司网
		站中以及我们认为适当的位置发布这些更改，以便您了解我们
		如何收集、使用您的个人信息，哪些人可以访问这些信息，以
		及在什么情况下我们会透露这些信息。</view>
		<view>(b) 本公司保留随时修改本政策的权利，因此请经常查看。
		如对本政策作出重大更改，本公司会通过网站通知的形式告
		知。</view>
		<view>方披露自己的个人信息，如联络方式或者邮政地址。请您
		妥善保护自己的个人信息，仅在必要的情形下向他人提供。如
		您发现自己的个人信息泄密，尤其是本应用用户名及密码发生
		泄露，请您立即联络本应用客服，以便本应用采取相应措施。</view>
		<view style="font-weight: bold;">8、如何联系我们</view>
		<view>
			<view>如果您对于本隐私政策或在使用我们服务时对于您的个人信息或隐私情况有任何问题，请联系我们的客服（联系电话：400-079-9688）并作充分描述，一般情况下，我们会第一时间联系您处理并不晚于十五天内回复，谢谢您的支持与配合
			摩之家平台产品运营者信息：</view>
			<view style="font-weight: bold;">产品名称：摩之家</view>
			<view style="font-weight: bold;">公司名称：上海澔元健康管理有限公司</view>
			<view style="font-weight: bold;">注册地址：上海市松江区佘山镇陶干路701号5幢</view>
			<view style="font-weight: bold;">客服电话：400-079-9688</view>
		</view>
		
		
	</view>
	
</template>
<style>
	view{
		font-size: 0.7rem;
	}
</style>
<script>
		import tTable from '@/components/t-table/t-table.vue'
		import tTh from '@/components/t-table/t-th.vue';
		import tTr from '@/components/t-table/t-tr.vue';
		import tTd from '@/components/t-table/t-td.vue';
		export default {
			components: {
				tTable,
				tTh,
				tTr,
				tTd
			},
			data() {
				return {
					tableList_ios: [{
							id: '位置',
							name: '用于向用户推荐所在城市及周边可为您提供按摩保健服务的商家和技师',
							age: '首次打开客户端时询问',
							hobby: '是'
						},
						{
							id: 'IDFA（IOS14及以上）',
							name: '用于保障用户的账号，交易安全及接受个性化广告',
							age: '首次打开客户端时弹窗询问',
							hobby: '是'
						},
						{
							id: '相机',
							name: '用于扫码、拍照、上传照片',
							age: '用户主动拍照、扫码、上传图片时询问',
							hobby: '是'
						},
						{
							id: '麦克风',
							name: '用于识别您的需求，以及对于特定主体上传语音介绍.',
							age: '用户主动录音时询问',
							hobby: '是'
						},
						{
							id: '照片',
							name: '用于写入和读取用户相册信息',
							age: '用户主动上传前询问',
							hobby: '是'
						},
						{
							id: '日历',
							name: '用于向用户提供预定日程记录和提醒服务',
							age: '用户将行程添加至日历提醒前询问',
							hobby: '是'
						}
					],
					tableList_android: [{
							id: '位置',
							name: '用于向用户推荐所在城市及周边可为您提供按摩保健服务的商家和技师',
							age: '首次打开客户端时询问',
							hobby: '是'
						},
						{
							id: 'IDFA（IOS14及以上）',
							name: '用于保障用户的账号，交易安全及接受个性化广告',
							age: '首次打开客户端时弹窗询问',
							hobby: '是'
						},
						{
							id: '相机',
							name: '用于扫码、拍照、上传照片',
							age: '用户主动拍照、扫码、上传图片时询问',
							hobby: '是'
						},
						{
							id: '麦克风',
							name: '用于识别您的需求，以及对于特定主体上传语音介绍.',
							age: '用户主动录音时询问',
							hobby: '是'
						},
						{
							id: '照片',
							name: '用于写入和读取用户相册信息',
							age: '用户主动上传前询问',
							hobby: '是'
						},
						{
							id: '日历',
							name: '用于向用户提供预定日程记录和提醒服务',
							age: '用户将行程添加至日历提醒前询问',
							hobby: '是'
						}
					],
					tableList_cookie: [{
							id: '高德地图SDK',
							name: '	提供配送地理位置信息服务',
							age: '个人常用设备信息、个人位置信息',
							hobby: 'https://lbs.amap.com/pages/privacy/'
						},
						{
							id: '微信登陆和支付',
							name: '提供用户登陆、支付服务',
							age: '个人常用设备信息',
							hobby: 'https://www.tencent.com/zh-cn/privacy-policy.html'
						},
						{
							id: '支付宝支付',
							name: '提供支付宝支付服务',
							age: '个人常用设备信息',
							hobby: 'https://renderalipay.com/p/c/k2h4n8ug'
						},
						{
							id: '阿里云一键登陆',
							name: '提供手机号码验证码一键登陆服务',
							age: '个人常用设备信息',
							hobby: 'https://www.aliyun.com/activity/new?utm_content=se_1009243114'
						}
					]
				};
			},
			methods: {
				jumUrl(e){
					let url_1 = e.currentTarget.dataset.value;
					console.log(url_1);
					uni.navigateTo({
						url:'../privacy_url/privacy_url?url='+url_1
					})
				},
				change(e) {
					console.log(e.detail);
				},
				edit(item) {
					uni.showToast({
						title: item.name,
						icon: 'none'
					});
				}
			}
		}
	
</script>