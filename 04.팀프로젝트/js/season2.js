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
    const abtn = document.querySelectorAll(".slidebx .sbtn");

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
    

    // (2) li 순번지정
    

    // 1. 버튼 클릭시 다음슬라이드 이동
    
    // 1. 대상선정
    // 슬라이드
    let slist = document.querySelectorAll(".slide3 li");
    let slide3= document.querySelector(".slide3");
    // 화살표버튼
    const sbtn = document.querySelectorAll(".sbx .sbtn");
    const indic = document.querySelectorAll(".indic li");
    // 광클금지변수
    let prot = 0;

    // li 순번 지정해서 속성에 순번넣기
    slist.forEach((ele,idx)=>{
        ele.setAttribute("data-seq",idx);
    }); // forEach

    const goSlide2 = (idx) => {
        // 광클금지 설정
        if(prot) return;
        prot = 1; // 잠금
        
        setTimeout(()=>{
            prot = 0; // 잠금해제
        }, 400);

        console.log(idx);
        // // 광클금지 설정
        // if(prot) return;
        // prot = 1; // 잠금
        
        // setTimeout(()=>{
        //     prot = 0; // 잠금해제
        // }, 400);

        // 현재의 슬라이드 li - 첫번째li 자르기 위해서
        let clist = slide3.querySelectorAll("li");
        console.log(clist[0]);
        let cseq = clist[0].getAttribute("data-seq");
        let bseq = idx-cseq;

        if(bseq === 0) return;
       else if((bseq > 0) || (bseq === -2)) { // next
            // clist = slide3.querySelectorAll("li");
            // cseq = clist[0].getAttribute("data-seq");
        // 슬라이드 이동
        if(bseq === -2) bseq = 1;

        slide3.style.left = -100*(bseq)+"%";
        slide3.style.transition = "left .4s ease-in-out";

        // 슬라이드 이동후 첫번째li잘라 맨뒤로 보내기
        setTimeout(()=>{
            console.log(slide3);
        //     // 첫번째 li 잘라 맨뒤로 보내기
        for(i=0;i<bseq;i++){
            clist = slide3.querySelectorAll("li");
            slide3.appendChild(clist[0]);console.log(clist[0]);
            slide3.style.left = 0;
            slide3.style.transition = "none";}
        }, 400); // setTimeout
        }

        else{ 
            bseq = -bseq
            // 슬라이드 이동전 마지막li잘라 맨앞으로 보내기
                // 마지막li를 첫번째li 앞으로 이동시키기
                for(i=0;i<bseq;i++){
                clist = slide3.querySelectorAll("li");
                slide3.insertBefore(clist[clist.length-1], clist[0]);}
                // 동시에 left값을 -100%로 바꾸기
                slide3.style.left = -100*(bseq)+"%";
                // 트랜지션 없애기
                slide3.style.transition = "none";
    
                // 그 이후 슬라이드 이동
                setTimeout(()=>{
                    slide3.style.left = "0";
                    slide3.style.transition = "left .4s ease-in-out";
                },0);
            }
    };


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


        // 2. 슬라이드순번과 같은 li에 on클래스 주기

        // (1) 대상선정 : .indic li
        const indic = document.querySelectorAll(".indic li");

        // (2) 현재슬라이드 순번과 같은 블릿 표시하기
        // 현재 베너리스트 업데이트 -> 이벤트발생 후 이기때문이다.
        clist = slide3.querySelectorAll("li");
        // 첫번째 슬라이드 순번 읽어오기
        // console.log("현재순번:",clist[0].getAttribute("data-seq"));

        // 현재 슬라이드 번호 읽어오기
        let cseq = clist[seq].getAttribute("data-seq");

        // 블릿초기화
        for(let x of indic) x.classList.remove("on4");

        // 읽어온 순번에 해당하는 블릿에 on클래스 부여
        indic[cseq].classList.add("on4");

        
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

    indic.forEach((ele,idx)=>{
        ele.onclick = () => {
            // 먼저 자동넘김 지우기 함수호출
            clearAuto();
            goSlide2(idx);
            // 현재슬라이드 번호
        };
    });

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
