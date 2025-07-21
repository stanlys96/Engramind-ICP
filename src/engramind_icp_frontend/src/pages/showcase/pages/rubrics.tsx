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
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import { CreateRubricForm } from "../../../components/ui/showcase/CreateRubricForm";
import {
  Assessment,
  AssessmentRaw,
  FileResponse,
  RubricsResponse,
} from "../../../interface";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import useSWR from "swr";
import { RubricsDetail } from "../../../components/ui/showcase/RubricsDetail";
import { toast } from "sonner";
import { extractAndParseRubricJSON, ItemType } from "../../../utils/helper";
import { useSelector } from "react-redux";

export type FlatFormValues = Record<string, any>;

export default function RubricsPage() {
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
  const { principal, nickname } = useSelector((state: any) => state.user);
  const { data: totalRubricsData, mutate: rubricsMutate } = useSWR(
    `/assessment/rubrics`,
    fetcherElwyn
  );
  const totalRubricsResult: Assessment[] = totalRubricsData?.data?.data
    ?.filter((rubrics: AssessmentRaw) => rubrics.organization_id === principal)
    ?.map((rubricsData: AssessmentRaw) => {
      return {
        ...rubricsData,
        rubrics: extractAndParseRubricJSON(rubricsData?.rubrics),
      };
    })
    .sort((a: any, b: any) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA;
    });

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
      const toastId = toast.loading("Adding rubrics...", {
        id: "adding-rubrics",
        duration: Infinity,
      });
      try {
        setLoading(true);
        const fileIdsTemp = values?.files?.map((x: FileResponse) => x.file_id);
        const response = await axiosElwyn.post(
          "/assessment/live/rubrics/create",
          {
            name: values.name,
            rubrics_description: values.description,
            organization_id: principal,
            file_ids: fileIdsTemp,
          }
        );
        const result = response.data as RubricsResponse;
        await backend?.addContentToUser(
          Principal.fromText(principal ?? ""),
          { Rubrics: null },
          result?.data?.assessment?.rubric_id
        );
        rubricsMutate();
        toast.success("Rubrics added successfully!", {
          id: toastId,
          duration: 4000,
        });
        const raw = result?.data?.final_rubric;
        const finalRubricParsed = extractAndParseRubricJSON(raw);
        const finalResult = {
          ...finalRubricParsed,
          name: result?.data?.assessment?.name?.replace(
            "Assessment for Rubric: ",
            ""
          ),
        };
        setRubricId(result?.data?.assessment?.id);
        setUpdateRubricsFormValues(finalResult);
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditRubrics(true);
        resetForm();
      } catch (e) {
        toast.error(e?.toString(), {
          id: toastId,
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

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {nickname}
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
        <SearchBar />
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
            if (loading) return;
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
            if (loading) return;
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
