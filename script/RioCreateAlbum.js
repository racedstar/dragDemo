

//拖曳相關
var allowDrop = function (ev) {
    ev.preventDefault();
}
//拖曳相關
var drag = function (ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

//將圖片新增到相簿
var dragPhoto = function (targetID,ev) {
    var data = ev.dataTransfer.getData("Text");
    console.log(targetID);
    ev.preventDefault();
    if (document.getElementsByClassName("Active").length !== 0) {//一次拖拉多檔
        multiImg(ev, targetID);
    }
    else {
        if (data) {
            document.getElementById(targetID).appendChild(document.getElementById(data));
            if (targetID === "NotJoinedPic") {
                checkIsFrontCover(data);//確認取消的圖片不是封面，若是封面就將封面清空
            }
        }
    }
}

//多選功能
var imgClick = function (ev) {
    var imgDivName = document.getElementById(ev.target.id).className,
        shiftRangeparentID = document.getElementById(ev.target.id).parentNode.id;
    shiftRange = $("#" + shiftRangeparentID + " .createAlbumDiv").length,
        isShiftSelect = false,
        initialClassName = "col-md-3 text-center createAlbumDiv",
        selected = document.getElementById(ev.target.id),
        allSelected = document.getElementsByClassName("col-md-3 text-center");

    //單選功能
    if (imgDivName.indexOf("Active") === -1) {
        selected.className = initialClassName + " Active";
    }
    else {
        selected.className = initialClassName;
    }

    //Shift連續選取功能
    if ($('.Active').length > 1) {
        if (ev.shiftKey) {
            for (var i = 0; i < shiftRange; i++) {
                if (isShiftSelect === true) {
                    if ($("#" + shiftRangeparentID + " .col-md-3.text-center.createAlbumDiv")[i].className.indexOf("Active") != -1) {
                        isShiftSelect = false;
                    }
                    $("#" + shiftRangeparentID + " .col-md-3.text-center.createAlbumDiv")[i].className = initialClassName + " Active";

                }
                else if ($("#" + shiftRangeparentID + " .col-md-3.text-center.createAlbumDiv")[i].className.indexOf("Active") != -1) {
                    isShiftSelect = true;

                }
            }
        }
    }
}

//拖曳多檔
var multiImg = function (ev,divID) {
    var Addimg = [];
    for (i = 0; i < document.getElementsByClassName("Active").length; i++) {
        Addimg[i] = document.getElementsByClassName("Active")[i].id;
    }
    for (j = 0; j < Addimg.length; j++) {
        var data = Addimg[j];
        document.getElementById(divID).appendChild(document.getElementById(data));
        document.getElementById(data).className = "col-md-3 text-center createAlbumDiv";
    }
}
