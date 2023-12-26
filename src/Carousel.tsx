import React, { useEffect, useRef, useState } from "react";

interface CarouselItem {
  id: string;
  src: string;
}

type Props = {
  CarouselItems: CarouselItem[];
};

const Carousel: React.FC<Props> = ({ CarouselItems }) => {
  const [carouselData, setCarouselData] =
    useState<CarouselItem[]>(CarouselItems);

  const carouselDataRef = useRef(carouselData);
  const [carouselInView, setCarouselInView] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);

  const carouselInViewRef = useRef(carouselInView);
  const [carouselPlayState, setCarouselPlayState] = useState<number | null>(
    null
  );

  useEffect(() => {
    setupCarousel();
  }, []);

  useEffect(() => {
    updateCarouselView();

    carouselDataRef.current = carouselData;

    carouselInViewRef.current = carouselInView;
  }, [carouselData]);

  const setupCarousel = () => {
    const container = document.createElement("div");
    const controls = document.createElement("div");

    document.querySelector(".carousel")?.append(container, controls);
    container.className = "carousel-container";
    controls.className = "carousel-controls";

    carouselData.forEach((item, index) => {
      const carouselItem = item.src
        ? document.createElement("img")
        : document.createElement("div");
      container.append(carouselItem);

      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute("loading", "lazy");
      carouselItem.setAttribute("data-index", `${index + 1}`);
    });
  };

  const updateCarouselView = () => {
    carouselInViewRef?.current?.forEach((item, index) => {
      const container = document.querySelector(".carousel-container");
      if (!container) return;
      if (container.children[index]) {
        container.children[
          index
        ].className = `carousel-item carousel-item-${item}`;
      }
    });
  };

  const previous = () => {
    const updatedData = [...carouselDataRef.current];
    updatedData.unshift(updatedData.pop()!);

    const updatedInView = [...carouselInViewRef.current];
    updatedInView.push(updatedInView.shift()!);

    setCarouselData(updatedData);
    setCarouselInView(updatedInView);
  };

  const next = () => {
    const updatedData = [...carouselDataRef.current];
    updatedData.push(updatedData.shift()!);

    const updatedInView = [...carouselInViewRef.current];
    updatedInView.unshift(updatedInView.pop()!);

    setCarouselData(updatedData);
    setCarouselInView(updatedInView);
  };

  const play = () => {
    const playBtn = document.querySelector(
      ".carousel-control-play"
    ) as HTMLButtonElement | null;
    const startPlaying = () => next();

    if (playBtn?.classList.contains("playing")) {
      playBtn.classList.remove("playing");
      clearInterval(carouselPlayState!);
      setCarouselPlayState(null);
    } else {
      playBtn?.classList.add("playing");
      next(); // First run initial next method

      const intervalId = setInterval(startPlaying, 1500);
      setCarouselPlayState(intervalId);
    }
  };

  return (
    <div className="">
      <div className="carousel">
        {/* <div className="carousel-container">
          {carouselDataRef.current.map((slide, index) => {
            return (
              <div className={`carousel-item carousel-item-${index + 1}`}>
                <img src={slide.src} alt="" loading="lazy" />
              </div>
            );
          })}
        </div> */}
        <div className="carousel-controls">
          <button
            className="carousel-control carousel-control-previous"
            data-name="previous"
            onClick={previous}
          >
            <span className="ax-hidden">previous</span>
          </button>
          <button
            className="carousel-control carousel-control-play"
            onClick={play}
            data-name="play"
          >
            <span className="ax-hidden">play</span>
          </button>
          <button
            className="carousel-control carousel-control-next"
            data-name="next"
            onClick={next}
          >
            <span className="ax-hidden">next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
