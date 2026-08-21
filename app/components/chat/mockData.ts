import type { ChatItem, ExtendedMessage, UserProfile } from "~/types";

export const MY_PROFILE: UserProfile = {
  name: "Лінус Торвальдс",
  username: "@linus",
  bio: "Найкращий програміст",
  avatar: "ЛТ",
};

export const INITIAL_CHATS: ChatItem[] = [
  { id: "1", name: "Кум Тарас 🌾", sub: "", date: "15:30", status: "В мережі" },
  { id: "2", name: "Мама 🧦", sub: "", date: "14:15", status: "В мережі" },
  { id: "3", name: "Тімлід Сергій 💻", sub: "", date: "12:05", status: "Оффлайн" },
  { id: "4", name: "Нова Пошта 📦", sub: "", date: "Вчора", status: "В мережі" },
  { id: "5", name: "Кіт Василь 🐈", sub: "", date: "Вчора", status: "В мережі" },
];

export const INITIAL_MESSAGES: Record<string, ExtendedMessage[]> = {
  "1": [
    { id: "m1", text: "Здорово! Ти де? Тут сало з часником пропадає!", fromMe: false, time: "15:20" },
    { id: "m2", text: "Вже виїжджаю! Хліб брати?", fromMe: true, time: "15:22", read: true },
    { id: "m3", text: "Бери два! І цибулю зелену!", fromMe: false, time: "15:30" },
  ],
  "2": [
    { id: "m1", text: "Сину, надворі +18, а ти без шапки пішов?", fromMe: false, time: "14:00" },
    { id: "m2", text: "Мам, на вулиці спека, яка шапка) ", fromMe: true, time: "14:10", read: true },
    { id: "m3", text: "Вітер підступний! І меш капці вдягни!", fromMe: false, time: "14:15" },
  ],
  "3": [
    { id: "m1", text: "Там невелика правка по проекту на 5 хвилин...", fromMe: false, time: "11:50" },
    { id: "m2", text: "Знову весь сайт переписувати? 😅", fromMe: true, time: "12:00", read: true },
    { id: "m3", text: "Ну майже, зате дизайн гарний буде))", fromMe: false, time: "12:05" },
  ],
  "4": [
    { id: "m1", text: "Ваша посилка 20450098321 прибула у відділення!", fromMe: false, time: "10:00" },
    { id: "m2", text: "Дякую, увечері заберу", fromMe: true, time: "10:15", read: false },
  ],
  "5": [
    { id: "m1", text: "Мяу.", fromMe: false, time: "08:00" },
    { id: "m2", text: "Васю, я тобі 5 хвилин тому насипав повну миску!", fromMe: true, time: "08:02", read: true },
    { id: "m3", text: "Та то не той корм, насип смачний 😾", fromMe: false, time: "08:05" },
  ],
};