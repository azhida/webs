var yearNum = new Date().getFullYear();
var monthNum = new Date().getMonth() > 8 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1);
var dayNum = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
var flag = true, imgBase64, uploadIndex = 1, twoFlag = false, fontIndex = 0, labelIndex = 0, cs = 2.2;

var shareText = [
    "如果当时我们能不那么倔强现在也不那么遗憾。",
    "后来，我总算学会了如何去爱。",
    "你都如何回忆我，带着笑或是很沉默。",
    "有些人一旦错过就不在。",
    "幸福不是故事，不幸才是。",
    "为什么从来都没有一个故事，从头到尾都是幸福的。",
    "我真的已经努力变成你想要的样子了。",
    "如果当时你没走，后来的我们会不会不一样。",
    "最痛苦的分手，总有快乐的理由。",
    "到最后，我们才能拥有爱了很久的朋友。",
    "想着联络，不如心底远远问候。",
    "日子再忙，也有人一起吃早餐。",
    "成全了你的潇洒与冒险，成全了我的碧海蓝天。"
];

var urlHost, lunar, uploadLock = false;
var cw = $(".main").width(); //获取dom 宽度
var ch = $(".main").height(); //获取dom 高度
var lw = $(".label-box").width();
var lh = $(".label-box").height();
var fw = $(".font-box").width();
var fh = $(".font-box").height();

var scale = 2;

var imgs = [
    "img/btn-ok.png",
    "img/change.png",
    "img/code.png",
    "img/content-1.png",
    "img/content-10.png",
    "img/content-11.png",
    "img/content-12.png",
    "img/content-13.png",
    "img/content-2.png",
    "img/content-3.png",
    "img/content-4.png",
    "img/content-5.png",
    "img/content-6.png",
    "img/content-7.png",
    "img/content-8.png",
    "img/content-9.png",
    "img/home.png",
    "img/homeBtn.png",
    "img/homeCode.png",
    "img/label-1.png",
    "img/label-2.png",
    "img/label-3.png",
    "img/label-4.png",
    "img/label-5.png",
    "img/mask.png",
    "img/once.png",
    "img/return.png",
    "img/save.png",
    "img/share.png",
    "img/shareBtn.png",
    "img/shareWrap.png",
    "img/td-icons.png",
    "img/tip1.png",
    "img/top_title1.png",
    "img/uploading.png"
];

var shareData = {
    MsgImg: 'http://go.163.com/web/20180101_us/img/share.png',  //分享图片
    link: 'http://go.163.com/web/20180101_us/index.html',    //分享链接
    title: '致敬回忆',   //分享标题
    desc: '如果当时我们能不那么倔强现在也不那么遗憾。',    //分享描述
    fText: '致敬回忆：如果当时我们能不那么倔强现在也不那么遗憾',    //分享朋友圈
    callback: function () {
        share_survey(true);
    }
};

document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, {passive: false});

$(function () {
    loadingFn(imgs,function(){
        init();
    });
    setHTTP();
    shareFn();
});

function init() {
    h();
    e();
}


function h() {
    $("#canvas1")[0].width = 640;
    $("#canvas1")[0].height = ch*640/cw;
    $("#canvas1").css({
        "width": cw,
        "height": ch
    });
    $("#canvas2")[0].width = 640;
    $("#canvas2")[0].height = ch*640/cw;
    $("#canvas2").css({
        "width": cw,
        "height": ch
    });

    $("#endCanvas")[0].width = cw;
    $("#endCanvas")[0].height = ch;
    $("#endCanvas").css({
        "width": cw,
        "height": ch
    });

    // $(".endImg").css({
    //     "width": cw,
    //     "height": ch
    // });
    $(".endImg-wrap").css({
        "width": cw,
        "height": ch
    });

    // 获取当前日期
    dateChange(yearNum, monthNum, dayNum);
}

