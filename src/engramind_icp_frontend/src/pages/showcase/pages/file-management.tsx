"use client";
import ShowcaseLayout from "../ShowcaseLayout";
import { useState } from "react";
import {
  AnimatedModal,
  FileCard,
  UploadFileForm,
} from "../../../components/ui";
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import { UploadIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie";
import useSWR from "swr";
import { FileResponse } from "../../../interface";
import { toast } from "sonner";

export type FlatFormValues = Record<string, any>;

export default function FileManagementPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/conversational/files/organization?organization_id=${name}`,
    fetcherElwyn
  );

  const totalFilesResult = totalFilesData?.data?.files;

  const handleDownloadFile = async (fileId: string) => {
    const toastId = toast.loading(`Downloading file`, {
      id: "download-file",
      duration: Infinity,
    });
    try {
      setLoading(true);
      const response = await axiosElwyn.get(
        `/conversational/files/download/${fileId}`,
        {
          headers: {
            responseType: "arraybuffer",
          },
        }
      );
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `file-${fileId}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setLoading(false);
      setIsOpen(false);
      toast.success(`Files downloaded successfully!`, {
        id: toastId,
        duration: 4000,
      });
    } catch (e) {
      toast.error(e?.toString(), {
        id: toastId,
        duration: 4000,
      });
      console.log(e, "<<<< EEE");
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    const toastId = toast.loading(`Deleting file`, {
      id: "delete-file",
      duration: Infinity,
    });
    try {
      setLoading(true);
      await axiosElwyn.delete(`/conversational/files/${fileId}`);
      filesMutate();
      setLoading(false);
      setIsOpen(false);
      toast.success(`Files deleted successfully!`, {
        id: toastId,
        duration: 4000,
      });
    } catch (e) {
      toast.error(e?.toString(), {
        id: toastId,
        duration: 4000,
      });
      console.log(e, "<<<< EEE");
      setLoading(false);
    }
  };

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              File Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload your files with any extension here
            </p>
          </div>
          <a
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Upload Files</span>
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {totalFilesResult?.map((item: FileResponse) => (
            <FileCard
              key={item.file_id}
              item={item}
              handleDeleteFile={handleDeleteFile}
            />
          ))}
        </div>
        <AnimatedModal
          widthFitContainer
          isOpen={isOpen}
          onClose={() => {
            if (loading) return;
            setIsOpen(false);
          }}
        >
          <UploadFileForm
            loading={loading}
            setIsOpen={setIsOpen}
            setLoading={setLoading}
            filesMutate={filesMutate}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
