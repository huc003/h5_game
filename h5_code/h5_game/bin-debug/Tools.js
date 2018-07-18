var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tools = (function () {
    function Tools() {
    }
    /**
     * 根据资源名称获取资源
     */
    Tools.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
//# sourceMappingURL=Tools.js.map