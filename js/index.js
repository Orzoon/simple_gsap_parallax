window.addEventListener("load", (e) => {
    gsap.registerPlugin(ScrollTrigger);
    const aBtn = document.getElementById("totop");
    aBtn.addEventListener("click", (e) => {
       e.preventDefault();
       window.scrollTo(0,0);
    })
    const logoText = document.querySelectorAll(".dawn");
    // const offTop = [30,50,70,120,150,160,190,190,200,210,300];
    let offTop = [-40,30,80,120,150,160,190,190,200,290,300];
    const scrubTop = [1,2,1.5,1,1,1.5,1.5,1.8,2,2.5,3];
    // grabbing all svgTopImageContainers
    const con =document.querySelectorAll(".common_container");
    // text appearance
    const t1 = gsap.timeline({})
    // landscapes
    const t2 = gsap.timeline({})
    const masterTimeline = gsap.timeline({delay: 0.3, onComplete: () => {
        setRatioValue();
        clearStyles();
        setScrolls();
    }})
    masterTimeline.add(t2)
    masterTimeline.add(t1, "<1")
    t1.from(logoText, {
        delay: 0,
        opacity: 0,
        y: -40,
        duration: 0.6,
        stagger: 0.2
    })
    const commonOpt = {
        ease: "back.out(0.8)",
        delay: 0,
        y: window.innerHeight + 50,
    }
    t2.from(con[0],{
        delay: 0,
        opacity: 0,
        duration: 1.5,
    })
    .from(con[1], {
        duration: 2,
       ...commonOpt,
    }, "<-0.3")
    .from(con[2], {
        duration: 2,
        ...commonOpt
    }, "<0.1") 
    .from(con[3], {
        duration: 2,
        ...commonOpt
    }, "<0.1") 
    .from(con[4], {
        duration: 1.5,
        ...commonOpt
    }, "<0.3") 
    .from(con[5], {
        duration: 2,
        ...commonOpt
    }, "<-0.4") 
    .from(con[6], {
        duration: 2,
        ...commonOpt
    }, "<-0.1") 
    .from(con[7], { // tower
        duration: 1.2,
        ...commonOpt
    }, "<0.6") 
    .from(con[8], {// after tower
        duration: 2,
        ...commonOpt
    }, "<-0.6") 
    .from(con[9], {
        duration: 2,
        ...commonOpt
    }, "<") 
    .from(con[10], {
        duration: 2,
        ...commonOpt
    },"<-0.1") 

    function setScrolls(){
        // ScrollTrigger.create({
        //     trigger: ".mainTopContainer",
        //     //start: "top top",
        //     //end: "+=500",
        //     //pin: true,
        //     //pinSpacing: false
        // })
         // looping through each and creating the gsapScrollTrigger
        con.forEach((svgCon, index) => {
            gsap.to(svgCon, {
                scrollTrigger: {
                    trigger: svgCon,
                    start: "top top",
                    end: "bottom top",
                    //scrub: scrubTop[index] ? scrubTop[index] : 1.5
                    scrub: scrubTop[index] === "true" ? true : scrubTop[index],
                    invalidateOnRefresh: true,
                },
                duration: 1,
                y: () => (offTop[index] ? -offTop[index] : 1)
            })
        });
    }

    function clearStyles(){
        const gapContainer = document.querySelector(".gapContainer");
        gapContainer.style.display = "block";
        //document.body.style.overflowY = "visible";
        //window.onscroll = function () { window.scrollTo(0, 0); };
    } 
    
    function setRatioValue(){
        const w = window.innerWidth;
        const h = window.innerHeight;
        const ratio = w/h; 
        console.log("ratio",ratio)
        if(ratio < 0.7){
            offTop = [60+90,90 +90,130+95,150+80,160+70,190+80,225+50,290,300,300,280];
        }
        else if(ratio < 0.9 ){
            offTop.length = 0;
            offTop = [30,90,130,150,160,190,225,230,240,260,230];
        }
        
    }

    ScrollTrigger.addEventListener("refreshInit", setRatioValue);
   

})