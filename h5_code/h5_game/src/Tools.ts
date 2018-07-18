class Tools {
	public constructor() {
	}

	/**
	 * 根据资源名称获取资源
	 */
	public createBitmapByName(name:string):egret.Bitmap{
		let result = new egret.Bitmap();
		let texture:egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
	

}