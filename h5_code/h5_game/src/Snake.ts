/**
 * 蛇身类
 */
class Snake extends egret.Sprite{
	
	/**
	 * 构造方法，指定蛇头半径，位置颜色
	 */
	public constructor(x:number,y:number,r:number,color:number) {
		super();
		this.init(x,y,r,color);
	}

	/**
	 * 蛇头 
	 */
	private head:egret.Shape;
	/**
	 * 蛇身的半径
	 */
	private radius;

	/**
	 * 蛇身的全部节点
	 */
	private bodyList:egret.Shape[] = [];

	/**
	 * 初始化蛇身
	 */
	private init(x:number,y:number,r:number,color:number):void{
		//绘制蛇头，同样是一个实心圆
		this.head = new egret.Shape();
		this.head.graphics.lineStyle(10,0xff4777);
		this.head.graphics.beginFill(color);
		this.head.graphics.drawCircle(r,r,r);
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
		this.addChild(this.bodyList[this.bodyList.length-1]);
		this.setChildIndex(this.bodyList[this.bodyList.length-1],-999);
		
	}

	/**
	 * 吃掉食物
	 */
	public afterEat(color:number):void{
		//新增蛇身的节点
		var node:egret.Shape = new egret.Shape();
		node.graphics.beginFill(color);
		node.graphics.drawCircle(this.radius,this.radius,this.radius);
		node.graphics.endFill();

		//指定新增节点的位置在蛇身节点list最后一个节点，也就是蛇尾巴坐标
		node.x = this.bodyList[this.bodyList.length - 1].x+this.radius*0.6;
		node.y = this.bodyList[this.bodyList.length - 1].y+this.radius*0.6;

		//将新的节点加入蛇身和蛇身节点list
		this.bodyList.push(node);
		this.addChild(this.bodyList[this.bodyList.length-1]);

		//指定新增节点的显示索引
		this.setChildIndex(this.bodyList[this.bodyList.length-1],0);


	}

	public speed = 20;
	/**
	 * 蛇移动起来
	 */
	public move(e:egret.TouchEvent,during:number):void{
		//利用用户点击事件获取坐标
		var mx = e.stageX;
		var my = e.stageY;

		//动画缓动类
		var tween:egret.Tween;

		for(var i = this.bodyList.length-1;i>=1;i--){
			tween = egret.Tween.get(this.bodyList[i]);
			tween.to({x:this.bodyList[i-1].x,y:this.bodyList[i-1].y},during);
		}

		//蛇身的首个节点就是蛇头
		var hx = this.x + this.bodyList[0].x;
		var hy = this.y + this.bodyList[0].y;

		//设置当前缓动对象为蛇头
		tween = egret.Tween.get(this.bodyList[0]);
		var tmpx,tmpy;

		if(hx==mx && hy==my){
			//位置相同
			return;
		}
		if(hx != mx){
			//非垂直
			//斜切
			var mk = (my - hy)/(mx - hx);
			var mangle = Math.atan(mk);
			if(mx<hx){
				//左边
				tmpx = this.bodyList[0].x - this.speed*Math.cos(mangle);
				tmpy = this.bodyList[0].y - this.speed*Math.sin(mangle);
				tween.to({x:tmpx,y:tmpy,during});
			}else{
				//右边
				tmpx = this.bodyList[0].x + this.speed*Math.cos(mangle);
				tmpy = this.bodyList[0].y + this.speed*Math.sin(mangle);
				tween.to({x:tmpx,y:tmpy,during});
			}
		}else{
			//垂直
			if(my<hy){
				tmpx = this.bodyList[0].x - this.speed;
				tween.to({x:tmpx,y:tmpy},during);
			}else{
				//竖直向下
				tmpx = this.bodyList[0].x+this.speed;
				tween.to({x:tmpx,y:tmpy},during);
			}
		}

	}

	public getHead():egret.Shape{
		return this.bodyList[0];
	}

}