'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import useHotelLocationStore from '@/store/website/hotel/profileLocation.store';

interface IImageGalleryProps {
  mainImage: string;
  relatedImage?: string[];
  location: string;
}

const PictureGallery = ({ location }: { location: string }) => {
  const mainImage = useHotelLocationStore((state) => state.imgSrcUrl);
  const imageGallery = useHotelLocationStore((state) => state.relatedImgUrl);

  return (
    <div>
      {mainImage ? <PictureGalleryItem mainImage={mainImage} relatedImage={imageGallery} location={location} /> : null}
    </div>
  );
};

const PictureGalleryItem = ({ mainImage, relatedImage, location }: IImageGalleryProps) => {
  return (
    <Card className='p-0 w-full rounded-none'>
      <CardContent className='p-0 w-full'>
        <div className={`grid grid-cols-1 ${relatedImage && relatedImage.length > 0 && 'md:grid-cols-2'}  gap-0 p-0`}>
          <div className='h-[330px] overflow-hidden rounded-none shadow-md hover:shadow-xl transition-shadow duration-300'>
            <Image
              src={mainImage}
              alt='Main Image Profile'
              className='object-cover hover:scale-105 transition-transform duration-300'
              width={563}
              height={318}
              quality={90}
              priority
            />
          </div>
          {relatedImage && relatedImage.length > 0 ? (
            <div className='grid grid-cols-2 gap-0 p-0'>
              {relatedImage.map((img, index) => (
                <div
                  key={index}
                  className='w-fit overflow-hidden rounded-none shadow-md hover:shadow-xl transition-shadow duration-300'
                >
                  <Image
                    src={img}
                    alt={`${location} image ${index + 1}`}
                    className='object-cover hover:scale-105 transition-transform duration-300'
                    width={277.69}
                    height={1.89}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default PictureGallery;
