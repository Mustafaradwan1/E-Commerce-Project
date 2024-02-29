"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imgBanners } from "../../../Ulits/Dummy";
import Image from "next/image";
import {motion} from 'framer-motion'
const HomeSlider = () => {

    var settings = {
        autoplay:true,
        autoplaySpeed:3000,
        loop:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return <motion.div
  initial={{opacity:0}}
  animate={{opacity:1}}
  className="mt-10  w-full">
    <div className="container">
    <Slider {...settings}>
        {imgBanners.map((img,ind)=>(
        <div key={ind} className="relative imgBanners">
          <Image src={img.img} alt="banner-img" className="w-full h-64 md:h-96" />
        </div>
        ))}
    </Slider>
    </div>
  </motion.div>
  
}

export default HomeSlider