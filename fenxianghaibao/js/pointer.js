var cat = window.cat || {};  
        cat.touchjs = {  
            left: 200,  
            top: 100,  
            left1:200,
            top1:1500,
            leftBg:0,
            topBg:0,
            scaleVal: 1, 
            scaleVal1: 1,
            scaleValBg: 1,   //缩放  
            rotateVal1: 0,
            rotateVal: 0,   //旋转  
            curStatus: 0,   //记录当前手势的状态, 0:拖动, 1:缩放, 2:旋转  
            //拖动  
            drag: function ($targetObj, callback) {  
                console.log("drag")
                touch.on($targetObj, 'drag', function (ev) {  
                    console.log( cat.touchjs.left)
                    $targetObj.css("left", cat.touchjs.left + ev.x).css("top", cat.touchjs.top + ev.y);  
                });  
                touch.on($targetObj, 'dragend', function (ev) {  
                    cat.touchjs.left = cat.touchjs.left + ev.x;  
                    cat.touchjs.top = cat.touchjs.top + ev.y;  
                    console.log(cat.touchjs.left, cat.touchjs.top)
                    callback(cat.touchjs.left, cat.touchjs.top);  
                });  
            },  
            drag1: function ($targetObj, callback) {  
                console.log("drag")
                touch.on($targetObj, 'drag', function (ev) {  
                    console.log( cat.touchjs.left1)
                    $targetObj.css("left", cat.touchjs.left1 + ev.x).css("top", cat.touchjs.top1 + ev.y);  
                });  
                touch.on($targetObj, 'dragend', function (ev) {  
                    cat.touchjs.left1 = cat.touchjs.left1 + ev.x;  
                    cat.touchjs.top1 = cat.touchjs.top1 + ev.y;  
                    console.log(cat.touchjs.left1, cat.touchjs.top1)
                    callback(cat.touchjs.left1, cat.touchjs.top1);  
                });  
            },
            dragBg: function ($targetObj, callback) {  
                console.log("drag")
                touch.on($targetObj, 'drag', function (ev) {  
                    console.log( cat.touchjs.leftBg)
                    $targetObj.css("left", cat.touchjs.leftBg + ev.x).css("top", cat.touchjs.topBg + ev.y);  
                });  
                touch.on($targetObj, 'dragend', function (ev) {  
                    cat.touchjs.leftBg = cat.touchjs.leftBg + ev.x;  
                    cat.touchjs.topBg = cat.touchjs.topBg + ev.y;  
                    console.log(cat.touchjs.leftBg, cat.touchjs.topBg)
                    callback(cat.touchjs.leftBg, cat.touchjs.topBg);  
                });  
            },
            //缩放  
            scale: function ($targetObj, callback) {  
                console.log("scale")
                var initialScale = cat.touchjs.scaleVal || 1;  
                var currentScale;  
                touch.on($targetObj, 'pinch', function (ev) {  
                    if (cat.touchjs.curStatus == 2) {  
                        return;  
                    }  
                    cat.touchjs.curStatus = 1;  
                    currentScale = ev.scale - 1;  
                    currentScale = initialScale + currentScale;  
                    cat.touchjs.scaleVal = currentScale;  
                    var transformStyle = 'scale(' + cat.touchjs.scaleVal + ') rotate(' + cat.touchjs.rotateVal1 + 'deg)';  
                    $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);  
                   console.log(transformStyle)
                    callback(cat.touchjs.scaleVal);  
                });  
        
                touch.on($targetObj, 'pinchend', function (ev) {  
                    if (cat.touchjs.curStatus == 2) {  
                        return;  
                    }  
                    initialScale = currentScale;  
                    cat.touchjs.scaleVal = currentScale;  
                    callback(cat.touchjs.scaleVal);  
                });  
            },  
            scale1: function ($targetObj, callback) {  
                console.log("scale")
                var initialScale = cat.touchjs.scaleVal1 || 1;  
                var currentScale;  
                touch.on($targetObj, 'pinch', function (ev) {  
                    if (cat.touchjs.curStatus == 2) {  
                        return;  
                    }  
                    cat.touchjs.curStatus = 1;  
                    currentScale = ev.scale - 1;  
                    currentScale = initialScale + currentScale;  
                    cat.touchjs.scaleVal1 = currentScale;  
                    var transformStyle = 'scale(' + cat.touchjs.scaleVal1 + ') rotate(' + cat.touchjs.rotateVal1 + 'deg)';  
                    $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);  
                   console.log(transformStyle)
                    callback(cat.touchjs.scaleVal1);  
                });  
        
                touch.on($targetObj, 'pinchend', function (ev) {  
                    if (cat.touchjs.curStatus == 2) {  
                        return;  
                    }  
                    initialScale = currentScale;  
                    cat.touchjs.scaleVal1 = currentScale;  
                    callback(cat.touchjs.scaleVal1);  
                });  
            }, 
            scaleBg: function ($targetObj, callback) {  
                console.log("scale")
                var initialScale = cat.touchjs.scaleValBg || 1;  
                var currentScale;  
                touch.on($targetObj, 'pinch', function (ev) {  
                    if (cat.touchjs.curStatus == 2) {  
                        return;  
                    }  
                    cat.touchjs.curStatus = 1;  
                    currentScale = ev.scale - 1;  
                    currentScale = initialScale + currentScale;  
                    cat.touchjs.scaleValBg = currentScale;  
                    var transformStyle = 'scale(' + cat.touchjs.scaleValBg + ') rotate(' + cat.touchjs.rotateVal + 'deg)';  
                    $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);  
                   console.log(transformStyle)
                    callback(cat.touchjs.scaleValBg);  
                });  
        
                touch.on($targetObj, 'pinchend', function (ev) {  
                    if (cat.touchjs.curStatus == 2) {  
                        return;  
                    }  
                    initialScale = currentScale;  
                    cat.touchjs.scaleValBg = currentScale;  
                    callback(cat.touchjs.scaleValBg);  
                });  
            },   
            init: function ($targetObj, callback) {  
                touch.on($targetObj, 'touchstart', function (ev) {  
                    cat.touchjs.curStatus = 0;  
                    ev.preventDefault();//阻止默认事件  
                });  
                if (!window.localStorage.cat_touchjs_data)  
                    callback(0, 0, 1, 0);  
                else {  
                    var jsonObj = JSON.parse(window.localStorage.cat_touchjs_data);  
                    cat.touchjs.leftBg = parseFloat(jsonObj.leftBg), cat.touchjs.top = parseFloat(jsonObj.topBg), cat.touchjs.scaleVal = parseFloat(jsonObj.scale), cat.touchjs.rotateVal = parseFloat(jsonObj.rotate);  
                    callback(cat.touchjs.leftBg, cat.touchjs.topBg, cat.touchjs.scaleValBgBg, cat.touchjs.rotateVal);  
                }  
            },  
            //旋转  
            rotate: function ($targetObj, callback) {  
                var angle = cat.touchjs.rotateVal || 0;  
                touch.on($targetObj, 'rotate', function (ev) {  
                    if (cat.touchjs.curStatus == 1) {  
                        return;  
                    }  
                    cat.touchjs.curStatus = 2;  
                    var totalAngle = angle + ev.rotation;  
                    if (ev.fingerStatus === 'end') {  
                        angle = angle + ev.rotation;  
                    }  
                    cat.touchjs.rotateVal = totalAngle;  
                    var transformStyle = 'scale(' + cat.touchjs.scaleValBg + ') rotate(' + cat.touchjs.rotateVal + 'deg)';  
                    $targetObj.css("transform", transformStyle).css("-webkit-transform", transformStyle);  
                    $targetObj.attr('data-rotate', cat.touchjs.rotateVal);  
                    callback(cat.touchjs.rotateVal);  
                });  
            }  
        }; 

