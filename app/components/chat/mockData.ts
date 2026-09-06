import type { ChatItem, ExtendedMessage, UserProfile } from "~/types";

export const MY_PROFILE: UserProfile = {
  name: "Олексій",
  username: "@alex_dev",
  bio: "Frontend Developer",
  avatar: "ОК",
};

export const INITIAL_CHATS: ChatItem[] = [
  { id: "1", name: "Андрій (Work) 💻", sub: "", date: "16:45", status: "В мережі" },
  { id: "2", name: "Оля ☕", sub: "", date: "15:20", status: "В мережі" },
  { id: "3", name: "Мама ❤️", sub: "", date: "14:10", status: "В мережі" },
  { id: "4", name: "Макс Дев 🚀", sub: "", date: "12:30", status: "Оффлайн" },
  { id: "5", name: "Ріелтор Євген 🔑", sub: "", date: "11:15", status: "В мережі" },
  { id: "6", name: "Дмитро Авто 🚗", sub: "", date: "Вчора", status: "Оффлайн" },
  { id: "7", name: "Тарас Футбол ⚽", sub: "", date: "Вчора", status: "В мережі" },
  { id: "8", name: "Аня HR 💼", sub: "", date: "18.08", status: "Оффлайн" },
  { id: "9", name: "Сусід Влад 🏠", sub: "", date: "17.08", status: "В мережі" },
  { id: "10", name: "Сергій Кава 🥐", sub: "", date: "15.08", status: "В мережі" },
];

export const INITIAL_MESSAGES: Record<string, ExtendedMessage[]> = {
  "1": [
    { id: "m1", text: "Привіт, ти дивився оновлений дейлі-таск на таску з авторизацією?", fromMe: false, time: "16:30" },
    { id: "m2", text: "Так, вже поправив рефреш-токени. Зараз закину на рев'ю.", fromMe: true, time: "16:38", read: true },
    { id: "m3", text: "Супер, дякую! Натисни тоді апрув у PR, як залієш.", fromMe: false, time: "16:45" },
  ],
  "2": [
    { id: "m1", text: "Вільний увечері? Можемо зайти в те нове кафе біля парку.", fromMe: false, time: "15:05" },
    { id: "m2", text: "Звучить чудово) О котрій плануєш?", fromMe: true, time: "15:12", read: true },
    { id: "m3", text: "Давай десь о 19:00, я якраз закінчу справи.", fromMe: false, time: "15:20" },
  ],
  "3": [
    { id: "m1", text: "Привіт, ти як? Не забув, що у суботу до бабусі на день народження?", fromMe: false, time: "13:50" },
    { id: "m2", text: "Пам'ятаю! Квіти я замовлю, заїду за вами о 12:00.", fromMe: true, time: "14:02", read: true },
    { id: "m3", text: "Добре, чекаємо. Купи ще дорогою мінералки, будь ласка.", fromMe: false, time: "14:10" },
  ],
  "4": [
    { id: "m1", text: "Чувак, ти тестував новий Next.js? Як тобі Сервер Екшени?", fromMe: false, time: "12:10" },
    { id: "m2", text: "Угу, проперти норм, але треба звикнути до обробки помилок.", fromMe: true, time: "12:22", read: true },
    { id: "m3", text: "Згоден. Скину пізніше статтю з хорошим патерном для цього.", fromMe: false, time: "12:30" },
  ],
  "5": [
    { id: "m1", text: "Доброго дня. З'явився класний варіант на Соборній, 2-кімнатна.", fromMe: false, time: "10:45" },
    { id: "m2", text: "Вітаю! Яка ціна і чи є автономне опалення?", fromMe: true, time: "11:00", read: true },
    { id: "m3", text: "Газове опалення, $450/міс. Можемо глянути сьогодні о 18:00.", fromMe: false, time: "11:15" },
  ],
  "6": [
    { id: "m1", text: "Забрав машину зі СТО, ходову повністю перебрали.", fromMe: false, time: "Вчора" },
    { id: "m2", text: "О, норм! Скільки вийшло по запчастинах?", fromMe: true, time: "Вчора", read: true },
    { id: "m3", text: "Вклався в кошторис, як і домовлялися. Чеки на сидінні.", fromMe: false, time: "Вчора" },
  ],
  "7": [
    { id: "m1", text: "Збираємося у четвер на 19:30, поле заброньовано.", fromMe: false, time: "Вчора" },
    { id: "m2", text: "Плюс, буду. Нас 10 чоловік збирається?", fromMe: true, time: "Вчора", read: true },
    { id: "m3", text: "Так, ще двох чекаю підтвердження і скину локацію.", fromMe: false, time: "Вчора" },
  ],
  "8": [
    { id: "m1", text: "Олексію, вітаю! Направила деталі по офферу вам на пошту.", fromMe: false, time: "18.08" },
    { id: "m2", text: "Дякую, Анно! Зараз перегляну та відпишуся.", fromMe: true, time: "18.08", read: true },
    { id: "m3", text: "Чудово, чекатиму на фідбек до кінця дня.", fromMe: false, time: "18.08" },
  ],
  "9": [
    { id: "m1", text: "Привіт! Тобі посилку кур'єр залишив біля дверей, я забрав до себе.", fromMe: false, time: "17.08" },
    { id: "m2", text: "Ой, дуже дякую! Зайду за хвилин 20, як буду вдома.", fromMe: true, time: "17.08", read: true },
    { id: "m3", text: "Без проблем, я вдома цілий вечір.", fromMe: false, time: "17.08" },
  ],
  "10": [
    { id: "m1", text: "Завтра оновлюємо зерно на колумбійську арабіку, заходь пробувати.", fromMe: false, time: "15.08" },
    { id: "m2", text: "Загляну зранку перед роботою!", fromMe: true, time: "15.08", read: true },
    { id: "m3", text: "Зробимо як завжди флет-вайт 😉", fromMe: false, time: "15.08" },
  ],
};