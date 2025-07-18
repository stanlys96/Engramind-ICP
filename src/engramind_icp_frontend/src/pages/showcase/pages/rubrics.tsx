"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useEffect, useState } from "react";
import {
  SearchBar,
  AnimatedModal,
  UpdateRubricsForm,
} from "../../../components/ui";
import { useFormik } from "formik";
import { createRubricInitialValues, CreateRubricValues } from "../../../formik";
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import { CreateRubricForm } from "../../../components/ui/showcase/CreateRubricForm";
import {
  Assessment,
  AssessmentRaw,
  FinalRubric,
  RubricsResponse,
} from "../../../interface";
import Cookies from "js-cookie";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import useSWR from "swr";
import { RubricsDetail } from "../../../components/ui/showcase/RubricsDetail";
import { toast } from "sonner";
import { extractAndParseRubricJSON } from "../../../utils/helper";

export type FlatFormValues = Record<string, any>;

export default function RubricsPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditRubrics, setIsOpenEditRubrics] = useState(false);
  const [isOpenRubricsDetail, setIsOpenRubricsDetail] =
    useState<boolean>(false);
  const [currentRubrics, setCurrentRubrics] = useState<Assessment[]>();
  const [selectedRubrics, setSelectedRubrics] = useState<Assessment | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rubricId, setRubricId] = useState("");
  const [backend, setBackend] = useState<_SERVICE>();
  const { data: totalRubricsData, mutate: rubricsMutate } = useSWR(
    `/assessment/rubrics`,
    fetcherElwyn
  );
  const totalRubricsResult = totalRubricsData?.data?.data;
  const [updateRubricsFormValues, setUpdateRubricsFormValues] =
    useState<FlatFormValues>({});

  const createFormik = useFormik<CreateRubricValues>({
    initialValues: createRubricInitialValues,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Adding rubrics...", {
        id: "adding-rubrics",
        duration: Infinity,
      });
      try {
        setLoading(true);
        const response = await axiosElwyn.post(
          "/assessment/live/rubrics/create",
          {
            name: values.name,
            persona_prompt: values.description,
            organization_id: name,
          }
        );
        const result = response.data as RubricsResponse;
        await backend?.addContentToUser(
          Principal.fromText(name ?? ""),
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

  useEffect(() => {
    if (totalRubricsResult?.length > 0) {
      const theUserRubrics: Assessment[] = totalRubricsResult
        ?.filter((rubrics: AssessmentRaw) => rubrics.organization_id === name)
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

      setCurrentRubrics(theUserRubrics);
    }
  }, [totalRubricsResult]);

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {name?.slice(0, 12) + "..."}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your own scoring criteria.
            </p>
          </div>
          <a
            onClick={() => {
              setIsOpen(true);
            }}
            // to={"/showcase/create"}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Rubric</span>
          </a>
        </div>
        <SearchBar />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentRubrics?.map((item: Assessment) => (
            <div
              onClick={() => {
                setSelectedRubrics(item);
                setIsOpenRubricsDetail(true);
              }}
              key={item.id}
              className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
            >
              <img
                src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                alt="character"
                className="w-full h-64 object-cover rounded-t-xl"
                width={400}
                height={300}
              />
              <div className="p-4">
                <>
                  <h3 className="text-base font-semibold dark:text-white text-zinc-800">
                    {item.name}
                  </h3>
                  <p className="bg-purple-500 mt-2 text-white text-xs font-medium px-2 py-1 rounded-full w-fit">
                    {item.timestamp?.slice(0, 10)}
                  </p>
                </>
              </div>
            </div>
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
