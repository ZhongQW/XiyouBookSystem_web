function borrow(event){
    let storage=window.localStorage;
    let id = event.parentNode.getAttribute("data-index-app");
    let data = {};
    data = {
        bookId: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addrent",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let json = JSON.parse(res);
            if (json.status) {
                alert("借阅成功！");
            }else{
                alert('你有书逾期未还，不可借阅！');
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}

window.onload =function(){
    let storage=window.localStorage;
    console.log(storage.token);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/allreserve",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let str = '';
                if(data[i].status == '3'){
                    str = "<tr data-index-app=\""+ data[i].bookId +"\">\n" +
                        "            <td>"+ data[i].bookName +"</td>\n" +
                        "            <td>已借阅</td>\n" +
                        "            <td>不可借阅</td>\n" +
                        "        </tr>";
                }else if(data[i].status == '0'){
                    str = "<tr data-index-app=\""+ data[i].bookId +"\">\n" +
                        "            <td>"+ data[i].bookName +"</td>\n" +
                        "            <td>在架</td>\n" +
                        "            <td onclick=\"borrow(this)\">借书</td>\n" +
                        "        </tr>";
                }else if(data[i].status == '2'){
                    str = "<tr data-index-app=\""+ data[i].bookId +"\">\n" +
                        "            <td>"+ data[i].bookName +"</td>\n" +
                        "            <td>已借阅</td>\n" +
                        "            <td>不可借书</td>\n" +
                        "        </tr>";
                }
                $(str).appendTo("#appointtable tbody");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });

}