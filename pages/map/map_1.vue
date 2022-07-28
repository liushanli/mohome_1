<!-- <template>
</template>

<script>
	var packageName = 'com.autonavi.minimap';
					var main = plus.android.runtimeMainActivity();
					var packageManager = main.getPackageManager();
					var PackageManager = plus.android.importClass(packageManager)
					var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
					if (packageInfo) {
						var Uri = plus.android.importClass("android.net.Uri");
						var url = "amapuri://route/plan?sourceApplication=maxuslife" +
							"&sid=A&slat=36.702558&slon=116.876678&sname=起始地点" +
							"&did=B&dlat=36.649415&dlon=117.122497&dname=结束地点&dev=0&t=0";
						var Intent = plus.android.importClass('android.content.Intent');
						var intent = new Intent();
						intent.setAction(Intent.ACTION_VIEW);
						intent.addCategory(Intent.CATEGORY_DEFAULT);
						var uri = Uri.parse(url);
						//将功能Scheme以URI的方式传入data  
						intent.setData(uri);
						intent.setPackage("com.autonavi.minimap");
						var main = plus.android.runtimeMainActivity();
						main.startActivity(intent);
					} else {
						// alert('未安装' + packageName + '')
						uni.showToast({
							title: `目前导航暂只支持${packageName}`
						})
					}

</script>

<style>
</style>
 -->