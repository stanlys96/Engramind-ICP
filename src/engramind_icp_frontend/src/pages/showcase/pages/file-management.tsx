"use client";
import ShowcaseLayout from "../ShowcaseLayout";
import { useEffect, useState } from "react";
import { AnimatedModal, UploadFileForm } from "../../../components/ui";
import { fetcherElwyn } from "../../../utils/api";
import { UploadIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie";
import useSWR from "swr";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import { selectCommonFiles } from "../../../utils/helper";

export type FlatFormValues = Record<string, any>;

export default function FileManagementPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const [currentFiles, setCurrentFiles] = useState<any>();

  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/conversational/files/organization?organization_id=${name}`,
    fetcherElwyn
  );

  const totalFilesResult = totalFilesData?.data?.files;

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      setBackend(result);
    });
  }, []);

  useEffect(() => {
    if (backend) {
      backend?.getUserFiles(Principal.fromText(name ?? ""))?.then((result) => {
        const currentUserFiles = result?.[0] ?? [];
        if (totalFilesResult?.length > 0 && currentUserFiles?.length > 0) {
          const commonIds = selectCommonFiles(
            totalFilesResult,
            currentUserFiles
          );
          setCurrentFiles(commonIds);
        }
      });
    }
  }, [backend, totalFilesResult]);

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
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentFiles?.map((item: any) => (
            <div
              key={item.id}
              // onClick={() => handleSelectedScenario(item)}
              className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
            >
              <div className="p-4  ">
                <>
                  <h3 className="text-base font-semibold dark:text-white text-zinc-800">
                    {item.filename}
                  </h3>
                  <p className="bg-purple-500 mt-2 text-white text-xs font-medium px-2 py-1 rounded-full w-fit">
                    {item.created_at?.slice(0, 10)}
                  </p>
                </>
              </div>
            </div>
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
