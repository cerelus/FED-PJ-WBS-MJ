// 로드구역
window.addEventListener("DOMContentLoaded",loadFn);

// 로드함수
function loadFn(){

    // 대상선정
    const slist = document.querySelectorAll(".slide li");

    // 슬라이드번호 변수
    let snum = 0;
    // 슬라이드 개수
    let scnt = document.querySelectorAll(".slide li").length;
    
    // 페이드효과 함수선언
    function goFade() {
        // 클래스on 초기화
        for (let x of slist) x.classList.remove("on");
        // 클래스on 넣기
        slist[snum].classList.add("on");
        // 슬라이드번호 증감
        snum++;
        // 한계값
        if(snum===scnt) snum=0;
    } // goFade 함수

    // 함수최초호출
    goFade();

    // 5초간격으로 함수호출
    setInterval(goFade,5000);

} // loadFn 함수