import React, { useState } from "react";
import { useNavigate } from "react-router";

const faqItems = [
    {
        q: "Лелека – повністю безкоштовний месенджер?",
        a: "Саме так! Ми переконані, що кожна людина має право користуватися крутими продуктами, тому жодних преміумфункцій 🎉",
    },
    {
        q: "Для кого підходить Лелека?",
        a: "Лелека не має вікових обмежень. Тому feel free юзати наш месенджер :)",
    },
    {
        q: "Чому я маю обрати Лелеку?",
        a: "Тут ти отримаєш багато можливостей: приватну папку, дошку для збережень, теми, що змінюються залежно від погоди, пасхалки та багато іншого",
    },
    {
        q: "Чи обов’язково встановлювати застосунок?",
        a: "Ні, можеш користуватися вебверсією, якщо ліньки встановлювати застосунок 🙂",
    },
    {
        q: "Чи є мобільна версія?",
        a: "Звичайно, все для твого комфорту 😎",
    },
];

const LandingPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(prev => (prev === index ? null : index));
    };
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#f1f1e6] font-sans text-[#2d4a22]">
            <header className="flex items-center justify-between px-10 py-4 bg-[#b8d5a6]">
                <div className="flex items-center gap-2">
                    <div className="w-[220px] h-[125px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: 'url("/icons/LOGO.png")' }}></div>
                </div>

                <nav className="hidden md:flex gap-6 font-medium text-[#4a6b3a]">
                    <a href="#about" className="hover:underline">Про нас</a>
                    <a href="#benefits" className="hover:underline">Переваги</a>
                    <a href="#app" className="hover:underline">Застосунок</a>
                    <a href="#faq" className="hover:underline">FAQ</a>
                    <a href="#contacts" className="hover:underline">Контакти</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="bg-[#4c7d32] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#3d6528] transition-colors">
                        Створити акаунт
                    </button>
                    <div className="border-2 border-[#4c7d32] rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                        ENG
                    </div>
                </div>
            </header>

            <section className="relative px-10 py-20 flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2 relative">
                    <img src="/icons/chat_interface.png" alt="Chat Interface" className="w-full rounded-3xl" />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Лелека — <br />
                        <span className="text-[#68a347]">український месенджер, що об'єднує</span>
                    </h1>
                    <div className="flex flex-col gap-4 max-w-xs">
                        <button onClick={() => navigate('/register')} className="bg-[#7ba35a] text-white py-3 rounded-xl font-bold text-xl shadow-md hover:bg-[#6a8d4d]">
                            Зареєструватися
                        </button>
                        <button onClick={() => navigate('/login')} className="bg-[#7ba35a] text-white py-3 rounded-xl font-bold text-xl shadow-md hover:bg-[#6a8d4d]">
                            Увійти
                        </button>
                    </div>
                </div>
            </section>
            <section id="about" className="mx-10 my-10 bg-[#b8d5a6]/50 rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-4xl font-extrabold flex items-center gap-2">
                        <img src="/icons/lapa1.png" alt="" /> Про нас
                    </h2>
                    <p className="text-2xl font-bold leading-relaxed">
                        Лелека — український месенджер для швидкого, безпечного та зручного спілкування.
                    </p>
                    <p className="text-xl">
                        Залишайтесь на зв'язку з рідними та друзями — без підтримки іноземних платформ
                    </p>
                    <button className="bg-[#4c7d32] text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-[#3d6528]">
                        Спробувати зараз
                    </button>
                </div>
                <div className="w-full md:w-1/2">
                    <img src="/icons/contacts.png" alt="Contacts list" className="w-full shadow-lg" />
                </div>
            </section>
            <section id="benefits" className="px-10 py-20 text-center">
                <h2 className="text-4xl font-extrabold mb-12 flex justify-center items-center gap-2">
                    <img src="/icons/lapa1.png" alt="" /> Переваги
                </h2>
                <div className="bg-transparent border-4 border-[#7ba35a] rounded-[50px] p-10 grid grid-cols-1 md:grid-cols-5 gap-4">

                    {[
                        {
                            title: "Зручність",
                            desc: "лайтовий інтерфейс",
                            icon: "/icons/ui.png",
                        },
                        {
                            title: "Швидкість",
                            desc: "миттєве повідомлення (0,03 сек)",
                            icon: "/icons/speed.png",
                        },
                        {
                            title: "Безпечність",
                            desc: "використовуємо HTTPS",
                            icon: "/icons/lock.png",
                        },
                        {
                            title: "Кастомізація",
                            desc: "твій стиль – твої правила",
                            icon: "/icons/custom.png",
                        },
                        {
                            title: "Приватна папка",
                            desc: "максимальна секретність",
                            icon: "/icons/folder2.png",
                        },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#7ba35a] p-6 rounded-[30px] text-white flex flex-col items-center justify-center space-y-4">
                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-12 h-12 object-contain"
                            />
                            <h3 className="font-bold text-xl">{item.title}</h3>
                            <p className="text-sm opacity-90">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section id="app" className="px-10 py-20 bg-[#c7dfb6] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                    <h2 className="text-4xl font-extrabold flex justify-center items-center gap-2">
                        <img src="/icons/lapa1.png" alt="" /> Застосунок
                    </h2>
                    <p className="text-xl font-medium">
                        Лелека доступний у вебверсії та як застосунок — обирай формат, який тобі зручніший <br />
                        Спілкуйся легко з будь-якого пристрою :)
                    </p>
                    <div className="relative inline-block">
                        <span className="absolute -top-8 left-1 text-sm font-bold text-[#4c7d32] rotate-[-10deg]">
                            тиць...
                        </span>

                        <img
                            src="/icons/ArrowTUC.png"
                            alt=""
                            className="absolute -top-6 -left-14 w-20 rotate-[-10deg]"
                        />

                        <button className="bg-[#4c7d32] text-white px-16 py-4 rounded-xl font-bold text-2xl hover:bg-[#3d6528] shadow-lg relative z-10">
                            Завантажити
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
                    <img
                        src="/icons/waves.png"
                        alt="Waves"
                        className="w-full object-cover opacity-90"
                        draggable="false"
                    />
                </div>
            </section>
            <section id="faq" className="px-10 py-20">
                <h2 className="text-5xl font-black text-center mb-16">FAQ</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {faqItems.map((item, index) => {
                        const open = openFaq === index;

                        return (
                            <div
                                key={index}
                                onClick={() => toggleFaq(index)}
                                className="bg-[#7ba35a] text-white p-6 rounded-2xl cursor-pointer"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold">{item.q}</h3>
                                    <img
                                        src="/icons/faq-arrow.png"
                                        className={`w-6 transition-transform ${open ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                <div
                                    className={`mt-4 text-sm transition-all overflow-hidden ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {item.a}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section id="contacts" className="px-10 py-20 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-5xl font-extrabold flex items-center gap-3">
                        <img src="/icons/lapa1.png" alt="" /> Контакти
                    </h2>
                    <p className="text-2xl font-bold max-w-md">
                        Залишилися питання? Маєш ідею чи хочеш залишити відгук? — наша пошта завжди відкрита для тебе )
                    </p>
                    <p className="text-2xl font-bold text-[#4c7d32]">Чекаємо на твій меседж!</p>
                </div>

                <div className="w-full md:w-1/2 relative group">
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                        <img src="/icons/lotus-contact.png" alt="Contact us" className="w-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-[#4c7d32]/90 backdrop-blur-sm text-white px-12 py-4 rounded-xl font-bold text-2xl hover:scale-105 transition-transform">
                                Написати нам
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-[#b8d5a6] px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <div
                        className="w-[220px] h-[125px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
                    ></div>
                </div>

                <nav className="flex gap-4 font-bold text-[#4c7d32]">
                    <a href="#about">Про нас</a>
                    <a href="#benefits">Переваги</a>
                    <a href="#app">Застосунок</a>
                    <a href="#faq">FAQ</a>
                    <a href="#contacts">Контакти</a>
                </nav>

                <a href="mailto:deliveryleleka@gmail.com" className="text-xl font-bold underline decoration-2">
                    deliveryleleka@gmail.com
                </a>
            </footer>
        </div>
    );
};

export default LandingPage;