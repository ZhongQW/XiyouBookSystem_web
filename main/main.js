function show_div(e){
    let book = e.target.parentNode.parentNode;
    let div = book.getElementsByClassName('detials')[0];
    div.style.visibility = "visible";
    div.style.top = 30 + "px";
}
var image;
function selectImage(file){
    if(!file.files || !file.files[0]){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt){
        document.getElementById('book_img').src = evt.target.result;
        image = evt.target.result;
        // console.log(image);
    };
    reader.readAsDataURL(file.files[0]);
}
function hidden_div(e){
    e.currentTarget.attributes["data-toggle"].nodeValue;
    let book = e.target.parentNode.parentNode;
    let div = book.getElementsByClassName('detials')[0];
    div.style.visibility = "hidden";
    div.style.top = -10 + "px";
}
function handleDetails(event){
    var sessionStorage=window.sessionStorage;
    console.log(event.getAttribute("data-index-book"));
    sessionStorage.setItem('book_id', event.getAttribute("data-index-book"));
    window.location.href = "../detail/librarydetail.html";
}
function handlePage(event) {

    let set = event.getAttribute("data-index-page");
    var sessStorage = window.sessionStorage;
    var storage = window.localStorage;
    // console.log(set);
    let page = sessStorage.page;
    if(page == "1"){ //当前是第一页
        if(set == "previous"){
            alert('是第一页，没有更多了！');
        }else{
            $("#library").empty();
            page++;
            sessStorage.setItem('page', page);
            console.log(sessStorage.page);
            let data = {
                page: sessStorage.page
            };
            data = JSON.stringify(data);
            console.log(data);
            $("#page.page_detail").empty();
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/page",
                headers: {'Authorization': storage.token},
                data: data,
                success: function (res) {
                    // console.log(res);
                    let data = JSON.parse(res);
                    // console.log(data);
                    // console.log(data[7]);

                    if (data == '') {
                       alert("没有更多书了！");
                    } else {
                        let row = 0; //row表示数据需要放几行
                        let count = 0;
                        let classB ="";
                        let len = data.length;
                        while(len > 0){
                            if(len >= 3) {
                                for(let i=0;i<3;i++) {
                                    classB += "        <div class=\"book\">\n" +
                                        "            <div class = \"detials\">\n" +
                                        "                <p>" + data[i].bookName + "</p>\n" +
                                        "            </div>\n" +
                                        "            <a onclick=\"handleDetails()\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                                        "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                                        "            </a>\n" +
                                        "        </div>";
                                }
                                let strss = "<div class='classify'>"+ classB +"</div>"
                                $(strss).appendTo($("#library"));
                                len = len-3;
                            }else {
                                for(let i=0;i<len;i++){
                                    classB += "        <div class=\"book\">\n" +
                                        "            <div class = \"detials\">\n" +
                                        "                <p>" + data[i].bookName + "</p>\n" +
                                        "            </div>\n" +
                                        "            <a onclick=\"handleDetails()\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                                        "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                                        "            </a>\n" +
                                        "        </div>";
                                }
                                let strss = "<div class=\"classify\">"+ classB +"</div>"
                                $(strss).appendTo($("#library"));
                                len = 0;
                            }
                        }
                        let page_ = "    <div id=\"page\">\n" +
                            "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                            "        <span class=\"page_detail actived\">当前页</span>\n" +
                            "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                            "    </div>";
                        $(page_).appendTo($("#library"));
                    }
                },
                error: function (res) {
                    alert("加载失败" + JSON.stringify(res));
                }
            });
        }
    }else {
        $("#library").empty();
        if (set == 'next') {
            page++;
            sessStorage.setItem('page', page);
        } else {
            page--;
            sessStorage.setItem('page', page);
        }
        $("#page.page_detail").empty();
        console.log(sessStorage.page);
        let data = {
            page: sessStorage.page
        };
        console.log(sessStorage.page);
        data = JSON.stringify(data);
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/page",
            headers: {'Authorization': storage.token},
            data: data,
            success: function (res) {
                let data = JSON.parse(res);
                console.log(data);
                // console.log(data[7]);

                if (data == '') {
                    alert("没有更多书了！");
                } else {
                    let row = 0; //row表示数据需要放几行
                    let count = 0;
                    let classB ="";
                    let len = data.length;
                    while(len > 0){
                        if(len >= 3) {
                            for(let i=0;i<3;i++) {
                                classB += "        <div class=\"book\">\n" +
                                    "            <div class = \"detials\">\n" +
                                    "                <p>" + data[i].bookName + "</p>\n" +
                                    "            </div>\n" +
                                    "            <a onclick=\"handleDetails()\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                                    "            </a>\n" +
                                    "        </div>";
                            }
                            $(classB).appendTo($("#library"));
                            len = len-3;
                        }else {
                            for(let i=0;i<len;i++){
                                classB += "        <div class=\"book\">\n" +
                                    "            <div class = \"detials\">\n" +
                                    "                <p>" + data[i].bookName + "</p>\n" +
                                    "            </div>\n" +
                                    "            <a onclick=\"handleDetails()\" data-index-book=\"" + data[i].id + "\" target=\"_self\">\n" +
                                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[i].imgUrl + "\" />\n" +
                                    "            </a>\n" +
                                    "        </div>";
                            }
                            $(classB).appendTo($("#library"));
                            len = 0;
                        }
                    }
                    let page_ = "    <div id=\"page\">\n" +
                        "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                        "        <span class=\"page_detail actived\">当前页</span>\n" +
                        "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                        "    </div>";
                    $(page_).appendTo($("#library"));
                }
            },
            error: function (res) {
                alert("加载失败" + JSON.stringify(res));
            }
        });
    }
}
window.onload = function(){
    var oBook = document.getElementsByClassName("book");
    var oDetails = [];
    let storage = window.localStorage;
    var sessStorage=window.sessionStorage;
    sessStorage.setItem('page', '1');
    console.log(storage.token);
    for(var i=0;i<oBook.length;i++) {
        oDetails[i] = oBook[i].getElementsByClassName('detials')[0];
        oBook[i].addEventListener('mouseover', show_div, false);
        oBook[i].addEventListener('mouseout', hidden_div, false);
    }
    let data = {};
    data = {
        page: 1
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/page",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data);
            // console.log(data[0].img.split("BookPhoto")[1].split("/")[1]);
            // console.log(data[7]);
            // let classB = "    <div class=\"classify\">\n" +
            //     "        <div class=\"book\">\n" +
            //     "            <a data-toggle=\"modal\" data-target=\"#myModal\">\n" +
            //     "                <img src=\"../img/add.jpg\" />\n" +
            //     "            </a>\n" +
            //     "        </div>\n" +
            //     "    </div>";
            // $(classB).appendTo($("#library"));
            if(data == ''){
                let classB = "    <div class=\"classify\">\n" +
                    "        <div class=\"book\">\n" +
                    "            <a data-toggle=\"modal\" data-target=\"#myModal\">\n" +
                    "                <img src=\"../img/add.jpg\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "    </div>";
                let page_ = "    <div id=\"page\">\n" +
                    "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                    "        <span class=\"page_detail actived\">当前页</span>\n" +
                    "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                    "    </div>";
                $(classB).appendTo($("#library"));
                $(page_).appendTo($("#library"));
            }else {
                let classB1 = "    <div class=\"classify\">\n" +
                    "        <div class=\"book\">\n" +
                    "            <a data-toggle=\"modal\" data-target=\"#myModal\">\n" +
                    "                <img src=\"../img/add.jpg\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[0].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[0].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[0].imgUrl + "\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[1].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[1].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[1].imgUrl + "\" />\n" +
                    "        </div>\n" +
                    "    </div>";
                $(classB1).appendTo($("#library"));
                let classB2 = "    <div class=\"classify\">\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[2].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a  onclick=\"handleDetails(this)\" data-index-book=\"" + data[2].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[2].imgUrl + "\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[3].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a  onclick=\"handleDetails(this)\" data-index-book=\"" + data[3].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[3].imgUrl + "\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[4].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[4].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[4].imgUrl + "\" />\n" +
                    "        </div>\n" +
                    "    </div>";
                $(classB2).appendTo($("#library"));
                let classB3 = "    <div class=\"classify\">\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[5].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a  onclick=\"handleDetails(this)\" data-index-book=\"" + data[5].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[5].imgUrl + "\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[6].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[6].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[6].imgUrl + "\" />\n" +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div class=\"book\">\n" +
                    "            <div class = \"detials\">\n" +
                    "                <p>" + data[7].name + "</p>\n" +
                    "            </div>\n" +
                    "            <a onclick=\"handleDetails(this)\" data-index-book=\"" + data[7].id + "\" target=\"_self\">\n" +
                    "                <img src=\"http://47.94.97.26:8080/BSP" + data[7].imgUrl + "\" />\n" +
                    "        </div>\n" +
                    "    </div>";
                $(classB3).appendTo($("#library"));
                let page_ = "    <div id=\"page\">\n" +
                    "        <span class=\"page_detail\" data-index-page = 'previous' onclick=\"handlePage(this)\">上一页</span>\n" +
                    "        <span class=\"page_detail actived\">当前页</span>\n" +
                    "        <span class=\"page_detail\" data-index-page = 'next' onclick=\"handlePage(this)\">下一页</span>\n" +
                    "    </div>";
                $(page_).appendTo($("#library"));
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
    // image = image.split(',')[1];
    $("#btn_add_book").click(function(){
        // console.log(image);
        let data = {};
        data = {
            name: $("#book_name").val(),
            type: $("#book_type").val(),
            author: $("#book_author").val(),
            intro: $("#book_intro").val(),
            img: image.split(',')[1]
        };
        data = JSON.stringify(data);
        console.log(data);
        $.ajax({
            type: "post",
            url: "http://47.94.97.26:8080/BSP/addbook",
            headers: {'Authorization': storage.token},
            data: data,
            success: function(res) {
                let data = JSON.parse(res);
                console.log(data.status);
                if(data.status){
                    window.location.reload();
                }else{
                    alert("增加图书失败！");
                }
            },
            error: function(res){
                alert("添加失败"+JSON.stringify(res));
            }
        });
    });
};