/**
 * 食物类
 */
class Food extends egret.Sprite {
	public constructor(x:number,y:number,r:number){
        super();
        this.init(x,y,r);
		
    }

    private static colorList:number[] = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400];
	private food:egret.Shape;
    public color:number;
    /**
     * 获取随机的颜色
     */
    private rendomColor():number{
        // return Main.colorList[Math.round(Math.random() * Main.colorList.length)];
        return parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
    }

    /**
     * 绘制食物
     */
    private init(x:number,y:number,r:number):void{
        //获取随机颜色
        this.color = this.rendomColor();

        //初始化一个显示对象容器
        this.food = new egret.Shape();
        this.food.graphics.beginFill(this.color);
        this.food.graphics.drawCircle(0,0,r);
        this.food.graphics.endFill();

        //设置食物在容器中的位置
        this.food.x = r;
        this.food.y = r;

        //食物在空间中的位置
        this.x = x;
        this.y = y;
        //将食物显示对象添加到文档类中
        this.addChild(this.food);
    }

    /**
     * 食物被吃掉后
     */
    public onEat():void{
        this.parent.removeChild(this);
    }

}