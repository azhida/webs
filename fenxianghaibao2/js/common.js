(function(){
    var utils = {};
	// UA 判断  提供了全局对象netease.ua， 如：netease.ua.ios 即可调用
    utils.parseUA = function(){
	  	var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        return { //移动终端版本信息
            mobile: !!u.match(/(iPhone|iPod|Android|ios|Mobile)/i), //是否为移动终端
            pc: !u.match(/(iPhone|iPod|Android|ios|Mobile)/i), //是否为pc终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //是否为ios终端
            android: u.indexOf('Android') > -1, //是否为android终端
            weixin: u2.match(/MicroMessenger/i) == "micromessenger", //是否为微信客户端
            newsapp: u.indexOf('NewsApp') > -1,//是否为网易新闻客户端
            yixin: u.indexOf('YiXin') > -1,//易信客户端
            weibo: u.indexOf('weibo') > -1,//微博客户端
            yunyuedu:u.indexOf('PRIS') > -1, //云阅读客户端
            yunyuedu:u.indexOf('PRIS') > -1 //云阅读客户端
        };
    };

	// pc端显示二维码 如需屏蔽,在body上自定义声明 code="no"属性
    utils.pc_code = function(){
    	var pc = utils.parseUA().pc;
    	if(pc){
    		if(document.body.getAttribute("code")=="no"){return};
			var codeWrap = document.createElement("div");
			codeWrap.style.cssText = "width:100%;height:100%;position:fixed;left:0px;top:0px;z-index:9999999;background:#fff;"; 
			var oImg = document.createElement("img");
			oImg.style.cssText = "width:300px;height:300px;position:fixed;top:50%;left:50%;margin-left:-150px;margin-top:-220px;"
			oImg.setAttribute("src",urlHost2+"s.jiathis.com/qrcode.php?url="+location.href);
			codeWrap.appendChild(oImg);
			var oText = document.createElement("p");
			oText.style.cssText = "width:300px;height:300px;position:fixed;top:50%;left:50%;margin-left:-150px;margin-top:80px;text-align:center;font-size:19px;font-weight:bold;"
			oText.innerHTML ="为了更好的体验，请扫码观看~";
			codeWrap.appendChild(oText);
			document.body.appendChild(codeWrap);
		}
    };

    //判断手机横竖屏状态, 如需屏蔽掉横屏提示，在body上自定义声明 landscape = "no" 属性;
    utils.landscape = function(){
    	var orienter_tip = document.createElement("div");
		orienter_tip.style.cssText = "width:100%;height:100%;position:fixed;left:0px;top:0px;z-index:999999999;background:#000 url("+urlHost2+"go.163.com/2015/public/common/image/tip.png) no-repeat center center;display:none;";
		setTimeout(function(){
			document.body.appendChild(orienter_tip);
		},200);
		function updateOrientation(){
			if(document.body.getAttribute("landscape")=="no"){return};
			if (window.orientation === 180 || window.orientation === 0) { 
				setTimeout(function(){
					orienter_tip.style.display = "none";
				},250);
	        } 
	        if (window.orientation === 90 || window.orientation === -90){ 
	        	setTimeout(function(){
        		 	orienter_tip.style.display = "block";
				},250);
	        }  
		}
		updateOrientation();
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",updateOrientation, false); 
    };

    // loading
    utils.loading = function(imgs,callback){
	    if(!imgs){return false};
	    var img=[];
	    var len=imgs.length;
	    var loadedCount = 0;
	    for(var i=0;i<len;i++){
	        img[i]=new Image();
	        img[i].src=imgs[i];
	        img[i].onload = function(){
	            loadedCount++;
	            $('.netease-loader .load_data').html(Math.floor(loadedCount/len*100)+"%").attr('title',Math.floor(loadedCount/len*100));
	            if (loadedCount>=len){
	                $('.netease-loader').fadeOut(600,function(){
	                    $(this).remove();
	                });
	                callback ? callback() : null;
	            }
	        };
	    }
	};

	// 动态加载js文件方法
	utils.jsLoad = function(_files,success){
		var FileArray=_files;
		var cacheArray =[];
		var loadFile = function (url, success){
			if (!FileIsExt(cacheArray,url)){
				var fileObj=document.createElement("script");
				fileObj.type = "text/javascript";
				fileObj.src = url;
				success = success || function(){};
				fileObj.onload = fileObj.onreadystatechange = function() {
					if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
						success();
						cacheArray.push(url);
					}
				}
				document.body.appendChild(fileObj);
			}else{
				success();
			}
		};
		var FileIsExt = function (FileArray,_url){
			if(FileArray!=null && FileArray.length>0){
				var len =FileArray.length;
				for (var i = 0; i < len; i++) {
					if (FileArray[i] ==_url) {
						return true;
					}
				}
			}
			return false;
		};
		if(FileArray.length>0){
			var LoadedCount=0;
			for(var i=0;i< FileArray.length;i++){
				loadFile(FileArray[i],function(){
					LoadedCount++;
					if(LoadedCount==FileArray.length){
						if(typeof success == "function"){
							success();
						}
					}
				});
			}
		}
	};

    // 分享监测、页面打开量统计
    utils.share_survey = function(share){
        var loc = window.location;
        var ua = utils.parseUA();
        if(loc.host.search(/163\.com/)<0 || loc.href.indexOf('test.go.163') > -1){
            return false;
        }
        var code = 'init';
        var shareName = "";
        var keywords = "";
        if(ua.newsapp){
            code = 'newopen';
            keywords = "newsapp";
            shareName = "新闻客户端分享";
        }else if(ua.weixin){
            code = 'weixinopen';
            keywords = "weixin";
            shareName = "微信分享";
        }else if(ua.yixin){
            code = 'yixinopen';
            keywords = "yixin";
            shareName = "易信分享";
        }else if(ua.weibo){
            code = 'weiboopen';
            keywords = "weibo";
            shareName = "微博分享";
        }
        if(ua.pc){
            code = 'pc';
            shareName = "其他";
            keywords = "qita";
        }
        if(share){
            code +='_share';
            neteaseTracker(false,'"+urlHost2+"minisite.click.163.com'+location.pathname.replace(/\/(go|auto)|[\w-]+\.[\w]+/g,"")+keywords,shareName,'minisiteclick');
        }
        code = encodeURIComponent(code);
        var url = encodeURIComponent(loc.href.split('?')[0]);
        var updata_ele = new Image();
        updata_ele.src = urlHost2+"go.163.com/api/common/shareh5.php?act=share&t="+code+'&url='+url+'&random='+new Date().getTime();
        var updata_ele2 = new Image();
        updata_ele2.src = urlHost2+"go.163.com/api/common/shareh5.php?act=shareMessage&t="+code+'&url='+url+'&random='+new Date().getTime();
    };

	// pv、uv监测代码
	utils.survey = function(){
		var isAuto = window.location.href.search(/auto\.163\.com|163\.com\/auto/) >= 0; 
		var isGo = window.location.href.search(/go\.163\.com/) >= 0;
		var jsArr = [""+urlHost2+"analytics.163.com/ntes.js"];
		if(isAuto){
			jsArr.push("https://img3.126.net/ntesrich/ad/wrating.js");
			utils.jsLoad(jsArr,function(){
				_ntes_nacc = "auto";
				neteaseTracker();
				window.vjAcc="860010-0508010000";
			    window.wrUrl="http://163.wrating.com/";
			    vjTrack("");
			});
		}else if(isGo){
			utils.jsLoad(jsArr,function(){
				_ntes_nacc = "minisites";
				neteaseTracker();
			});
		}
	};

	//移动端分享
	utils.share = function(){
		var ua = utils.parseUA();
		var isCloudMusic = window.location.search.search(/from=cloudmusic/)>=0;
		window.NeteaseShareInit = function(){
		    NeteaseShareUpdate();
		    if(ua.weixin)NeteasesShareInit_weixin();
		};
		window.NeteaseShareUpdate = function(){
		    NeteasesShareInit_yixin();
		    NeteasesShareInit_yuedu();
		    NeteasesShareInit_music();
		    NeteasesShareInit_news();
		    NeteasesShareInit_sina();
		};
		window.NeteaseShare = function(popupCallBack,noSina){
		    NeteaseShareUpdate();
		    if(ua.yixin){
		        if(popupCallBack)popupCallBack();
		    }else if(ua.newsapp){
		        window.location='share://';
		    }else if(isCloudMusic){
		        window.open(window.shareData.music);
		    }else if(ua.weixin){
		        if(popupCallBack)popupCallBack();
		    }else if(ua.yunyuedu){
		        window.open(window.shareData.yuedu);
		    }else{
		        if(noSina){
		            if(popupCallBack)popupCallBack();
		        }else{
		            window.open(window.shareData.sina);
		        }
		    }
		};
		//易信
		var NeteasesShareInit_yixin = function(){
		    //分享图片
		    window.shareData.imgUrl=window.shareData.MsgImg;//图片链接
		    window.shareData.tImgUrl=window.shareData.MsgImg;//分享到朋友圈的图片
		    window.shareData.fImgUrl=window.shareData.MsgImg;//分享给好友的图片
		    window.shareData.wImgUrl=window.shareData.MsgImg;//分享到微博的图片
		    //分享链接
		    window.shareData.timeLineLink=window.shareData.link;//分享到微博的图片
		    window.shareData.sendFriendLink=window.shareData.link;//分享给好友的链接
		    window.shareData.weiboLink=window.shareData.link;//分享到微博的连接
		    //分享标题
		    window.shareData.tTitle=window.shareData.fText;//分享到朋友圈的标题
		    window.shareData.fTitle=window.shareData.title;//分享给好友的标题
		    //分享内容
		    window.shareData.tContent=window.shareData.fText;//分享到朋友圈的描述
		    window.shareData.fContent=window.shareData.desc;//分享给好友的描述
		    window.shareData.wContent=window.shareData.desc;//分享到微博的内容
		};
		//云阅读
		var NeteasesShareInit_yuedu = function (){
		    // data.data必须随便传一个值,否则安卓无法回调
		    window.shareData.yuedu ="web:getclientsharemodule;data="+encodeURIComponent("{\"activityId\":\"" + (window.shareData.activityId||'') + "\",\"moduleType\":\"['_share_weixin','_share_weixinquan','_share_yixin','_share_yixinquan','_share_tsina','_share_qzone']\",\"site\":\"网易云阅读官方网站\","+"\"url\":\"" + window.shareData.link + "\",\"title\":\"" + window.shareData.title + "\",\"pics\":\"" + window.shareData.MsgImg + "\","+"\"summary\":\"" + window.shareData.desc + "\",\"shareType\":\"1\",\"data\":{\"activityId\":\"" + (window.shareData.activityId||'') + "\"}}");
		    if(window.active)window.active.shareCompleted = window.shareData.callback;
		};
		//云音乐
		var NeteasesShareInit_music = function(){
		  	window.shareData.music='orpheus://share/';
		    window.shareData.music += encodeURIComponent(window.shareData.title)+'/';
		    window.shareData.music += encodeURIComponent(window.shareData.MsgImg)+'/';
		    window.shareData.music += encodeURIComponent(window.shareData.link)+'/';
		    window.shareData.music += encodeURIComponent(window.shareData.title)+'/';
		    window.shareData.music += encodeURIComponent(window.shareData.desc);
		};
		var NeteasesShareInit_news = function(){
			if(document.getElementById('__newsapp_sharetext')){
		        document.getElementById('__newsapp_sharetext').innerHTML=window.shareData.desc+window.shareData.link;
		        document.getElementById('__newsapp_sharephotourl').innerHTML=window.shareData.MsgImg;
		        document.getElementById('__newsapp_sharewxtitle').innerHTML=window.shareData.title;
		        document.getElementById('__newsapp_sharewxtext').innerHTML=window.shareData.desc;
		        document.getElementById('__newsapp_sharewxurl').innerHTML=window.shareData.link;
		        document.getElementById('__newsapp_sharewxthumburl').innerHTML=window.shareData.MsgImg;
		    }else{
		        var div = document.createElement('div');
		        div.style.display='none';
		        var __newsapp_sharetext= document.createElement('code');
		        __newsapp_sharetext.innerHTML= window.shareData.desc+window.shareData.link;
		        __newsapp_sharetext.id= '__newsapp_sharetext';
		        div.appendChild(__newsapp_sharetext);
		        var __newsapp_sharephotourl= document.createElement('code');
		        __newsapp_sharephotourl.innerHTML= window.shareData.MsgImg;
		        __newsapp_sharephotourl.id= '__newsapp_sharephotourl';
		        div.appendChild(__newsapp_sharephotourl);
		        var __newsapp_sharewxtitle= document.createElement('code');
		        __newsapp_sharewxtitle.innerHTML= window.shareData.title;
		        __newsapp_sharewxtitle.id= '__newsapp_sharewxtitle';
		        div.appendChild(__newsapp_sharewxtitle);
		        var __newsapp_sharewxtext= document.createElement('code');
		        __newsapp_sharewxtext.innerHTML= window.shareData.desc;
		        __newsapp_sharewxtext.id= '__newsapp_sharewxtext';
		        div.appendChild(__newsapp_sharewxtext);
		        var __newsapp_sharewxurl= document.createElement('code');
		        __newsapp_sharewxurl.innerHTML= window.shareData.link;
		        __newsapp_sharewxurl.id= '__newsapp_sharewxurl';
		        div.appendChild(__newsapp_sharewxurl);
		        var __newsapp_sharewxthumburl= document.createElement('code');
		        __newsapp_sharewxthumburl.innerHTML= window.shareData.MsgImg;
		        __newsapp_sharewxthumburl.id= '__newsapp_sharewxthumburl';
		        div.appendChild(__newsapp_sharewxthumburl);
		        document.body.appendChild(div);
		    }
		    window.__newsapp_share_done = window.shareData.callback;
		};
		//微信
		var NeteasesShareInit_weixin = function(){
		    var onBridgeReady=function(){
		        WeixinJSBridge.call('showOptionMenu');
		        WeixinJSBridge.call('hideToolbar');
		        // 发送给好友;
		        WeixinJSBridge.on('menu:share:appmessage', function(argv){
		            WeixinJSBridge.invoke('sendAppMessage',{
		                "appid":window.shareData.appId,
		                "img_url":window.shareData.MsgImg,
		                "img_width":"120",
		                "img_height":"120",
		                "link":window.shareData.link,
		                "desc":window.shareData.desc,
		                "title":window.shareData.title
		            }, window.shareData.callback);
		        });
		        // 分享到朋友圈;
		        WeixinJSBridge.on('menu:share:timeline', function(argv){
		            (shareData.callback)();
		            WeixinJSBridge.invoke('shareTimeline',{
		                "img_url":window.shareData.MsgImg,
		                "img_width":"120",
		                "img_height":"120",
		                "link":window.shareData.link,
		                "desc":window.shareData.fText,
		                "title":window.shareData.fText
		            },window.shareData.callback);
		        });
		    };
		    if(document.addEventListener){
		        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		    }else if(document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
		        document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
		    }
		};
		//新浪
		var NeteasesShareInit_sina = function (){
		    window.shareData.sina=""+urlHost2+"v.t.sina.com.cn/share/share.php?url="+encodeURIComponent(window.shareData.link)+"&title="+encodeURIComponent(window.shareData.fText)+"&content=utf8&pic="+encodeURIComponent(window.shareData.MsgImg);
		};
	};

	//获取链接参数方法   getPara("参数名");
	utils.getPara = function(paraName){
		var urlPara = location.search; 	
		var reg = new RegExp("[&|?]"+paraName+"=([^&$]*)", "gi"); 
      	var a = reg.test(urlPara); 
      	return a ? RegExp.$1 : ""; 
	};

	// 自动播放音乐视频 传入参数id即可
	utils.autoPlay = function(id){
		var audio = document.getElementById(id);
	    var play = function(){
	        audio.play();
	        document.removeEventListener("touchstart",play, false); 
	    };  
	    audio.play();
	    document.addEventListener("WeixinJSBridgeReady", function (){
	       play();
	    }, false);  
	    document.addEventListener('YixinJSBridgeReady', function(){
	        play();
	    }, false); 
	    document.addEventListener("touchstart",play, false);
	};

	// 初始化方法
	utils.init = function(){
		window.netease = utils; // 对外提供netease对象
	    window.netease.ua =utils.parseUA(); //对外提供了UA方法
		utils.landscape(); // 横屏提示
		utils.survey(); //pv、uv监测
		window.share_survey = utils.share_survey; //对外提供分享监测接口
		share_survey();
		utils.pc_code(); //pc显示二维码
 		utils.share(); // 分享代码
	};
	utils.init();
})();