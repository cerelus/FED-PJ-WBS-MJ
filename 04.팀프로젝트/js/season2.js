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


    /** 4번 컨텐츠 **/
    // 1. 대상선정

    // (1) 대상선정
    let slist = document.querySelectorAll(".slide li");

    // (2) li 순번지정
    slist.forEach((ele,idx)=>{
        // data-seq 사용자정의 속성에 순번넣기
        ele.setAttribute("data-seq",idx);
    }); // forEach

    // 1. 버튼 클릭시 다음슬라이드 이동
    
    // (1) 대상선정
    // 화살표버튼
    const sbtn = document.querySelectorAll(".sbtn");
    // 슬라이드
    const slide3 = document.querySelector(".slide3");

    // 광클금지변수 : 0 혀용, 1 불허용
    let prot = 0;

    // (2) 슬라이드 변경함수
    const goSlide = (seq) => {

        // 광클금지 설정
        if(prot) return;
        prot = 1; // 잠금
        // 슬라이드 이동시간이 0.4초이기때문에 이동완료후 잠금을 풀어준다.
        setTimeout(()=>{
            prot = 0; // 잠금해제
        }, 400);

        // 현재의 슬라이드 li - 첫번째li 자르기 위해서
        let clist = slide3.querySelectorAll("li");

        // 방향에 따른 분기
        // 오른쪽버튼 클릭시
        if(seq){
            // 슬라이드 이동
            slide3.style.left = "-100%";
            slide3.style.transition = "left .4s ease-in-out";

            // 슬라이드 이동후 첫번째li잘라 맨뒤로 보내기
            setTimeout(()=>{
                // 첫번째 li 잘라 맨뒤로 보내기
                slide3.appendChild(clist[0]);
                // 동시에 left값 0으로 변경
                slide3.style.left = 0;
                // left값 0으로 변하는것에 대한 트랜지션 없애기
                slide3.style.transition = "none";
            }, 400); // setTimeout
            // 400 = 0.4s - 슬라이드 이동후(0.4초) 동작하도록 설정
        } // if //
        // 왼쪽버튼 클릭시
        else{
            // 슬라이드 이동전 마지막li잘라 맨앞으로 보내기
            // 마지막li를 첫번째li 앞으로 이동시키기
            slide3.insertBefore(clist[clist.length-1], clist[0]);
            // 동시에 left값을 -100%로 바꾸기
            slide3.style.left = "-100%";
            // 트랜지션 없애기
            slide3.style.transition = "none";

            // 그 이후 슬라이드 이동
            /* 동일속성인 left가 같은 코딩처리공간에 있기때문에 left가 동시에 실행되서 트랜지션이 적용되지않는다.
               따라서 setTimeout을 사용해 두 코드의 실행공간을 분리해야 효과가 나타난다.
                -> setTimeout, setInterval 등 타이밍함수를 주게되면 현재 메모리(스택)에서 처리되지않고
                   별도의 메모리 공간(큐)에서 처리되기 때문에 동시에 실행되지 않는다. */
            setTimeout(()=>{
                slide3.style.left = "0";
                slide3.style.transition = "left .4s ease-in-out";
            },0);
        } // else //


        // 2. 슬라이드순번과 같은 블릿 li에 on클래스 주기

        // (1) 대상선정 : .indic li
        const indic = document.querySelectorAll(".indic li");

        // (2) 현재슬라이드 순번과 같은 블릿 표시하기
        // 현재 베너리스트 업데이트 -> 이벤트발생 후 이기때문이다.
        clist = slide3.querySelectorAll("li");
        // 첫번째 슬라이드 순번 읽어오기
        console.log("현재순번:",clist[0].getAttribute("data-seq"));
        /* 오른쪽 버튼 클릭시 슬라이드 이동후 기존의 첫번째 슬라이드 잘라지기때문에 두번째 슬라이드 번호를 읽어야한다.
            -> seq값과 일치함 */

        // 현재 슬라이드 번호 읽어오기
        let cseq = clist[seq].getAttribute("data-seq");

        // 블릿초기화
        for(let x of indic) x.classList.remove("on");

        // 읽어온 순번에 해당하는 블릿에 on클래스 부여
        indic[cseq].classList.add("on");

        
    }; // goSlide 함수

    // 3. 이동버튼에 이벤트 설정하기
    sbtn.forEach((ele,idx)=>{
        ele.onclick = () => {
            // 먼저 자동넘김 지우기 함수호출
            clearAuto();
            // 슬라이드 넘김 함수호출
            goSlide(idx);
        }; // click
    }); // forEach

    /*************************************************/

    // 0. 변수설정
    // 인터발함수 지우기위한 변수
    let autoI;
    // 타임아웃함수 지우기위한 변수
    let autoT;

    // 1. 슬라이드 자동넘김 함수
    function autoSlide(){
        // 슬라이드가 기본 오른쪽방향으로 흘러가기때문에 매개변수 1을 셋팅함
        autoI = setInterval(()=>goSlide(1),3000);
    } // autoSlide 함수
    // 슬라이드 자동넘김 호출
    autoSlide();

    // 2. 자동넘김(인터발) 지우고 일정시간후 다시셋팅
    function clearAuto(){
        // 인터발 지우기
        clearInterval(autoI);
        /* 버튼 여러번 클릭할때마다 타임아웃이 여러개 셋팅되서 쓰나미실행된다.
            -> 버튼클릭시 타임아웃을 반드시 지워줘야한다. */
        clearTimeout(autoT)
        // 다시 작동하도록 타임아웃으로 인터발함수 호출
        autoT = setTimeout(autoSlide,5000);
    } // clearAuto 함수
} // loadFn()
