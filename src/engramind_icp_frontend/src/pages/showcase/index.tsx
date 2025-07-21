"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { useState } from "react";
import {
  SearchBar,
  AnimatedModal,
  CategoryFilter,
  ScenarioCard,
} from "../../components/ui";
import { axiosElwyn, fetcherElwyn } from "../../utils/api";
import Cookies from "js-cookie";
import { CreationMode } from "../../components/ui/showcase/CreationMode";
import { Category } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { RoleplayResponse, RoleplayResponseRaw } from "../../interface";
import { ConversationModalForm } from "../../components/ui/showcase/ConversationForm";
import { toast } from "sonner";

export type FlatFormValues = Record<string, any>;

export default function ScenariosPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [currentConversation, setCurrentConversation] =
    useState<RoleplayResponse | null>(null);
  const [conversationId, setConversationId] = useState<string>("");

  const navigate = useNavigate();

  const { data: totalScenariosData, mutate: totalScenariosMutate } = useSWR(
    `/assessment/scenarios/organization/all?organization_id=${name}`,
    fetcherElwyn
  );

  const totalScenariosResult = totalScenariosData?.data?.data?.map(
    (result: RoleplayResponseRaw) => ({
      ...result,
      description: JSON.parse(result?.description),
    })
  );

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

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {name?.slice(0, 12) + "..."}
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
        <SearchBar showRoleOption />
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
      </div>
    </ShowcaseLayout>
  );
}
