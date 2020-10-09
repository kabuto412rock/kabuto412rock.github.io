var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);
function autoEditAndSave(){
    /*滿意度radio單選勾選(隨機)*/
    let radios = $('.evitem').find('input:radio');
    for(let i = 0; i < radios.length/5; i++) {
    let randomNum = Math.floor(Math.random() * 3.8);
    radios[i*5+randomNum].checked=true;
    }
    /* radio單選勾選(隨機)*/
    $('.itemc').each(function(){
        let radios = $(this).find('input:radio');
        let randomNum = Math.floor(Math.random() * radios.length);
        radios[randomNum].checked=true;
    });

    /* 多選隨機*/
    $('.itemr').each(function(){
        let checks = $(this).find('input:checkbox');
        let randomNum = Math.floor(Math.random() * 4);
        checks[0].checked= randomNum>1 ? true : false;
    });
    // 填寫姓名
    let firsts=['羅','梁','宋','唐','許','韓','馮','鄧','曹','彭','曾','蕭','田','董','袁','潘','於','蔣','蔡','余','杜','葉','程','蘇','魏','呂','丁','任','沈','姚','盧','姜','崔','鍾','譚','陸','汪','范','金','石','廖','賈','夏','韋','付','方','白','鄒','孟','熊','秦','邱','江','尹','薛','閆','段','雷','侯','龍','史','陶','黎','賀','顧','毛','郝','龔','邵','萬','錢','嚴','覃','武','戴','莫','孔','向','湯'];
    let lasts=['龍','月','明','德','諾','金','鵬','霞','風','暗','吉','咲','夢','欣','喜','岳','嘉','華','培','桐','甄','均','帥','農','紳','婷','延','宇','雨','羽','瑀','仲','益','藝','良'];
    let randomNum = Math.floor(Math.random() * firsts.length);
    let randomNum2 = Math.floor(Math.random() * lasts.length);
    
    $('#TextBox_fname')[0].value=firsts[randomNum]+ (randomNum%2== 0 ? '小' : '阿') + lasts[randomNum2];
    // 填寫年齡
    let ages = [5,18,23,28,32,40,56,73,89];
    $('input.itemn:text')[0].value=ages[Math.floor(Math.random() * ages.length)];
    // 自動點擊
    $("#Button_save").click();
}
setTimeout(autoEditAndSave, 1500);
