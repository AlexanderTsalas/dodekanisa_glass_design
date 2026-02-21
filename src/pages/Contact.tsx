import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const contactMethods = [
        { id: 1, icon: Mail, title: 'Email', value: 'hello@dodekanisaglass.gr', link: 'mailto:hello@dodekanisaglass.gr' },
        { id: 2, icon: Phone, title: 'Τηλέφωνο', value: '+30 22410 00000', link: 'tel:+302241000000' },
        { id: 3, icon: MapPin, title: 'Έδρα', value: '85100, Ρόδος', link: null },
        { id: 4, icon: Clock, title: 'Ωράριο', value: '09:00 - 18:00', link: null },
    ];

    return (
        <main data-theme="light" className="bg-[#E9EAEC] min-h-screen lg:h-screen pt-24 lg:pt-32 pb-12 flex items-center relative lg:overflow-hidden text-[#0B0C0E] selection:bg-[#3F4CCB] selection:text-[#0B0C0E] z-0">

            <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 relative z-10 h-auto lg:h-full max-h-none lg:max-h-[850px] items-center">

                {/* Left Side: Content & Cards */}
                <div className="flex flex-col justify-center h-auto lg:h-full reveal-fade-in pt-12 lg:pt-0">
                    <div className="mb-8 lg:mb-12">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[rgba(11,12,14,0.1)]/40 bg-[#E9EAEC]/30 backdrop-blur-sm mb-6 lg:mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#3F4CCB] animate-ping"></span>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0C0E]">Διαθεσιμοι για νεα εργα</span>
                        </div>
                        <h1 className="headline-xl text-[clamp(28px,3.8vw,52px)] leading-[1.05] tracking-tight mb-4 lg:mb-6 pr-4">
                            Ας δημιουργήσουμε<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F4CCB] to-[#0B0C0E]">κάτι κορυφαίο.</span>
                        </h1>
                        <p className="text-[#6D7278] text-sm lg:text-xl font-medium leading-relaxed max-w-lg">
                            Έχετε ένα όραμα; Είμαστε εδώ για να του δώσουμε μορφή με κρύσταλλο. Επικοινωνήστε απευθείας με την ομάδα μας.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {contactMethods.map((method, i) => (
                            <div
                                key={method.id}
                                onMouseEnter={() => setHoveredCard(method.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`group relative p-5 lg:p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${hoveredCard === method.id ? 'border-[#3F4CCB] bg-[#E9EAEC]/30 shadow-[0_0_30px_rgba(63,76,203,0.15)] transform lg:-translate-y-1' : 'border-[rgba(11,12,14,0.1)]/40 bg-[#E9EAEC]/30'}`}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3F4CCB] to-transparent transform -translate-x-full transition-transform duration-700 ${hoveredCard === method.id ? 'translate-x-full' : ''}`}></div>
                                <method.icon className={`mb-3 transition-colors duration-300 ${hoveredCard === method.id ? 'text-[#3F4CCB]' : 'text-[#6D7278]'}`} size={24} />
                                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#6D7278] mb-1">{method.title}</p>
                                {method.link ? (
                                    <a href={method.link} className="block text-[#0B0C0E] font-display font-medium text-sm lg:text-base hover:text-[#3F4CCB] transition-colors truncate">{method.value}</a>
                                ) : (
                                    <p className="block text-[#0B0C0E] font-display font-medium text-sm lg:text-base truncate">{method.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Form */}
                <div className="flex flex-col justify-center h-auto lg:h-full reveal-fade-in pb-12 lg:pb-0" style={{ animationDelay: '300ms' }}>
                    <div className="bg-[#E9EAEC]/30 border border-[rgba(11,12,14,0.1)]/40 rounded-3xl p-6 lg:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

                        <form className="relative z-10 flex flex-col gap-6 lg:gap-8 justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                <div className="relative pt-6">
                                    <input
                                        type="text"
                                        id="name"
                                        onFocus={() => setFocusedInput('name')}
                                        onBlur={() => setFocusedInput(null)}
                                        className="w-full bg-transparent border-b border-[rgba(11,12,14,0.1)]/40 pb-2 text-base lg:text-lg text-[#0B0C0E] font-medium focus:outline-none transition-colors peer placeholder-transparent relative z-20"
                                        placeholder="Ονοματεπώνυμο"
                                    />
                                    <label htmlFor="name" className="absolute left-0 text-base text-[#6D7278] font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#3F4CCB] z-10 top-0 text-xs uppercase tracking-widest font-bold">
                                        Ονοματεπώνυμο
                                    </label>
                                    <div className={`absolute bottom-0 left-0 h-[2px] bg-[#3F4CCB] transition-all duration-300 z-30 ${focusedInput === 'name' ? 'w-full' : 'w-0'}`}></div>
                                </div>
                                <div className="relative pt-6">
                                    <input
                                        type="tel"
                                        id="phone"
                                        onFocus={() => setFocusedInput('phone')}
                                        onBlur={() => setFocusedInput(null)}
                                        className="w-full bg-transparent border-b border-[rgba(11,12,14,0.1)]/40 pb-2 text-base lg:text-lg text-[#0B0C0E] font-medium focus:outline-none transition-colors peer placeholder-transparent relative z-20"
                                        placeholder="Τηλέφωνο"
                                    />
                                    <label htmlFor="phone" className="absolute left-0 text-base text-[#6D7278] font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#3F4CCB] z-10 top-0 text-xs uppercase tracking-widest font-bold">
                                        Τηλέφωνο
                                    </label>
                                    <div className={`absolute bottom-0 left-0 h-[2px] bg-[#3F4CCB] transition-all duration-300 z-30 ${focusedInput === 'phone' ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </div>

                            <div className="relative block pt-6">
                                <input
                                    type="email"
                                    id="email"
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={() => setFocusedInput(null)}
                                    className="w-full bg-transparent border-b border-[rgba(11,12,14,0.1)]/40 pb-2 text-base lg:text-lg text-[#0B0C0E] font-medium focus:outline-none transition-colors peer placeholder-transparent relative z-20"
                                    placeholder="Email"
                                />
                                <label htmlFor="email" className="absolute left-0 text-base text-[#6D7278] font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#3F4CCB] z-10 top-0 text-xs uppercase tracking-widest font-bold">
                                    Διεύθυνση Email
                                </label>
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#3F4CCB] transition-all duration-300 z-30 ${focusedInput === 'email' ? 'w-full' : 'w-0'}`}></div>
                            </div>

                            <div className="relative block pt-6">
                                <textarea
                                    id="message"
                                    onFocus={() => setFocusedInput('message')}
                                    onBlur={() => setFocusedInput(null)}
                                    className="w-full min-h-[100px] lg:min-h-[120px] bg-transparent border-b border-[rgba(11,12,14,0.1)]/40 pb-2 text-base lg:text-lg text-[#0B0C0E] font-medium focus:outline-none transition-colors resize-none peer placeholder-transparent relative z-20"
                                    placeholder="Το μήνυμά σας..."
                                />
                                <label htmlFor="message" className="absolute left-0 text-base text-[#6D7278] font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#3F4CCB] z-10 top-0 text-xs uppercase tracking-widest font-bold">
                                    Λεπτομέρειες Έργου
                                </label>
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#3F4CCB] transition-all duration-300 z-30 ${focusedInput === 'message' ? 'w-full' : 'w-0'}`}></div>
                            </div>

                            <div className="pt-4 lg:pt-6">
                                <button type="button" className="group relative w-full flex items-center justify-center gap-3 lg:gap-4 px-6 py-4 lg:py-5 bg-[#E9EAEC] text-[#0B0C0E] font-bold text-xs lg:text-sm uppercase tracking-[0.2em] rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(233,234,236,0.4)] transition-all duration-500">
                                    <span className="relative z-10">Αποστολη Μηνυματος</span>
                                    <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </main>
    );
}
