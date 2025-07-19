"use client";
import { EllipsisVertical, PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { useState } from "react";
import { SearchBar, AnimatedModal, CategoryFilter } from "../../components/ui";
import { axiosElwyn, fetcherElwyn } from "../../utils/api";
import Cookies from "js-cookie";
import { CreationMode } from "../../components/ui/showcase/CreationMode";
import { Category } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { RoleplayResponse, RoleplayResponseRaw } from "../../interface";
import { Popover } from "antd";
import { ConversationForm } from "../../components/ui/showcase/ConversationForm";

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
            onClick={() => {
              setIsOpen(true);
            }}
            // to={"/showcase/create"}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Roleplay</span>
          </a>
        </div>
        <SearchBar showRoleOption />
        <CategoryFilter />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {totalScenariosResult?.map(
            (item: RoleplayResponse, index: number) => (
              <div
                key={item.id}
                // onClick={() => handleSelectedPersona(item)}
                className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
              >
                <img
                  src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="character"
                  className="w-full h-64 object-cover rounded-t-xl"
                  width={400}
                  height={300}
                />
                <div className="p-4">
                  <div className="relative">
                    <h3 className="text-base font-semibold dark:text-white text-zinc-800">
                      {item.name}
                    </h3>
                    <p className="text-base text-[#627084]">
                      {item.description.charactersName}
                    </p>
                    <p className="text-sm text-[#627084]">
                      Gender: {item.description.charactersGender}
                    </p>
                    <p className="text-base text-[#627084]">
                      Visibility:{" "}
                      <span className="font-bold">
                        {!item.visibility ? "Private" : "Public"}
                      </span>
                    </p>
                    <div className="flex w-full justify-end">
                      <Popover
                        content={
                          <button
                            className="cursor-pointer"
                            onClick={async () => {
                              const response = await axiosElwyn.post(
                                "/assessment/scenario-conversation/create",
                                {
                                  scenario_id: item.id,
                                }
                              );
                              console.log(response.data);
                              setConversationId(response.data.data.id);
                              setOpenPopoverIndex(null);
                              setConversationOpen(true);
                              setCurrentConversation(item);
                            }}
                          >
                            Vibes Check
                          </button>
                        }
                        trigger="click"
                        open={openPopoverIndex === index}
                        onOpenChange={(visible) => {
                          setOpenPopoverIndex(visible ? index : null);
                        }}
                      >
                        <EllipsisVertical />
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
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
            onChooseMode={(mode: Category) => {
              if (mode === Category.Quick) {
                navigate("/showcase/roleplay/quick-create");
              } else if (mode === Category.Advanced) {
                navigate("/showcase/roleplay/advance-create");
              }
            }}
            onClose={() => setIsOpen(false)}
          />
        </AnimatedModal>
        <AnimatedModal
          isConversation
          isOpen={conversationOpen}
          showCrossIcon={false}
          onClose={() => {
            if (loading) return;
            setConversationOpen(false);
          }}
        >
          <ConversationForm
            onClose={() => {
              if (loading) return;
              setConversationOpen(false);
            }}
            conversationId={conversationId}
            currentConversation={currentConversation}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
