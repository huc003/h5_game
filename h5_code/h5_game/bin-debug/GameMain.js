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
 * 游戏主界面
 */
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        return _super.call(this) || this;
    }
    GameMain.prototype.init = function () {
        var main = new egret.Sprite();
        main.width = this.stage.width;
        main.height = this.stage.height;
        main.name = 'main_sprite';
        main.graphics.beginFill(0xffffff);
        main.graphics.drawRect(0, 0, main.width, main.height);
        main.graphics.endFill();
        this.addChild(main);
        var back = new eui.Button();
        back.label = '游戏结束返回';
        back.width = 200;
        back.height = 50;
        main.addChild(back);
        back.x = (this.stage.width - back.width) / 2;
        back.y = (this.stage.height - back.height) / 2 - 200;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameOver, this);
    };
    /**
     * 游戏结束
     */
    GameMain.prototype.gameOver = function (e) {
        this.removeChild(this.getChildByName("main_sprite"));
    };
    return GameMain;
}(egret.Sprite));
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=GameMain.js.map