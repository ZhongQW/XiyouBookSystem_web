/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/8
    Time: 14:23
*/
function handleRemove(event){
    let storage = window.localStorage;

    let  id = event.parentNode.getAttribute("data-index-status");
    let data = {};
    data = {
        bookId: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/deletebook\n",
        headers: {'Authorization': storage.token},
        data: data,
        success: function (res) {
            let json = JSON.parse(res);
            if(json.status){
                alert("下架成功！");
            }else{
                alert("下架失败");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}
window.onload = function() {
    let storage = window.localStorage;

    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/mybook",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            // console.log(data[0]);
            // console.log(data[1]);
            for (let i = 0; i < data.length; i++) {
                let str = '';
                if(data[i].status == '3'){
                    str = "<tr data-index-status = "+ data[i].bookId +">\n" +
                        "                        <td>"+ data[i].name +"</td>\n" +
                        "                        <td>已借出</td>\n" +
                        "                        <td>归还后方可下架</td>\n" +
                        "                    </tr>"
                }else if(data[i].status == '0'){
                    str = "<tr data-index-status = "+ data[i].bookId +">\n" +
                        "                        <td>"+data[i].name+"</td>\n" +
                        "                        <td>在架</td>\n" +
                        "                        <td class=\"pointer\" onclick=\"handleRemove(this)\">下架</td>\n" +
                        "                    </tr>"
                }
                $(str).appendTo("#div1 tbody");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}

