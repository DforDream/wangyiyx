## 项目说明文档
1. 该项目使用gulp自动化构建工具
2. 主要页面包含首页、商品列表页、商品详情页、购物车页面
3. 由于商品详细数据接口没有，暂时只添加了三个商品数据信息
## 制作该项目中的问题：
1. 顶部商品分类导航栏，布局问题导致鼠标移出功能受限，a标签文字和图片的显示位置问题，多一行的数据显示会靠上，布局时使用定位解决a文字的显示问题
2. 轮播图事件间隔问题，定时器设置的事件为3s而轮播的执行过程为1s会造成第一次等待3s后面只会等待2s就会执行轮播(通过animate执行完的回调函数完成)注意清除定时器
3. 商品详细页面与其他页面的关联，商品列表或商品信息外部套a a的指向地址为 "商品详情页?传入商品id" 商品详细页面根据传入的商品id获取对应的商品数据
4. 由于商品数据全是ajax请求而来，所以每个人页面的图片都应该使用图片懒加载模式，具体原理为给 img 标签添加一个自定义属性，属性值为商品的图片地址，判断图片距离顶部的位置是否小于等于页面向上滚动的距离和可视宽口的高度，如果小于则将自定义属性的值赋值给图片的src属性
5. 商品详情页的放大镜效果，前期遇到点小问题，第一要在鼠标移入时获取鼠标距离主图片左侧和上侧的距离，鼠标移动时获取鼠标鼠标的距离可视宽口的距离减去距离主图片左侧或上侧的距离在减去mask遮罩层一般的距离让鼠标永远显示在遮罩层的正中间，注意滚轮事件的判断
6. animate函数每次执行都应该使用stop
## 制作该项目不完善的地方
1. 代码注释没有写，现在反过去添加注释比价麻烦，一定要养成多写注释的习惯
2. 元素节点获取问题，每次都是通过find children siblings等方法获取元素节点，导致代码臃肿，尤其购物车页面的数据计算部分，获取元素的代码可读性很差
## 制作该项目的收获
1. 以上都是收获
