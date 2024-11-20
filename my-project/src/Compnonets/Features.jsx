import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Features = () => {
  const features = [
    {
      title: "Meta Tags",
      description:
        "Automatically generates relevant meta tags for titles, descriptions, and keywords.",
    },
    {
      title: "Responsive Design",
      description:
        "Ensures the website is mobile-friendly, improving user experience and search rankings.",
    },
    {
      title: "Schema Markup",
      description:
        "Integrates structured data to help search engines understand your content better. ",
    },
    {
      title: "Performance Optimization",
      description:
        "Optimizes images and assets to reduce loading times, a critical factor for SEO.",
    },
    {
      title: "XML Sitemap",
      description:
        "Automatically generates an XML sitemap to help search engines crawl and index your site.",
    },
    {
      title: "Social Media Integration",
      description:
        "Enhances visibility by integrating Open Graph and Twitter Card data for social sharing.",
    },
  ];

  return (
    <>
      <div className=" flex flex-col bg-navy2 h-fit min-h-screen">
        <Navbar />
        <div className="my-8 pt-20 px-10 text-gray-300 text-center items-center flex-grow">
          <h1 className="text-3xl font-bold text-center mb-6">
            SEO Optimizer Features
          </h1>
          <div className="text-left mx-auto w-fit lg:w-full">
            <ul className="list-disc list-inside space-y-4 ">
              {features.map((feature, index) => (
                <li key={index} className="text-lg lg:w-3/5 w-10/12 mx-auto">
                  <strong>{feature.title} :</strong>
                  <p className="ml-6 mt-1">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Features;
