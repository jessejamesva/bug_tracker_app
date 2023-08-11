// import { useState } from "react";
import { Button, Carousel, Image } from "react-bootstrap"



export default function HomePage() {

  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex) => {
  //   setIndex(selectedIndex);
  // };

  return (
    <Carousel interval={null}>
      <Carousel.Item  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Image src="https://picsum.photos/800" rounded></Image>
        <Carousel.Caption>
          <Button className="mx-3 my-3">Previous Sprint</Button>
          <Button className="mx-3 my-3">Currrent Sprint</Button>
          <Button className="mx-3 my-3">Next Sprint</Button>
          <h3>Company Project One</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Image src="https://picsum.photos/800" rounded></Image>
        <Carousel.Caption>
          <Button className="mx-3 my-3">Previous Sprint</Button>
          <Button className="mx-3 my-3">Currrent Sprint</Button>
          <Button className="mx-3 my-3">Next Sprint</Button>
          <h3>Company Project Two</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Image src="https://picsum.photos/800" rounded></Image>
        <Carousel.Caption>
          <Button className="mx-3 my-3">Previous Sprint</Button>
          <Button className="mx-3 my-3">Currrent Sprint</Button>
          <Button className="mx-3 my-3">Next Sprint</Button>
          <h3>Company Project Three</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}