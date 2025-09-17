export function Explore() {
  return (
    <div className='relative h-screen w-full flex flex-col justify-center items-center bg-white text-black px-6'>
      {/* Main content */}
      <div className='p-2 mx-auto text-center'>
        {/* Main headline with emojis */}
        <h1 className='text-[clamp(1.8rem,6vw,4.2rem)] font-bold leading-tight mb-16'>
          Vocdoni provides secure <span className='inline-block'>🔒</span>, privacy-first{' '}
          <span className='inline-block'>🕶️</span> digital voting technology <span className='inline-block'>💎</span>{' '}
          that empowers communities, associations, and institutions to make collective decisions with full transparency,
          privacy and trust. <span className='inline-block'>🤝</span>
        </h1>

        {/* Trusted by section */}
        <div className='mt-20'>
          <p className='text-sm font-medium text-gray-600 mb-8'>Trusted by</p>
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60'>
            {/* Placeholder for organization logos */}
            <div className='text-sm font-medium text-gray-400'>Transparencia Internacional</div>
            <div className='text-sm font-medium text-gray-400'>Esquerra Republicana</div>
            <div className='text-sm font-medium text-gray-400'>Athora</div>
            <div className='text-sm font-medium text-gray-400'>Fútbol Club Barcelona</div>
            <div className='text-sm font-medium text-gray-400'>Associació Decidim</div>
            <div className='text-sm font-medium text-gray-400'>Ajuntament de Barcelona</div>
            <div className='text-sm font-medium text-gray-400'>NEV</div>
          </div>
        </div>
      </div>
    </div>
  )
}
