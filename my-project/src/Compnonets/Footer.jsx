import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-darkNavy text-white py-[19px] border-cyan-900 border-t-2">
        <div className="flex flex-col md:flex-row container mx-auto text-center items-center  justify-evenly space-y-2 md:space-x-20">
          <div className="flex justify-center space-x-10">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 duration-500 ease-in-out"
            >
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-gray-400  hover:text-rose-400 duration-500 ease-in-out"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400  hover:text-blue-600 duration-500 ease-in-out"
            >
              <i className="fab fa-linkedin-in fa-2x"></i>
            </a>
          </div>
          <p className="text-gray-400 items-center">
            &copy; 2024 SEO Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
