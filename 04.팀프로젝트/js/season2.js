// 로드구역
window.addEventListener("DOMContentLoaded", loadFn_car2);


// 로드함수
function loadFn_car2() {
    /************* 공통함수 *************/
    // 대상선정 함수
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);

    // 클래스 추가/제거함수
    const addCls = (x, y) => x.classList.add(y);
    const removeCls = (x, y) => x.classList.remove(y);

    /************* 2번 컨텐츠 *************/
    // 1. 대상선정
    const slide = qsa(".slide li");

    // 슬라이드번호 변수
    let snum = 0;
    // 슬라이드 개수
    let scnt = qsa.length;

    // 2. 함수생성
    function goFade() {
        // 클래스on 초기화
        for (let x of slide) removeCls(x, "on");
        // 클래스on 넣기
        addCls(slide[snum], "on");
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

    /************* 3번 컨텐츠 *************/
    // 1. 대상선정
    // 박스버튼
    const btns = qsa(".btns div");
    // 슬라이드
    const slide2 = qsa(".slide2 li");
    // 화살표버튼 - 미디어쿼리용
    const abtn = qsa(".slidebx .sbtn");

    // 슬라이드번호 변수
    snum = 1;
    // 슬라이드개수
    scnt = slide2.length;

    // 2. 이벤트설정
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
                addCls(slide2[snum],"op1");
                snum++;
            } // if
            else {
                addCls(slide2[snum],"op1");
                snum--;
            } // else

            // 한계값
            if (snum === -1) snum = scnt - 1;
            //끝다음->처음
            else if (snum === scnt) snum = 0;
        }; // click
    }); // forEach

    // 3. 함수생성
    // (1) 클래스 초기화함수
    function clearAll() {
        // slide2.length === btns.length
        for (i = 0; i < scnt; i++) {
            removeCls(slide2[i],"op1");
            removeCls(btns[i],"op1");
        } // for
    } // clearAll()

    /************* 4번 컨텐츠 *************/

    // 1. 대상선정
    // 슬라이드
    let slist = qsa(".slide3 li");
    let slide3 = qs(".slide3");
    // 화살표버튼
    const sbtn = qsa(".sbx .sbtn");
    const indic = qsa(".indic li");
    // 광클금지변수
    let prot = 0;

    // li 순번 지정해서 속성에 순번넣기
    slist.forEach((ele, idx) => {
        ele.setAttribute("data-seq", idx);
    }); // forEach

    // 2. 함수생성
    const goSlide = (seq) => {

        // 광클금지 설정
        if(prot) return;
        prot = 1; // 잠금
        
        setTimeout(()=>{
            prot = 0; // 잠금해제
        }, 400);

        // 현재의 슬라이드 li - 첫번째li 자르기 위해서
        let clist = slide3.querySelectorAll("li");

        // 방향에 따른 분기
        if(seq){
            // 슬라이드 이동
            slide3.style.left = "-100%";
            slide3.style.transition = "left .4s ease-in-out";

            // 슬라이드 이동후 첫번째li잘라 맨뒤로 보내기
            setTimeout(()=>{
                // 첫번째 li 잘라 맨뒤로 보내기
                slide3.appendChild(clist[0]);
                slide3.style.left = 0;
                slide3.style.transition = "none";
            }, 400); // setTimeout

        } // if
        else{
            // 슬라이드 이동전 마지막li잘라 맨앞으로 보내기
            // 마지막li를 첫번째li 앞으로 이동시키기
            slide3.insertBefore(clist[clist.length-1], clist[0]);
            // 동시에 left값을 -100%로 바꾸기
            slide3.style.left = "-100%";
            // 트랜지션 없애기
            slide3.style.transition = "none";

            // 그 이후 슬라이드 이동
            setTimeout(()=>{
                slide3.style.left = "0";
                slide3.style.transition = "left .4s ease-in-out";
            },0);
        } // else

        // 3 슬라이드순번과 같은 이미지에 포커스

        // 대상선정 : .indic li
        const indic = qsa(".indic li");

        // 현재슬라이드 순번과 같은 이미지에
        clist = slide3.querySelectorAll("li");

        // 현재 슬라이드 번호 읽어오기
        let cseq = clist[seq].getAttribute("data-seq");

        // 블릿초기화
        for (let x of indic) removeCls(x, "on4");

        // 읽어온 순번에 해당하는 블릿에 on클래스 부여
        addCls(indic[cseq], "on4");
    }; // goSlide()

    // 시간함수
    // 인터발 삭제 변수
    let autoI;
    // 타임아웃 삭제 변수
    let autoT;

    // 슬라이드 자동넘김 함수
    function autoSlide() {
        autoI = setInterval(() => goSlide(1), 3000);
    } // autoSlide()
    // 함수호출
    autoSlide();

    // 일정시간후 다시셋팅
    function clearAuto() {
        // 인터발 지우기
        clearInterval(autoI);
        clearTimeout(autoT);
        // 다시 호출
        autoT = setTimeout(autoSlide, 5000);
    } // clearAuto()

    // 3. 이벤트설정
    sbtn.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAuto();
            goSlide(idx);
        }; // click
    }); // forEach


        slide3.forEach((ele, idx) => {
            ele.onclick = () => {
                clearAuto();
                goSlide(idx);
            }; // click
        }); // forEach
        
    
} // loadFn()
