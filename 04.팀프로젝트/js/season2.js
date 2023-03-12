// 로드구역
window.addEventListener("DOMContentLoaded", loadFn);

// 로드함수
function loadFn() {
    /** 2번 컨텐츠 **/
    // 1. 대상선정
    const slide = document.querySelectorAll(".slide li");

    // 슬라이드번호 변수
    let snum = 0;
    // 슬라이드 개수
    let scnt = document.querySelectorAll(".slide li").length;

    // 2. 페이드효과 함수선언
    function goFade() {
        // 클래스on 초기화
        for (let x of slide) x.classList.remove("on");
        // 클래스on 넣기
        slide[snum].classList.add("on");
        // 슬라이드번호 증감
        snum++;
        // 한계값
        if (snum === scnt) snum = 0;
    } // goFade()

    // 3. 함수호출
    // 함수최초호출
    goFade();

    // 5초간격으로 함수호출
    setInterval(goFade, 5000);


    /** 3번 컨텐츠 **/
    // 1. 대상선정
    // 박스버튼
    const btns = document.querySelectorAll(".btns div");
    // 슬라이드
    const slide2 = document.querySelectorAll(".slide2 li");
    // 화살표버튼 - 미디어쿼리용
    const abtn = document.querySelectorAll(".abtn");

    // 슬라이드번호 변수
    snum = 1;
    // 슬라이드개수
    scnt = slide2.length;

    // 2. 이벤트설정 - 함수호출
    // (1) 박스버튼 클릭이벤트
    btns.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAll();
            // 셋팅
            addCls(slide2[idx]);
            addCls(ele);
        }; // click
    }); // forEach

    // (2) 화살표버튼 클릭이벤트
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAll();
            // idx - 방향분기
            if (idx) {
                addCls(slide2[snum]);
                snum++;
            } // if
            else {
                addCls(slide2[snum]);
                snum--;
            } // else

            // 한계값
            if (snum === -1) snum = scnt - 1;
            //끝다음->처음
            else if (snum === scnt) snum = 0;
        }; // click
    }); // forEach

    // 3. 함수선언
    // (1) 클래스 초기화함수
    function clearAll() {
        // slide2.length === btns.length
        for (i = 0; i < scnt; i++) {
            removeCls(slide2[i]);
            removeCls(btns[i]);
        } // for
    } // clearAll()

    // (2) 클래스 추가/제거함수
    const addCls = (x) => x.classList.add("op1");
    const removeCls = (x) => x.classList.remove("op1");

} // loadFn()