function e() {
    // 隐藏首页
    $(".home-begin").on("click", function () {
        $(".page1").fadeOut();
    });

    // 提示信息隐藏
    $(".page2").on("click", function () {
        $(".tip").fadeOut();
    });

    // 图片上传
    if (netease.ua.android) {
        $('.upload').attr({"accept": "image/*"});
    }
    imgUpload();

    // 分享图层隐藏
    $(".share-wrap").on("click", function () {
        $(".share-wrap").fadeOut();
    });

    // label随机
    shareData.desc = shareText[labelIndex];
    shareData.fText = "致敬回忆：" + shareText[labelIndex];
    NeteaseShareUpdate();//修改shareData后直接运行这个函数即可
    $(".label-item").removeClass("active").eq(labelIndex).addClass("active");

    // label切换

    $(".btn-change2").on("click", function () {
        labelIndex++;
        if (labelIndex == 12) {
            labelIndex = 0;
        }
        $(".label-item").removeClass("active").eq(labelIndex).addClass("active");
        shareData.desc = shareText[labelIndex];
        shareData.fText = "致敬回忆：" + shareText[labelIndex];
        NeteaseShareUpdate();//修改shareData后直接运行这个函数即可

        lw = $(".label-box").width();
        lh = $(".label-box").height();
    });

    // 文字切换
    $(".btn-change1").on("click", function () {
        fontIndex++;
        if (fontIndex == 5) {
            fontIndex = 0;
        }
        console.log(fontIndex);
        if (fontIndex == 2) {
            $(".page2").addClass("two");
            twoFlag = true;
        } else {
            $(".page2").removeClass("two");
            twoFlag = false;
        }
        $(".font-item").removeClass("active").eq(fontIndex).addClass("active");
        fw = $(".font-box").width();
        fh = $(".font-box").height();
    });

    // 绑定拖拽
    bindTrans($(".font-box")[0]);
    bindTrans($(".label-box")[0]);

    // $(document).on('touchstart', '.img_box', function () {
    //     removeBorder();
    //     $(this).addClass("border-outer");
    // });

    // 生成日历
    $(".btn-ok").on("click", function () {
        if (uploadLock) {
            $(".img-loading-font").html("正在生成...");
            $(".img-loading").fadeIn();
            $(".upload-wrap2").css("border-top", "0.01rem solid transparent");

            removeBorder();
            // 隐藏元件出现
            $(".end-code").show();

            // 剪切下半部分图片
            var _base64 = $("#canvas2")[0].toDataURL('image/png', 1);

            var _canvas = document.createElement("canvas");
            _canvas.width = cw;
            _canvas.height = ch;
            var _ctx = _canvas.getContext('2d');
            var _img = new Image();
            _img.src = _base64;
            _img.onload = function () {
                _ctx.drawImage($("#canvas2")[0], 0, 0, cw, ch);
                _ctx.globalCompositeOperation = "destination-in";

                var _img1 = new Image();
                _img1.src = "img/mask.png";
                _img1.onload = function () {
                    _ctx.drawImage(_img1, 0, 0, cw, 1236 * cw / 640);
                    // 第一部分剪裁完毕

                    // 创建新图 合成最后图片
                    var _canvas_3 = document.createElement("canvas");
                    _canvas_3.width = cw * cs;
                    _canvas_3.height = ch * cs;
                    var _ctx_3 = _canvas_3.getContext('2d');

                    // 上半部分图片
                    _ctx_3.drawImage($("#canvas1")[0], 0, 0, cw * cs, ch * cs);
                    // 下半部分图片
                    if (twoFlag) {
                        _ctx_3.drawImage(_canvas, 0, ch * 0.4 * cs, cw * cs, ch * cs);
                        console.log($(".upload-wrap2")[0].offsetTop * cs)
                    }

                    // 文本框
                    var _imgLabel = $(".label-item.active")[0];
                    _ctx_3.drawImage(_imgLabel,
                        ($(".label-box")[0].offsetLeft + $(".label-item.active")[0].offsetLeft + $(".label-box")[0].__translateX-(($(".label-box")[0].__scaleX-1)*(lw-$(".label-item.active")[0].offsetLeft*2)/2)) * cs,
                        ($(".label-box")[0].offsetTop + $(".label-item.active")[0].offsetTop - ($(".page-cont-wrap").height() - ch) / 2 + $(".label-box")[0].__translateY-(($(".label-box")[0].__scaleX-1)*(lh-$(".label-item.active")[0].offsetLeft*2)/2)) * cs,
                        ($(".label-box").width()-$(".label-item.active")[0].offsetLeft*2) * cs,
                        ($(".label-box").height()-$(".label-item.active")[0].offsetLeft*2) * cs);

                    // 大字
                    var _imgFont = $(".font-item.active")[0];
                    _ctx_3.drawImage(_imgFont,
                        ($(".font-box")[0].offsetLeft + $(".font-item.active")[0].offsetLeft + $(".font-box")[0].__translateX-(($(".font-box")[0].__scaleX-1)*(fw-$(".font-item.active")[0].offsetLeft*2)/2)) * cs,
                        ($(".font-box")[0].offsetTop + $(".font-item.active")[0].offsetTop - ($(".page-cont-wrap").height() - ch) / 2 + $(".font-box")[0].__translateY-(($(".font-box")[0].__scaleX-1)*(fh-$(".font-item.active")[0].offsetLeft*2)/2)) * cs,
                        ($(".font-box").width()-$(".font-item.active")[0].offsetLeft*2) * cs,
                        ($(".font-box").height()-$(".font-item.active")[0].offsetLeft*2) * cs);

                    // logo
                    var _logo = new Image();
                    _logo.src = "img/td-icons.png";
                    _ctx_3.drawImage(_logo, $(".logo")[0].offsetLeft * cs,
                        $(".logo")[0].offsetTop * cs,
                        $(".logo").width() * cs,
                        $(".logo").height() * cs);

                    // 日期
                    _ctx_3.beginPath();
                    _ctx_3.font = $(".date").css("font-size").split("px")[0] * cs + "px" + " taidu";
                    _ctx_3.textBaseline = "top";
                    _ctx_3.fillText($(".date").text(), $(".date")[0].offsetLeft * cs,
                        ($(".date")[0].offsetTop - 2) * cs);
                    _ctx_3.closePath();

                    // 二维码
                    var _code = new Image();
                    _code.src = "img/code.png";
                    _ctx_3.drawImage(_code, $(".end-code")[0].offsetLeft * cs,
                        $(".end-code")[0].offsetTop * cs,
                        $(".end-code").width() * cs,
                        $(".end-code").height() * cs);

                    var _base64_5 = _canvas_3.toDataURL('image/png', 1);
                    $(".endImg").attr("src", _base64_5);
                    $(".end-hide-img").attr("src", _base64_5);
                    // 隐藏多余元素
                    // 隐藏不生成元件
                    $(".btn-ok,.reload-wrap1,.reload-wrap2,.btn-change,.label-box,.font-box,.logo,.date,code").hide();
                    // 生成浮层
                    $(".upload-wrap1,.upload-wrap2").hide();
                    $(".result-wrap,.upload-wrap1,.upload-wrap2,.logo,.date,.end-code").hide();
                    $(".endImg-wrap").show();
                    $(".img-loading").fadeOut();
                    $(".page3").fadeIn();
                    $(".page2").addClass("ani");
                    // 生成图片检测
                    neteaseTracker(false,''+urlHost2+'minisite.click.163.com/2018/0101/20180101_us/picSuc', '上传成功', 'minisiteclick');
                }
            }
        } else {
            alert("请上传照片");
        }
    });
}


