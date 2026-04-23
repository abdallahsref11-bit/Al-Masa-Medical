import { motion } from 'motion/react';
import { Star, Quote, User, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const REVIEWS = [
  {
    name: "سارة المهندي",
    role: "مراجعة دائمة",
    text: "تجربة ممتازة جداً، العيادة قمة في النظافة والترتيب. الدكتورة آيات كانت متعاونة جداً وشرحت لي كل خطوات العلاج بدقة. أنصح بها بشدة.",
    rating: 5,
    date: "قبل أسبوع"
  },
  {
    name: "محمد جاسم",
    role: "مراجعة زراعة أسنان",
    text: "أفضل مركز طبي تعاملت معه في الدوحة. الاحترافية في الموعد والنتائج فاقت توقعاتي. الشكر موصول لكل طاقم العمل.",
    rating: 5,
    date: "قبل شهر"
  },
  {
    name: "نورة الكواري",
    role: "مراجعة ليزر",
    text: "نتائج الليزر من أول جلسة كانت واضحة جداً. الأجهزة حديثة والجو العام للعيادة مريح جداً ويبعث على الطمأنينة.",
    rating: 4,
    date: "قبل أسبوعين"
  }
];

export default function Reviews() {
  return (
    <div className="space-y-12" dir="rtl">
      {/* Summary Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass p-8 rounded-[2.5rem] border-brand-gold/10">
        <div className="flex items-center gap-6">
          <div className="text-6xl font-serif font-bold text-brand-dark">4.4</div>
          <div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={cn("fill-brand-gold text-brand-gold", i === 4 && "fill-gray-200 text-gray-200")} />
              ))}
            </div>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest font-arabic">بناءً على 119 مراجعة في جوجل</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-gold transition-all shadow-xl shadow-brand-gold/10 font-arabic">
          أضف مراجعتك <ExternalLink size={20} />
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2.5rem] border-brand-gold/10 relative flex flex-col gap-4 text-right"
          >
            <div className="absolute top-8 left-8 text-brand-gold/10">
              <Quote size={40} />
            </div>
            
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={cn("fill-brand-gold text-brand-gold", i >= review.rating && "fill-gray-200 text-gray-200")} />
              ))}
            </div>

            <p className="text-gray-600 font-arabic leading-relaxed italic flex-grow">
              "{review.text}"
            </p>

            <div className="flex items-center gap-4 border-t border-brand-gold/5 pt-4 mt-2 flex-row-reverse">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-brand-dark font-arabic text-sm">{review.name}</h4>
                <div className="flex items-center justify-between gap-4 mt-0.5">
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest font-arabic">{review.role}</span>
                  <span className="text-[10px] text-gray-400 font-arabic">{review.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
