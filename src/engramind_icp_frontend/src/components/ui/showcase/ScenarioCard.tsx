import { Popover } from "antd";
import { EllipsisVertical } from "lucide-react";
import { RoleplayResponse } from "../../../interface";

interface Props {
  item: RoleplayResponse;
  setOpenPopoverIndex: (value: any) => void;
  openPopoverIndex: any;
  index: number;
  handleCreateConversation: (item: RoleplayResponse) => void;
}

export const ScenarioCard = ({
  item,
  setOpenPopoverIndex,
  openPopoverIndex,
  index,
  handleCreateConversation,
}: Props) => {
  return (
    <div
      key={item.id}
      // onClick={() => handleSelectedPersona(item)}
      className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
    >
      <img
        src={
          item.description.charactersGender === "Male"
            ? `https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            : "https://media.istockphoto.com/id/2177231592/photo/smiling-asian-woman-posing-with-crossed-arms-looking-at-camera-on-blue-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=eBCGJOnTaXbLSis9B_P1JMA7DSKOVDWkICtpaF3wimk="
        }
        alt="character"
        className="w-full h-64 object-cover rounded-t-xl"
        width={400}
        height={300}
      />
      <div className="p-4">
        <div className="relative flex flex-col ">
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
                    handleCreateConversation(item);
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
  );
};
