import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
//@ts-ignore
import "swiper/css";
import "swiper/swiper-bundle.css";
//@ts-ignore
import "swiper/css/effect-coverflow";
//@ts-ignore
import "swiper/css/pagination";
//@ts-ignore
import "swiper/css/autoplay";
import Aos from "aos";
import "aos/dist/aos.css";
import { Code, Fingerprint, Gauge, PiggyBank, ShieldCheck, SquareTerminal, Terminal } from "lucide-react";

export const AuthBanner = ({ position = "left", effect = "fade-up" }) => {
  const apresentationMessages = [
    {
      text: "DevBank é um banco digital projetado especialmente para desenvolvedores, oferecendo uma plataforma moderna, rápida e segura para gerenciar suas finanças.",
      icon: <Code size={60} className="text-green-400" />,
    },
    {
      text: "Com o Shell Transfer, você pode realizar transferências bancárias diretamente de seu terminal de comandos. A solução mais prática e eficiente para desenvolvedores.",
      icon: <SquareTerminal  size={60} className="text-DarkP2" />,
    },
    {
      text: "No DevBank, a segurança é nossa prioridade. Protegemos suas contas com autenticação de dois fatores (2FA), garantindo total segurança nas suas transações.",
      icon: <ShieldCheck size={60} className="text-primary70 " />,
    },
    {
      text: "Utilizamos criptografia de ponta para garantir que todos os seus dados sejam armazenados de forma segura e protegida contra acessos não autorizados.",
      icon: <Fingerprint  size={60} className="text-neutral-300 " />,
    },
    {
      text: "Com DevBank, desenvolvedores podem contar com APIs robustas, integração com aplicativos, e uma plataforma otimizada para quem busca agilidade.",
      icon: <Gauge size={60} className="text-amber-600" />,
    },
    {
      text: "Acesso rápido, fácil e prático. Utilize nosso banco por interface web, aplicativo ou via comandos no terminal, sempre ao seu alcance.",
      icon :<PiggyBank size={60} className="text-amber-300" /> ,
    },
  ];

  const authImages = [
    "https://res.cloudinary.com/dg9hqvlas/image/upload/v1744054398/auth-banner-3_yabmxc.jpg",
    "https://res.cloudinary.com/dg9hqvlas/image/upload/v1744054697/vladimir-malyavko-2PEkfNwsDus-unsplash_ew8z9e.jpg",
    "https://res.cloudinary.com/dg9hqvlas/image/upload/v1744054399/auth-banner-1_kkpj0z.jpg",
    "https://res.cloudinary.com/dg9hqvlas/image/upload/v1744054397/auth-banner-2_jc9gmo.jpg",
    "https://res.cloudinary.com/dg9hqvlas/image/upload/v1744054698/andres-moskona-qvMZwNvJsIM-unsplash_ig6af4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(authImages[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = authImages.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % authImages.length;
        return authImages[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <div
      className={`absolute p-4 w-full lg:max-w-[50%] h-full overflow-hidden hidden lg:block ${
        position == "left" ? "left-0" : "right-0"
      }`}
    >
      <div
        className={`h-full max-h-screen bg-cover bg-center relative rounded-xl`}
        style={{ backgroundImage: `url(${currentImage})`, transition: "all 1s ease-in-out" }}
        data-aos={effect}
      >
        <div className="absolute bottom-0 w-full bg-black/60 h-[50vh] p-6 rounded-xl">
          <h2 className="text-6xl xl:text-8xl text-white font-bold font-principal text-center">
            <span className="text-Destaque">Dev</span>BANK
            <span className="text-amber-600">$</span>
          </h2>
          <div className="backdrop-blur-sm rounded-2xl bg-principal/80 p-2 self-end">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                pauseOnMouseEnter: true,
                delay: 5000,
                disableOnInteraction: false,
              }}
              speed={2000}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, ]}
              className="mt-4 font-secundaria font-medium text-white text-2xl"
            >
              {apresentationMessages.map((message, index) => (
                <SwiperSlide key={index}>
                  <p className="px-0 py-4 text-center flex justify-between items-center flex-col">
                    <span className="mb-2">{message.icon}</span>
                    {message.text}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
