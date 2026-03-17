'use client';
import React, { useState, useEffect } from 'react';
//import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Menu, X, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { navLinks } from '@/lib/constants/default-layout.constant';
import { useTranslations } from 'next-intl';
import LanguageSwitcherField from '../defaults/LanguageSwitcherField';
import { Link } from '@/i18n/navigation';
import { navVariants, logoVariants, menuContainer, menuItem, mobileMenuVariants } from './types/top-navigation.type';
import LanguageSelection from './custom/LanguageSelection';
import { LanguagesConstants } from '@/lib/constants/language.constant';

const TopNavigation = () => {
  const [stickyClass, setStickyClass] = useState<string>('relative');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const t = useTranslations('nav');

  useEffect(() => {
    const stickNavbar = () => {
      setStickyClass(window.scrollY > 65 ? 'fixed top-0 left-0 z-50' : 'relative');
    };
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  return (
    <motion.header
      className={`w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 ${stickyClass}`}
      variants={navVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='px-4 sm:px-6 lg:px-8 w-full lg:max-w-360 mx-auto'>
        <div className='flex justify-between items-center h-16'>
          {/* Company Brand Here */}
          <motion.div
            variants={logoVariants}
            initial='hidden'
            animate='visible'
            whileHover={{ rotate: 360, scale: 1.1 }}
            className='cursor-pointer'
          >
            <Link href={'/'} scroll={false}>
              <Image src={'/images/logo/brand_banner.png'} alt='Brand Banner' width={65} height={65} />
            </Link>
          </motion.div>
          {/* Search Bar */}
          <motion.div
            animate={{ scale: isSearchFocused ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
            className='hidden lg:flex items-center relative'
          >
            <div className={`relative flex transition-all duration-300 ${isSearchFocused ? 'w-85' : 'w-71.75'}`}>
              <Input
                placeholder={t('search.placeholder')}
                className='w-full max-w-xl rounded-none rounded-l-lg border border-[#EFEFEF] bg-white focus:outline-none focus:ring-1 focus:ring-[#E63A24] focus:border-transparent transition-all duration-300'
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Button className='bg-[#E63A24] text-white rounded-none rounded-r-sm border-none hover:bg-[#c42c18]'>
                <Search />
              </Button>
            </div>
          </motion.div>
          {/* General Desktop Navigation Links */}
          <motion.nav
            variants={menuContainer}
            initial='hidden'
            animate='visible'
            className='hidden md:flex items-center'
          >
            <div className='flex space-x-8'>
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={menuItem} whileHover={{ y: -2 }}>
                  <Link
                    href={link.name}
                    className='flex items-center space-x-2 text-gray-700 hover:text-[#E63A24] transition-all duration-300 font-medium group'
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* Auth Buttons */}
            <div className='flex items-center ml-8 space-x-8'>
              {/* Language Dropdown */}
              {/* <LanguageSwitcherField /> */}
              <LanguageSelection languages={LanguagesConstants} />
              <button className='flex items-center space-x-2 px-3 py-2  text-gray-800 text-base hover:text-[#E63A24] transition-all duration-300 font-medium transform hover:scale-105'>
                <span className=' text-[14px]'>{t('actions.manageBookings')}</span>
              </button>
              <Link
                href={'/authentication'}
                className='flex items-center space-x-2 px-3 py-2 bg-[#E63A24] text-white rounded-lg text-sm hover:bg-[#c12510] transition-all duration-300 font-normal shadow-lg hover:shadow-xl transform hover:scale-105'
              >
                <UserPlus className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                <span>{t('actions.signInRegister')}</span>
              </Link>
            </div>
          </motion.nav>
          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className='w-6 h-6 text-gray-700' /> : <Menu className='w-6 h-6 text-gray-700' />}
          </button>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='md:hidden overflow-hidden'
            >
              <div className='py-4 space-y-4'>
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={menuItem} initial='hidden' animate='visible'>
                    <Link href={link.href!} className='block px-4 py-2'>
                      {t(`links.${link.key}`)}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile Search */}
                <div className='px-4'>
                  <div className={`relative flex transition-all duration-300 ${isSearchFocused ? 'w-85' : 'w-71.75'}`}>
                    <Input
                      type='text'
                      placeholder={t('search.placeholder')}
                      //placeholder='Destination attraction, hotel etc'
                      className='w-full max-w-xl rounded-none rounded-l-lg border-1 border-[#EFEFEF] bg-white focus:outline-none focus:ring-1 focus:ring-[#E63A24] focus:border-transparent transition-all duration-300'
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <Button
                      onClick={() => alert('Successful Transaction')}
                      className='bg-[#E63A24] text-white rounded-none rounded-r-sm border-none hover:bg-[#c42c18]'
                    >
                      <Search />
                    </Button>
                  </div>
                </div>
                <LanguageSwitcherField />
                <button className='flex items-center space-x-2 px-3 py-2  text-gray-800 text-base hover:text-[#E63A24] transition-all duration-300 font-medium transform hover:scale-105'>
                  <span className=' text-[14px]'>{t('actions.manageBookings')}</span>
                </button>
                <Link
                  href={'/authentication'}
                  className='flex items-center w-1/2 space-x-2 px-3 py-2 bg-[#E63A24] text-white rounded-lg text-sm hover:bg-[#c12510] transition-all duration-300 font-normal shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  <UserPlus className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                  <span>{t('actions.signInRegister')}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default TopNavigation;
