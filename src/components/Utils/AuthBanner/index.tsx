import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const AuthBanner = ({position = 'left'}) => {
    const apresentationMessages = [
        " DEVBank é um banco digital projetado especialmente para desenvolvedores, oferecendo uma plataforma moderna, rápida e segura para gerenciar suas finanças.",
        "   Com o Shell Transfer, você pode realizar transferências bancárias diretamente de seu terminal de comandos. A solução mais prática e eficiente para desenvolvedores.", " No DEVBank, a segurança é nossa prioridade. Protegemos suas contas com autenticação de dois fatores (2FA), garantindo total segurança nas suas transações.",
        " Utilizamos criptografia de ponta para garantir que todos os seus dados sejam armazenados de forma segura e protegida contra acessos não autorizados.", "Com DEVBank, desenvolvedores podem contar com APIs robustas, integração com aplicativos, e uma plataforma otimizada para quem busca agilidade.", "    Acesso rápido, fácil e prático. Utilize nosso banco por interface web, aplicativo ou via comandos no terminal, sempre ao seu alcance."
    ]
    return (
        <div className={`absolute w-full max-w-[600px] h-full rounded-xl overflow-hidden bg-[url('./images/auth-banner.jpg')] bg-cover bg-center hidden lg:block ${position == 'left' ? 'left-0' : 'right-0'}`}>
            <div className="absolute bottom-0 w-full bg-black/60 h-[50%] p-6">
                <h2 className="text-5xl sm:text-6xl text-white font-bold font-principal text-center">
                    <span className="text-Destaque">DEV</span>BANK<span className="text-amber-600">$</span>
                </h2>
                <div className="backdrop-blur-sm bg-principal/80 rounded-xl p-2">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            pauseOnMouseEnter: true,
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mt-4 rounded-xl font-secundaria text-white text-xl md:text-2xl"
                    >
                        {apresentationMessages.map((message, index) => (
                            <SwiperSlide key={index}>
                                <p className=" px-2 py-12 text-center">
                                    {message}
                                </p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>

    );
};
