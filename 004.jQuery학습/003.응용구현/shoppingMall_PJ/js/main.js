// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

////// 제이쿼리 블록 /////////////////
$(()=>{

    // 호출확인
    console.log("로딩완료!");

    /************************************ 
        [ 가로방향 배너 요구사항 ]

        1. 오른쪽 버튼 클릭시 배너는 오른쪽에서
        왼쪽방향으로 이동하여 다음 슬라이드가 보임

        2. 왼쪽버튼 클릭시 배너는 왼쪽에서
        오른쪽방향으로 이동하여 이전 슬라이드가 보임

        3. 모든 배너는 무한이동을 원칙으로 한다!

        4. 배너이동시 배너의 순번을 블릿으로 표시한다

        5. 자동넘김이 셋팅되어 있으며 사용자가 조작시
        자동넘김이 멈춰지고 일정시간 놔두면 다시 자동넘김작동함

    ************************************/


        // 이벤트 대상: .abtn
        // 이벤트 : click() 메서드 사용
        // 양쪽버튼 구분 : .ab1(왼쪽버튼) / .ab2(오른쪽버튼)
        // 변경대상: #slide
        // 변경내용: 슬라이드의 left값을 이동하여 애니메이션함!
        let slide = $("#slide");

        // 변경에 사용할 제이쿼리 메서드: 
        // animate({CSS속성},시간,이징,함수)

        // 변경대상: 블릿 - .indic li
        let indic = $(".indic li");

        // 광클 금지상태변수
        let prot = 0; // 1-불허용, 0-허용

        // 애니메이션 시간 변수
        const aniT = 600;

        // 애니메이션 이징 변수
        const aniE = "easeInOutQuint";

        $(".abtn").click(function(){

            // console.log("진입:",prot);

            /// 광클금지 ////////
            if(prot) return;
            prot = 1;//잠금!
            setTimeout(()=>prot=0,aniT);
            // 0.6초후 prot=0 잠금해제!
            
            // console.log("통과:",prot);

            // 1. 오른쪽여부
            // is(클래스/아이디명) -> 선택요소해당여부 리턴
            let isR = $(this).is(".ab2");

            // 호출확인(방향확인)
            // console.log("오른쪽버튼인가? ",isR);

            // 2. 버튼별 분기하여 기능구현
            if(isR){ // 오른쪽버튼

                slide.animate(
                {left:"-100%"}, // CSS설정
                aniT, // 시간
                aniE, // 이징
                function(){ // 이동후 실행함수
                    // append(요소) 
                    // -> 자식요소로 맨뒤추가(이동)
                    $(this) // slide
                    .append($("li",this).first())
                    // 첫번째 li요소선택-> 맨뒤로 이동!
                    // $(요소,this) -> 나자신 하위요소
                    // first() 첫번째 요소
                    .css({left:"0"});
                    // 동시에 left값을 0으로 변경!
                }); ///////// animate ///////

            } /////////// if ///////////
            else{ // 왼쪽버튼

                // 맨뒤요소를 맨앞에 이동
                slide
                .prepend(slide.find("li").last())
                // prepend(요소) 자식요소로 앞에 추가(이동)
                // find(요소) 자손요소찾기
                // last() 마직막요소

                // 동시에 left값 -100%
                .css({left:"-100%"})
                // 그후 left값 0으로 애니메이션
                .animate(
                    {left:"0"},
                    aniT,//시간
                    aniE // 이징
                ); ////// animate //////

            } /////////// else ///////////

            // 3. 등장슬라이드와 같은 순번의 블릿변경하기
            // 변경내용: 블릿 li에 class="on"을 주고
            // 나머지 li에는 class="on"을 지운다

            // 같은 순번 슬라이드는 
            // 오른쪽일 때 2번째 슬라이드(순번1)
            // 왼쪽일 때 1번째 슬라이드(순번0)
            // eq(순번) -> 몇번째 요소
            // eq(isR?1:0) -> isR?1:0 -> 3항연산자
            // isR이 true이면(1이면) 1을 출력, 아니면 0출력
            let sseq = 
            slide.find("li").eq(isR?1:0).attr("data-seq")
            console.log("슬순:",sseq);

            // 등장슬라이드 순번과 동일한 블릿순번에
            // 클래스 "on"주기
            // 제이쿼리 클래스주기 메서드는? addClass(클명)
            // 제이쿼리 클래스 컨트롤 메서드
            // 1. addClass()
            // 2. removeClass()
            // 3. toggleClass()

            // 변경대상: .indic li -> indic 변수

            // 해당순번(sseq)의 블릿li에 클래스"on" 넣기
            indic.eq(sseq).addClass("on")
            // 다른 형제요소들 -> siblings()은 클래스 지워!
            .siblings().removeClass("on");


        }); /////////// click /////////////


        // 블릿순번을 결정하기 위한 슬라이드 고유번호
        // 새로운 속성 만들기!!!
        // 새로운 속성은 'data-' 라는 이름으로 시작하면
        // 만들 수 있다!(w3c공식문법)
        // 우리는 각 슬라이드에 'data-seq'라는 이름의
        // 순번 저장용 속성을 만들고자 한다!
        // 이때 사용할 제이쿼리 메서드는 바로~~~~~~~
        // each() 메서드 - for문 안써도됨!
        // each((idx,ele)=>{})
        // idx -> 첫번째 전달변수 : 순번
        // ele -> 두번째 전달변수 : 요소자신

        // 속성넣기 제이쿼리 메서드는? attr(속성명,값)
        // 비교) JS의 속성셋팅은 setAttribute(속성명,값)
        // 비교) JS의 속성읽기는 getAttribute(속성명)
        // 제이쿼리는 하나로 다 됨~!!!!
        // attr(속성명) -> 속성값 읽기
        // attr(속성명, 값) -> 속성값 셋팅


        // 대상: 슬라이드의 li
        slide.find("li").each(function(idx,ele){

            // 'data-seq' 라는 
            // 새로운 속성에 순번을 넣음!
            $(ele).attr("data-seq",idx);
            // console.log(ele,idx);

        }); ///////// each ////////////////



}); ////////////////// jQB ////////////////////
///////////////////////////////////////////////