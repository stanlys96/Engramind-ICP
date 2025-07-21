import {
  AnimatedModal,
  LogoutForm,
  ShowcaseHeader,
  SideDrawer,
  UpdateNicknameForm,
} from "../../components/ui";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../../theme/theme-toggle";
import { _SERVICE } from "../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../utils/IC";
import { useNavigate } from "react-router-dom";
import { formatNickname, navbarLinkData } from "../../utils/helper";
import { NavbarLinkData } from "../../interface";
import { Principal } from "@dfinity/principal";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { resetState, settingNickname } from "../../stores/user-slice";
import Cookies from "js-cookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const principal = Cookies.get("principal");
  const userNickname = Cookies.get("nickname");
  const dispatch = useDispatch();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateNickname, setShowUpdateNickname] = useState(false);
  const { nickname } = useSelector((state: any) => state.user);

  const [currentNickname, setCurrentNickname] = useState(
    nickname || userNickname
  );

  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const navigate = useNavigate();

  const handleUpdateNickname = async (value: string) => {
    const toastId = toast.loading("Updating nickname...", {
      id: "update-nickname",
      duration: Infinity,
    });
    try {
      setLoading(true);
      await backend?.updateMyNickname(
        Principal.fromText(principal ?? ""),
        value
      );
      dispatch(settingNickname(value));
      Cookies.set("nickname", value);
      setLoading(false);
      toast.success("Nickname updated successfully!", {
        id: toastId,
        duration: 4000,
      });
      setShowUpdateNickname(false);
    } catch (e) {
      toast.error(e?.toString(), {
        id: toastId,
        duration: 4000,
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    Cookies.set("principal", "");
    Cookies.set("nickname", "");
    dispatch(resetState());
    IC?.logout();
    navigate("/");
  };
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      setBackend(result);
    });
  }, []);

  useEffect(() => {
    if (nickname) {
      setCurrentNickname(nickname);
    }
  }, [nickname]);

  return (
    <div>
      <div className="relative bg-zinc-50 dark:bg-zinc-900 min-h-screen overflow-auto">
        <ShowcaseHeader
          setShowUpdateNickname={setShowUpdateNickname}
          setShowConfirm={setShowConfirm}
          setIsOpenDrawer={setIsOpenDrawer}
          name={principal ?? ""}
          currentNickname={currentNickname}
        />
        <div className="max-w-7xl mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
          {children}
        </div>
      </div>
      <AnimatedModal
        showCrossIcon={false}
        widthFitContainer
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
      >
        <LogoutForm
          handleLogout={handleLogout}
          setShowConfirm={setShowConfirm}
        />
      </AnimatedModal>
      <AnimatedModal
        widthFitContainer
        className="w-full md:w-[50%]"
        isOpen={showUpdateNickname}
        onClose={() => {
          if (loading) return;
          setShowUpdateNickname(false);
        }}
      >
        <UpdateNicknameForm
          loading={loading}
          currentNickname={currentNickname}
          handleUpdateNickname={handleUpdateNickname}
          setShowUpdateNickname={setShowUpdateNickname}
        />
      </AnimatedModal>
      <SideDrawer
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <nav className="gap-6 text-md flex flex-col text-gray-700 dark:text-gray-300 leading-relaxed">
          {navbarLinkData.map((linkData: NavbarLinkData, index: number) => (
            <Link
              key={linkData.id + index.toString()}
              to={linkData.href}
              className={`hover:text-purple-600 dark:hover:text-purple-400 ${
                (linkData?.includes &&
                  pathname?.includes(linkData?.includes)) ||
                pathname === linkData?.href
                  ? "text-purple-600 font-bold"
                  : ""
              }`}
            >
              {linkData.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 items-start mt-[20px] relative">
          <div className="flex gap-x-2 justify-center items-center">
            <img
              src="/assets/male_persona.avif"
              alt="Profile"
              className="rounded-full w-8 h-8 cursor-pointer hover:shadow-lg transition-all duration-300"
              width={400}
              height={300}
            />
            <div className="text-sm text-purple-600 dark:text-purple-300 capitalize font-semibold">
              {formatNickname(currentNickname)}
            </div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer transition"
          >
            Logout
          </button>
          <ThemeToggle customClassName="" />
        </div>
      </SideDrawer>
    </div>
  );
}
