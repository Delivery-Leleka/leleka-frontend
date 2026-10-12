import { Edit3 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router";
import type { MY_PROFILE } from "~/components/chat/mockData";

interface UserProfileModalProps {
    isProfileModalVisible: boolean;
    setIsProfileModalVisible: Dispatch<SetStateAction<boolean>>;
    onClose?: () => void;
    profile: typeof MY_PROFILE;
}

const UserProfileModal = ({isProfileModalVisible, setIsProfileModalVisible, profile, onClose}: UserProfileModalProps) => {
    const navigate = useNavigate();
    return <>
    {isProfileModalVisible && (
            <div>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsProfileModalVisible(false)}
              />
              <div className="absolute bottom-16 md:bottom-0 left-4 md:left-[110px] w-64 md:w-72 bg-white border border-brand-50 rounded-2xl shadow-xl z-40 p-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-brand-850 text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {profile.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-950 text-sm truncate">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-brand-600 font-medium truncate">
                      {profile.username}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-brand-700 my-3 leading-relaxed bg-brand-50/50 p-2.5 rounded-xl border border-brand-50">
                  {profile.bio}
                </p>
                <button
                  onClick={() => {
                    setIsProfileModalVisible(false);
                    navigate('/myProfile');
                    onClose?.();
                  }}
                  className="w-full py-2 bg-brand-850 text-white rounded-xl text-xs font-medium hover:bg-brand-950 transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Редагувати профіль</span>
                </button>
              </div>
            </div>
          )}
    </>;
}
 
export default UserProfileModal;