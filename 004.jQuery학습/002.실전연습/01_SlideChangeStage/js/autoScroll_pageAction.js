// 자동 스크롤 기능 - autoScroll_pageAction.js

///// 전역변수구역 ///////////////////
// 현재 페이지 번호
let pno = 0;
// 전체 페이지 개수(상수로 변경불가!)
const totnum = 7;
// 광스크롤막기(0-허용,1-불허용)
let psts = 0;

////////////////////////////////////
// 초기화함수
let init;
// 페이지액션함수
let pageAction;
/////////////////////////////////////

$(function () { /// jQB ////////////////////////

    /*//////////////////////////////////////////
        함수명: init(전역변수구역에 선언!)
        기능: 각 페이지액션 대상 요소 초기화
    */ //////////////////////////////////////////
    init = function () {
        // 호출확인
        // console.log("초기화!");

        // 1. 아수라 : 오른쪽 바깥으로 나가있음!
        $("#pg1 .minfo").css({
            left: "150%"
        }); ///////// css ///////////

        // 2. 고산자 : 처음에 안보임!(fadeIn사용예정!)
        $("#pg2 .minfo").hide(); // display:none

        // 3. 인천상륙작전 : 위로 올라가 있음
        $("#pg3 .minfo").css({
            top: "-50%"
        }); ///////// css ///////////

        // 4. 봉이 김선달 : 스케일이 0으로 안보임
        $("#pg4 .minfo").css({
            transform: "translate(-50%,-50%) scale(0)"
        }); ///////// css ///////////
        // 주의사항: transform은 animate에 사용할 수 없다!
        // 이 경우에는 css로 transition을 사용하여 애니메이션함
        // 유의사항: 이미 transform을 translate(-50%,-50%)로
        //          설정하였으므로 scale설정시 둘다 써줘야한다!

        // 5. 비밀은 없다 : 투명상태로 Y축 180도회전
        $("#pg5 .minfo").css({
            transform: "translate(-50%,-50%) rotateY(180deg)",
            opacity: 0
        }); ///////// css ///////////

        // 6. 아가씨 : 중앙에서 스케일 0, 평면회전
        $("#pg6 .minfo").css({
            transform: "translate(-50%,-50%) scale(0) rotate(1000deg)"
        }); ///////// css ///////////

        // 7. 탐정홍길동 : 중앙에서 X축 스케일 10배, 투명도 0
        $("#pg7 .minfo").css({
            transform: "translate(-50%,-50%) scaleX(10)",
            opacity: 0
        }); ///////// css ///////////


    }; ///////////// init함수 ///////////////////
    ////////////////////////////////////////////

    // init함수 최초호출!(함수아래서호출)
    init();

    /*/////////////////////////////////////////////
        함수명: pageAction(전역변수구역에 선언)
        기능: 각 페이지 도착시 요소 등장액션 실행
    */ /////////////////////////////////////////////
    pageAction = function () {

        // 호출확인
        console.log("액션!");

        // 만약 매번 페이지마다 액션을 다시 작동시키려면
        // 초기화함수를 처음에 호출해 준다!
        init();// 초기화호출!

        // 각 페이지 번호에 맞게 액션을 수행한다!

        // 1. 아수라
        if (pno === 0) {
            // 오른쪽에서 중앙으로 날아오기(거미출에 걸리는 효과)
            $("#pg1 .minfo").delay(1000)
                .animate({
                    left: "50%"
                }, 1000, "easeOutElastic"); //// animate ///

        } /////// if ////////////

        // 2. 고산자
        else if (pno === 1) {
            // fadeIn으로 나타나기
            $("#pg2 .minfo").fadeIn(1000);
        } ////// else if ///////////////

        // 3. 인천상륙작전
        else if (pno === 2) {
            // 위에서 아래로 내려오기
            $("#pg3 .minfo")
                .animate({
                    top: "50%"
                }, 1000, "easeOutBounce"); //// animate ///
        } ////// else if ///////////////

        // 4. 봉이 김선달
        else if (pno === 3) {
            // 가운데서 스케일이 커짐(원래상태로!)
            $("#pg4 .minfo").css({
                transform: "translate(-50%,-50%) scale(1)",
                transition: "all 2s ease-out"
            }); ///////// css ///////////

        } ////// else if ///////////////

        // 5. 비밀은 없다
        else if (pno === 4) {
            // 투명도가 원상복귀되면서 Y축 회전
            $("#pg5 .minfo").css({
                transform: "translate(-50%,-50%) rotateY(0deg)",
                opacity: 1,
                transition: "all 1s ease-out"
            }); ///////// css ///////////

        } ////// else if ///////////////

        // 6. 아가씨
        else if (pno === 5) {
            // 중앙에서 스케일 1, 평면회전 원상복귀
            $("#pg6 .minfo").css({
                transform: "translate(-50%,-50%) scale(1) rotate(0deg)",
                transition: "all 1s cubic-bezier(0.11, 0.88, 0.52, 0.99)"
            }); ///////// css ///////////
        } ////// else if ///////////////

        // 7. 탐정홍길동
        else if (pno === 6) {
            // 중앙에서 X축 스케일 원상복귀, 투명도 1
            $("#pg7 .minfo").css({
                transform: "translate(-50%,-50%) scaleX(1)",
                opacity: 1,
                transition: "all 2s cubic-bezier(0.66, 0.13, 0.14, 1.04)"
            }); ///////// css ///////////
        } ////// else if ///////////////

    }; ////////// pageAction함수 ///////////////////
    ////////////////////////////////////////////////

    // pageAction함수 최초호출!
    pageAction();

    /* 
        [ 자동스크롤 구현! ]

        1. 기능: 마우스휠을 위나 아래로 작동시킬때
            페이지가 위나 아래로 자동으로 애니메이션 되는 기능
        
        2. 이벤트: 마우스휠을 움직일때 발생하는 이벤트는?
            - mousewheel (오리지널 이벤트) -> 파이어폭스 지원안함!
            - wheel (신규이벤트-벤더사의 웹표준이 아직아님!) -> 사파리지원안함!
            - DOMMouseScroll (파이어폭스 전용 휠이벤트)
            -> 결론적으로 모두 한꺼번에 지원하는 이벤트가 없으므로
            mousewheel + DOMMouseScroll 을 같이 사용할 것임!

        3. 마우스 휠 이벤트와 함수를 연결하는 방법:
            - on(이벤트명,함수)
            -> on메서드로 어떤 이벤트와도 함수를 연결할 수 있다!
            (참고로 bind(이벤트명,함수) 제이쿼리 버전3 부터 지원중단!)

        4. 마우스휠 이벤트 대상: 보통 document에 적용함

        -> 유의사항!!!
        document, body, window 객체는 막을 수 없다!!!
        - 2019년도에 위의 세가지 중요객체에 대하여 기본기능 막기를
        할수 없도록 브라우저 소스가 업데이트 되었는데 이유는
        모바일에서 에러가 발생하는 문제의 원인으로 지목되어서
        본 3가지 중요객체에 대해서는 preventDefault() 또는
        return false를 사용한 기능막기를 못하도록 하였다!
            
    */

    /////////////// 자동스크롤 구현 ////////////////////
    // 사용메서드: on(이벤트명, 함수) 
    // -> 이벤트를 띄어쓰기로 여러개 쓰면 여러이벤트가 적용됨!
    $(document).on("mousewheel DOMMouseScroll",
        function (e) { //e-이벤트 전달변수

            ////// 광스크롤막기 /////////////
            if (psts) return; //돌아가!
            psts = 1; //불허용상태변경!
            setTimeout(() => {
                psts = 0;
            }, 1200);
            // 1.2초애니시간후 허용상태변경 //


            // e.preventDefault();
            // document에 대한 기본기능 막기가 안되므로
            // 스크롤바를 안보이게 overflow:hidden 설정하여
            // 기본 스크롤이 안되도록 코딩하여 대체한다!

            // 마우스휠 이벤트 함수호출확인!
            // // console.log("마우스휠~~~~!");

            // 마우스 휠의 방향에 따라 페이지번호를 증가/감소
            // 할 것이므로 마우스 휠의 방향을 알아내야한다!!!

            //////////////////////////////
            // 1. 마우스휠 방향 알아내기!///
            //////////////////////////////

            // e변수로 들어오는 이벤트전달값으로 알아낸다!
            e = window.event || e;
            // 이벤트 전달값이 window오리저널 이벤트가 유효하면
            // 사용할 수 있도록 보완코드를 작성해야한다!
            // 변수 = 경우1 || 경우2;
            // 변수에 경우1과 경우2 중 true(유효한것)이 먼저할당됨!

            /* 
                [ 마우스휠 방향을 알아내기 위한 값 -> wheelDelta ]
                - 휠델타란? 마우스의 이벤트에 따라 발생하는
                    이벤트 횟수 및 방향, 이동거리 등의 정보를 제공함
                - ie, chrome 브라우저 공용
                - opera 브라우저는 detail을 사용함
            */
            let delta = e.detail ? e.detail : e.wheelDelta;
            // delta변수에 유효한 설정이 적용되어 할당된다!
            // 조건연산자(삼항연산자) -> 비?집:놀이동산;

            // console.log("휠델타정보:"+delta);
            // 방향 테스트 결과: 
            // 마이너스 -> 아랫쪽스크롤
            // 플러스 -> 윗쪽스크롤
            // 예외) 파이어폭스는 반대방향임!!!

            ///////////////////////////////////////////
            ///// 파이어폭스 일때 델타값 반대로 하기 /////
            // 방법:
            // JS의 내장함수 test() 를 사용하여
            // navigator.userAgent -> 현재 브라우저 정보를 읽어옴
            // "Firefox"라는 정보가 있으면 test() 에서 true리턴함
            // 그래서 if문 안으로 들어가서 처리함(반대부호처리!)

            // // console.log("브라우저정보:"+navigator.userAgent);
            // // console.log("정보여부:"+
            // (/Firefox/i.test(navigator.userAgent)));

            /* 
                [ test() 정규식 메서드 ]
                정규식.test(값) -> 값에 정규식 문자가 있으면 true

                [ 간단한 정규식 표현기호 ]
                1. 정규식 내용은 따옴표를 쓰지 않고 슬래쉬를 사용함
                2. 모든 패턴 문자열을 찾을때는 g라는 플래그문자를 씀
                3. 대소문자 구분없이 찾을때는 i라는 플래그문자를 씀
                예) /,/g 
                    -> 모든 콤마를 찾아라!
                    /firefox/i 
                    -> 대소문자 관계없이 "firefox"문자를 찾아라!
            */

            //// 파이어폭스 브라이우저 이면 델타값 부호를 반대로 한다!!!
            if (/Firefox/i.test(navigator.userAgent)) {
                delta = -delta; // 변수앞에 마이너스는 부호반대!
            } ///////// 파이어폭스여부 if문 /////////////


            //////////////////////////////////////////////
            // 2. 마우스휠 방향에 따라 페이지번호 증감하기!//
            //////////////////////////////////////////////

            if (delta < 0) { // -120 아랫방향 스크롤(다음페이지)
                pno++;
                if (pno === totnum) pno = totnum - 1;
                // 마지막페이지에 고정하기!
            } ////// if ///////////
            else { // 120 윗방향 스크롤(이전페이지)
                pno--;
                if (pno === -1) pno = 0;
                // 첫페이지에 고정하기!
            } /////// else ////////

            // console.log("페이지번호:" + pno);

            //////////////////////////////////////////////
            // 3. 이동할 페이지(.page)의 위치값 알아내기 ///
            //////////////////////////////////////////////

            // 방법: .page의 순서로 위치를 알아냄!
            let pos = $(".page").eq(pno).offset().top;
            // offset().top 은 현재 선택요소의 top위치값

            // console.log("이동위치:" + pos);

            //////////////////////////////////////////////
            // 4. 실제 이동위치로 스크롤 애니메이션 하기 ////
            //////////////////////////////////////////////

            $("html,body").stop().animate({
                scrollTop: pos + "px"
            }, 1200, "easeOutQuint", pageAction);
            // 애니메이션 이동후 pageAction함수 호출하기!!!

            ///////////////////////////////////////////////
            // 5. 페이지번호(pno)에 맞는 GNB 메뉴 변경하기 //
            ///////////////////////////////////////////////
            // 변경대상: .gnb li, .indic li
            $(".gnb li").eq(pno).addClass("on")
                .siblings().removeClass("on");
            $(".indic li").eq(pno).addClass("on")
                .siblings().removeClass("on");
            // 선택된 li 이외의 li형제들 class="on"제거하기



        }); //////////// 자동스크롤 /////////////////////////
    ///////////////////////////////////////////////////


}); //////////////// jQB /////////////////////