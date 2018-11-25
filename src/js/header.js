export default function () {
    const navLiNodes = document.querySelectorAll('.nav li');
    const arrowNode = document.querySelector('.arrow');
    const ulNode = document.querySelector('#content>ul');
    const contentNode = document.querySelector('#content');

    //缓存高度
    let contentHeight = contentNode.offsetHeight;
    //缓存小箭头一半的宽度
    const arrowHalfWidth = arrowNode.offsetWidth / 2;
    //代表li的下标
    let nowIndex = 0;

    document.onmousewheel = wheel;
    document.addEventListener && document.addEventListener('DOMMouseScroll', wheel);
    let whellTimer=null;
    function wheel(event) {
        event = event || window.event;

        clearTimeout(whellTimer);
        whellTimer= setTimeout(()=>{

            let flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            }
            switch (flag) {
                case 'up' :
                    if (nowIndex>0) {
                        nowIndex--;
                        move(nowIndex);
                    }
                    break;
                case 'down' :
                    if (nowIndex<4) {
                        nowIndex++;
                        move(nowIndex);
                    }
                    break;
            }
        },200);



        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

//清除样式
function move(nowIndex) {
    for (var j = 0; j < navLiNodes.length; j++) {
        navLiNodes[j].className = '';
    }
    navLiNodes[nowIndex].className = 'active';
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    ulNode.style.top = - nowIndex * contentHeight+'px';
}



    //给每个导航一个点击事件
    for (let i = 0; i < navLiNodes.length; i++) {
        navLiNodes[i].onclick = function () {
            nowIndex=i;
            move(nowIndex);
        };
    }
    arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

    //当浏览器窗口改变的时候  让小箭头和ul 归位
    window.onresize=function () {
        arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
        contentHeight = contentNode.offsetHeight;
        ulNode.style.top = - nowIndex * contentHeight+'px';
    };
}

