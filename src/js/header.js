export default function () {
    const navLiNodes = document.querySelectorAll('.nav li');
    const arrowNode = document.querySelector('.arrow');
    const arrowHalfWidth = arrowNode.offsetWidth / 2;


    for (let i = 0; i < navLiNodes.length; i++) {
        navLiNodes[i].onclick = function () {
            for (var j = 0; j < navLiNodes.length; j++) {
                navLiNodes[j].className = '';
            }
            this.className = 'active';
            arrowNode.style.left = navLiNodes[i].getBoundingClientRect().left + navLiNodes[i].offsetWidth / 2 - arrowHalfWidth + 'px';
        };
    }
    arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
}