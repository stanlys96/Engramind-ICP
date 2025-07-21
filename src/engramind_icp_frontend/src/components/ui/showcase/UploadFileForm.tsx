import { AnimatedSpinner } from "../AnimatedSpinner";
import { useEffect, useState } from "react";
import { axiosBackend } from "../../../utils/api";
import { FileJobResponse, FileResponse, JobResponse } from "../../../interface";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { JobStatus } from "../../../utils/helper";

interface UploadFileForm {
  loading: boolean;
  setIsOpen: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  filesMutate?: () => void;
}

export const UploadFileForm = ({
  loading,
  setIsOpen,
  setLoading,
  filesMutate,
}: UploadFileForm) => {
  const principal = Cookies.get("principal");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [backend, setBackend] = useState<_SERVICE>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0]?.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("organization_id", principal ?? "");
    try {
      setLoading(true);
      const response = await axiosBackend.post("/files/create", formData);
      const jobResponse = response.data as JobResponse;
      const createFileInterval = setInterval(async () => {
        const fileStatus = await axiosBackend.get(
          `/files/job-status-create/${jobResponse.jobId}`
        );
        const fileResult = fileStatus.data as FileJobResponse;
        if (fileResult.jobStatus === JobStatus.Completed) {
          toast.success("File uploaded successfully!", {
            id: "upload-file-success",
            duration: 4000,
          });
          await backend?.addContentToUser(
            Principal.fromText(principal ?? ""),
            { File: null },
            fileResult?.result?.file_id
          );
          if (filesMutate) {
            filesMutate();
          }
          setIsOpen(false);
          setLoading(false);
          clearInterval(createFileInterval);
        } else if (fileResult.jobStatus === JobStatus.Failed) {
          setLoading(false);
          toast.error("File failed to be uploaded. Please try again.", {
            id: "upload-file-error",
            duration: 4000,
          });
          clearInterval(createFileInterval);
        }
      }, 2000);
    } catch (e) {
      toast.error(e?.toString(), {
        id: "upload-file-error",
        duration: 4000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      setBackend(result);
    });
  }, []);

  return (
    <form>
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
        Upload File
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select any file and upload it to the server.
      </p>
      <div className="shadow-sm cursor-pointer dark:border-zinc-700 border-zinc-200 rounded p-[8px]">
        <input
          disabled={loading}
          className="cursor-pointer"
          type="file"
          onChange={(e) => {
            if (loading) return;
            handleFileChange(e);
          }}
        />
      </div>
      {fileName && (
        <div className="p-[8px] mt-2">
          <p className="text-[#627084] text-[14px]">Selected: {fileName}</p>
        </div>
      )}
      <div className="flex justify-end mt-5 gap-x-3">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleUpload}
          disabled={file === null || loading}
          className={`bg-purple-600 flex gap-x-2 items-center text-white px-4 py-2 rounded cursor-pointer ${
            loading || file === null
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-700"
          }`}
        >
          <AnimatedSpinner show={loading} />
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
};
