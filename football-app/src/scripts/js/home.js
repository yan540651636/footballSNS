var homeTql=require("../templates/home.string");
var fnUtil = require('../util/fn.util.js');

SPA.defineView("home",{
	html:homeTql,
	plugins:["delegated",
			{
				name:"avalon",
				options: function(vm) {
    			  	vm.livedata = [];
    		    }
			}],
	init:{
    plainLivelist:[],
    livelistArr:[],
		homeSlider:null,
		tabSlider:null,
    self:null,
		formatData:function(data){
          /*var tempArr = [];
          for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
              tempArr[i] = [];
              tempArr[i].push(data[2*i]);
              tempArr[i].push(data[2*i+1]);
          }*/
          return data;
       }		
	},
	bindEvents:{
		beforeShow:function()
		{
		   // 获取视图
		   self = this;
		   // 获取vm
		   var vm=self.getVM();
		  //console.log(self)
           $.ajax({
           	   url:"/football-app/mock/livelist.json",
           	   // url:"/api/livelist.php",
               data:{
               	   rtype:"refresh"
               },
               success:function(rs){
                  // 将JSON数据挂接到vm上
                 vm.livedata = self.formatData(rs.data);
                 //console.log(vm);
               },
               error:function(){
               	   console.log("请求失败");
               }
           })
/*-------------------方法一-----------------------------*/
      // 下拉刷新--上拉加载
      var myScroll = this.widgets.homeListScroll;

      var scrollSize = 30;
       console.log(this.widgets.homeListScroll)

      //myScroll.scrollBy(0,-scrollSize);

      var head=$(".head img"),
          topImgHasClass=head.hasClass("up");
      var foot=$(".foot img"),
          bottomImgHasClass=head.hasClass("down");

      /*myScroll.on("scroll",function(){
        var y=this.y,
            maxY=this.maxScrollY-y;
            if(y>=0){
                 !topImgHasClass && head.addClass("up");
                 return "";
            }
            if(maxY>=0){
                 !bottomImgHasClass && foot.addClass("down");
                 return "";
            }
      })

      myScroll.on("scrollEnd",function(){
        if(this.y>=-scrollSize && this.y<0){
              myScroll.scrollTo(0,-scrollSize);
              head.removeClass("up");
        }else if(this.y>=0){
              head.attr("src","/football-app/img/ajax-loader.gif");
            
            setTimeout(function(){
                  myScroll.scrollTo(0,-scrollSize);
                  head.removeClass("up");
                  head.attr("src","/football-app/img/arrow.png");
            },1000)
        }

        var maxY=this.maxScrollY-this.y;
        var self=this;
        if(maxY>-scrollSize && maxY<0){
              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
              foot.removeClass("down")
              console.log("refresh");
        }else if(maxY>=0){
            foot.attr("src","/football-app/img/ajax-loader.gif")
              // 请求加载数据
              $.ajax({
                  url:"/football-app/mock/livelist.json",  mock数据
                  //url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                     rtype:"more"
                  },
                  success:function(rs){
                     self.livelistArr = self.livelistArr.concat(rs.data);
                     self.vm.livedata = self.formatData(self.livelistArr);   
                     //console.log(that.vm.livedata);

                     myScroll.refresh();
                     myScroll.scrollTo(0,self.y+30);
                     foot.removeClass("down");
                     foot.attr("src","/football-app/img/arrow.png")
                  }
              })
        }
      })*/
/*--------------------方法二------------------------*/
           // 上拉下拉
     		var liveScroll = new IScroll('#liveScroll', {
     		  		probeType: 3,
     		  		mouseWheel: true
     		});

     		fnUtil.pullToRefresh({
     		  	objScroll: liveScroll,
     		  	ptrHeight: 0,
     		  	loaderImg: '/football-app/img/ajax-loader.gif',
     		  	arrowImg: '/football-app/img/arrow.png',
     		  	head: $('.head img'),
     		  	foot: $('.foot img'),
     		  	view: self
     		});
/*-------------------------------------------------------*/
		},
		show:function()
		{		
			this.homeSlider=new Swiper('#home-container',{
                loop:false,
                onSlideChangeStart:function(swiper){
                    var index = swiper.activeIndex;
                    var $tags = $("nav li");
                    $tags.eq(index).addClass('choose').siblings().removeClass('choose');
                }
			}),
			this.tabSlider=new Swiper('#home-tabs',{
                loop:false,
                onSlideChangeStart:function(swiper){
                    var index = swiper.activeIndex;
                    var $tags = $(".tab li");
                    $tags.eq(index).addClass('on').siblings().removeClass('on');
                }
			});
				
		}
	},	
	bindActions:{

		"switch.homehot":function(e,data)
		{			
			var index=$(e.el).index();
			// 当前高亮显示
			$(e.el).addClass('choose').siblings().removeClass('choose');
			this.homeSlider.slideTo(index);
			// 切换子视图
			//this.modules.content.launch(data.tag)
		},

		"switch.tab":function(e,data)
		{			
			var index=$(e.el).index();
			// 当前高亮显示
			$(e.el).addClass('on').siblings().removeClass('on');
			this.tabSlider.slideTo(index);
			// 切换子视图
			//this.modules.content.launch(data.tag)
		},

    "goto.detail":function()
    {
          SPA.show("detail");
    }
	}
});
