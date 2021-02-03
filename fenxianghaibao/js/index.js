$("#container").height(document.documentElement.clientHeight+"px");
//audioplay
var voice = document.getElementById('No1Audio'); //调用 <audio> 元素提供的方法 play() 
// voice.play();
document.addEventListener("WeixinJSBridgeReady", function () { 
    voice.play()
}, false);
document.addEventListener('touchmove',function(event){
    event.preventDefault(); },false);
//—— NO1 —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//首页浮现文字
setTimeout(function(){
    $(".No1FontImg1").fadeIn(500)
},500)
setTimeout(function(){
    $(".No1FontImg2").fadeIn(500)
},1000)
setTimeout(function(){
    $(".No1FontImg3").fadeIn(500)
},1500)
setTimeout(function(){
    $(".No1FontImg4").fadeIn(500)
},2000)
setTimeout(function(){
    $(".No1FontImg5").fadeIn(500)
},2500)
setTimeout(function(){
    $(".No1FontImg6").fadeIn(500)
},3000)
setTimeout(function(){
    $(".No1FontImg7").fadeIn(500)
},3500)
setTimeout(function(){
    $(".No1FontImg8").fadeIn(500)
},4000)
setTimeout(function(){
    $(".No1FontImg9").fadeIn(500)
},4500)
setTimeout(function(){
    $(".No1FontImg10").fadeIn(500)
},5000)
//No1按钮浮现
setTimeout(function(){
    $(".No1Btn").fadeIn()
    Dong()
},5500)
//No2按钮动效
jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
    this.each(function () {
        var jqNode = $(this);
        jqNode.css({ position: 'relative' });
        for (var x = 1; x <= intShakes; x++) {
            jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
            .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
            .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
}
var timer
function Dong(){
    timer =setInterval(function(){
        $(".No1Btn>img").shake(2, 5, 400)
    },1200)
}
//点击hide，清除timer
$(".No1Btn>img").click(function(){
    clearInterval(timer)
    $("#No1").fadeOut(500);
    $("#No2").fadeIn(500);
})
//——No2——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//文案拖动

var $font2 = $(".No2Font2")
cat.touchjs.drag($font2, function (left, top) { });  
cat.touchjs.scale($font2, function (scale) { }); 
var $font4 = $(".No2Font4")
cat.touchjs.drag1($font4, function (left, top) { });  
cat.touchjs.scale1($font4, function (scale) { }); 
var $Bg = $("#myCanvas")
cat.touchjs.init($Bg, function (left, top, scale, rotate) {});
cat.touchjs.dragBg($Bg, function (left, top) { });  
cat.touchjs.scaleBg($Bg, function (scale) { }); 
// cat.touchjs.rotate($Bg, function (rotate) { }); 
//遮罩隐藏
$(".topImg").click(function(){
    $(".No2Top").fadeOut(500)
    $(".topImg").fadeOut(500)
})
//八段文案刚换
var F=1;
console.log(F)
var imgList = ["images/img2/1.png","images/img2/2.png","images/img2/3.png","images/img2/4.png","images/img2/5.png","images/img2/6.png","images/img2/7.png","images/img2/8.png"]
$(".fontH").click(function(){
    if(F>=7){
        F=1
        $(".fontHs").attr("src", imgList[F]);
    }else{
        $(".fontHs").attr("src", imgList[F]);
        F++
    }
})
//点击上传图片
$(".No2Btn1").click(function(){
    document.getElementById("fileBtn").click();
})
//重新上传No2Btn2
$(".No2Btn2").click(function(){
    document.getElementById("fileBtn").click();
})
$("#fileBtn").change(function () {
    selectFileImage($(this)[0]);
});

function selectFileImage(fileObj) {
    var file = fileObj.files[0];
    // 图片方向角
    var Orientation = null;

    if (file) {
        $("#myCanvas").css("top","0px")
        $(".No2Top").fadeIn(500)
        $(".No2Load").fadeIn(500)
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式

        if (!rFilter.test(file.type)) {
            alert("请选择jpeg、png格式的图片");
            return;
        }
        //获取照片方向角属性
        EXIF.getData(file, function () {
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
        });
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
            var base64 = null;
            if (Orientation != "" && Orientation != 1 && Orientation != undefined) {
                var width = this.naturalWidth;
                var height = this.naturalHeight;
                switch (Orientation) {
                    case 6://需要顺时针90度旋转
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(this, 0, -height);
                        break;
                    case 8://需要逆时针90度旋转
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(-90 * Math.PI / 180);
                        ctx.drawImage(this, -width, 0);
                        break;
                    case 3://需要180度旋转
                        ctx.rotate(180 * Math.PI / 180);
                        ctx.drawImage(this, -width, -height);
                        break;
                }
            }
            base64 = canvas.toDataURL("image/png");
            $(".No2Buttom").attr("src", base64);
            $(".No2Btn1").fadeOut(500);
            $(".No2Btn2").fadeIn(500);
            $(".No2Btn3").fadeIn(500);
            setTimeout(function(){
                toImage()
            },500) 
        };
    };
}
//——No3——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function toImage(){
    var x=0;
    if($('.No2Buttom').width()>$('#No2').width()){
        x = -(($('.No2Buttom').width()- $('#No2').width() )/2)
    }
    var w = $('.No2Buttom').width();
    var h =$('.No2Buttom').height();
    var canvasTwo = document.getElementById("upImg");
    var canvas = document.getElementById("myCanvas")
    canvas = document.getElementById("myCanvas");
    canvas.width=w;
    canvas.height=h;
    context = canvas.getContext("2d");
    context.drawImage(canvasTwo,0,0,w,h)
    $("#myCanvas").css("left",x+"px")
    $("#myCanvas").fadeIn(2000)
    console.log(x,w,h)
    $(".No2Top").fadeOut(500)
    $(".No2Load").fadeOut(500)
    $(".No2Buttom").hide()
}
//生成图片
$(".No2Btn3").click(function(){
    _hmt.push(['_trackEvent', "img", "click","toCanvas"]);
    $(".No3Tops").fadeIn(500)
    $(".No2Em1").show()
    toCanvas()
})
function toCanvas(){
    // console.log(cat.touchjs.left)
    // console.log(cat.touchjs.top)
    //console.log(cat.touchjs.scaleVal)
    // console.log(cat.touchjs.left1)
    // console.log(cat.touchjs.top1)
    //console.log(cat.touchjs.scaleVal1)
    // console.log(cat.touchjs.leftBg)
    // console.log(cat.touchjs.topBg)
    // console.log(cat.touchjs.scaleValBg)
    //console.log($('.No2Em1').position().left+"--em--"+$('.No2Em1').position().top)
    // console.log($("#No2").width(),$("#No2").height())

    var myCanvas = document.getElementById("myCanvas");
    var em = document.getElementById("em");
    var img1 = document.getElementById("f1");
    var img2 = document.getElementById("f2");
    var img3 = document.getElementById("f3");
    var img4 = document.getElementById("f4");
    console.log($('.No2Font2').position().left)
    console.log($('.No2Font2').position().top)
    console.log($('.No2Font2').width())
    
    console.log(parseInt($('.No2Font2').css("padding-top")))
    canvas = document.getElementById("No3Canvas");
    canvas.width=$("#No2").width();
    canvas.height=$("#No2").height();
    context = canvas.getContext("2d");
    context.restore();
    context.globalCompositeOperation="source-over";//设置多个图层如何混合，这个可以百度canvas混合模式，这个和PS是相近的
    // // console.log(3)
    // if(w<800){
        //     console.log(1234)
        //context.translate($('#myCanvas').position().left,$('#myCanvas').position().top);
        //context.rotate(cat.touchjs.rotateVal * Math.PI / 180);
        //context.translate(-$('#myCanvas').position().left,-$('#myCanvas').position().top);
        context.drawImage(myCanvas,$('#myCanvas').position().left,$('#myCanvas').position().top,$('#myCanvas').width()*cat.touchjs.scaleValBg,$('#myCanvas').height()*cat.touchjs.scaleValBg)
        //context.rotate(45 * Math.PI / 180);
        context.drawImage(em,$('.No2Em1').position().left,$('.No2Em1').position().top,$('.No2Em1').width(),$('.No2Em1').height())
        context.drawImage(img1,$('.No2Font1').position().left,$('.No2Font1').position().top,$('.No2Font1').width(),$('.No2Font1').height())
        context.drawImage(img2,$('.No2Font2').position().left+parseInt($('.No2Font2').css("padding-left")),$('.No2Font2').position().top+parseInt($('.No2Font2').css("padding-top")),$('.No2Font2').width()*cat.touchjs.scaleVal,$('.No2Font2').height()*cat.touchjs.scaleVal)
        context.drawImage(img3,$('.No2Font3').position().left,$('.No2Font3').position().top,$('.No2Font3').width(),$('.No2Font3').height())
        context.drawImage(img4,$('.No2Font4').position().left+parseInt($('.No2Font4').css("padding-left")),$('.No2Font4').position().top+parseInt($('.No2Font4').css("padding-top")),$('.No2Font4').width()*cat.touchjs.scaleVal1,$('.No2Font4').height()*cat.touchjs.scaleVal1)
        
    // }else{

    //     context.drawImage(canvasTwo,x,0,w,h1)
    // }
    // context.drawImage(canvasOne,0,0,w1,h1)
    context.save()//用来显示的canvas
    toImages()
}
function toImages(){
    console.log(30)
    canvas = document.getElementById("No3Canvas");
    var image = new Image();
    image.setAttribute("crossOrigin",'Anonymous')
    image.setAttribute("id",'toImage')
    image.src = canvas.toDataURL("image/png");
    //$("#down").attr("href",""+image+""); 
    $(".No3Border").html(image)
    $("#No2").fadeOut(500)
    $("#No2").fadeIn(500)
    $("#No3Canvas").hide()
    setTimeout("amits()",3000) 
}
function amits(){
    $(".No3Tops").fadeOut(500)
    $(".No3Top1").fadeOut()
    $("#No2").fadeOut()
    $("#No3").fadeIn(function(){
        $(".No3Border").animate({
            width: "75%",
            height: "75%",
            padding: "5%"
        },2000)
    })
    setTimeout(function(){
        $(".No3buttom").fadeIn(1000)
    },2000)
}
$(".No3Share").click(function(){
    $(".No3Top").fadeIn(1000)
    $(".No3Fen").fadeIn(1000)
})
$(".No3Top").click(function(){
    $(".No3Top").fadeOut(1000)
    $(".No3Fen").fadeOut(1000)
})
$(".No3Fen").click(function(){
    $(".No3Top").fadeOut(1000)
    $(".No3Fen").fadeOut(1000)
})
$('#share').click(function () {
    mySwiper.slideTo(2, 0, true); //切换到第一个slide，速度为1秒
    _hmt.push(['_trackEvent', '分享', 'click', '分享'])
})