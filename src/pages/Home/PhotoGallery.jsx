import SectionTitle from '../../components/SectionTitle';
import img1 from '../../assets/images/slide1.jpg';
import img2 from '../../assets/images/slide2.jpg';
import img3 from '../../assets/images/slide3.jpg';
import img4 from '../../assets/images/slide4.jpg';
import img5 from '../../assets/images/slide5.jpg';
import img6 from '../../assets/images/slide6.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhotoGallery = () => {
    const settings = {
        className: 'center',
        dots: true,
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className='my-14'>
            <div>
                <SectionTitle title='Gallery' />
            </div>
            <Slider {...settings} className="mt-12">
                <div>
                    <img src={img1} alt="" />
                </div>
                <div>
                    <img src={img2} alt="" />
                </div>
                <div>
                    <img src={img3} alt="" />
                </div>
                <div>
                    <img src={img4} alt="" />
                </div>
                <div>
                    <img src={img5} alt="" />
                </div>
                <div>
                    <img src={img6} alt="" />
                </div>
            </Slider>
        </div>
    );
};

export default PhotoGallery;