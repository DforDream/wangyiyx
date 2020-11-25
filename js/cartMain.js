define(["jquery", "goodsDescMain"], function ($, goodsDescMain) {
    // 购物车 数据加载
    function download() {
        $.ajax({
            url: "../data/goodsDesc.json",
            success: function (data) {
                var goods = localStorage.getItem("goods");
                var goodsArr = JSON.parse(goods);
                var dataArr = data.data;
                for (var i = 0, leni = dataArr.length; i < leni; i++) {
                    for (var j = 0, lenj = goodsArr.length; j < lenj; j++) {
                        if (dataArr[i].id == goodsArr[j].id) {
                            $(`<div>
                            <input type="checkbox" checked>
                            <img src="${dataArr[i].url}" alt="">
                            <span>${dataArr[i].name}</span>
                            <b>￥<em>${dataArr[i].nowPrice}</em></b>
                            <del>￥<em>${dataArr[i].totalPrice}</em></del>
                            <div goods_id="${dataArr[i].id}">
                               <span class="reduce">-</span>
                               <input type="text" value="${goodsArr[j].num}" maxlength="2" class="l ipt">
                               <span class="add">+</span>
                            </div>
                            <strong>￥123</strong>
                            <a href="javascript:;" class="delete">删除</a>
                        </div>`).appendTo(".goodsList");
                        }
                    }
                }

                total();
                // 计算价格和商品数量等
                function total() {
                    var $divs = $(".goodsList").children("div");
                    var num = 0;
                    var totalPrice = 0;
                    var nowPrice = 0;
                    for (var i = 0, leni = $divs.length; i < leni; i++) {
                        if ($divs.eq(i).children("input").prop("checked")) {
                            num += parseInt($divs.eq(i).children("div").children(".ipt").val());
                            nowPrice += parseFloat($divs.eq(i).children("b").children("em").text()) * parseInt($divs.eq(i).children("div").children(".ipt").val());
                            totalPrice += parseFloat($divs.eq(i).children("del").children("em").text()) * parseInt($divs.eq(i).children("div").children(".ipt").val());

                            var goodtotal = parseFloat($divs.eq(i).children("div").children(".ipt").val() * parseFloat($divs.eq(i).children("b").children("em").text()));
                            goodtotal = Math.round(goodtotal * 100) / 100;
                            $divs.eq(i).children("strong").text("￥" + goodtotal);
                        }
                    }
                    var discountPrice = totalPrice - nowPrice;
                    discountPrice = Math.round(discountPrice * 100) / 100;
                    nowPrice = Math.round(nowPrice * 100) / 100;
                    totalPrice = Math.round(totalPrice * 100) / 100;
                    if (num == 0) {
                        $(".total").children("span").text("全选")
                    } else {
                        $(".total").children("span").text("全选(" + num + ")");
                    }

                    $(".total").children("div").children("p").eq(0).children("span").text("￥" + totalPrice);
                    $(".total").children("div").children("p").eq(1).children("span").text("-￥" + discountPrice);
                    $(".total").children("p").children("strong").text("￥" + nowPrice);
                }

                allChecked();
                // 是否全选
                function allChecked() {
                    var $ipts = $(".goodsList").children("div").children("input:checkbox");
                    $(".all").click(function () {
                        if ($(this).prop("checked")) {
                            for (var i = 0, leni = $ipts.length; i < leni; i++) {
                                $ipts.eq(i).prop("checked", "checked");
                            }
                            $(".all").prop("checked", "checked");
                        } else {
                            for (var i = 0, leni = $ipts.length; i < leni; i++) {
                                $ipts.eq(i).prop("checked", "");
                            }
                            $(".all").prop("checked", "");
                        }
                        total();
                    })
                    $(".goodsList div").on("click", "input:checkbox", function () {
                        var flag = true;
                        for (var i = 0, leni = $ipts.length; i < leni; i++) {
                            if (!$ipts.eq(i).prop("checked")) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            $(".all").prop("checked", "checked");
                        } else {
                            $(".all").prop("checked", "");
                        }
                        total();
                    })
                }

                spanClick();
                // + - 功能实现
                function spanClick() {
                    $(".goodsList .ipt").blur(function () {
                        $(this).attr("value", parseInt($(this).val()));
                        var id = $(this).parent().attr("goods_id");
                        addCart(id, $(this).attr("value"));
                        total();
                    })
                    $(".goodsList .add,.goodsList .reduce").click(function () {
                        if (this.className == "add") {
                            var num = parseInt($(this).siblings(".ipt").val())
                            num++;
                            if (num > 99) {
                                num = 99;
                                alert("该商品最多购买99件");
                            }
                        } else {
                            var num = parseInt($(this).siblings(".ipt").val())
                            num--;
                            if (num < 1) {
                                num = 1;
                                alert("该商品最少购买1件");
                            }
                        }
                        $(this).attr("value", num);
                        $(this).siblings(".ipt").val(num);
                        var id = $(this).parent().attr("goods_id");
                        addCart(id, $(this).attr("value"));
                        total();
                    })
                }


                // 加入购物车
                function addCart(id, value) {
                    var goods = localStorage.getItem("goods");
                    var arr = JSON.parse(goods);
                    for (var i = 0, leni = arr.length; i < leni; i++) {
                        // console.log(arr[i].id);
                        // console.log(id);
                        if (arr[i].id == id) {
                            if (value >= 99) {
                                value = 99;
                            }
                            arr.splice(i, 1);
                            arr.push({
                                "id": id,
                                "num": value
                            });
                            localStorage.setItem("goods", JSON.stringify(arr));
                            return;
                        }
                    }
                }

                // 点击删除按钮
                $(".delete").click(function () {
                    deleteGood(this);
                    total();
                })

                // 点击批量删除按钮
                $(".deleteAll").click(function () {
                    var $ipts = $(".goodsList").children("div").children("input:checkbox");
                    for (var i = 0, leni = $ipts.length; i < leni; i++) {
                        if ($ipts.eq(i).prop("checked")) {
                            deleteGood($ipts.eq(i));
                        }
                    }
                    total();
                })

                // 删除商品函数封装
                function deleteGood(dom) {
                    $(dom).parent("div").remove();
                    var id = $(dom).siblings("div").attr("goods_id");
                    var goods = localStorage.getItem("goods");
                    var arr = JSON.parse(goods);
                    for (var i = 0, leni = arr.length; i < leni; i++) {
                        if (arr[i].id == id) {
                            arr.splice(i, 1);
                            localStorage.setItem("goods", JSON.stringify(arr));
                            return;
                        }
                    }
                }








            },
            error: function (err) {
                console.log(err);
            }
        })
    }



    return {
        download: download
    }
})