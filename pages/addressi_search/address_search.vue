<template>
	<view class="jishi">
		<view class="searchBar">
		  <image src="/static/images/search.png" class="searchIcon"></image>
		  <input type="text" placeholder="请输入城市的名称" class="searchInput" focus @input="onInput" />
		</view>

		<view class="jishiList">
			<view disable = "disable" class="jsItem" v-for="(province,provinceIndex) in provicneList" :key="provinceIndex" @tap="back" :data-value="provinceIndex">
				<view class="jsItemL"  >{{province.name}}</view>
			</view>
		</view>
	</view>
</template>


<script>
  export default {
    data() {
      return {
		userName:'',
		provicneList:''
      }
    },
    onLoad() {
			this.gotoPre();
    },
	onBackPress(options){
	},
    methods: {
		//click事件函数
		async gotoPre(){
			const res = await this.$myRequest({
				url: this.$baseUrl+"/user/findCityInfo",
				method: "POST",
				data:{
					pname:this.userName
				}
			});
			this.provicneList = res.data.cityAreas;
		},
		onInput(e) {
			this.userName = e.detail.value;
			this.gotoPre();
			
		},
		back(e){
			let cur = e.currentTarget.dataset.value;
			uni.setStorageSync("province",this.provicneList[cur]);
			uni.navigateBack({//返回
				delta: 1
			})
		}
    }
  };
</script>

<style>

	.jsitm3{
		overflow: hidden;
		-webkit-line-clamp:2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		height: 1.7rem;
	}
	image{
		margin-top:1rem;
	}

</style>
