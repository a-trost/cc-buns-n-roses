import React, { useCallback } from "react";
import BandSvg from "./band";
import gsap from "gsap";
import Credit from "../../components/Credit";

const BurgerBand = ({ slice }) => {
  const svgRef = useCallback((e) => {
    // THE ANIMATION SETUP
    // -------------------------------
    const bandEase = "none";

    // DRINK
    gsap.set("#drink__body", { transformOrigin: "45% 90%" });
    gsap.set("#drink__arm-right", { transformOrigin: "65% 10%", rotate: 10 });
    gsap.set("#drink__arm-right-lower", {
      transformOrigin: "10% 10%",
      rotate: -5,
    });
    gsap.set("#drink__frytar", { transformOrigin: "10% 90%" });

    gsap.set("#drink__arm-left-lower", {
      transformOrigin: "3% 95%",
      rotate: -5,
    });
    gsap.set("#drink__body-torso", { transformOrigin: "30% 68%" });
    gsap.set("#drink__straw", { transformOrigin: "10% 100%", rotate: 3 });
    gsap.set("#drink__straw-upper", {
      transformOrigin: "10% 100%",
      rotate: 15,
    });
    gsap.set("#drink__squish-lines", {
      transformOrigin: "100% 50%",
      scale: 0.7,
    });
    gsap.set("#drink__eye-right-upper", { transformOrigin: "110% 110%" });
    gsap.set("#drink__eye-right-lower", { transformOrigin: "110% -10%" });
    gsap.set("#drink__eye-left-upper", { transformOrigin: "-10% 110%" });
    gsap.set("#drink__eye-left-lower", { transformOrigin: "-10% -10%" });

    const drinkTimeline = gsap.timeline({
      defaults: {
        ease: bandEase,
      },
      paused: true,
    });

    drinkTimeline
      .to("#drink__body", { rotate: 3 }, 0)
      .to("#drink__body-torso", { rotate: 8 }, 0)
      .to("#drink__arm-right", { rotate: -10 }, 0)
      .to("#drink__arm-right-lower", { rotate: 16 }, 0)
      .to("#drink__frytar", { rotate: 2 }, 0)
      .to("#drink__arm-left-lower", { rotate: 6, y: -10, x: 2 }, 0)
      .to("#drink__arm-left-upper", { rotate: -6 }, 0)
      .to("#drink__straw", { rotate: -7 }, 0)
      .to("#drink__straw-upper", { rotate: 0 }, 0)
      .to("#drink__squish-lines", { scale: 1, rotate: -10, y: -10 }, 0)
      .to("#drink__eye-right-upper", { rotate: -8 }, 0)
      .to("#drink__eye-right-lower", { rotate: 8 }, 0)
      .to("#drink__eye-left-upper", { rotate: 10 }, 0)
      .to("#drink__eye-left-lower", { rotate: -5 }, 0);

    // FRIES
    gsap.set("#fries__body-upper", { transformOrigin: "50% 75%" });
    gsap.set("#fries__arm-left", { transformOrigin: "50% 5%", rotate: -8 });
    gsap.set("#fries__arm-left-lower", { transformOrigin: "95% 0%" });
    gsap.set("#fries__arm-right-lower", {
      transformOrigin: "100% 100%",
      rotate: -5,
    });
    gsap.set("#fries__frytar", {
      transformOrigin: "70% 50%",
      rotate: 5,
      y: 20,
    });
    gsap.set("#fries__fry1", { transformOrigin: "70% 90%", rotate: -10 });
    gsap.set("#fries__fry4", { transformOrigin: "50% 100%", rotate: -5 });

    const friesTimeline = gsap.timeline({
      defaults: {
        ease: bandEase,
      },
      paused: true,
    });

    friesTimeline
      .to("#fries__body-upper", { rotate: -8 }, 0)
      .to("#fries__arm-left", { rotate: 10 }, 0)
      .to("#fries__arm-left-lower", { rotate: -20, x: -5, y: -5 }, 0)
      .to("#fries__arm-right-lower", { rotate: -15 }, 0)
      .to("#fries__frytar", { rotate: 4 }, 0)
      .to("#fries__fry1", { rotate: 10 }, 0)
      .to("#fries__fry4", { rotate: 10 }, 0);

    // BURGER
    gsap.set("#burger__arm-left", { transformOrigin: "25% 95%", rotate: 10 });
    gsap.set("#burger__arm-left-lower", {
      transformOrigin: "80% 100%",
      rotate: -10,
    });
    gsap.set("#burger__arm-right", { transformOrigin: "95% 95%", rotate: 10 });
    gsap.set("#burger__arm-right-lower", {
      transformOrigin: "65% 95%",
      rotate: -5,
    });
    gsap.set("#burger__bun-top", {
      transformOrigin: "20% 100%",
      rotate: -5,
      y: 10,
    });
    gsap.set("#burger__patty", { transformOrigin: "50% 50%", y: 4 });

    const burgerTimeline = gsap.timeline({
      defaults: {
        ease: bandEase,
      },
      paused: true,
      // yoyo: true,
      // repeat: -1,
    });

    burgerTimeline
      .to("#burger__arm-left", { rotate: -5 }, 0)
      .to("#burger__arm-left-lower", { rotate: 15 }, 0)
      .to("#burger__arm-right", { rotate: -5 }, 0)
      .to("#burger__arm-right-lower", { rotate: 25 }, 0)
      .to("#burger__bun-top", { rotate: 1 }, 0)
      .to("#burger__patty", { rotate: 1 }, 0);

    // THE AUDIO SETUP
    // -------------------------------
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const startStopButton = document.querySelector(".start-stop");
    const toggleButton = document.querySelector(".toggle");
    const loaderElement = document.querySelector(".loader");

    const audioCtx = new AudioContext();
    const inputEl = new Audio();
    const musicEl = new Audio();

    const analyser = audioCtx.createAnalyser();
    const samples = [
      "https://assets.codepen.io/981242/horrible-noise.mp3",
      "https://assets.codepen.io/981242/not-horrible-noise.mp3",
    ];

    const numBeats = 32;
    // by default, the input makes the characters headbang on the upbeat, which is a "half of a beat" too early, so we need to figure out what a half of a beat divisor is, in the context of the audio clip's duration:
    const beatOffset = numBeats * 2;
    const maxGain = 194;
    const minGain = 132;
    const normalize = gsap.utils.normalize(minGain, maxGain);

    // for our final audio sources
    const inputSource = audioCtx.createMediaElementSource(inputEl);
    const musicSource = audioCtx.createMediaElementSource(musicEl);

    // for our gain adjustment nodes
    const inputGainNode = audioCtx.createGain();
    const musicGainNode = audioCtx.createGain();

    let dataArray;
    let musicStartOffset;
    let playing;

    function loadSamples() {
      // TODO, add a readystate listener before calling init()

      inputEl.crossOrigin = "anonymous";
      musicEl.crossOrigin = "anonymous";

      inputEl.loop = true;
      musicEl.loop = true;

      inputEl.src = samples[0];
      musicEl.src = samples[1];

      // wait for each to load, then reveal everything.
      const sampleLoadPromises = [];
      [inputEl, musicEl].forEach((audioElement) => {
        sampleLoadPromises.push(
          new Promise((resolve, reject) => {
            audioElement.addEventListener("canplaythrough", () => {
              resolve(true);
            });
            // if the samples can't play within 15 seconds, we bail.
            setTimeout(() => {
              reject("Could not load the samples 💩");
            }, 15000);
          })
        );
      });

      Promise.all(sampleLoadPromises)
        .then(() => {
          console.log("succesfully loaded the audio 🤘😎🤘");
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * Our main play/stop button listener callback
     */
    function onStartStop() {
      if (playing) {
        inputEl.pause();
        musicEl.pause();

        // set this is a timeout so that our food has time to tween to zero.
        setTimeout(() => {
          playing = false;
          inputEl.currentTime = 0;
          musicEl.currentTime = 0;
        }, 500);
      } else {
        audioCtx.resume();

        // set our music track's start offset to be half a beat behind,
        // so the food headbangs on the downbeat.
        musicStartOffset = (musicEl.duration / beatOffset) * 1000;

        inputEl.play();
        setTimeout(() => musicEl.play(), musicStartOffset);

        playing = true;
        render();
      }
    }

    function onToggle() {
      const { muted } = this.dataset;
      if (muted === "true") {
        inputGainNode.gain.value = 0.5;
        this.dataset.muted = false;
      } else {
        inputGainNode.gain.value = 0;
        this.dataset.muted = true;
      }
    }

    /**
     * Initial setup for the audio source we want to analyze
     */
    function setupAnalyser() {
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      // console.log(bufferLength); // --> 1024
    }

    // ----------------------------------

    /**
     * Render loop. Gets frequency data on every frame, and updates each timeline's progress based on that.
     */
    function render() {
      // get new frequency data from our source analyzer
      analyser.getByteFrequencyData(dataArray);

      const time = normalize(dataArray[0]);

      drinkTimeline.progress(time);
      friesTimeline.progress(time);
      burgerTimeline.progress(time);

      if (playing) {
        requestAnimationFrame(render);
      }
    }

    /**
     * Initial setup to run AFTER samples have loaded.
     */
    function init() {
      inputGainNode.gain.value = 0;
      musicGainNode.gain.value = 1;

      setupAnalyser();

      // hook up input source
      inputSource.connect(analyser);
      analyser.connect(inputGainNode);

      // hook up music source
      musicSource.connect(musicGainNode);

      // send everuthing to the destination (speakers)
      inputGainNode.connect(audioCtx.destination);
      musicGainNode.connect(audioCtx.destination);

      loaderElement.classList.remove("loader--loading");

      startStopButton.addEventListener("click", onStartStop);
      toggleButton.addEventListener("click", onToggle);
    }

    // INITIALIZATION
    // ----------------------------
    loadSamples();
  });

  return (
    <section className="burger-band">
      <div className="loader loader--loading">
        <p>Loading audio…</p>
      </div>
      <div className="burger-band__container">
        <div className="controls">
          <button className="start-stop">start ▶️ / stop ⏹</button>
          <button className="toggle" data-muted="true">
            Toggle input frequency
          </button>
        </div>
        <BandSvg svgRef={svgRef} />
      </div>
      <Credit
        author="Andy Rubin"
        twitter="https://twitter.com/andyranged"
        codepen="https://codepen.io/andyranged/pen/VwbYGmy"
        youtube="https://youtu.be/Jlj7_BUbYcI"
      />
    </section>
  );
};

export default BurgerBand;
