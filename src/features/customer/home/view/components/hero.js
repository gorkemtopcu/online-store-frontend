import React from "react";
import HeroImage from "assets/images/hero_image.jpg";

const Hero = () => {
  return (
    <div className="py-8 sm:py-12 lg:py-16 xl:py-8">
      <div className="flex flex-col sm:flex-row border border-gray-400 h-[500px] max-h-[500px] overflow-hidden">
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className="font-medium text-sm md:text-base">
                OUR BESTSELLERS
              </p>
            </div>
            <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
              <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            </div>
          </div>
        </div>
        {/* Hero Right Side */}
        <img
          className="w-full sm:w-1/2 object-cover h-full"
          src={HeroImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
