/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/15
    Time: 22:27
*/
function handleRent(event){
    let storage=window.sessionStorage;
    let localstorage=window.localStorage;
    let data = {};
    data = {
        bookId: storage.book_id

    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addrent",
        headers: {'Authorization': localstorage.token},
        data: data,
        success: function (res) {
            let json = JSON.parse(res);
            if (json.status) {
                alert('借阅成功~');
            } else {
                alert("你有书逾期未还，不能借书！");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}
function handleColl(event){
    let storage=window.sessionStorage;
    let localstorage=window.localStorage;
    let data = {};
    data = {
        bookId: storage.book_id

    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addCollection",
        headers: {'Authorization': localstorage.token},
        data: data,
        success: function (res) {
            let json = JSON.parse(res);
            if (json.status) {
                alert('收藏成功~');
            } else {
                alert("收藏失败！你已收藏过该书！");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}
function handleReserve(event){
    let storage=window.sessionStorage;
    let localstorage=window.localStorage;
    let data = {};
    data = {
        bookId: storage.book_id
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addreserve",
        headers: {'Authorization': localstorage.token},
        data: data,
        success: function (res) {
            console.log(res);
            let json = JSON.parse(res);
            if (json.status) {
                alert('预约成功~');
            } else {
                alert("预约失败！");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}
function handlePublic(){
    let commit = $("#talk").val();
    let storage=window.sessionStorage;
    let localstorage=window.localStorage;
    let data = {};
    data = {
        bookId: storage.book_id,
        content: commit
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addComment",
        headers: {'Authorization': localstorage.token},
        data: data,
        success: function(res){
            let json = JSON.parse(res);
            if (json.status) {
                alert('评论成功~');
                window.location.reload();
            }else{
                alert("评论失败！");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
window.onload = function(){
    let storage=window.localStorage;
    let session=window.sessionStorage;
    let data = {};
    data = {
        bookId: session.book_id
    };
    data = JSON.stringify(data);
    // console.log(session.book_id);
    // console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/findonebook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res){
            let data = JSON.parse(res);
            $("#nav_book_name").text(data.bookName);
            $("#cover").attr('src', "http://47.94.97.26:8080/BSP"+data.imgUrl);
            let btn_str = "";
            console.log(data);
            if(data.status == '0') {
                btn_str = "                        <li>\n" +
                    "                            <input type=\"button\" onclick=\"handleRent(this)\" value=\"借阅\">\n" +
                    "                            <input type=\"button\" onclick=\"handleColl(this)\" value=\"收藏\">\n" +
                    "                            <input type=\"button\" onclick=\"handleReserve(this)\" value=\"预约\">\n" +
                    "                        </li>";
            }else if(data.status == '2') {
                btn_str = "                        <li>\n" +
                    "                            <input type=\"button\" onclick=\"handleRent(this)\" value=\"借阅\">\n" +
                    "                            <input type=\"button\" onclick=\"handleColl(this)\" value=\"收藏\">\n" +
                    "                            <input type=\"button\" onclick=\"handleReserve(this)\" disabled value=\"已被预约\">\n" +
                    "                        </li>";
            }else if(data.status == '3') {
                btn_str = "                        <li>\n" +
                    "                            <input type=\"button\" onclick=\"handleRent(this)\" disabled value=\"借阅\">\n" +
                    "                            <input type=\"button\" onclick=\"handleColl(this)\" value=\"收藏\">\n" +
                    "                            <input type=\"button\" onclick=\"handleReserve(this)\" value=\"预约\">\n" +
                    "                        </li>";
            }
            let str = "                    <ul>\n" +
                "                        <li>书名：<span>"+ data.bookName +"</span><hr /></li>\n" +
                "                        <li>作者：<span>"+ data.author +"</span><hr /></li>\n" +
                "                        <li>类型：<span>"+ data.type +"</span><hr /></li>\n" +
                "                        <li>所有者：<span>"+ data.userName +"</span><hr /></li>\n" +
                "                        <li> 描述：<span>"+ data.intro +"</span><hr /></li>"+ btn_str +"</ul>";
            $(str).appendTo("#message");
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/findCommentByBook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res){
            let data = JSON.parse(res);
            if(data == ''){
                let str = "        <strong >暂无评论！</strong>\n";
                $(str).appendTo("#discuss");
            }else {
                for (let i = 0; i < data.length; i++) {
                    let str = "<div class=\"review\">\n" +
                        "                <table >\n" +
                        "                    <tr>\n" +
                        "                        <th rowspan=\"2\"> <img src=\"img//picture1.jpeg\" class=\"rounded-circle\"> </th>\n" +
                        "                        <td  class=\"username\">" + data[i].name + "</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr><td class=\"data\">" + data[i].createTime + "</td>\n" +
                        "                    </tr>\n" +
                        "                </table>\n" +
                        "                <div class=\"comment\">" + data[i].content + "</div>\n" +
                        "        </div>\n" +
                        "        <hr/>";
                    $(str).appendTo("#discuss");
                }
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });

};