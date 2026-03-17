'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { gsap } from 'gsap';
import styles from './group-card.module.css';

interface CardItem {
  id: number;
  image: string;
  options: string[];
}

const cards: CardItem[] = [
  { id: 1, image: '/images/main/london_1.webp', options: ['A', 'B', 'C'] },
  { id: 2, image: '/images/main/london_2.webp', options: ['D', 'E', 'F'] },
  { id: 3, image: '/images/main/nyc_1.webp', options: ['G', 'H', 'I'] },
  { id: 4, image: '/images/main/nyc_1.webp', options: ['J', 'K', 'L'] },
  { id: 5, image: '/images/main/amsterdam_1.webp', options: ['M', 'N', 'O'] },
];

const GroupCardSection = () => {
  const sliderRef = useRef<Slider>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [selected, setSelected] = useState<Record<number, string>>({});

  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
    });
  }, []);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <section className={`w-full max-w-[62rem] mx-auto overflow-hidden mt-32 mb-12`}>
      <Slider ref={sliderRef} {...settings}>
        {cards.map((item, idx) => (
          <div key={item.id} className={styles.cardWrapper}>
            <div
              onMouseEnter={() =>
                gsap.to(cardRefs.current[idx], {
                  scale: 1.05,
                  duration: 0.3,
                  ease: 'power2.out',
                })
              }
              onMouseLeave={() =>
                gsap.to(cardRefs.current[idx], {
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                })
              }
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image src={item.image} alt={`Card ${item.id}`} fill className={styles.image} />
                <div className={styles.overlay}>
                  <RadioGroup
                    className={styles.radioGroup}
                    value={selected[item.id] || ''}
                    onValueChange={(value) => setSelected((prev) => ({ ...prev, [item.id]: value }))}
                  >
                    {item.options.map((opt) => (
                      <label key={opt} className={styles.optionLabel}>
                        <RadioGroupItem value={opt} />
                        <span className={styles.optionText}>{opt}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default GroupCardSection;
