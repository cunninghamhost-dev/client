'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, CreditCard, Shield, ChevronRight } from 'lucide-react';
import Image from 'next/image';
//import { footerNavLinks, socialLinks } from '@/lib/constants/data-layout.constant';
import { footerNavLinks, socialLinks } from '@/lib/constants/default-layout.constant';
//import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const paymentMethodsRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const sections = sectionsRef.current;
    const paymentMethods = paymentMethodsRef.current;
    const socialLinks = socialLinksRef.current;

    if (!footer) return;

    // Animate sections on scroll
    sections.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    });

    // Animate payment methods
    if (paymentMethods) {
      gsap.fromTo(
        paymentMethods.children,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: paymentMethods,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }

    // Animate social links
    if (socialLinks) {
      gsap.fromTo(
        socialLinks.children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: socialLinks,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }

    // Hover animations for interactive elements
    const interactiveElements = footer.querySelectorAll('.hover-animate');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 1.3,
          ease: 'power2.out',
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 1.3,
          ease: 'power2.out',
        });
      });
    });

    // return () => {
    //   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    // };
  }, []);

  // const addToRefs = (el: HTMLDivElement) => {
  //   if (el && !sectionsRef.current.includes(el)) {
  //     sectionsRef.current.push(el);
  //   }
  // };
  return (
    <footer className='bg-[#8A2316] text-white'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <div className='flex items-center space-x-2 mb-6'>
              <div className='flex items-center justify-center'>
                <Image src={'/images/logo/brand_banner.png'} alt='Brand Banner' width={32} height={32} />
              </div>
              <span className='text-xl font-bold bg-clip-text'>Cunningham Globals Travel</span>
            </div>
            <div className='flex items-center space-x-3 text-gray-50 my-4'>
              <div ref={socialLinksRef} className='flex items-center space-x-4'>
                {socialLinks.map(({ icon: Icon, href, name }) =>
                  Icon ? (
                    <a
                      key={name}
                      href={href}
                      aria-label={name}
                      className='w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-gray-200 hover:bg-gray-700 transition-all duration-300 hover-animate'
                    >
                      <Icon className='w-4 h-4' />
                    </a>
                  ) : (
                    ''
                  ),
                )}
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3 text-gray-50'>
                <MapPin className='w-3 h-3 text-white' />
                <div className='block space-y-1'>
                  <p className='text-sm text-gray-100'>Giruliu G. 20</p>
                  <p className='text-sm text-gray-100'>LT-12123 Vilnius </p>
                  <p className='font-bold text-sm'>Lithuania.</p>
                </div>
              </div>
              <div className='flex items-center space-x-3 text-gray-50'>
                <Phone className='w-3 h-3 text-white' />
                <div className='block space-y-1'>
                  <p className='text-sm'>+37061961057</p>
                  <p className='text-sm'>+31628543180</p>
                  <p className='text-sm'>+2347066863267</p>
                </div>
                <span className='text-sm'></span>
              </div>
              <div className='flex items-center space-x-3 text-gray-50'>
                <Mail className='w-3 h-3 text-white' />
                <span className='text-sm'>info@cunninghamglobaltravels.com</span>
              </div>
            </div>
          </div>
          {/* Services Section */}
          <div>
            <h3 className='text-lg font-semibold mb-6 text-gray-50'>Services</h3>
            <ul className='space-y-3'>
              {footerNavLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-gray-100 hover:text-gray-300 transition-colors duration-300 flex items-center cursor-pointer group'
                  >
                    <ChevronRight className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Company Section with Links */}
          <div>
            <h3 className='text-lg font-semibold mb-6 text-gray-50'>Company</h3>
            <ul className='space-y-3'>
              {footerNavLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-gray-100 hover:text-gray-300 transition-colors duration-300 flex items-center group'
                  >
                    <ChevronRight className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Payment Methods & Social Links */}
          <div className='mx-auto'>
            <div className='flex flex-col space-y-12 lg:space-y-6'>
              {/* Payment Methods */}
              <div className='flex flex-col space-y-6 lg:space-y-0'>
                <h4 className='text-sm font-semibold text-gray-100 mb-4 text-center lg:text-left'>Payment Methods</h4>
                <div className='flex items-center justify-center lg:justify-start space-x-4'>
                  <div className='w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center hover-animate'>
                    <CreditCard className='w-5 h-5 text-white' />
                  </div>
                  <div className='w-12 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded flex items-center justify-center hover-animate'>
                    <span className='text-xs font-bold text-white'>VISA</span>
                  </div>
                  <div className='w-12 h-8 bg-gradient-to-r from-blue-800 to-blue-900 rounded flex items-center justify-center hover-animate'>
                    <span className='text-xs font-bold text-white'>AMEX</span>
                  </div>
                  <div className='w-12 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded flex items-center justify-center hover-animate'>
                    <span className='text-xs font-bold text-white'>PP</span>
                  </div>
                  <div className='w-12 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded flex items-center justify-center hover-animate'>
                    <Shield className='w-5 h-5 text-white' />
                  </div>
                </div>
              </div>
              {/* Social Links */}
              <div className='flex flex-col space-y-6 lg:space-y-0'>
                <h4 className='text-sm font-semibold text-gray-200 mb-4 text-center lg:text-left'>Our Partners</h4>
                <div className='flex space-x-4'>
                  <div className='w-16 h-8 bg-gradient-to-r from-orange-600 to-red-800 rounded flex items-center justify-center hover-animate'>
                    <span className='text-xs font-bold text-gray-50'>Amadeus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className='border-t border-slate-800 bg-slate-950'>
          <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4'>
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              <div className='flex items-center space-x-2 text-slate-400 text-sm'>
                <span>© 2025 Cunningham Global Travels. All rights reserved.</span>
              </div>
              <div className='flex items-center space-x-6 text-sm text-slate-300'>
                <span>Made with Protechnology</span>
                <div className='flex items-center space-x-2'>
                  <Shield className='w-3 h-3 text-green-500' />
                  <span>SSL Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
