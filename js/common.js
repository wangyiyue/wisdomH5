//var serverUrl='http://192.168.9.9:3002/apis/farm-admin-app';
var serverUrl=window.location.origin+'/farm-admin-app';

var loadingTime=null;//loading计时器

//格式化参数
function formatParams(data){
	var arr = [];
	for(var name in data) {
		arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	}
	arr.push(("v=" + Math.random()).replace(".", ""));
	return arr.join("&");
}
//发送http请求
function ajaxHttp(options){
    options = options || {};
    options.url=serverUrl+options.url;
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	var params = options.data;

	//创建 - 非IE6 - 第一步
	if(window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { //IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//接收 - 第三步
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			var status = xhr.status;
			if(status >= 200 && status < 300) {
				options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	//连接 和 发送 - 第二步
	options.url=(options.url.indexOf('.json')<0)?options.url+'.json':options.url;
	if(options.type == "GET") {
		params = formatParams(options.data);
		xhr.open("GET", options.url + "?" + params, true);
		xhr.send(null);
	} else if(options.type == "POST") {
		xhr.open("POST", options.url, true);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(params));
	}
}

//获取url参数
function getQueryVariable(variable) {
	//console.log(window.location.search.substring(1));
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}

//打开关闭loading弹窗
function contrLoadingView(type,str){
    clearTimeout(loadingTime);
    var view=document.getElementById('loadingView');
    if(type=='on'){
        view.setAttribute('class','loading');
        loadingTime=setTimeout(function(){
            view.setAttribute('class','loading f_dn');
        },20000);
        document.getElementById('loadingText').innerText=str;
    }else{
        view.setAttribute('class','loading f_dn');
    };
}

//打开关闭MSG弹窗
function contrMsgView(str){
    var view=document.getElementById('msgView');
    view.setAttribute('class','msgNote full_screen');
	setTimeout(function(){
		view.setAttribute('class','msgNote full_screen f_dn');
	},1500);
	document.getElementById('msgText').innerText=str;
}

//模板数据渲染方法
function templateHtml(data,templateId,boxId){
	var html=doT.template(document.getElementById(templateId).innerHTML);
	document.getElementById(boxId).innerHTML=html(data);
};

//获取class类
function getElementsByClassName(cl){
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = document.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
};
