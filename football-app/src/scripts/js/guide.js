// 引入模板
var guideTpl=require("../templates/guide.string");

// 定义视图
SPA.defineView("guide",{
	// 定义HTML
	html:guideTpl,
	// 引入delegated插件，用于定义tap事件
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			var mySwiper=new Swiper('.swiper-container');
		}
	},
	bindActions:{
		"go.home":function(e){
			console.log(1);
			SPA.open("index");
		}
	}
})