function bindTrans(el) {
    setTimeout(function () {
        Transform(el);
        var initScale = 1;
        var gesture = new AlloyFinger(el, {
            rotate: function (evt) {

            },
            pinchStart: function () {
                initScale = el.scaleX;

            },
            pinch: function (evt) {
                el.scaleX = el.scaleY = initScale * evt.zoom;
            },
            pressMove: function (evt) {
                el.translateX += evt.deltaX;
                el.translateY += evt.deltaY;
            },
            tap: function (evt) {

            },
            doubleTap: function (evt) {

            },
            longTap: function (evt) {

            },
            swipe: function (evt) {

            }
        });
    }, 300);
}


// 去除标签边框
function removeBorder() {
    $(document).find(".img_box").removeClass("border-outer");
}

// 切换日期
function dateChange(year, mouth, day) {
    lunar = calendar.solar2lunar(year, mouth, day);
    $(".date").html(year + "." + mouth + "." + day);
}

// 图片上传
function imgUpload() {
    // 图片编辑组件初始化
    imgeditor = new ImgEditor({
        el: document.getElementById('canvas1'),
        color: 'transparent'
    });

    imgeditor2 = new ImgEditor({
        el: document.getElementById('canvas2'),
        color: 'transparent'
    });

    gesture = new Gesturer({
        el: document.getElementById('canvas1'),
        onPressMove: function (evt) {
            imgeditor.onMove(evt);
        },
        onPinch: function (evt) {
            imgeditor.onPinch(evt);
        },
        onRotate: function (evt) {
            imgeditor.onRotate(evt);
        }
    });
    gesture.on();  // 开启手势事件

    gesture2 = new Gesturer({
        el: document.getElementById('canvas2'),
        onPressMove: function (evt) {
            imgeditor2.onMove(evt);
        },
        onPinch: function (evt) {
            imgeditor2.onPinch(evt);
        },
        onRotate: function (evt) {
            imgeditor2.onRotate(evt);
        }
    });
    gesture2.on();  // 开启手势事件

    // 安卓新闻客户端适配
    if (netease.ua.newsapp && netease.ua.android) {
        $('.input-btn').click(function () {
            uploadIndex = $(this).data('id');
            window.location = 'uploadimage://camera/640_1236';
            $(".img-loading").fadeIn();
        });
    } else {
        $('.input-btn').on('change', function () {
            uploadIndex = $(this).data('id');
            console.log(uploadIndex);
            var file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {
                alert("请上传图片");
                return false;
            }
            $(".img-loading").fadeIn();
            lrz(file, {
                width: 640,
                quality: 0.85,
                done: function (results) {
                    var base64 = results.base64;
                    getData(base64, 23);
                }
            });
        });
    }
}

