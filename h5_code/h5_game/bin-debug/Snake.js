var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 蛇身类
 */
var Snake = (function (_super) {
    __extends(Snake, _super);
    /**
     * 构造方法，指定蛇头半径，位置颜色
     */
    function Snake(x, y, r, color) {
        var _this = _super.call(this) || this;
        /**
         * 蛇身的全部节点
         */
        _this.bodyList = [];
        _this.speed = 20;
        _this.init(x, y, r, color);
        return _this;
    }
    /**
     * 初始化蛇身
     */
    Snake.prototype.init = function (x, y, r, color) {
        //绘制蛇头，同样是一个实心圆
        this.head = new egret.Shape();
        this.head.graphics.lineStyle(10, 0xff4777);
        this.head.graphics.beginFill(color);
        this.head.graphics.drawCircle(r, r, r);
        this.head.graphics.endFill();
        //设置蛇头的位置
        this.head.x = 0;
        this.head.y = 0;
        this.radius = r;
        //设置蛇身的位置
        this.x = x;
        this.y = y;
        //将蛇头加入到蛇身的list
        this.bodyList.push(this.head);
        //将蛇头加入到蛇身并指定显示索引为最大，保证蛇头永远在蛇身其他节点的上方
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], -999);
    };
    /**
     * 吃掉食物
     */
    Snake.prototype.afterEat = function (color) {
        //新增蛇身的节点
        var node = new egret.Shape();
        node.graphics.beginFill(color);
        node.graphics.drawCircle(this.radius, this.radius, this.radius);
        node.graphics.endFill();
        //指定新增节点的位置在蛇身节点list最后一个节点，也就是蛇尾巴坐标
        node.x = this.bodyList[this.bodyList.length - 1].x + this.radius * 0.6;
        node.y = this.bodyList[this.bodyList.length - 1].y + this.radius * 0.6;
        //将新的节点加入蛇身和蛇身节点list
        this.bodyList.push(node);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        //指定新增节点的显示索引
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], 0);
    };
    /**
     * 蛇移动起来
     */
    Snake.prototype.move = function (e, during) {
        //利用用户点击事件获取坐标
        var mx = e.stageX;
        var my = e.stageY;
        //动画缓动类
        var tween;
        for (var i = this.bodyList.length - 1; i >= 1; i--) {
            tween = egret.Tween.get(this.bodyList[i]);
            tween.to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, during);
        }
        //蛇身的首个节点就是蛇头
        var hx = this.x + this.bodyList[0].x;
        var hy = this.y + this.bodyList[0].y;
        //设置当前缓动对象为蛇头
        tween = egret.Tween.get(this.bodyList[0]);
        var tmpx, tmpy;
        if (hx == mx && hy == my) {
            //位置相同
            return;
        }
        if (hx != mx) {
            //非垂直
            //斜切
            var mk = (my - hy) / (mx - hx);
            var mangle = Math.atan(mk);
            if (mx < hx) {
                //左边
                tmpx = this.bodyList[0].x - this.speed * Math.cos(mangle);
                tmpy = this.bodyList[0].y - this.speed * Math.sin(mangle);
                tween.to({ x: tmpx, y: tmpy, during: during });
            }
            else {
                //右边
                tmpx = this.bodyList[0].x + this.speed * Math.cos(mangle);
                tmpy = this.bodyList[0].y + this.speed * Math.sin(mangle);
                tween.to({ x: tmpx, y: tmpy, during: during });
            }
        }
        else {
            //垂直
            if (my < hy) {
                tmpx = this.bodyList[0].x - this.speed;
                tween.to({ x: tmpx, y: tmpy }, during);
            }
            else {
                //竖直向下
                tmpx = this.bodyList[0].x + this.speed;
                tween.to({ x: tmpx, y: tmpy }, during);
            }
        }
    };
    Snake.prototype.getHead = function () {
        return this.bodyList[0];
    };
    return Snake;
}(egret.Sprite));
__reflect(Snake.prototype, "Snake");
//# sourceMappingURL=Snake.js.map