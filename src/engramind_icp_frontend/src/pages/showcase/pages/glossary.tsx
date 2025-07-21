"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useEffect, useState } from "react";
import {
  SearchBar,
  AnimatedModal,
  CreateOrUpdateGlossaryForm,
  ItemCard,
} from "../../../components/ui";
import { useFormik } from "formik";
import {
  createUpdateGlossaryInitialValues,
  createUpdateGlossarySchema,
  CreateUpdateGlossaryValues,
} from "../../../formik";
import { axiosBackend, fetcherBackend } from "../../../utils/api";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import { GlossaryData, GlossaryResponse } from "../../../interface";
import useSWR from "swr";
import { toast } from "sonner";
import { GlossaryDetail } from "../../../components/ui/showcase/GlossaryDetail";
import { formatNickname, ItemType, JobStatus } from "../../../utils/helper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export type FlatFormValues = Record<string, any>;

export default function GlossaryPage() {
  const principal = Cookies.get("principal");
  const userNickname = Cookies.get("nickname");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryData | null>(
    null
  );
  const [isOpenGlossaryDetail, setIsOpenGlossaryDetail] =
    useState<boolean>(false);

  const { nickname } = useSelector((state: any) => state.user);
  const [currentNickname, setCurrentNickname] = useState(
    nickname || userNickname
  );

  const { data: totalGlossaryData, mutate: glossaryMutate } = useSWR(
    `/glossary/all/${principal}`,
    fetcherBackend
  );

  const totalGlossaryResult: GlossaryData[] = totalGlossaryData?.data;

  const handleSelectGlossary = (item: GlossaryData) => {
    setSelectedGlossary(item);
    setIsOpenGlossaryDetail(true);
  };

  const handleClickNewGlossary = () => {
    setIsOpen(true);
    createFormik?.setFieldValue("createOrUpdate", "create");
    createFormik?.setFieldValue("name", "");
    createFormik?.setFieldValue("content", "");
  };

  const handleEditGlossary = () => {
    setIsOpenGlossaryDetail(false);
    setIsOpen(true);
    createFormik?.setFieldValue("createOrUpdate", "update");
    createFormik?.setFieldValue("name", selectedGlossary?.name);
    createFormik?.setFieldValue("content", selectedGlossary?.glossary);
    createFormik?.setFieldValue("createdOn", selectedGlossary?.timestamp);
  };

  async function pollJobStatus<T>(
    jobId: string,
    statusEndpoint: string,
    onSuccess: (resultData: T) => Promise<void> | void,
    onFailure: (errorMessage: string) => void,
    pollingIntervalMs: number = 1000,
    maxPollAttempts: number = 60 // Max 60 attempts for 1 minute (1s interval)
  ): Promise<void> {
    let intervalId: any = null;
    let attempts = 0;

    return new Promise((resolve, reject) => {
      intervalId = setInterval(async () => {
        attempts++;
        if (attempts > maxPollAttempts) {
          clearInterval(intervalId!);
          onFailure("Polling timed out. Please check back later.");
          reject(new Error("Polling timed out"));
          return;
        }

        try {
          const statusResponse = await axiosBackend.get(
            `${statusEndpoint}/${jobId}`
          );
          const jobResult = statusResponse.data as GlossaryResponse;

          if (jobResult.jobStatus === JobStatus.Completed) {
            clearInterval(intervalId!);
            await onSuccess(jobResult.result?.data as T);
            resolve();
          } else if (jobResult.jobStatus === JobStatus.Failed) {
            clearInterval(intervalId!);
            onFailure(
              jobResult.failedReason || "Job failed. Please try again."
            );
            reject(new Error(jobResult.failedReason || "Job failed"));
          }
        } catch (error) {
          clearInterval(intervalId!);
          onFailure("Failed to check job status due to a network error.");
          reject(error);
        }
      }, pollingIntervalMs);
    });
  }

  const createFormik = useFormik<CreateUpdateGlossaryValues>({
    initialValues: createUpdateGlossaryInitialValues,
    validationSchema: createUpdateGlossarySchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        let jobResponse: any;
        let endpoint: string;
        let successMessage: string;
        let failureMessage: string;
        let pollEndpoint: string;
        let successCallback: (resultData: {
          id: string;
        }) => Promise<void> | void;

        if (values.createOrUpdate === "create") {
          endpoint = "/glossary/create";
          pollEndpoint = "/glossary/job-status-create";
          successMessage = "Glossary created successfully!";
          failureMessage = "Glossary failed to be created. Please try again.";
          successCallback = async (resultData: { id: string }) => {
            await backend?.addContentToUser(
              Principal.fromText(principal ?? ""),
              { Glossary: null },
              resultData.id
            );
          };
        } else {
          endpoint = "/glossary/update";
          pollEndpoint = "/glossary/job-status-update";
          successMessage = "Glossary updated successfully!";
          failureMessage = "Glossary failed to be updated. Please try again.";
          successCallback = async () => {};
        }
        jobResponse = await axiosBackend.post(endpoint, {
          name: values.name,
          glossary: values.content,
          ...(values.createOrUpdate === "create" && {
            organization_id: principal,
          }),
          ...(values.createOrUpdate === "update" && {
            id: selectedGlossary?.id,
          }),
        });

        const { jobId } = jobResponse.data;

        await pollJobStatus<{ id: string }>(
          jobId,
          pollEndpoint,
          async (resultData) => {
            await successCallback(resultData);
            glossaryMutate();
            toast.success(successMessage, {
              id: `${values.createOrUpdate}-glossary-success`,
              duration: 4000,
            });
          },
          (errorMessage) => {
            toast.error(errorMessage, {
              id: `${values.createOrUpdate}-glossary-error`,
              duration: 4000,
            });
          }
        );
      } catch (error) {
        console.error("Operation failed:", error);
        toast.error(error?.toString(), {
          id: `${values.createOrUpdate}-glossary-error`,
          duration: 4000,
        });
      } finally {
        setLoading(false);
        setIsOpen(false);
        resetForm();
      }
    },
  });

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      setBackend(result);
    });
  }, []);

  useEffect(() => {
    if (nickname) {
      setCurrentNickname(nickname);
    }
  }, [nickname]);

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {formatNickname(currentNickname)}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create and manage your glossaries
            </p>
          </div>
          <a
            onClick={handleClickNewGlossary}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Glossary</span>
          </a>
        </div>
        <SearchBar title="Glossary" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {totalGlossaryResult?.map((item: GlossaryData) => (
            <ItemCard
              key={item.id}
              item={item}
              handleSelect={handleSelectGlossary}
              itemType={ItemType.Glossary}
            />
          ))}
        </div>
        <AnimatedModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <CreateOrUpdateGlossaryForm
            loading={loading}
            createFormik={createFormik}
            setIsOpen={setIsOpen}
          />
        </AnimatedModal>
        <AnimatedModal
          widthFitContainer
          className="w-full md:w-[50%]"
          isOpen={isOpenGlossaryDetail}
          onClose={() => setIsOpenGlossaryDetail(false)}
        >
          <GlossaryDetail
            onEditPress={handleEditGlossary}
            glossary={selectedGlossary}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