function getData(base64, filter) {
    // 天天P图：/2018/0115/ptu_imgfilter/common.php
    // AL Lab:/2018/0115/vision_imgfilter/common.php
    // 27 32
    $.ajax({
        type: "post",
        dataType: "json",
        url: urlHost + "/2018/0115/ptu_imgfilter/common.php",
        data: {
            pic: encodeURIComponent(base64),
            filter: filter
        },
        success: function (data) {
            lockFlag = false;
            if (data.ret == 0) {
                imgBase = "data:image/jpeg;base64," + data.data.image;
                if (uploadIndex == 1) {
                    imgeditor.setImg(imgBase);
                    $(".upload-btn-wrap1").fadeOut();
                    $(".reload-wrap1").fadeIn();
                } else {
                    imgeditor2.setImg(imgBase);
                    $(".upload-btn-wrap2").fadeOut();
                    $(".reload-wrap2").fadeIn();
                }
                uploadLock = true;
                $(".img-loading").fadeOut();
            } else {
                alert(data.msg);
            }
        }
    });
}

// 安卓下NewsApp的上传图片成功回调 （需要放在全局）
function __newsapp_upload_image_done(url) {
    var c = document.createElement("canvas");
    c.width = 640;
    c.height = 1236;
    var cxt = c.getContext("2d");

    var img = new Image();
    img.src = url + '?cors';
    img.crossOrigin = 'anonymous';

    img.onload = function () {
        // 照片
        cxt.drawImage(img, 0, 0);
        var base64 = c.toDataURL('image/jpeg', 0.8);
        getData(base64, 23);
    };
}

function setHTTP() {
    var _url = window.location.href;
    if (_url.search(/https/) == 0) {
        // https
        if (location.href.indexOf('test.go.163') > -1) {//测试地址
            urlHost = location.href.indexOf('auto') > -1 ? "https://test.go.163.com/api/auto" : "https://test.go.163.com/api/go";
        } else {//正式地址
            urlHost = location.href.indexOf('s.auto.163') > -1 ? "https://s.auto.163.com/api" : "https://go.163.com/api";
        }
    } else {
        // 判断接口地址
        if (location.href.indexOf('test.go.163') > -1) {//测试地址
            urlHost = location.href.indexOf('auto') > -1 ? "http://test.go.163.com/api/auto" : "http://test.go.163.com/api/go";
        } else {//正式地址
            urlHost = location.href.indexOf('s.auto.163') > -1 ? "http://s.auto.163.com/api" : "http://go.163.com/api";
        }
    }
}


function loadingFn(imgs, callback) {
    if (!imgs) {
        return false
    }
    var img = [];
    var len = imgs.length;
    var loadedCount = 0;
    for (var i = 0; i < len; i++) {
        img[i] = new Image();
        img[i].src = imgs[i];
        img[i].onload = function () {
            loadedCount++;
            $('.loading-num').html(Math.floor(loadedCount / len * 100) + "%").attr('title', Math.floor(loadedCount / len * 100));
            if (loadedCount >= len) {
                setTimeout(function () {
                    $('.loading-wrap').fadeOut(600, function () {
                        $(this).remove();
                    });
                }, 50);
                callback ? callback() : null;
            }
        };
    }
}

function shareFn() {
    NeteaseShareInit();
    document.getElementById("shareBtn").onclick = function () {
        NeteaseShare(function () {
            // 微信分享提示
            $(".share-wrap").fadeIn();
        }, false);
    }
}

// 13.0 获取随机数
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
