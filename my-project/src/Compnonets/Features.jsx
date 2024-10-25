import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Features = () => {
  return (
    <>
      <div className=" flex flex-col bg-navy2 h-screen">
        <Navbar />
        <div className="mt-20 text-gray-300 text-center flex-grow">
          <h1 className="text-3xl font-bold text-center mb-6">
            SEO Optimizer Features
          </h1>
          <ul className="list-disc list-inside space-y-4">
            <li className="text-lg">
              <strong>Meta Tags:</strong> Automatically generates relevant meta
              tags for titles, descriptions, and keywords.
            </li>
            <li className="text-lg">
              <strong>Responsive Design:</strong> Ensures the website is
              mobile-friendly, improving user experience and search rankings.
            </li>
            <li className="text-lg">
              <strong>Schema Markup:</strong> Integrates structured data to help
              search engines understand your content better.
            </li>
            <li className="text-lg">
              <strong>Performance Optimization:</strong> Optimizes images and
              assets to reduce loading times, a critical factor for SEO.
            </li>
            <li className="text-lg">
              <strong>XML Sitemap:</strong> Automatically generates an XML
              sitemap to help search engines crawl and index your site.
            </li>
            <li className="text-lg">
              <strong>Social Media Integration:</strong> Enhances visibility by
              integrating Open Graph and Twitter Card data for social sharing.
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Features;
