/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-07-03 12:17:48
 * @version $Id$
 */


var Config=function(name,type,actionRight){
	this.ipt=typeof(name)=="Object"? name:document.getElementsByName(name)[0];
	this.type=type;
	this.actionRight=actionRight||false;
}


var Validator=function(config,form,noRightAction,rightfn,errorfn){
	this.config=config;
	this.result_ok;
	this.result=[];
	// this.already=already;
	this.rightfn=rightfn;
	this.errorfn=errorfn;
	this.noRightAction=noRightAction||false;
	this.form=typeof(form)=="Object"? form:document.getElementById(form);
	// console.log(this.config);
	var that=this;
	for(let i=0;i<this.config.length;i++){
		// var type=this.config[i].type;
		this.config[i].ipt.addEventListener("change",function(e){
			that.validate(that.config[i].ipt,i);
		},false);
	}

	var event=this.form.tagName=='FORM' ? 'submit':'mousedown';

	this.form.addEventListener(event,function(e){
		for(let j=0;j<that.config.length;j++){
			that.validate(that.config[j].ipt,j);
		}
	},false);
}

Validator.prototype={
	//onblur
	validate:function(ele,index){
		// var ele=e.target;
		var type=this.config[index].type;
		if(typeof(type) == 'string'){
			this.result_ok=Validator.types[type](ele.value);
			if(!this.result_ok.isTrue){
				this.errorfn(ele,this.result_ok);
				this.config[index].actionRight=true;
			}else if(this.result_ok.isTrue&&this.config[index].actionRight){
				this.rightfn(ele,this.result_ok);
			}
		}
		else{
			this.result_ok=this.config[index].type.call(this,ele.value);
			if(this.result_ok){
				if(!this.result_ok.isTrue){
					this.errorfn(ele,this.result_ok);
					this.config[index].actionRight=true;
				}else if(this.result_ok.isTrue&&this.config[index].actionRight){
					this.rightfn(ele,this.result_ok);
				}
			}
		}
	}
}

Validator.types=(function(){
	var isEmpty=function(val,data){
		if(!val){
			return {
				isTrue:false,
				info:"该选项不能为空"
			}
		}
		else{
			return {
				isTrue:true
			};
		}
	}

	var tel=function(val){
		var reg=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		var num=parseInt(val,10);
		if(!reg.test(val)){
			return {
				isTrue:false,
				info:"请输入正确的电话号码"
			}
		}
		else{
			return {
				isTrue:true
			}
		}
	}

	var isNumber=function(val){
		if(!val){
			return {
				isTrue:false,
				info:"请输入数字"
			}
		}
		if(!isNaN(val)){
			return {
				isTrue:true
			}
		}
		else{
			return {
				isTrue:false,
				info:"请输入数字"
			}
		}
	};

	var isRepeat=function(val,data){
		if(!val){
			return {
				isTrue:false,
				info:"该选项不能为空"
			}
		}
		var len=data.length;
		for(var i=0;i<data.length;i++){
			if(val==data[i]){
				return {
					isTrue:false,
					info:"该选项不能重复"
				}
			}
		}
		return{
			isTrue:true
		}
	}

	var isEmail=function(val,ele){
		if(!val){
			return {
				isTrue:false,
				info:"该选项不能为空"
			}
		}
		var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(filter.test(val)){
			return {
				isTrue:true,
				info:'邮箱填写正确'
			}
		}
		return {
			isTrue:false,
			info:"请输入正确的邮箱地址"
		}
	}

	return {
		isEmpty:isEmpty,
		isTel:tel,
		isNumber:isNumber,
		isRepeat:isRepeat,
		isEmail:isEmail
	}
}());



export {Config,Validator}





























