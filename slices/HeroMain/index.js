import React from "react";
import { RichText } from "prismic-reactjs";
import HeroImage from "../../components/HeroImage";

const MySlice = ({ slice }) => (
  <section className="text-gray-600 body-font">
    <div className="container flex flex-col items-center px-5 py-24 mx-auto max-w-7xl md:flex-row">
      <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
        <h1 className="max-w-2xl mb-4 text-4xl font-medium text-gray-700 font-display title-font sm:text-5xl">
          {slice.primary.heading}
        </h1>
        <p className="mb-8 text-lg leading-relaxed">
          <RichText render={slice.primary.description} />
        </p>
        <div className="flex justify-center">
          <button className="inline-flex px-6 py-2 text-lg tracking-wider text-white transform bg-red-700 border-0 rounded focus:outline-none hover:bg-red-800 font-display -rotate-3">
            {slice.primary.buttonText}
          </button>
        </div>
      </div>
      <div className="w-5/6 lg:max-w-2xl lg:w-full md:w-1/2">
        <HeroImage />
      </div>
    </div>
  </section>
);

export default MySlice;
