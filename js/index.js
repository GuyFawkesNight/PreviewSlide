// 数据定义（实际生产环境中，由后台提供）

var data = [
    { img: 1, h1: 'Creative', h2: 'DUET' },
    { img: 2, h1: 'Friendly', h2: 'DEVIL' },
    { img: 3, h1: 'Tranquilent', h2: 'COMPATRIOT' },
    { img: 4, h1: 'Insecure', h2: 'HUSSLER' },
    { img: 5, h1: 'Loving', h2: 'REBEL' },
    { img: 6, h1: 'Passionate', h2: 'SEEKER' },
    { img: 7, h1: 'Crazy', h2: 'FRIEND' }
];

// 定义通用函数,获得相应的节点元素

var g = function (id) {
    if (id.substr(0, 1) == '.') {
        return document.getElementsByClassName(id.substr(1));
    }

    return document.getElementById(id);
}

// 3.添加幻灯片操作（所有的幻灯片和对应的按钮）
function addSliders() {
    // 获取模板
    var tpl_main = g('template_main').innerHTML
        .replace(/^\s*/, '')
        .replace(/\s*$/, '');  //去掉开头和尾部的空白字符

    var tpl_ctrl = g('template_ctrl').innerHTML
        .replace(/^\s*/, '')
        .replace(/\s*$/, '');

    //定义最终输出HTML的变量

    var out_main = [];
    var out_ctrl = [];

    // 遍历所有数据，构建最终输出的html
    for (i in data) {
        var _html_main = tpl_main.replace(/{{index}}/g, data[i].img)
            .replace(/{{h1}}/g, data[i].h1)
            .replace(/{{h2}}/g, data[i].h2)
            .replace(/{{css}}/g,['','main-i_right'][i%2]);
            
        var _html_ctrl = tpl_ctrl.replace(/{{index}}/g, data[i].img);

        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);

    }

    // 把html回写到html
    g('template_main').innerHTML = out_main.join('');
    g('template_ctrl').innerHTML = out_ctrl.join('');

    // 增加#main_background背景层
    g('template_main').innerHTML += tpl_main
        .replace(/{{index}}/g, '{{index}}')
        .replace(/{{h1}}/g, data[i].h1)
        .replace(/{{h2}}/g, data[i].h2);

    g('main_{{index}}').id = 'main_background';
}

// 4. 定义合适处理幻灯片
window.onload = function () {
    addSliders();
    switchSlider(1);
    setTimeout(() => {
        movePictures();
    }, 100);
}


//幻灯片切换

var switchSlider = function (n) {
    var main = g('main_' + n);
    var ctrl = g('ctrl_' + n);

    //清除所有幻灯片和按钮的激活状态
    var clear_main = g('.main-i');
    var clear_ctrl = g('.ctrl-i');

    for (i = 0; i < clear_ctrl.length; i++) {
        clear_main[i].className = clear_main[i].className.replace('active', '');
        clear_ctrl[i].className = clear_ctrl[i].className.replace('active', '');
    }


    main.className += ' active';
    ctrl.className += ' active';

    setTimeout(() => {
        g('main_background').innerHTML = main.innerHTML;

    }, 100);
}

//动态调整图片的margin-top以使其垂直居中
function movePictures() {
    var pictures = g('.picture');
    for (i = 0; i < pictures.length; i++) {
        pictures[i].style.marginTop = (-1 * pictures[i].clientHeight / 2) + 'px';
    }
}


