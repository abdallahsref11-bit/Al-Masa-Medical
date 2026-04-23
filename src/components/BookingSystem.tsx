import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isPast, isToday, setHours, setMinutes, isBefore, isAfter, getDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

// Mock busy days (e.g., weekends or fully booked days)
const BUSY_DAYS = [0]; // Sunday is assumed closed/busy for this mock

export default function BookingSystem() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4 flex-row-reverse" dir="rtl">
        <h3 className="text-xl font-arabic font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy', { locale: ar })}
        </h3>
        <div className="flex gap-2">
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight size={20} />
          </button>
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
    return (
      <div className="grid grid-cols-7 mb-2 flex-row-reverse" dir="rtl">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider font-arabic">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const d = day;
        const isBusy = BUSY_DAYS.includes(getDay(d));
        const isSelected = isSameDay(d, selectedDate);
        const isCurrentMonth = isSameMonth(d, monthStart);
        const isDisabled = isPast(d) && !isToday(d);

        days.push(
          <button
            key={d.toString()}
            disabled={isDisabled}
            onClick={() => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            className={cn(
              "relative h-12 md:h-14 flex flex-col items-center justify-center rounded-lg transition-all",
              !isCurrentMonth && "text-gray-300 pointer-events-none",
              isDisabled && "bg-gray-50 text-gray-300 opacity-50 cursor-not-allowed",
              isSelected && "bg-brand-gold text-white shadow-lg z-10",
              !isSelected && isCurrentMonth && !isDisabled && "hover:bg-brand-gold/10 text-gray-700",
              isBusy && !isSelected && "border-2 border-red-50/50"
            )}
          >
            <span className="text-sm font-medium">{format(d, 'd')}</span>
            {!isDisabled && isCurrentMonth && (
              <div className={cn(
                "w-1 h-1 rounded-full mt-1",
                isBusy ? "bg-red-400" : "bg-emerald-400",
                isSelected && "bg-white"
              )} />
            )}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1" dir="rtl">{rows}</div>;
  };

  const handleWhatsAppBooking = () => {
    if (!selectedSlot) return;
    const dateStr = format(selectedDate, 'dd/MM/yyyy');
    const message = `مرحباً! أود حجز موعد في مركز الماسة الطبي.\n\nالتاريخ: ${dateStr}\nالوقت: ${selectedSlot}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/97477052212?text=${encodedMessage}`, '_blank');
  };

  const isSlotDisabled = (slot: string) => {
    if (!isToday(selectedDate)) return false;
    const [hours, minutes] = slot.split(':').map(Number);
    const slotTime = setMinutes(setHours(new Date(), hours), minutes);
    return isBefore(slotTime, new Date());
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8" dir="rtl">
      {/* Date Picker */}
      <div className="glass p-6 rounded-3xl text-right">
        <div className="flex items-center gap-2 mb-6 flex-row-reverse">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-arabic font-bold text-brand-dark">اختر التاريخ</h2>
            <p className="text-gray-500 text-sm font-arabic">اختر اليوم المفضل لموعدك</p>
          </div>
        </div>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium justify-start flex-row-reverse">
          <div className="flex items-center gap-1.5 flex-row-reverse">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-gray-500 font-arabic">متاح</span>
          </div>
          <div className="flex items-center gap-1.5 flex-row-reverse">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-gray-500 font-arabic">مكتمل</span>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="glass p-6 rounded-3xl flex flex-col text-right">
        <div className="flex items-center gap-2 mb-6 flex-row-reverse">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-arabic font-bold text-brand-dark">المواعيد المتاحة</h2>
            <p className="text-gray-500 text-sm font-arabic">يوم {format(selectedDate, 'EEEE, MMM do', { locale: ar })}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {TIME_SLOTS.map((slot) => {
            const disabled = isSlotDisabled(slot);
            return (
              <button
                key={slot}
                disabled={disabled}
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  "py-3 rounded-xl font-medium transition-all text-center",
                  disabled ? "bg-gray-100 text-gray-300 cursor-not-allowed" : 
                  selectedSlot === slot ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/20" :
                  "border border-gray-100 hover:border-brand-gold hover:text-brand-gold text-gray-600"
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-8">
          <button
            disabled={!selectedSlot}
            onClick={handleWhatsAppBooking}
            className={cn(
              "w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg transition-all font-arabic",
              selectedSlot 
                ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-[1.02] shadow-xl shadow-emerald-500/20" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <MessageCircle size={22} />
            حجز عبر واتساب
          </button>
          <p className="text-center text-xs text-gray-400 mt-4 font-arabic">
            تأكيد فوري لموعدك عبر المحادثة
          </p>
        </div>
      </div>
    </div>
  );
}
