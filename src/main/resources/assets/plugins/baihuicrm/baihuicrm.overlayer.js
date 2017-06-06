/**
 * 遮盖层封装
 */
var isIE = (document.all) ? true : false;
var Overlayer=new Object();
Overlayer={
		olStyle:{
		    position: 'fixed',
		    left: '0',
		    top: '0',
		    height: '100%',
		    width: '100%',
		    backgroundColor: '#222',
		    zIndex: 999999
		},
		msgStyle: {
		    position: 'fixed',
		    width: '100%',
		    height: '40px',
		    lineHeight: '40px',
		    top: 'calc(50% + 40px)',
		    marginTop: '-40px',
		    textAlign: 'center',
		    color: '#FFF'
//			color: '#3c8dbc'
		},
		olinnerStyle: {
			position: 'fixed',
			width: '120px',
			height: '40px',
			lineHeight: '40px',
			left: '50%',
			top: '50%',
			marginTop: '-40px',
			marginLeft: '-50px',
			backgorundColor: 'red'
		},
		oneStyle:{},
		twoStyle:{},
		threeStyle:{},
		createComponent:function(){
			var component=document.createElement(arguments[0]);
			var styles = arguments[1]; 
			for (var property in styles) { 
				
				if (styles[property] != null) {  
					try{  
						component.style[property] = styles[property];
					}catch(err){  
						document.write(err.name+":"+property+"<br/>");//set property error!  
					}  
				}  
			}  
			return component;
		},
		show: function(){
			if(!this.isExist&&document.body){
				var bodyElem=document.body;
				var olElem=this.createComponent("div",this.olStyle);
				var olinnerElem=this.createComponent("div",this.olinnerStyle);
				var oneElem=this.createComponent("div",this.oneStyle);
				var twoElem=this.createComponent("div",this.twoStyle);
				var threeElem=this.createComponent("div",this.threeStyle);
				oneElem.className='object object_one';
				twoElem.className='object object_two';
				threeElem.className='object object_three';
				olinnerElem.appendChild(oneElem);
				olinnerElem.appendChild(twoElem);
				olinnerElem.appendChild(threeElem);
				olElem.appendChild(olinnerElem);
				if(!!arguments[0]&&arguments[0]!=''){
					var msgElem=this.createComponent("div",this.msgStyle);
					msgElem.innerHTML=arguments[0];
					olElem.appendChild(msgElem);
				}
				olElem.id="OverlayerDiv_-"
				
				//设置透明度（兼容IE）
				isIE ? olElem.style.filter = "alpha(opacity:50)" : olElem.style.opacity = 0.5;
				
				bodyElem.appendChild(olElem);
				this.isExist=true;
			}
		},
		remove: function(){
			var olElem = document.getElementById("OverlayerDiv_-");
			if(this.isExist) document.body.removeChild(olElem);
			this.isExist=false;
		}
}