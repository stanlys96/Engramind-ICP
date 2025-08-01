import { Popover } from "antd";
import { EllipsisVertical } from "lucide-react";
import { RoleplayResponse } from "../../../interface";

interface Props {
  item: RoleplayResponse;
  setOpenPopoverIndex: (value: any) => void;
  openPopoverIndex: any;
  index: number;
  handleCreateConversation: (item: RoleplayResponse) => void;
  onRoleplaySelected: (item: RoleplayResponse) => void;
}

export const ScenarioCard = ({
  item,
  setOpenPopoverIndex,
  openPopoverIndex,
  index,
  handleCreateConversation,
  onRoleplaySelected,
}: Props) => {
  return (
    <div
      key={item.id}
      onClick={() => onRoleplaySelected(item)}
      className="dark:bg-zinc-800 relative bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
    >
      <img
        src={
          item.description.charactersGender === "Male"
            ? `/assets/male_persona.avif`
            : "/assets/female_persona.webp"
        }
        alt="character"
        className="w-full h-64 object-cover rounded-t-xl"
      />
      <div className="flex flex-wrap gap-2 absolute top-2 left-2">
        {item?.category?.map((cat) => (
          <button
            key={cat}
            className="flex items-center opacity-80 text-[11px] px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="p-4 relative">
        <div className="relative flex flex-col gap-y-1">
          <h3 className="text-md font-semibold dark:text-white text-zinc-800">
            {item.name}
          </h3>
          <p className="text-md dark:text-[#73808C] text-[#627084]">
            {item.description.charactersName}
          </p>
          <p className="text-sm text-[#4B5563] dark:text-[#D1D5DB]">
            Gender: {item.description.charactersGender}
          </p>
          <p className="text-sm text-[#4B5563] dark:text-[#D1D5DB]">
            Visibility:{" "}
            <span className="font-bold">
              {!item.visibility ? "Private" : "Public"}
            </span>
          </p>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full justify-end"
          >
            <Popover
              content={
                <div>
                  <button
                    className="cursor-pointer"
                    onClick={async () => handleCreateConversation(item)}
                  >
                    Start Conversation
                  </button>
                </div>
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
  );
};
