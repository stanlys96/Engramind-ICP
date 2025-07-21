import { Download, Trash2Icon } from "lucide-react";
import { formatDateToLocal } from "../../../utils/helper";
import { FileResponse } from "../../../interface";

interface Props {
  item: FileResponse;
  handleDeleteFile: (fileId: string) => void;
}

export const FileCard = ({ item, handleDeleteFile }: Props) => {
  return (
    <div
      key={item.file_id}
      className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg transition-all duration-300"
    >
      <div className="p-4 h-full">
        <div className="flex flex-col justify-between h-full">
          <h3 className="text-base mb-2 font-semibold dark:text-white text-zinc-800">
            {item.filename}
          </h3>
          <div>
            <p className="text-[#A1A1AA] text-sm">
              Uploaded: {formatDateToLocal(item.created_at)}
            </p>
            <p className="text-[#A1A1AA] text-sm">ID: {item.file_id}</p>
          </div>
          <p className="text-[#73808C] text-sm mt-3">Type: {item.file_type}</p>
          <div className="flex gap-x-2 justify-end items-center">
            <button
              // onClick={() => handleDownloadFile(item.file_id)}
              type="button"
              className="cursor-pointer bg-purple-500 flex gap-x-1 items-center mt-2 text-white text-xs font-medium px-4 py-2 rounded-full w-fit hover:opacity-60 transition-all duration-300"
            >
              <Download size={13} />
              Download
            </button>
            <button
              onClick={() => handleDeleteFile(item.file_id)}
              type="button"
              className="cursor-pointer bg-red-500 flex gap-x-1 items-center mt-2 text-white text-xs font-medium px-4 py-2 rounded-full w-fit hover:opacity-60 transition-all duration-300"
            >
              <Trash2Icon size={13} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
