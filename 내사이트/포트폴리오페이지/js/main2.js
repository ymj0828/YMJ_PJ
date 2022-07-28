$(() => {

    function txt(){
        const txt = document.querySelector('#txt')

        function play(){txt.classList.add("on")};
        timer=setTimeout(play,3000);
     }
     txt();
});