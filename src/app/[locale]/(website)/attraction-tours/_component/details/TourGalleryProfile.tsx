'use client';
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { ITourGalleryProps } from '@/types/website/attractions.type';
import { GoClock } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa6';
import { MdClear } from 'react-icons/md';

const TourGalleryProfile: React.FC<ITourGalleryProps> = ({
  mainImage,
  thumbnails,
  reviews,
  duration,
  description,
  includes,
  excludes,
}) => {
  //const [mainImage, setMainImage] = useState(images[0]);
  const mainImageRef = useRef(null);

  useEffect(() => {
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [mainImage]);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-3 gap-4 p-4'>
        {/* Main Image */}
        <div className='relative col-span-2' ref={mainImageRef}>
          <div className='relative h-[470px]'>
            <Image
              src={`/images/main/attractions/${mainImage}`}
              alt='Main display'
              fill
              className='rounded-2xl shadow-lg object-cover'
            />
          </div>
          {/* Overlay Card with Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='absolute top-4 left-4 bg-white/90 p-4 rounded-xl shadow-md max-w-sm'
          >
            <h3 className='text-lg font-bold'>⭐ 4.7 Exceptional</h3>
            <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1}>
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <div>
                    <p className='text-sm italic'>“{review.text}”</p>
                    <p className='mt-2 text-xs font-semibold'>- {review.author}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Thumbnail Gallery */}
        <div className='grid grid-cols-2 gap-2'>
          {thumbnails.map((img, index) => (
            <div key={index} className={`relative h-[${img.height}] w-[${img.width}]`}>
              <Image
                key={index}
                src={`/images/main/attractions/${img.img_src}`}
                alt={`Thumbnail ${index}`}
                fill
                className='object-cover rounded'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='my-4 px-12 flex flex-col gap-4 max-w-3xl'>
        {/* Duration */}
        <div className='inline-flex space-x-2 text-[#1A1A1A]'>
          <GoClock className='mt-1' />
          <span className='font-semibold text-base leading-6'>Duration: {duration}</span>
        </div>

        {/* Description */}
        <p className='text-base leading-6'>{description}</p>

        {/* Included / Not Included */}
        <div className='mt-2 grid grid-cols-2 gap-4'>
          <div className='block space-y-2'>
            <h3 className='font-semibold mb-2'>What&apos;s Included</h3>
            <ul className='space-y-1'>
              {includes.map((item, index) => (
                <li key={index} className='flex items-center gap-3 text-base leading-6'>
                  <FaCheck color='#148148' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>What&apos;s Not Included</h3>
            <ul className='space-y-1'>
              {excludes.map((item, index) => (
                <li key={index} className='flex items-center gap-3 text-base leading-6'>
                  <MdClear color='#E63A24' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGalleryProfile;
