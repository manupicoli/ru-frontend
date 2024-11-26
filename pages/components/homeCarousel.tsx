import Image from "next/image";
import { Carousel } from "react-bootstrap";

function HomeCarousel() {
    return (
        <div className="carousel-container">
            <Carousel className="custom-carousel">
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/img-buffet.webp"
                        alt="Buffet do RU"
                        width="500"
                        height="500"
                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/img-bebidas.webp"
                        alt="Bebidas do RU"
                        width="500"
                        height="500"
                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/img-restaurante.webp"
                        alt="Restaurante Universitário"
                        width="500"
                        height="500"
                    />
                    
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default HomeCarousel;
