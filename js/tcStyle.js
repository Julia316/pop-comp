/*JS原生 Created by Jamie on 2018.1.31*/

window.onload=function(){
	var aInput=document.getElementsByTagName('input');
    	
	aInput[0].onclick=function(){
		var tc1=new Pop();
		/**配置参数**/
		tc1.init({ 
			iNow:0,
			bgUrl:'url(img/tc.png)',
			closeUrl:'img/close.png',
			w:492,
			h:683,
            dir:'center',
            mark:true,
            closeLeft:440,
            drag:true,
         
            content:"<div class='qrBox'><img src='img/111.jpg'/></div>"
		});		
	};

	/*构造函数*/
	function Pop(){		
		/**设置全局变量**/
		this.oPopUp=null;
		this.oPopClose=null;
		this.oMark=null;
		this.disX=0;
		this.disY=0;
		this.scrollOnOff=null;
		
		/**默认参数**/
		this.settings={ 
			boxPos:'fixed', //弹窗随页面固定(fixed)还是随页面滚动(absolute)
			bgUrl:'', //弹窗背景图片地址
			closeUrl:'',//关闭按钮图片地址
			w:0, //弹窗内容宽度
			h:0, //弹窗内容高度
			dir:'center',//可选center left  right
			dirW:0,//center时可不填；right时是距离右边的距离；left时是距离左边的距离
			dirH:0,//center时可不填；right时是距离底部的距离；left时是距离顶部的距离
			mark:false,  //是否有遮罩层
			close:true, //是否有关闭按钮
			closeTop:0,  //关闭按钮paddingTop值 
			closeLeft:0,  //关闭按钮paddingLeft值
			closeRotate:true, //关闭按钮hover时是否有旋转变化
			drag:false,  //是否可以拖拽
			dragLim:true, //拖拽式是否限制范围 
			dragMag:'', //拖拽时是否有磁性吸附，空为无磁性吸附，数字为吸附范围
			shake:false, //是否有定时抖动
			resize:false, //是否可以拖拽边缘改变弹窗尺寸
			showAnm:true,  //是否有出现动画
			hideAnm:true, //是否有退出动画
			showPos:'',//弹窗出现的位置,默认为空，填数字
			hidePos:'',//弹窗消失的位置(hidePos>showPos)
			content:"" //弹窗里的内容（除背景和关闭按钮外）			
		}
	}
	Pop.prototype.json={};
	
	/*初始化*/
	Pop.prototype.init=function(opt){
		extend(this.settings,opt); 
		
		if(this.json[opt.iNow]==undefined){ //设置单体模式
			this.json[opt.iNow]=true;
		}
		
		if(this.json[opt.iNow]){ //当opt.iNow存在的时候弹窗才能出现
            
	        this.showPop();	
	        
			if(this.settings.mark){ //遮罩层
				this.setMark();
				this.oPopUp.style.zIndex="9999";
			}	
			if(this.settings.showPos!=''){ //弹窗在固定位置出现消失
	            this.scrollIn();
	        }else{
	        	this.oPopUp.style.visibility="visible";
	        }			
			this.json[opt.iNow]=false;
		}		
	}
	Pop.prototype.showPop=function(){ 
		this.oPopUp=document.createElement('div');
		this.oPopUp.id="popUp"+this.settings.iNow;
		this.oPopUp.className="popUp";
		this.oPopUp.style.position=this.settings.boxPos;
		this.oPopUp.style.visibility="hidden";
		this.oPopUp.innerHTML=this.settings.content;
		document.body.appendChild(this.oPopUp);
		if(this.settings.showAnm){ //弹窗进入动画
			this.showsty();
		}
		if(this.settings.close){ //关闭按钮
			this.oPopClose=document.createElement('div');
			this.oPopClose.id="popClose"+this.settings.iNow;
			this.oPopClose.className="popClose";
			this.oPopClose.innerHTML="<img src="+this.settings.closeUrl+"/>"; //关闭按钮图片
			this.oPopClose.style.paddingTop=this.settings.closeTop+"px"; //关闭按钮位置
			this.oPopClose.style.paddingLeft=this.settings.closeLeft+"px";
			this.oPopUp.insertBefore(this.oPopClose,this.oPopUp.firstElementChild);
			this.fnClose(); 
		}
		this.setSize(); //大小位置
		if(this.settings.shake){ //抖动
			this.shake(); 
		}
		if(this.settings.drag){ //拖拽
		   this.drag();
		   this.settings.resize=false;
		}
		if(this.settings.resize){ //拖拽边缘改变弹窗大小	
			this.settings.drag=false;
			this.resize();
			this.oPopUp.style.cursor="move";
		}				
	}
	/*设置弹窗尺寸位置*/
	Pop.prototype.setSize=function(){
		this.oPopUp.style.backgroundImage=this.settings.bgUrl;
		this.oPopUp.style.backgroundSize="'"+this.settings.w+"px,"+this.settings.h+"px'";
		this.oPopUp.style.width=this.settings.w+"px";
		this.oPopUp.style.height=this.settings.h+"px";
		
		/**位置**/
		if(this.settings.dir=='center'){
			this.oPopUp.style.left=(viewWidth()-this.oPopUp.offsetWidth)/2-this.settings.dirW+"px";
			this.oPopUp.style.top=(viewHeight()-this.oPopUp.offsetHeight)/2-this.settings.dirH+"px";				
		}else if(this.settings.dir=='right'){
			this.oPopUp.style.left=viewWidth()-this.oPopUp.offsetWidth-this.settings.dirW+"px";
			this.oPopUp.style.top=viewHeight()-this.oPopUp.offsetHeight-this.settings.dirH+"px";				
		}else if(this.settings.dir=='left'){
			this.oPopUp.style.left=this.settings.dirW+"px";
			this.oPopUp.style.top=this.settings.dirH+"px";				
		}
	}
	/*遮罩层*/
	Pop.prototype.setMark=function(){
		this.oMark=document.createElement('div');
		this.oMark.id="mark"+this.settings.iNow;
		this.oMark.className="mark";
		document.body.insertBefore(this.oMark,document.body.lastElementChild);		
	}
	/*关闭*/
	Pop.prototype.fnClose=function(){
		var This=this;
		var oClose=document.getElementById(this.oPopClose.id);
		var oCloseImg=oClose.getElementsByTagName('img')[0];
		if(this.settings.closeRotate){			
			oCloseImg.onmouseover=function(){
				this.className="closeRotate";
			}
			oCloseImg.onmouseout=function(){
				this.className="";
			}			
		}
		oCloseImg.onclick=function(){
			if(This.settings.hideAnm){ //弹窗退出动画
				This.hidesty();
			}
			setTimeout(function(){
				document.body.removeChild(This.oPopUp);
				if(This.settings.mark){
					document.body.removeChild(This.oMark);
				}				
			},600)

			
			This.json[This.settings.iNow]=true;//打开开关	
			
		}	
	}
	
	/*拖拽*/
	Pop.prototype.drag=function(){		
		var This=this;
	    this.oPopUp.onmousedown=function(ev){
	    	var ev=ev||event;
	    	This.disX=ev.clientX-This.oPopUp.offsetLeft;
	    	This.disY=ev.clientY-This.oPopUp.offsetTop;
	    	document.onmousemove=function(ev){
	    		var ev=ev||event;
	    		var L=ev.clientX-This.disX;
	    		var T=ev.clientY-This.disY;
	    		var distanceX=document.documentElement.clientWidth-This.oPopUp.offsetWidth;
	    		var distanceY=document.documentElement.clientHeight-This.oPopUp.offsetHeight;
	    		if(This.settings.dragLim&&This.settings.dragMag==''){ //仅限制范围,无磁性吸附

    			   if(L<0){
    			   	   L=0;
    			   }else if(L>distanceX){
    			   	   L=distanceX;
    			   }
    			   if(T<0){
    			   	   T=0;
    			   }else if(T>distanceY){
    			   	   T=distanceY;
    			   } 
	    		}else if(This.settings.dragLim&&This.settings.dragMag!=''){ //限制范围且磁性吸附
    			    console.log(distanceX);
    			   if(L<This.settings.dragMag){
    			   	   L=0;
    			   }else if(L>(distanceX-This.settings.dragMag)){
    			   	   L=distanceX;
    			   	  
    			   }
    			   if(T<This.settings.dragMag){
    			   	   T=0;
    			   }else if(T>(distanceY-This.settings.dragMag)){
    			   	   T=distanceY;
    			   } 		    			
	    		}
		    	This.oPopUp.style.left=L+"px";
		    	This.oPopUp.style.top=T+"px";			    		
	    	}
	    	document.onmouseup=function(){
	    		document.onmousemove=document.onmouseup=null;
	    	}
	    	return false;
	    }
	}

    /*抖动*/
    Pop.prototype.shake=function(){
    	var This=this;
    	setInterval(function(){
    		addClass(This.oPopUp,"shaker");
    		if(hasClass(This.oPopUp,"shaker")){
    			setTimeout(function(){
    				rmClass(This.oPopUp,"shaker");
    			},2000);    			
    		}
    	},3000)
    }

    /*边缘拖拽改变弹窗大小*/
    Pop.prototype.resize=function(){
    	var This=this;
		this.oPopUp.onmousedown=function(ev){
			var ev=ev||event;
			var objW=This.oPopUp.offsetWidth;
			var objL=This.oPopUp.offsetLeft;
			var objH=This.oPopUp.offsetHeight;
			var objT=This.oPopUp.offsetTop;		
			var oldX=ev.clientX;
			var oldY=ev.clientY;
			var b="";
			if(oldX>objL+objW-10){
				b="right";
			}
			if(oldX<objL+10){
				b="left";
			}
			if(oldY>objT+objH-10){
				b="bottom";
			}
			if(oldY<objT+10){
				b="top";
			}		
			document.onmousemove=function(ev){
				var ev=ev||event;
				switch(b){
					case 'left':
					    This.oPopUp.style.width=objW-(ev.clientX-oldX)+"px";
					    This.oPopUp.style.left=objL+(ev.clientX-oldX)+"px";
					    break;
					case 'right':
					    This.oPopUp.style.width=objW+(ev.clientX-oldX)+"px";				    
					    break;
					case 'bottom':
					    This.oPopUp.style.height=objH+(ev.clientY-oldY)+"px";
					    
					    break;
					case 'top':
					    This.oPopUp.style.height=objH-(ev.clientY-oldY)+"px";
					    This.oPopUp.style.top=objT+(ev.clientY-oldY)+"px";
					    break;				    
				}
			}
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				
			}
			return false;
		}    	
    }

    /*弹窗出现退出动画*/
    Pop.prototype.showsty=function(){
    	addClass(this.oPopUp,"tcShowAnm")
    }
    Pop.prototype.hidesty=function(){
    	addClass(this.oPopUp,"tcHideAnm")
    	if(this.settings.mark){
    		addClass(this.oMark,"markHideAnm")
    	}    	
    }

    /*固定位置出现消失*/
    Pop.prototype.scrollIn=function(){  
    	var This=this;
    	window.onscroll=function(){
    		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    		if(scrollTop>This.settings.showPos&&scrollTop<This.settings.hidePos){
    		   This.oPopUp.style.visibility="visible";
    		}else{
    		   This.oPopUp.style.visibility="hidden";
    		}
    	}  	
    }

	/*封装可视区宽高*/
	function viewWidth(){
		return document.documentElement.clientWidth;
	};
	function viewHeight(){
		return document.documentElement.clientHeight;
	};
	
	/*forin 拷贝*/
	function extend(obj1,obj2){ //把obj2复制给obj1
		for(var attr in obj2){
			obj1[attr]=obj2[attr];
		}
	};	
	
	/*添加删除class*/
	// 判断某个元素是否包含某个class
	function hasClass(obj,cls) {
		var re = new RegExp(`\\b${cls}\\b`);
		if(re.test(obj.className)){
			return true;
		}else{
			return false;
		}
	}			
	// 给某个元素添加class
	function addClass(obj,cls) {
		if(!hasClass(obj,cls)){
			obj.className += ` ${cls}`;
		}
		obj.className = obj.className.trim();
	}	
	// 给某个元素删除class
	function rmClass(obj,cls) {
		var re = new RegExp(`\\b${cls}\\b`);
		if(hasClass(obj,cls)){// aaa bbb ccc 
			obj.className = obj.className.replace(re,'').replace(/\s{2}/,' ').trim();
			console.log('移除完毕');
		}
	}	
	
}
