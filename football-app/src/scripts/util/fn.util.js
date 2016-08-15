var _fnUtil = {
  dataFormat: function(data) {
    /*var newData = [];
    for (var i = 0; i < Math.ceil(data.length / 2); i++) {
      newData[i] = [];
      newData[i].push(data[i * 2]);
      newData[i].push(data[i * 2 + 1]);
    }*/
    return data;
  },

  /*setActive: function (el) {
    $(el).addClass('active').siblings().removeClass('active');
  },

  showSidebar: function () {
    var el = document.body;
    SPA.show('menu', {
      ani: {
        name: 'popup',
        width: 180,
        autoDirection: false,
        height: $(el).height(),
        duration: 100,
        autoHide: true,
        autoDirection: false,
        direction: 'left'
      }
    }, el);
  },*/

  pullToRefresh: function(opt) {
    var that = this;
    var myScroll = opt.objScroll || {};
    var ptrHeight = opt.ptrHeight || 35;
    var loaderImg = opt.loaderImg || '/football-app/img/ajax-loader.gif';
    var arrowImg = opt.arrowImg || '/football-app/img/arrow.png';
    var head = opt.head || $('.head img');
    var foot = opt.foot || $('.foot img');
    var view = opt.view || {};

    myScroll.scrollBy(0, -ptrHeight);

    var topImgHasClass = head .hasClass('up');
    var bottomImgHasClass = head.hasClass('down');
    var y = 0,
        maxY = 0;
    //判断上拉下拉
    /*myScroll.on('scroll', function() {
          y = this.y,
          maxY = this.maxScrollY - y;
          //console.log(maxY)
        if (y >= 0) {
          !topImgHasClass && head.addClass('up');
          return '';
        }
        if (maxY >= 0) {
          !bottomImgHasClass && foot.addClass('down');
          return '';
        }
    });*/
    myScroll.on("scroll",function(){
        y=this.y,
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
    //滚动结束渲染数据
    myScroll.on('scrollEnd', function() {
      //ajax下拉刷新数据
        if (y >= -ptrHeight && y < 0 ) {
          myScroll.scrollTo(0, -ptrHeight);
          head.removeClass('up');

        } else if (y >= 0) {
          //console.log(this.y)
          head.attr('src', loaderImg);
        $.ajax({
          url: '/football-app/mock/livelist.json',
          success: function(res) {
            if (res.ret) {
              view.getVM().livedata = that.dataFormat(res.data);

              myScroll.refresh();
              myScroll.scrollTo(0, -ptrHeight);
              head.removeClass('up');
              head.attr('src', arrowImg);
            } else {
              console.log('数据有误，请稍后重试。');
            }
          },
          error: function() {
            console.log('服务器发生错误，请稍后重试。')
          }
        });
      }

      var maxY = this.maxScrollY - this.y;
      var self = this;
      //ajax上拉加载数据
      if (maxY > -ptrHeight && maxY < 0) {
        
        myScroll.scrollTo(0, self.maxScrollY + ptrHeight);
        foot.removeClass('down');
        
      } else if (maxY >= 0) {
        //console.log(this.y)
        foot.attr('src', loaderImg);
        $.ajax({
          url: '/football-app/mock/beautylist.json',
          success: function(res) {
            if (res.ret) {

              /*view.getVM().plainLivelist.pushArray(res.data);
              view.getVM().livedata = that.dataFormat(view.vm.plainLivelist);*/
              view.plainLivelist=view.plainLivelist.concat(res.data);
              view.getVM().livedata = that.dataFormat(view.plainLivelist);
              /*view.getVM().livedata = that.dataFormat(res.data);*/
              myScroll.refresh();
              myScroll.scrollTo(0, self.y + ptrHeight);
              foot.removeClass('down');
              foot.attr('src', arrowImg);
            } else {
              console.log('数据有误，请稍后重试。');
            }
          },
          error: function() {
            console.log('服务器发生错误，请稍后重试。')
          }
        });
      }
    });
  }
}

module.exports = _fnUtil;
