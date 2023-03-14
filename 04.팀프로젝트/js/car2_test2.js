// 로드구역
window.addEventListener("DOMContentLoaded", loadFn);

// 로드함수
function loadFn() {
    // 1. 대상선정
    // 슬라이드
    let slist = document.querySelectorAll(".slide3 li");
    let slide3 = document.querySelector(".slide3");
    // 화살표버튼
    const sbtn = document.querySelectorAll(".sbx .sbtn");
    const indic = document.querySelectorAll(".indic li");
    // 광클금지변수
    let prot = 0;

    // li 순번 지정해서 속성에 순번넣기
    slist.forEach((ele, idx) => {
        ele.setAttribute("data-seq", idx);
    }); // forEach

    const btnSlide2 = (idx) => {
        // 광클금지 설정
        if (prot) return;
        prot = 1;

        setTimeout(() => {
            prot = 0;
        }, 400);

        // 현재 슬라이드리스트
        let clist = slide3.querySelectorAll("li");
        // 현재 슬라이드 번호
        let cseq = clist[0].getAttribute("data-seq");
        // gap = 클릭한 슬라이드 순번 - 현재 슬라이드 순번
        let gap = idx - cseq;

        // 현재슬라이드 클릭시 리턴
        if (gap === 0) return;
        // 오른쪽방향
        else if (gap > 0 || gap === -2) {
            // gap === -2 : 마지막슬라이드에서 첫번째슬라이드로 이동시
            if (gap === -2) gap = 1;
            // 슬라이드 이동
            slide3.style.left = -100 * gap + "%";
            slide3.style.transition = "left .4s ease-in-out";

            // 슬라이드 이동후
            setTimeout(() => {
                // 이동한 슬라이드만큼 첫번째 li 잘라 맨뒤로 보내기
                for (i = 0; i < gap; i++) {
                    clist = slide3.querySelectorAll("li");
                    slide3.appendChild(clist[0]);
                }
                slide3.style.left = 0;
                slide3.style.transition = "none";

            }, 400); // setTimeout

        } else {
            gap = -gap;
            // 슬라이드 이동전
            // 이동할 슬라이드만큼 마지막 li잘라 맨앞으로 보내기
            for (i = 0; i < gap; i++) {
                clist = slide3.querySelectorAll("li");
                slide3.insertBefore(clist[clist.length - 1], clist[0]);
            }

            // 슬라이드 이동
            slide3.style.left = -100 * gap + "%";
            slide3.style.transition = "none";

            setTimeout(() => {
                slide3.style.left = "0";
                slide3.style.transition = "left .4s ease-in-out";
            }, 0);
        }

        // 현재 슬라이드순번과 같은 인디케이터에 클래스 주기 //

        // 현재 슬라이드 업데이트
        clist = slide3.querySelectorAll("li");

        // 인디케이터 초기화
        for (let x of indic) x.classList.remove("on4");

        // 클래스 주기
        indic[idx].classList.add("on4");
    }; // btnSlide2()

    // 2. 함수생성
    const arrowSlide2 = (seq) => {
        // 광클금지 설정
        if (prot) return;
        prot = 1;

        setTimeout(() => {
            prot = 0;
        }, 400);

        // 현재 슬라이드리스트
        let clist = slide3.querySelectorAll("li");

        // 방향에 따른 분기
        if (seq) {
            // 슬라이드 이동
            slide3.style.left = "-100%";
            slide3.style.transition = "left .4s ease-in-out";

            // 슬라이드 이동후
            setTimeout(() => {
                // 첫번째 li 잘라 맨뒤로 보내기
                slide3.appendChild(clist[0]);
                slide3.style.left = 0;
                slide3.style.transition = "none";
            }, 400); // setTimeout
        } // if
        else {
            // 슬라이드 이동전
            // 마지막li를 첫번째li 앞으로 이동시키기
            slide3.insertBefore(clist[clist.length - 1], clist[0]);
            slide3.style.left = "-100%";
            slide3.style.transition = "none";

            // 그 이후 슬라이드 이동
            setTimeout(() => {
                slide3.style.left = "0";
                slide3.style.transition = "left .4s ease-in-out";
            }, 0);
        } // else

        // 현재 슬라이드순번과 같은 인디케이터에 클래스 주기 //

        // 현재 슬라이드 업데이트
        clist = slide3.querySelectorAll("li");

        // 현재 슬라이드 번호
        let cseq = clist[seq].getAttribute("data-seq");

        // 인디케이터 초기화
        for (let x of indic) x.classList.remove("on4");

        // 클래스 주기
        indic[cseq].classList.add("on4");
    }; // arrowSlide2()

    // 3. 이벤트 설정
    // 화살표버튼 이벤트
    sbtn.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAuto();
            arrowSlide2(idx);
        }; // click
    }); // forEach

    // 인디케이터 이벤트
    indic.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAuto();
            btnSlide2(idx);
        };
    });

    // 4. 오토슬라이드 함수
    // 인터발 제거
    let autoI;
    // 타임아웃 제거
    let autoT;

    // 1. 슬라이드 자동넘김 함수
    function autoSlide() {
        autoI = setInterval(() => arrowSlide2(1), 3000);
    } // autoSlide()
    // 슬라이드 자동넘김 호출
    autoSlide();

    // 2. 자동넘김 제거후 다시셋팅
    function clearAuto() {
        // 인터발 제거
        clearInterval(autoI);
        // 타임아웃
        clearTimeout(autoT);
        // 다시 작동하도록 호출
        autoT = setTimeout(autoSlide, 5000);
    } // clearAuto()
} // loadFn()
