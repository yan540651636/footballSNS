QApp.config({
    // 默认的首屏 View
    indexView: 'index',
    // 默认的动画
    defaultAnimate: 'moveEnter',
    // 是否自动初始化视图
    autoInit: true,
    // 是否开启 hash router
    hashRouter: true,
    hashSupport: {
        // 是否默认全部
        all: true,
        // 白名单
        exist: [],
        // 黑名单
        except: [],
        // 是否使用 path 变换（需要服务端支持）
        usePath: false
    },
    // 是否使用 json 形式参数
    jsonParam: false,
    screen: {
        // 是否支持屏幕旋转
        rotate: false,
        // 检测屏幕大小变换
        autoResize: true
    },
    gesture: {
        // 是否开启手势
        open: true,
        // 是否开启手势控制 (在 View 切换时，禁用手势)
        ctrl: true,
        // 长按是否触发 Tap 事件
        longTap: true,
        // 自动控制元素失去焦点
        autoBlur: true
    }
});


QApp.defineView('view', {
    // 模板
    html: '',
    // 给视图根节点添加的样式
    classNames: [
        'class1',
        'class2'
    ],
    // 给视图根节点添加的属性
    attrs: { 'data-some': 'qapp' },
    // 给视图根节点添加的样式
    styles: { 'background-color': 'red' },
    // 给视图实例添加属性和方法
    init: {
        someValue: null,
        doSomething: function () {
        }
    },
    // 插件配置
    plugins: [
        'plugin1',
        {
            name: 'plugin2',
            options: {}
        }
    ],
    // 视图生命周期事件绑定
    bindEvents: {
        'show': function () {
        }
    },
    // 视图创建完成的回调
    ready: function () {
    }
});