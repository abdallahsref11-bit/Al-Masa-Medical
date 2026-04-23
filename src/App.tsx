import React, { useState, useEffect } from 'react';
import { format, isWithinInterval, setHours, setMinutes } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, TrendingUp, User, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import Preloader from './components/Preloader';
import BookingSystem from './components/BookingSystem';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Logo from './components/Logo';

const WORKING_HOURS = [
  { day: 'Saturday', hours: '08:00 AM - 08:00 PM', index: 6 },
  { day: 'Sunday', hours: 'Closed', index: 0 },
  { day: 'Monday', hours: '08:00 AM - 08:00 PM', index: 1 },
  { day: 'Tuesday', hours: '08:00 AM - 08:00 PM', index: 2 },
  { day: 'Wednesday', hours: '08:00 AM - 08:00 PM', index: 3 },
  { day: 'Thursday', hours: '08:00 AM - 08:00 PM', index: 4 },
  { day: 'Friday', hours: '08:00 AM - 08:00 PM', index: 5 },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = currentTime;
      const dayIndex = now.getDay();
      const currentDayHours = WORKING_HOURS.find(h => h.index === dayIndex);

      if (!currentDayHours || currentDayHours.hours === 'Closed') {
        setIsOpen(false);
        return;
      }

      const [start, end] = currentDayHours.hours.split(' - ');
      const [startH, startM] = start.replace(' AM', '').replace(' PM', '').split(':').map(Number);
      const [endH, endM] = end.replace(' AM', '').replace(' PM', '').split(':').map(Number);
      
      const startTime = setMinutes(setHours(new Date(), start.includes('PM') && startH !== 12 ? startH + 12 : startH), startM);
      const endTime = setMinutes(setHours(new Date(), end.includes('PM') && endH !== 12 ? endH + 12 : endH), endM);

      setIsOpen(isWithinInterval(now, { start: startTime, end: endTime }));
    };

    checkOpenStatus();
  }, [currentTime]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentDayName = format(currentTime, 'EEEE');

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient selection:bg-brand-gold/10 selection:text-brand-gold" dir="rtl">
      <Preloader />

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4 md:py-6",
        scrolled || isMobileMenuOpen ? "glass bg-brand-cream/80 backdrop-blur-xl border-b border-brand-gold/10 px-4 md:px-0 shadow-lg shadow-brand-gold/5 translate-y-0" : "bg-transparent translate-y-2"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-4">
            <Logo size={40} className="items-start" textColor="text-brand-dark" />
          </div>

          <div className="flex items-center gap-4 md:gap-8 flex-row-reverse">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest flex-row-reverse">
              <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-brand-gold transition-colors font-arabic">الخدمات</a>
              <a href="#reviews" onClick={(e) => handleScrollTo(e, 'reviews')} className="hover:text-brand-gold transition-colors font-arabic">المراجعات</a>
              <a href="#booking" onClick={(e) => handleScrollTo(e, 'booking')} className="hover:text-brand-gold transition-colors font-arabic">الحجز</a>
              <a href="#location" onClick={(e) => handleScrollTo(e, 'location')} className="hover:text-brand-gold transition-colors font-arabic">الموقع</a>
            </div>
            <a 
              href="https://wa.me/97477052212" 
              className="hidden sm:flex px-5 py-2.5 md:px-6 md:py-3 bg-brand-dark text-white rounded-full font-bold text-xs md:text-sm hover:bg-brand-gold transition-all shadow-xl shadow-brand-gold/10 uppercase tracking-widest font-arabic"
            >
              اتصل بنا الآن
            </a>

            {/* Mobile Toggle Button */}
            <button 
              className="md:hidden p-2 text-brand-dark hover:text-brand-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-cream/95 backdrop-blur-xl border-b border-brand-gold/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 text-right" dir="rtl">
                <a 
                  href="#services" 
                  onClick={(e) => handleScrollTo(e, 'services')}
                  className="text-lg font-arabic font-bold text-gray-600 hover:text-brand-gold transition-colors py-2 border-b border-brand-gold/5"
                >
                  الخدمات
                </a>
                <a 
                  href="#reviews" 
                  onClick={(e) => handleScrollTo(e, 'reviews')}
                  className="text-lg font-arabic font-bold text-gray-600 hover:text-brand-gold transition-colors py-2 border-b border-brand-gold/5"
                >
                  المراجعات
                </a>
                <a 
                  href="#booking" 
                  onClick={(e) => handleScrollTo(e, 'booking')}
                  className="text-lg font-arabic font-bold text-gray-600 hover:text-brand-gold transition-colors py-2 border-b border-brand-gold/5"
                >
                  الحجز
                </a>
                <a 
                  href="#location" 
                  onClick={(e) => handleScrollTo(e, 'location')}
                  className="text-lg font-arabic font-bold text-gray-600 hover:text-brand-gold transition-colors py-2 border-b border-brand-gold/5"
                >
                  الموقع
                </a>
                <a 
                  href="https://wa.me/97477052212" 
                  className="w-full text-center py-4 bg-brand-dark text-white rounded-2xl font-bold font-arabic shadow-lg shadow-brand-gold/10"
                >
                  اتصل بنا الآن
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 container mx-auto max-w-7xl text-right">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10 order-1">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-brand-gold/20 shadow-sm"
              >
                <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse", isOpen ? "bg-emerald-500" : "bg-red-500")} />
                <span className="text-xs font-bold text-brand-gold uppercase tracking-widest font-arabic">
                  {isOpen ? "مفتوح الآن" : "مغلق حالياً"}
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="text-5xl md:text-7xl font-arabic font-bold text-brand-dark leading-tight tracking-tight">
                  رعاية صحية <br />
                  <span className="text-brand-gold">فاخرة للجميع.</span>
                </div>
                <div className="text-4xl md:text-6xl font-arabic font-bold text-brand-dark/90 pr-4 border-r-8 border-brand-gold mt-4">
                  مركز الماسة الطبي
                </div>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl font-arabic"
              >
                نجمع بين فخامة الرعاية الذهبية وأحدث العلوم الطبية. رحلتك نحو العافية تبدأ هنا في مركز الماسة.
              </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4 justify-start"
              >
              <a href="#booking" onClick={(e) => handleScrollTo(e, 'booking')} className="px-8 py-5 bg-brand-gold text-white rounded-2xl font-bold text-lg hover:scale-[1.02] shadow-2xl shadow-brand-gold/20 transition-all uppercase tracking-widest font-arabic">
                احجز موعدك
              </a>
              <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="px-8 py-5 bg-white border border-brand-gold/20 rounded-2xl font-bold text-lg hover:bg-brand-cream transition-all text-brand-dark font-arabic">
                عرض الخدمات
              </a>
              <a href="#reviews" onClick={(e) => handleScrollTo(e, 'reviews')} className="px-8 py-5 bg-brand-cream border border-brand-gold/20 rounded-2xl font-bold text-lg hover:bg-brand-gold hover:text-white transition-all text-brand-gold font-arabic">
                عرض التقييمات
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 space-y-6 order-2 lg:mt-12 xl:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass p-8 rounded-[3rem] relative overflow-hidden border-brand-gold/10"
            >
              <div className="absolute top-0 left-0 p-8 text-brand-gold/10">
                <Clock size={120} strokeWidth={1} />
              </div>

              <div className="relative space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-widest mb-1 font-arabic">توقيت قطر المحلي</h4>
                  <div className="text-4xl font-serif font-bold text-brand-dark">
                    {currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Qatar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                  </div>
                  <div className="text-gray-500 font-medium font-arabic mt-1">
                    {currentTime.toLocaleDateString('ar-QA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-gold/10 space-y-4">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs font-arabic">
                      <TrendingUp size={16} />
                      مستوى النشاط
                    </div>
                    <span className="text-[10px] font-bold bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-full uppercase tracking-wider font-arabic">مثالي</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest flex-row-reverse">
                      <span className="font-arabic">ازدحام العيادة</span>
                      <span>35%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "35%" }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-brand-gold rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white/40">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 flex-row-reverse">
            <div className="space-y-4 text-center md:text-right">
              <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs font-arabic">تخصصاتنا</span>
              <h2 className="text-4xl md:text-6xl font-arabic font-bold text-brand-dark">خدمات النخبة.</h2>
            </div>
            <button className="text-brand-gold font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:-translate-x-2 transition-transform bg-white border border-brand-gold/20 px-6 py-3 rounded-full font-arabic">
              <TrendingUp size={18} /> القائمة الكاملة
            </button>
          </div>
          
          <Services />
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 border-t border-brand-gold/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center md:text-right space-y-4 mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs font-arabic">آراء مرضانا</span>
            <h2 className="text-4xl md:text-6xl font-arabic font-bold text-brand-dark tracking-tight">كلمات من القلب.</h2>
          </div>
          
          <Reviews />
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs font-arabic">الحجوزات</span>
            <h2 className="text-4xl md:text-6xl font-arabic font-bold text-brand-dark">حجز سهل وسلس.</h2>
            <p className="text-gray-600 font-medium italic text-lg opacity-80 font-arabic">استمتع بتجربة جدولة مواعيد راقية بين يديك.</p>
          </div>
          
          <BookingSystem />
        </div>
      </section>

      {/* Schedule & Note */}
      <section className="py-24 px-6 bg-white/40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="glass p-10 rounded-[3rem] border-brand-gold/10 order-2 lg:order-1">
              <h3 className="text-2xl font-arabic font-bold text-brand-dark mb-8 uppercase tracking-widest text-right">ساعات العمل</h3>
              <div className="space-y-3">
                {WORKING_HOURS.map((item) => {
                  const dayTranslations: {[key: string]: string} = {
                    'Saturday': 'السبت',
                    'Sunday': 'الأحد',
                    'Monday': 'الاثنين',
                    'Tuesday': 'الثلاثاء',
                    'Wednesday': 'الأربعاء',
                    'Thursday': 'الخميس',
                    'Friday': 'الجمعة'
                  };
                  return (
                    <div 
                      key={item.day} 
                      className={cn(
                        "flex items-center justify-between p-5 rounded-2xl transition-all flex-row-reverse",
                        currentDayName === item.day ? "bg-brand-gold text-white shadow-xl shadow-brand-gold/20 scale-[1.02]" : "bg-white/50 border border-brand-gold/5"
                      )}
                    >
                      <span className="font-bold tracking-widest text-sm uppercase font-arabic">{dayTranslations[item.day]}</span>
                      <span className={cn(
                        "font-serif italic",
                        currentDayName === item.day ? "text-brand-cream/80" : "text-brand-gold"
                      )}>
                        {item.hours === 'Closed' ? 'مغلق' : item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="glass group p-10 rounded-[3rem] relative overflow-hidden border-brand-gold/10 text-right">
                <div className="flex items-center gap-8 mb-8 flex-row-reverse">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-gray-200 overflow-hidden border-2 border-brand-gold shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&h=400&auto=format&fit=crop" 
                        alt="Doctor" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-arabic font-bold text-brand-dark">د. آيات السليطي</h4>
                    <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mt-1 font-arabic">أخصائية علاج العصب</p>
                  </div>
                </div>
                
                <h5 className="font-bold text-brand-gold mb-4 flex items-center gap-3 uppercase tracking-[0.2em] text-xs flex-row-reverse font-arabic">
                  <User size={18} />
                  فلسفتنا الطبية
                </h5>
                <p className="text-gray-600 font-arabic italic text-lg leading-relaxed text-right">
                  "الشفاء فن يتطلب دقة تقنية وتعاطفاً قلبياً. في مركز الماسة، نعامل كل مريض وكأنه من النخبة، لضمان أن تكون راحتهم جزءاً لا يتجزأ من علاجهم."
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass p-8 rounded-3xl flex items-center gap-6 border-brand-gold/10 flex-row-reverse">
                  <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center text-white shadow-lg">
                    <Phone size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] font-arabic">اتصل بنا</div>
                    <div className="font-bold text-brand-dark text-sm">+974 7705 2212</div>
                  </div>
                </div>
                <div className="glass p-8 rounded-3xl flex items-center gap-6 border-brand-gold/10 flex-row-reverse">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold flex items-center justify-center text-white shadow-lg">
                    <MessageCircle size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-brand-dark uppercase tracking-[0.2em] font-arabic">واتساب</div>
                    <div className="font-bold text-brand-gold text-sm uppercase font-arabic">رد سريع</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="glass p-12 lg:p-16 rounded-[4rem] overflow-hidden flex flex-col md:flex-row gap-16 items-center border-brand-gold/10 flex-row-reverse">
            <div className="md:w-1/2 space-y-8 text-right">
              <div className="w-20 h-20 rounded-[2.5rem] bg-brand-gold/10 flex items-center justify-center text-brand-gold mr-auto ml-0 md:mr-0 md:ml-auto invisible md:visible">
                <MapPin size={40} />
              </div>
              <div className="w-20 h-20 rounded-[2.5rem] bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto md:mr-0 md:ml-auto">
                <MapPin size={40} />
              </div>
              <h2 className="text-4xl md:text-6xl font-arabic font-bold text-brand-dark">عنواننا في الدوحة.</h2>
              <p className="text-gray-600 text-xl leading-relaxed font-arabic italic">
                ملاذ للصحة في قلب قطر. نوفر وصولاً سهلاً لأرقى الحلول الطبية.
              </p>
              <div className="flex gap-4 p-6 bg-brand-cream border border-brand-gold/20 rounded-2xl flex-row-reverse">
                <MapPin size={24} className="text-brand-gold shrink-0" />
                <p className="text-brand-dark font-bold text-sm tracking-widest uppercase font-arabic">7C4R+36 الدوحة، قطر <br />بالقرب من شارع الماسة</p>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative grayscale-map border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.32626993132!2d51.520!3d25.280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c50000000000%3A0x0!2zMjXCsDE2JzQ4LjAiTiA1McKwMzEnMTIuMCJF!5e0!3m2!1sen!2sqa!4v1713869249000!5m2!1sen!2sqa" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-gold/10 bg-white">
        <div className="container mx-auto max-w-7xl flex flex-col items-center gap-12">
          <Logo size={60} />

          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] font-arabic">
            <a href="#" className="hover:text-brand-gold transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-brand-gold transition-colors">بوابة المريض</a>
            <a href="#" className="hover:text-brand-gold transition-colors">معايير الجودة</a>
          </div>

          <p className="text-gray-400 text-xs italic font-arabic">
            © 2026 مركز الماسة الطبي. تميز راقٍ في الرعاية الصحية.
          </p>
        </div>
      </footer>
    </div>
  );
}
