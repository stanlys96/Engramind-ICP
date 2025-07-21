"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useEffect, useState } from "react";
import {
  SearchBar,
  AnimatedModal,
  UpdateRubricsForm,
  ItemCard,
} from "../../../components/ui";
import { useFormik } from "formik";
import {
  createRubricInitialValues,
  createRubricsSchema,
  CreateRubricValues,
} from "../../../formik";
import { axiosBackend, fetcherBackend } from "../../../utils/api";
import { CreateRubricForm } from "../../../components/ui/showcase/CreateRubricForm";
import {
  Assessment,
  FileResponse,
  JobResponse,
  RubricsResponse,
} from "../../../interface";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import useSWR from "swr";
import { RubricsDetail } from "../../../components/ui/showcase/RubricsDetail";
import { toast } from "sonner";
import { formatNickname, ItemType, JobStatus } from "../../../utils/helper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export type FlatFormValues = Record<string, any>;

export default function RubricsPage() {
  const principal = Cookies.get("principal");
  const userNickname = Cookies.get("nickname");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditRubrics, setIsOpenEditRubrics] = useState(false);
  const [isOpenRubricsDetail, setIsOpenRubricsDetail] =
    useState<boolean>(false);
  const [selectedRubrics, setSelectedRubrics] = useState<Assessment | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rubricId, setRubricId] = useState("");
  const [backend, setBackend] = useState<_SERVICE>();
  const { nickname } = useSelector((state: any) => state.user);
  const [currentNickname, setCurrentNickname] = useState(
    nickname || userNickname
  );
  const { data: totalRubricsData, mutate: rubricsMutate } = useSWR(
    `/rubrics/all/${principal}`,
    fetcherBackend
  );
  const totalRubricsResult: Assessment[] = totalRubricsData?.data;

  const [updateRubricsFormValues, setUpdateRubricsFormValues] =
    useState<FlatFormValues>({});

  const handleSelectRubrics = (item: Assessment) => {
    setSelectedRubrics(item);
    setIsOpenRubricsDetail(true);
  };

  const handleClickNewRubrics = () => {
    setIsOpen(true);
  };

  const createFormik = useFormik<CreateRubricValues>({
    initialValues: createRubricInitialValues,
    validationSchema: createRubricsSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const fileIdsTemp = values?.files?.map((x: FileResponse) => x.file_id);
        const response = await axiosBackend.post("/rubrics/create", {
          name: values.name,
          description: values.description,
          organization_id: principal,
          file_ids: fileIdsTemp,
        });
        const jobResponse = response.data as JobResponse;
        const createRubricsInterval = setInterval(async () => {
          const rubricsStatus = await axiosBackend.get(
            `/rubrics/job-status-create/${jobResponse.jobId}`
          );
          const rubricsResult = rubricsStatus.data as RubricsResponse;
          if (rubricsResult.jobStatus === JobStatus.Completed) {
            await backend?.addContentToUser(
              Principal.fromText(principal ?? ""),
              { Rubrics: null },
              rubricsResult?.result?.assessment?.rubric_id
            );
            toast.success("Rubrics created successfully!", {
              id: "rubrics-success",
              duration: 4000,
            });
            const finalResult = {
              ...rubricsResult?.result?.assessment?.rubrics,
              name: rubricsResult?.result?.assessment?.name?.replace(
                "Assessment for Rubric: ",
                ""
              ),
            };
            rubricsMutate();
            setRubricId(rubricsResult?.result?.assessment?.id);
            setUpdateRubricsFormValues(finalResult);
            setLoading(false);
            setIsOpen(false);
            setIsOpenEditRubrics(true);
            resetForm();
            clearInterval(createRubricsInterval);
          } else if (rubricsResult.jobStatus === JobStatus.Failed) {
            setLoading(false);
            toast.error("Rubrics failed to be created. Please try again.", {
              id: "rubrics-error",
              duration: 4000,
            });
            clearInterval(createRubricsInterval);
          }
        }, 5000);
      } catch (e) {
        toast.error(e?.toString(), {
          duration: 4000,
        });
        console.log(e, "<<<< EEE");
        setLoading(false);
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
              Create your own scoring criteria.
            </p>
          </div>
          <a
            onClick={handleClickNewRubrics}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Rubric</span>
          </a>
        </div>
        <SearchBar title="Rubric" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {totalRubricsResult?.map((item: Assessment) => (
            <ItemCard
              key={item.id}
              itemType={ItemType.Rubrics}
              handleSelect={handleSelectRubrics}
              item={item}
            />
          ))}
        </div>
        <AnimatedModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <CreateRubricForm
            loading={loading}
            createFormik={createFormik}
            setIsOpen={setIsOpen}
            uploading={uploading}
            setUploading={setUploading}
          />
        </AnimatedModal>
        <AnimatedModal
          isOpen={isOpenEditRubrics}
          onClose={() => {
            setIsOpenEditRubrics(false);
          }}
        >
          <UpdateRubricsForm
            rubricId={rubricId}
            loading={loading}
            setIsOpen={setIsOpenEditRubrics}
            updateRubricsFormValues={updateRubricsFormValues}
            setLoading={setLoading}
          />
        </AnimatedModal>
        <AnimatedModal
          className="h-[85vh] overflow-scroll"
          isOpen={isOpenRubricsDetail}
          onClose={() => setIsOpenRubricsDetail(false)}
        >
          <RubricsDetail rubrics={selectedRubrics} />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
