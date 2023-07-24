import { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews`)
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, [reviews]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                }
            }
        ]
    };

    return (
        <>
            <div>
                <SectionTitle title='User Reviews' />
            </div>
            <div>
                <Slider {...settings}>
                    {
                        reviews.map((review, index) => <div key={index} className="bg-base-100 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full" src={review.canImage} alt={review.canName} />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg leading-6 font-medium">{review.canName}</h3>
                                <p className="mt-2 text-base leading-6">{review.cName} <br /> Rating: {review.rating}</p>
                            </div>
                            <div className="mt-5">
                                <p className="text-base leading-6">{review.review}</p>
                            </div>
                        </div>
                    </div>)
                    }
                </Slider>
            </div>
        </>
    );
};

export default Review;