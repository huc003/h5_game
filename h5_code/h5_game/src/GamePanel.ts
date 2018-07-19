// class GamePanel  extends egret.gui.SkinnableComponent{

//     public constructor(){
//         super();
//         this.skinName = skins.mySkin.GamePanelSkin;
//     }

//     //垂直滑条
//     public vslider:egret.gui.VSlider;
//     //水平滑条
//     public hslider:egret.gui.HSlider;
//     //图片
//     public asset:egret.gui.UIAsset;
//     //显示数据
//     public label:egret.gui.Label;

//     partAdded(name:string,instance:any):void{
//         super.partAdded(name,instance);
//         if(instance == this.vslider){
//             this.vslider.addEventListener(egret.Event.CHANGE,this.changeHandler,this);
//             this.vslider.minimum = 0;
//             this.vslider.maximum = 360;
//         }else if(instance == this.hslider){
//             this.hslider.addEventListener(egret.Event.CHANGE,this.changeHandler,this);
//             this.hslider.minimum = 0;
//             this.hslider.maximum = 360;
//         }else if(instance == this.asset){
//             this.asset.anchorX = 0.5;
//             this.asset.anchorY = 0.5;
//             this.asset.source = RES.getRes("mantou_sheet.mantou_003_png"); //图片素材
//         }
//     }

//     private changeHandler(event:egret.Event):void{
//         if(event.currentTarget == this.vslider){
//             this.asset.skewY = this.vslider.value;
//         }else if(event.currentTarget == this.hslider){
//             this.asset.skewX = this.hslider.value;
//         }
//         this.label.text = "skewY：" + this.asset.skewY + "\n" + "skewX：" + this.asset.skewX;
//     }
// }