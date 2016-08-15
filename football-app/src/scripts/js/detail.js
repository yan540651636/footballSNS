var detailTql=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTql,
	plugins:["delegated",
	{
		name:"avalon",
		options: function(vm) {
    	  	vm.showLoading = true;
    	}
	}],
	bindEvents:{
		show:function()
		{
			var vm=this.getVM();

			setTimeout(function()
			{
				vm.showLoading = false;
			},1000)

		}
	},
	bindActions:{
		"goto.index":function()
		{
			SPA.show("index");
		}
	}
});