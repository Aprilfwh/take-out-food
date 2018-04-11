function bestCharge(selectedItems) {
  // getOrdered函数获得订餐明细
  function getOrdered(select, all) {
    var order_list =[];
    for(var i=0;i<select.length;i++){
      var temp = {};
      var name;
      var price;
      var id = select[i].split(" x ")[0];//菜品id
      var number = Number(select[i].split(" x ")[1]);//菜品数量
      for(var j=0;j<all.length;j++){
        if(all[j].id === id){
          name=all[j].name;//菜品名
          price=all[j].price;//菜品单价
          break;
        }
      }
      temp.id=id;
      temp.name=name;
      temp.number=number;
      temp.total_price=parseInt(number*price);//该菜品的总价格
      order_list.push(temp);
    }
    return order_list;
  }

//返回最优的价格
  function final_price(order_list, promote) {
    var total_price = 0;
    var half_price=0;
    var half_name=[];
    var price_result=[];
    for(var i=0;i<order_list.length;i++){
      total_price += order_list[i].total_price;
      for(var j=0; j<promote[1].items.length;j++){
        if(promote[1].items[j]===order_list[i].id){
          half_price += order_list[i].total_price/2;
          half_name.push(order_list[i].name)
        }
      }
    }
    var type1_price = total_price;//满30减6优惠时的价格
    var type2_price = total_price - half_price;// 指定菜品半价时的价格
    if(total_price>=30){
      type1_price = total_price - 6;
    }
    if(total_price<30 && half_price===0){
      price_result.push("总计：" +total_price.toString()+"元")
    }
    if(type1_price<=type2_price){
      var promote_type1 = promote[0].type + "，省6元";//优惠方式
      price_result.push(promote_type1);
      price_result.push("总计：" +type1_price.toString()+"元")
    }
    if(type1_price>type2_price){
      var promote_type2 = promote[1].type+"(";
      for(var kk=0;kk<half_name.length-1;kk++){
        promote_type2 += half_name[kk] + '，';
      }
      promote_type2 +=half_name[half_name.length-1]+")，省"+half_price.toString() +"元";
      price_result.push(promote_type2);
      price_result.push("总计：" +type2_price.toString()+"元")
    }

    return price_result;
  }

  //按输出要求返回结果
  function output(order_list, price_result) {
    var result ='============= 订餐明细 =============\n';
    for(var i=0;i<order_list.length;i++){
      result += order_list[i].name + ' x ' + order_list[i].number.toString() + ' = '+order_list[i].total_price.toString()+'元\n';
    }
    result += '-----------------------------------\n';
    if(price_result.length===2){
      result += '使用优惠:\n';
      result += price_result[0] + '\n';
      result += '-----------------------------------\n';
      result +=price_result[1] + '\n';
      result += '===================================';
    }
    else{
      result += price_result[0] +'\n';
      result += '===================================';
    }
    return result;
  }
  var allItems = loadAllItems();
  var promote = loadPromotions();
  console.log(promote);
  var order_list = getOrdered(selectedItems, allItems);
  var price_result = final_price(order_list, promote);
  var result = output(order_list,price_result);
  return result;
}
