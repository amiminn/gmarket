import Slider from "react-slick";

export function Carousel({ children }: { children: React.ReactNode }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
