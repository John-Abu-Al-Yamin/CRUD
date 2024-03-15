import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
            ابد الان في معرفه الاسعار
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-gray-500">
            عندنا تحديث مستمر في الاسعار كل يوم لمعرفه كل جديد في بورصه الطيور
          </p>

          <button
            href="#"
            className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          >
            ... تواصل مع الادمن لعرض الاقتراحات الخاصه بك
          </button>
        </div>

        <div className="flex justify-center items-center mt-8">
          <ul className="mt-3 flex justify-center gap-4 sm:mt-0">
            
            <li>
              <a
                href="https://www.facebook.com/john.emad.7359"
                rel="noreferrer"
                target="_blank"
                className="text-gray-800 font-bold transition hover:opacity-75"
              >
                Facebook
                
              </a>
            </li>
            
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=+201286976691"
                rel="noreferrer"
                target="_blank"
                className="text-gray-800 font-bold transition hover:opacity-75"
              >
                WhatsApp
                
              </a>
            </li>
            
            <li>
              <a
                href="tel:+201286976691"
                rel="noreferrer"
                target="_blank"
                className="text-gray-800 font-bold transition hover:opacity-75"
              >
                Phone
                
              </a>
            </li>

            
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
