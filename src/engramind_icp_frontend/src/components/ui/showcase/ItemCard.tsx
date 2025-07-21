import { LucideBook, LucideCalculator, LucideSpeech } from "lucide-react";
import { ItemType } from "../../../utils/helper";

interface Props {
  item: any;
  handleSelect: (item: any) => void;
  itemType: ItemType;
}

export const ItemCard = ({ item, handleSelect, itemType }: Props) => {
  const getIcon = () => {
    if (itemType === ItemType.Persona) {
      return <LucideSpeech />;
    } else if (itemType === ItemType.Rubrics) {
      return <LucideCalculator />;
    } else if (itemType === ItemType.Glossary) {
      return <LucideBook />;
    }
  };
  return (
    <div
      key={item.id}
      onClick={() => handleSelect(item)}
      className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
    >
      <div className="p-4  ">
        <>
          <div className="p-3 border dark:border-zinc-700 border-zinc-200 rounded-2xl shadow-xl w-fit mb-2">
            {getIcon()}
          </div>
          <h3 className="text-base font-semibold dark:text-white text-zinc-800">
            {item.name}
          </h3>
          <p className="bg-purple-500 mt-2 text-white text-xs font-medium px-2 py-1 rounded-full w-fit">
            {item.timestamp?.slice(0, 10)}
          </p>
        </>
      </div>
    </div>
  );
};
