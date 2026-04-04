"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "hi,bn,ta,te,mr,gu,kn,ml,pa,or,as,ur",
        },
        "google_translate_element"
      );
    };

    // 🔥 FORCE REMOVE TOP BAR
    const interval = setInterval(() => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) {
        banner.remove();
      }

      const body = document.body;
      if (body.style.top) {
        body.style.top = "0px";
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div id="google_translate_element"></div>;
}