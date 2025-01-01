import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QandA from "./QandA";

const Faq = () => {
  const faqs = [
    {
      question: "What is an SEO optimizer?",
      answer:
        "An SEO optimizer is a tool or software that helps improve the visibility of a website on search engines by analyzing content, structure, and performance to ensure it meets search engine ranking criteria. ",
    },
    {
      question: "How does an SEO optimizer improve website ranking?",
      answer:
        "It identifies issues such as broken links, slow loading pages, or missing meta descriptions, and provides suggestions to optimize keywords, improve content quality, and boost user experience.",
    },
    {
      question: "What are the key features of an SEO optimizer?",
      answer:
        "Key features include keyword analysis, content optimization suggestions, technical SEO audits, backlink tracking, competitor analysis, and reporting and analytics.",
    },
    {
      question: "Can an SEO optimizer help with mobile SEO?",
      answer:
        "Yes, SEO optimizers provide insights into mobile performance by checking mobile-friendliness, responsive design, and page speed on mobile devices, which are crucial for ranking in mobile search results.",
    },
    {
      question: "How often should I use an SEO optimizer?",
      answer:
        "It is recommended to use an SEO optimizer regularly, especially after changes to your website. Routine checks (monthly or quarterly) help maintain your website’s search engine performance.",
    },
  ];

  return (
      <div className=" flex flex-col bg-navy2 min-h-screen h-full">
        <Navbar />
        <div className="flex flex-col justify-center my-10 pt-20 items-center">
          <h1 className="text-white min-w-screen text-center sm:text-4xl text-xl  mb-5 px-auto py-2">
            How to use ?
          </h1>
          <video className="" width="500" height="360" controls>
            <source src="./src/videos/How_to_use.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className=" text-white  flex flex-col justify-center my-10  items-center flex-grow">
          <h1 className="text-white sm:text-4xl text-2xl items-start mb-3">FAQ's</h1>
          {faqs.map((faq, index) => (
            <QandA question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <Footer />
      </div>
  );
};

export default Faq;
