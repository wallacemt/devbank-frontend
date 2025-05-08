import bgImage from '@/assets/images/404-bg.png';
import notFoundSvg from '@/assets/images/404-svg.svg';
import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className={`w-full h-screen bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center lg:mx-auto`} style={{backgroundImage: `url(${bgImage})`}}>
      <img src={notFoundSvg} alt="404 Ilustration" className='w-full lg:w-1/3' />
      <div className="sm:mt-0 mt-6 text-center">
        <h1 className="text-2xl font-bold font-principal text-amber-500">404 - Pagina não encontrada!</h1>
        <p className="text-lg font-normal font-secundaria text-white mt-4">A pagina que voc  est  procurando n o foi encontrada.</p>
        <Link to={"/"} className='bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded-md mt-8' style={{color: 'white'}}>
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};
