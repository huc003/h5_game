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
 * 食物类
 */
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(x, y, r) {
        var _this = _super.call(this) || this;
        _this.init(x, y, r);
        return _this;
    }
    /**
     * 获取随机的颜色
     */
    Food.prototype.rendomColor = function () {
        // return Main.colorList[Math.round(Math.random() * Main.colorList.length)];
        return parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
    };
    /**
     * 绘制食物
     */
    Food.prototype.init = function (x, y, r) {
        //获取随机颜色
        this.color = this.rendomColor();
        //初始化一个显示对象容器
        this.food = new egret.Shape();
        this.food.graphics.beginFill(this.color);
        this.food.graphics.drawCircle(0, 0, r);
        this.food.graphics.endFill();
        //设置食物在容器中的位置
        this.food.x = r;
        this.food.y = r;
        //食物在空间中的位置
        this.x = x;
        this.y = y;
        //将食物显示对象添加到文档类中
        this.addChild(this.food);
    };
    /**
     * 食物被吃掉后
     */
    Food.prototype.onEat = function () {
        this.parent.removeChild(this);
    };
    Food.colorList = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400];
    return Food;
}(egret.Sprite));
__reflect(Food.prototype, "Food");
//# sourceMappingURL=Food.js.map