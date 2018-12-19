/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/16
    Time: 16:54
*/
function restore(event){
    let storage=window.localStorage;
    let id = event.parentNode.getAttribute("data-index-op");
    let data = {};
    data = {
        bookId: id
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/returnbook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let json = JSON.parse(res);
            if (json.status) {
                alert("还书成功！");
            }else{
                alert('还书失败！');
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
window.onload = function(){
    let storage = window.localStorage;
    console.log(storage.token);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/allrent",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            console.log(data[0].bookName);
            for (let i = 0; i < data.length; i++) {
                  let str = "    <tr data-index-op = '"+ data[i].bookId +"'>\n" +
                      "            <td>"+ data[i].bookName +"</td>\n" +
                      "            <td>"+ data[i].day +"</td>\n" +
                      "            <td onclick=\"restore(this)\">还书</td>\n" +
                      "        </tr>";
                $(str).appendTo("#borrowTable tbody");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
};