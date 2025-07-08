export default function BackgroundBlob() {
  return (
    <div className='fixed inset-0 -z-10'>
      <div className='animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-xl filter' />
      <div className='animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-xl filter' />
      <div className='animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-xl filter' />
    </div>
  );
}
