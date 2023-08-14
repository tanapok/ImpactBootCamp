"use strict";

const form = document.querySelector('#order-form');


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    let transormedData = {};
    for (const [key, value] of formData.entries()) {
        if (transormedData[key]) {
            transormedData[key] = transormedData[key].concat(", ", value);
        } else {
            transormedData[key] = value;
        }
    }
    const message = `
喜西茶 XIXI TEA 喜西茶 XIXI TEA
XIXI TEA 喜西茶 XIXI TEA 喜西茶
----------------------------------------
您的订单已经生成，
请您等候奶茶送达！
----------------------------------------
奶茶口味：${transormedData['flavour']}
数量：${transormedData['quantity']}
杯型：${transormedData['cup-type']}
甜度：${transormedData['sweet-degree']}
免费小料：${transormedData['free-ingredients'] ? transormedData['free-ingredients'] : '无'}
加价小料：${transormedData['paid-ingredients'] ? transormedData['paid-ingredients'] : '无'}
是否加冰：${transormedData['add-ice']}
是否去茶底：${transormedData['remove-tea']}
地址：${transormedData['address']}
手机号：${transormedData['phone-number']}
期待送达时间：${transormedData['delivery-time']}
备注：${transormedData['remark']}
支付方式：${transormedData['payment']}
----------------------------------------
喜西茶，和喜东茶一起喜茶！
    `;
    window.alert(message);
});
