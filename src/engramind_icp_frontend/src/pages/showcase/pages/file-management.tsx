"use client";
import ShowcaseLayout from "../ShowcaseLayout";
import { useState } from "react";
import {
  AnimatedModal,
  FileCard,
  UploadFileForm,
} from "../../../components/ui";
import { axiosBackend, fetcherBackend } from "../../../utils/api";
import { UploadIcon } from "@radix-ui/react-icons";
import useSWR from "swr";
import {
  DeleteFileJobResponse,
  FileResponse,
  JobResponse,
} from "../../../interface";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { JobStatus } from "../../../utils/helper";

export type FlatFormValues = Record<string, any>;

export default function FileManagementPage() {
  const principal = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/files/all/${principal}`,
    fetcherBackend
  );

  const totalFilesResult: FileResponse[] = totalFilesData?.data?.files;

  const handleDownloadFile = async (fileId: string) => {
    const toastId = toast.loading(`Downloading file`, {
      id: "download-file",
      duration: Infinity,
    });
    try {
      setLoading(true);
      const response = await axiosBackend.get(
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
    try {
      setLoading(true);
      const response = await axiosBackend.delete(`/files/file/${fileId}`);
      const jobResponse = response.data as JobResponse;
      const deleteFileInterval = setInterval(async () => {
        const deleteFileStatus = await axiosBackend.get(
          `/files/job-status-delete/${jobResponse.jobId}`
        );
        const deleteFileResult = deleteFileStatus.data as DeleteFileJobResponse;
        if (deleteFileResult.jobStatus === JobStatus.Completed) {
          toast.success("File deleted successfully!", {
            id: "file-deleted-success",
            duration: 4000,
          });
          setLoading(false);
          filesMutate();
          setIsOpen(false);
          clearInterval(deleteFileInterval);
        } else if (deleteFileResult.jobStatus === JobStatus.Failed) {
          setLoading(false);
          toast.error("File failed to be deleted. Please try again.", {
            id: "file-deleted-error",
            duration: 4000,
          });
          clearInterval(deleteFileInterval);
        }
      }, 1500);
    } catch (e) {
      toast.error(e?.toString(), {
        id: "delete-file-error",
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
