import { motion } from 'motion/react';
import { Smile, Baby, HeartPulse, ShieldCheck, Microscope, Stethoscope, Scissors } from 'lucide-react';
import { cn } from '../lib/utils';

const SERVICES = [
  {
    icon: Smile,
    title: 'عناية الأسنان',
    description: 'حلول صحة الأسنان المتكاملة بما في ذلك تقويم الأسنان والزراعة.',
    tags: ['جراحة آمنة', 'تجميل'],
    color: 'bg-brand-gold'
  },
  {
    icon: Baby,
    title: 'دعم الحمل',
    description: 'رعاية نسائية وتوليدية متخصصة لك ولطفلك.',
    tags: ['شخصي', 'لطيف'],
    color: 'bg-emerald-500'
  },
  {
    icon: HeartPulse,
    title: 'الفحص الدوري',
    description: 'فحوصات سنوية شاملة لمراقبة علاماتك الحيوية.',
    tags: ['روتيني', 'وقائي'],
    color: 'bg-indigo-500'
  },
  {
    icon: ShieldCheck,
    title: 'جلسات الليزر',
    description: 'جلسات ليزر متطورة بنتائج مضمونة من أول زيارة.',
    tags: ['تقنية حديثة', 'معتمد'],
    color: 'bg-teal-500'
  },
  {
    icon: Microscope,
    title: 'المختبر',
    description: 'فحوصات تشخيصية سريعة ودقيقة في الموقع.',
    tags: ['نتائج سريعة', 'موثوق'],
    color: 'bg-sky-500'
  },
  {
    icon: Stethoscope,
    title: 'العيادة العامة',
    description: 'استشارات متخصصة لجميع الاهتمامات الصحية الشائعة.',
    tags: ['رعاية عائلية', 'أولي'],
    color: 'bg-cyan-500'
  }
];

export default function Services() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
      {SERVICES.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="glass group p-8 rounded-[2.5rem] flex flex-col gap-4 relative overflow-hidden text-right"
          >
            {/* Background Decoration */}
            <div className={cn("absolute -top-10 -right-10 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-full", service.color)} />
            
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", service.color)}>
              <Icon size={28} />
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {service.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full bg-brand-gold/5 text-brand-gold text-[10px] font-bold uppercase tracking-wider border border-brand-gold/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
