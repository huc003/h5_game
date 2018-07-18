//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private tools:Tools;


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private food:Food;
    private snake:Snake;
    private stageW:number;
    private stageH:number;
    private radius = 30;

    //定时器
    private timer:egret.Timer;
    private during:number = 40;
    private moveEvent:egret.TouchEvent;
    private head:egret.Shape;

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
        // var food = new Food(25,25,25);
        // this.addChild(food);
        //获取舞台的高宽
        // this.stageW = this.stage.stageWidth;
        // this.stageH = this.stage.stageHeight;

        // //白色背景填满整个屏幕
        // var bg = new egret.Shape();
        // bg.graphics.beginFill(0xffffff);
        // bg.graphics.drawRect(0,0,this.stageW,this.stageH);
        // bg.graphics.endFill();

        // this.addChild(bg);

        // //调用方法生产随机食物
        // this.randomFood();

        // //生成彩色的蛇
        // this.snake = new Snake(this.stageW*0.5,this.stageH*0.5,this.radius,0x000000);
        // this.addChild(this.snake);

        // //开始舞台的点击，并注册指定的触摸事件
        // this.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END,this.moveEnd,this);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        this.tools = new Tools();
        let bg = this.tools.createBitmapByName("bg2_jpg");
        this.addChild(bg);

        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;

        var startSprite:egret.Sprite = new egret.Sprite();
        var start = this.tools.createBitmapByName("start_png");
        start.width=400;
        start.height=150;
        startSprite.name='start_sprite';
        // button.label='开始游戏';
        startSprite.addChild(start);
        startSprite.touchEnabled = true;
        startSprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        this.addChild(startSprite);
        // console.log('this.stage.width --> '+this.stage.width);
        // console.log('this.stage.height --> '+this.stage.height);
        // console.log('button.width --> '+button.width);
        // console.log('button.height --> '+button.height);
        // console.log('start.width --> '+start.width);
        // console.log('start.height --> '+start.height);
        //按钮容器位置
        startSprite.x = (this.stage.width-startSprite.width)/2;
        startSprite.y = (this.stage.height-startSprite.height)/2+200;
        // console.log('startShape.x --> '+startShape.x);
        // console.log('startShape.y --> '+startShape.y);
        // //开始游戏事件
        // startShape.touchEnabled = true;
        // startShape.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStart,this);

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;

        
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 进入游戏页面
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        //初始化游戏界面容器
        var gameMain = new GameMain();
        //将容器添加到文档类
        this.addChild(gameMain);
        //初始化游戏页面数据
        gameMain.init();
    }

    /**
     * 随机产生食物
     */
    public randomFood():void{
        //随机坐标
        var tmpx = Math.random()*(this.stageW - this.radius*2);
        var tmpy = Math.random()*(this.stageH - this.radius*2);
        //新建食物对象
        this.food = new Food(tmpx,tmpy,this.radius);
        //显示食物
        this.addChild(this.food);
    }

    /**
     * 根据点击事件调用彩虹蛇的移动方法
     */
    private move(e:egret.TouchEvent):void{
        this.snake.move(e,this.during);
    }

    private onEat() {
        this.removeChild(this.food);
        this.snake.afterEat(this.food.color);
        this.randomFood();
    }


    /**
     * 点击结束
     */
    private moveEnd(e:egret.TouchEvent){
        //关闭定时器
        if(this.timer!=null){
            this.timer.stop();
            this.timer = null;
        }
    }

    /**
     * 当点击拖动时
     */
    private onMove(e:egret.TouchEvent):void{
        //保存event
        this.moveEvent = e;
        //开启一个计时器
        if(this.timer == null){
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
            this.timer.start();
        }
    }

    private onTimer(e:egret.TimerEvent){
        //获取蛇头
        this.head = this.snake.getHead();
        //调用方法，检测蛇头和食物是否发生碰撞
        if(this.hit(this.head,this.food)){
            //发生碰撞，则调用食物被吃时间
            this.onEat();
        }
        //彩蛇继续移动
        this.snake.move(this.moveEvent,this.during);
    }

    private hit(a,b){
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height))
           .intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
    }

    /**
     * 点击开始游戏按钮
     */
    private onClickStart(e: egret.TouchEvent){
        console.log('游戏开始了');
        
        let panel = new eui.Panel();
        panel.title = "游戏开始了";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }

}
