var myTql=require("../templates/my.string");

SPA.defineView("my",{
	html:myTql,
	bindEvents:{
		show:function()
		{
			var liveScroll=this.widgets["liveScroll"];
			liveScroll.options.scrollX=true;
			liveScroll.options.scrollY=false;
		}
	}
});