var indexTql=require("../templates/index.string");

SPA.defineView("index",{
	html:indexTql,
	plugins:["delegated"],
	// 定义子视图  主页
	modules:[{
		name:"content",
		defaultTag:"home",
		views:["home","find","my"],
		container:".m-content"
	}],	
	// 绑定视图事件
	bindEvents:{
		show:function()
		{

		}
	},
	// 绑定元素事件
	bindActions:{
		"switch.tabs":function(e,data)
		{
			// 当前高亮显示
			$(e.el).find('.icon').addClass('active').parent().siblings().find('.icon').removeClass('active');
			// 切换子视图
			this.modules.content.launch(data.tag)
		},
		"switch.home":function()
		{
			SPA.show("login",{
				ani: {
         		  name: 'dialog',
         		  width: 260,
         		  height: 150,
         		  autoHide: true
         		},
         		param: {
         		  view: this
         		}
			});
		}
	}

});





