"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { useEffect, useState } from "react";
import {
  SearchBar,
  AnimatedModal,
  CategoryFilter,
  ScenarioCard,
  ScenarioRoleplayDetail,
} from "../../components/ui";
import { axiosElwyn, fetcherBackend } from "../../utils/api";
import { CreationMode } from "../../components/ui/showcase/CreationMode";
import { Category, formatNickname } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { RoleplayResponse } from "../../interface";
import { ConversationModalForm } from "../../components/ui/showcase/ConversationModalForm";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { settingNickname } from "../../stores/user-slice";
import IC from "../../utils/IC";
import { _SERVICE } from "../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import { Principal } from "@dfinity/principal";

export type FlatFormValues = Record<string, any>;

export default function ScenariosPage() {
  const principal = Cookies.get("principal");
  const userNickname = Cookies.get("nickname");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading] = useState(false);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [showRoleplayModal, setShowRoleplayModal] = useState(false);
  const [currentRoleplayDetail, setCurrentRoleplayDetail] =
    useState<RoleplayResponse | null>(null);
  const [currentConversation, setCurrentConversation] =
    useState<RoleplayResponse | null>(null);
  const [conversationId, setConversationId] = useState<string>("");

  const { nickname } = useSelector((state: any) => state.user);

  const [currentNickname, setCurrentNickname] = useState(
    nickname || userNickname
  );
  const navigate = useNavigate();

  const { data: totalScenariosData } = useSWR(
    `/quick-roleplay/all/${principal}`,
    fetcherBackend
  );

  const totalScenariosResult: RoleplayResponse[] = totalScenariosData?.data;

  const handleClickNewRoleplay = () => {
    setIsOpen(true);
  };

  const handleClickCreationMode = (mode: Category) => {
    if (mode === Category.Quick) {
      navigate("/showcase/roleplay/quick-create");
    } else if (mode === Category.Advanced) {
      navigate("/showcase/roleplay/advance-create");
    }
  };

  const handleClickRoleplay = (item: RoleplayResponse) => {
    setCurrentRoleplayDetail(item);
    setShowRoleplayModal(true);
  };

  const handleCreateConversation = async (item: RoleplayResponse) => {
    const toastId = toast.loading("Creating conversation...", {
      id: "create-conversation",
      duration: Infinity,
    });
    try {
      setOpenPopoverIndex(null);
      const response = await axiosElwyn.post(
        "/assessment/scenario-conversation/create",
        {
          scenario_id: item.id,
        }
      );
      toast.dismiss(toastId);
      setConversationId(response.data.data.id);
      setConversationOpen(true);
      setCurrentConversation(item);
    } catch (e) {
      toast.error(e?.toString(), {
        id: toastId,
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    if (nickname) {
      setCurrentNickname(nickname);
    }
  }, [nickname]);

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      result
        ?.getUserNickname(Principal.fromText(principal ?? ""))
        .then((userNicknameResult) => {
          if (userNicknameResult?.[0]) {
            const finalNickname = userNicknameResult?.[0];
            dispatch(settingNickname(finalNickname));
            Cookies.set("nickname", finalNickname);
          }
        });
    });
  }, []);

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {formatNickname(currentNickname)}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create and manage your roleplay scenarios
            </p>
          </div>
          <a
            onClick={handleClickNewRoleplay}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Roleplay</span>
          </a>
        </div>
        <SearchBar title="Roleplay" showRoleOption />
        <CategoryFilter />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
          {totalScenariosResult?.map(
            (item: RoleplayResponse, index: number) => (
              <ScenarioCard
                key={item.id}
                item={item}
                index={index}
                setOpenPopoverIndex={setOpenPopoverIndex}
                openPopoverIndex={openPopoverIndex}
                handleCreateConversation={handleCreateConversation}
                onRoleplaySelected={(item: RoleplayResponse) =>
                  handleClickRoleplay(item)
                }
              />
            )
          )}
        </div>
        <AnimatedModal
          widthFitContainer
          isOpen={isOpen}
          onClose={() => {
            if (loading) return;
            setIsOpen(false);
          }}
        >
          <CreationMode
            onChooseMode={(mode: Category) => handleClickCreationMode(mode)}
            onClose={() => setIsOpen(false)}
          />
        </AnimatedModal>
        <ConversationModalForm
          isOpen={conversationOpen}
          onClose={() => {
            if (loading) return;
            setConversationOpen(false);
          }}
          conversationId={conversationId}
          currentConversation={currentConversation}
        />
        <AnimatedModal
          isOpen={showRoleplayModal}
          onClose={() => setShowRoleplayModal(false)}
        >
          <ScenarioRoleplayDetail item={currentRoleplayDetail} />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
