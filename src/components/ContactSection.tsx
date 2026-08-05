import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  User, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('يرجى تعبئة جميع الحقول المطلوبة قبل الإرسال.');
      return;
    }

    setStatus('submitting');

    // Simulate network submission delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-right max-w-3xl mb-12">
          <span className="mono-label mb-2">// 07 CONTACT & INQUIRIES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-extrabold text-white mb-4">
            لنبدأ بتنفيذ مشروعك القادم
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            أنا جاهز لمناقشة التفاصيل البرمجية وتصميم الواجهات لملائمة متطلبات مشروعك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Contact Info Glass Cards */}
          <div className="lg:col-span-5 space-y-6 text-right">
            
            <div className="bg-[#0f1115] border border-white/10 rounded-xl p-7 space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                معلومات التواصل المباشر
              </h3>

              <div className="space-y-4 font-mono-tech">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-emerald-400/40 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-400/10 text-emerald-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">// EMAIL</span>
                    <span className="text-xs font-bold text-white">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-emerald-400/40 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-400/10 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">// PHONE</span>
                    <span className="text-xs font-bold text-white dir-ltr text-right block">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-black/40 border border-white/10">
                  <div className="p-2.5 rounded-lg bg-emerald-400/10 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">// LOCATION</span>
                    <span className="text-xs font-bold text-white">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Download CV / Resume Button */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    alert('جاري تجهيز السيرة الذاتية بصيغة PDF...');
                  }}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-black/40 hover:bg-emerald-400 hover:text-black border border-white/10 text-white font-mono-tech font-bold text-xs uppercase shadow-lg transition-all cursor-pointer group"
                >
                  <Download className="w-4 h-4 text-emerald-400 group-hover:text-black transition-colors" />
                  <span>تحميل السيرة الذاتية (CV PDF)</span>
                </a>
              </div>

            </div>

          </div>

          {/* Interactive Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f1115] border border-white/10 rounded-xl p-8 shadow-2xl text-right relative overflow-hidden">
              
              <h3 className="text-2xl font-bold text-white mb-2">إرسال رسالة مباشرة</h3>
              <p className="text-slate-300 text-sm mb-6">
                قم بتعبئة النموذج أدناه وسيصلني الإشعار فوراً في البريد الإلكتروني.
              </p>

              {/* Success Toast Notice Alert */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm font-bold flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-white">تم إرسال رسالتك بنجاح! 🎉</span>
                    <span className="text-xs text-emerald-300 font-normal">شكرًا لتواصلك، سأتواصل معك خلال أقل من 24 ساعة.</span>
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-200 text-sm flex items-center gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-300 mb-2">
                      // FULL NAME <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك الكريم"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-emerald-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-300 mb-2">
                      // EMAIL ADDRESS <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-emerald-400 text-white placeholder-slate-500 text-sm outline-none transition-all dir-ltr text-right"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-300 mb-2">
                    // SUBJECT
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="مثال: استشارة برمجية / مشروع تطوير تطبيق"
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-emerald-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-300 mb-2">
                    // MESSAGE DETAILS <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك وفكرة مشروعك باختصار هنا..."
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-emerald-400 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-lg text-sm font-mono-tech font-bold uppercase btn-accent cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>جاري إرسال الرسالة...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال الرسالة الآن</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
