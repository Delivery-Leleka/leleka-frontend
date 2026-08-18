import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("/icons/add-image.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [errors, setErrors] = useState({ groupName: "" });
  const [members, setMembers] = useState([
    { id: 1, name: "Лелека", status: "В мережі", selected: false },
    { id: 2, name: "Лелека", status: "В мережі", selected: false },
    { id: 3, name: "Лелека", status: "16:58", selected: false },
    { id: 4, name: "Лелека", status: "19:40", selected: false },
    { id: 5, name: "Лелека", status: "Місяць тому о 12:32", selected: false },
    { id: 6, name: "Лелека", status: "19.02 о 17:50", selected: false },
  ]);

  const fileInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
  }

  const handlePhotoPick = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const toggleMember = (id: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m)),
    );
  };

  const validateForm = () => {
    let ok = true;
    const newErrors = { groupName: "" };
    if (groupName.trim().length === 0) {
      newErrors.groupName = "Назва групи є обов'язковою";
      ok = false;
    }
    setErrors(newErrors);
    return ok;
  };

  const submit = () => {
    if (!validateForm()) return;
    console.log("GROUP CREATED", { groupName, description, photo, members });
  };

  return (
    <div className="overflow-hidden min-h-screen flex flex-col md:bg-[url('/icons/bg-new.png')] bg-[url('/icons/bg-new-mobile.png')] font-sans">
      <header className="relative w-full h-16 bg-[#C7E2AE] flex items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <img src="/icons/menu.png" className="w-6 sm:w-7" alt="menu" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold select-none text-black">
            Лелека
          </h1>
        </div>

        <div className="flex items-center bg-white rounded-md h-8 px-3 flex-1 max-w-[40vw] border border-black mx-6 md:max-w-[450px] ">
          <img
            src="/icons/search.png"
            className="w-4 mr-2 opacity-60"
            alt="search"
          />
          <input
            type="text"
            className="flex-1 outline-none text-black text-sm sm:text-base"
          />
        </div>

        <div className="w-6"></div>

        <div
          className={`absolute top-16 left-0 w-56 bg-[#B5D7A5] border border-black rounded-b-xl overflow-hidden transition-all duration-300 z-50 
            ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <ul className="flex flex-col text-black select-none">
            <li onClick={() => goTo("/myProfile")} className="menu-item">
              <img src="/icons/profile.png" className="w-5" /> Профіль
            </li>
            <li onClick={() => goTo("/contacts")} className="menu-item">
              <img src="/icons/phone.png" className="w-5" /> Контакти
            </li>
            <li onClick={() => goTo("/createGroup")} className="menu-item">
              <img src="/icons/add-group.png" className="w-5" /> Створити групу
            </li>
            <li onClick={() => goTo("/privateFolder")} className="menu-item">
              <img src="/icons/folder.png" className="w-5" /> Приватна папка
            </li>
            <li onClick={() => goTo("/archive")} className="menu-item">
              <img src="/icons/archive.png" className="w-5" /> Архів
            </li>
            <li onClick={() => goTo("/settings")} className="menu-item">
              <img src="/icons/settings.png" className="w-5" /> Налаштування
            </li>
            <li className="menu-item">
              <img src="/icons/theme.png" className="w-5" /> Світла/темна тема
            </li>
            <li
              onClick={() => setLogoutModal(true)}
              className="px-4 py-3 flex items-center gap-2 cursor-pointer text-red-600 hover:bg-[#A4C894] border-b border-black"
            >
              <img src="/icons/logout.png" className="w-5" /> Вийти з акаунту
            </li>
          </ul>
        </div>
      </header>

      <main className="flex-1 flex justify-center items-start py-10 px-4 w-full">
        <form className="relative w-full max-w-[1100px] bg-[#BADB9B] rounded-xl p-8 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-[#16321F]">
            Створити групу
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 relative z-10">
            <div>
              <label className="font-bold text-[#16321F]">
                Назва групи <span className="text-red-600">(обов'язково)</span>
              </label>
              <input
                maxLength={70}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className={`w-full h-10 rounded-md border px-3 mt-1 bg-white text-black transition ${errors.groupName ? "border-red-500" : "border-black"}`}
              />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-red-600">{errors.groupName}</span>
                <span className="text-black opacity-70">
                  {70 - groupName.length} символів
                </span>
              </div>
              <label className="font-bold text-[#16321F]">
                Аватар
              </label>

              <div className="flex flex-col gap-4 mt-6 sm:flex-row">
                <div className="flex items-center gap-4">
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#E5E5E5] flex items-center justify-center cursor-pointer relative group overflow-hidden shadow hover:scale-105 transition"
                    onClick={() => fileInput.current?.click()}
                  >
                    <img
                      src={photo}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-black text-sm font-semibold opacity-0 group-hover:opacity-60 bg-white/70 transition">
                      Додати фото
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    className="md:hidden px-4 py-2 bg-[#F2EFE6] text-[#262424] rounded-md"
                  >
                    Обрати з галереї
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInput}
                  className="hidden"
                  onChange={handlePhotoPick}
                />
                <div className="flex-1">
                  <label className="font-bold text-[#16321F]">
                    Опис <span className="text-red-600">(необов'язково)</span>
                  </label>
                  <textarea maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-32 border border-black rounded-md px-3 py-2 mt-1 bg-white text-black resize-none" />
                  <div className="text-right text-xs text-black opacity-70">
                    {300 - description.length} символів
                  </div>
                </div>
              </div>

            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#16321F] mb-4">
                Додати учасників
              </h3>

              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1 pl-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#EAF4E3] [&::-webkit-scrollbar-thumb]:bg-[#AECF98] [&::-webkit-scrollbar-thumb]:rounded-full">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#D7EBCA] border border-black shadow hover:scale-[1.02] transition"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/icons/stork.png" className="w-10" />
                      <div>
                        <div className="font-semibold text-black">{m.name}</div>
                        <div className="text-xs text-black opacity-70">
                          {m.status}
                        </div>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={m.selected}
                      onChange={() => toggleMember(m.id)}
                      className="w-5 h-5 cursor-pointer appearance-none bg-[#AECF98] border border-black checked:bg-[#294A2B] rounded"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={submit}
                className="mt-10 w-full sm:w-52 py-2 bg-[#3F6E33] text-white font-bold rounded-md hover:bg-[#2d5226] transition border border-black shadow"
              >
                Створити
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl pointer-events-none z-0">
            <img
              src="/icons/waves.png"
              alt="Waves"
              className="w-full object-cover opacity-90"
            />
          </div>

        </form>
      </main>

      <footer className="w-full h-20 bg-[#C7E2AE]"></footer>
    </div>
  );
}
