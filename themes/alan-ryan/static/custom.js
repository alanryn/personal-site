gsap.registerPlugin(SplitText);

function init() {
  gsap.set(".logo-wrapper", { autoAlpha: 1 });

  let taglineSplit = new SplitText("logo-h2", { type: "chars, words" });

  let animation = gsap
    .timeline({ defaults: { duration:1 } })
    .from(".my-logo", { width: 0, duration: 0.3, ease: "power1.in" })
    .from(taglineSplit.words, { yPercent: -100, stagger: 0.05, duration: 0.3 });

}

init();
gsap.to(".log-wrapper", {rotation: 27, x: 100, duration: 1});
