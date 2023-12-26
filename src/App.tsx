import Carousel from "./Carousel";

import "./App.css";

const data = [
  { id: "1", src: "http://fakeimg.pl/300/?text=1" },
  { id: "2", src: "http://fakeimg.pl/300/?text=2" },
  { id: "3", src: "http://fakeimg.pl/300/?text=3" },
  { id: "4", src: "http://fakeimg.pl/300/?text=4" },
  { id: "5", src: "http://fakeimg.pl/300/?text=5" },
  { id: "6", src: "http://fakeimg.pl/300/?text=6" },
  { id: "7", src: "http://fakeimg.pl/300/?text=7" },
];

const App = () => (
  <>
    <Carousel CarouselItems={data} />
  </>
);

export default App;
