"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useEffect, useState } from "react";
import { useToast } from "../../../toast/toast";
import {
  SearchBar,
  AnimatedModal,
  CreateOrUpdateGlossaryForm,
} from "../../../components/ui";
import { useFormik } from "formik";
import {
  createUpdateGlossaryInitialValues,
  CreateUpdateGlossaryValues,
} from "../../../formik";
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import Cookies from "js-cookie";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import { GlossaryData, GlossaryResponse } from "../../../interface";
import useSWR from "swr";
import { selectCommonIds } from "../../../utils/helper";
import { toast } from "sonner";

export type FlatFormValues = Record<string, any>;

export default function GlossaryPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const [currentGlossaries, setCurrentGlossaries] = useState<GlossaryData[]>();
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryData | null>(
    null
  );
  const [isOpenGlossaryDetail, setIsOpenGlossaryDetail] =
    useState<boolean>(false);
  const { data: totalGlossaryData, mutate: glossaryMutate } = useSWR(
    `/assessment/scenario-glossary`,
    fetcherElwyn
  );

  const totalGlossaryResult = totalGlossaryData?.data?.data;

  const createFormik = useFormik<CreateUpdateGlossaryValues>({
    initialValues: createUpdateGlossaryInitialValues,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Adding rubrics...", {
        id: "adding-rubrics",
        duration: Infinity,
      });
      try {
        setLoading(true);
        const response = await axiosElwyn.post(
          "/assessment/scenario-glossary",
          {
            name: values.name,
            glossary: values.content,
            organization_id: name,
          }
        );
        const result = response.data as GlossaryResponse;
        await backend?.addContentToUser(
          Principal.fromText(name ?? ""),
          { Glossary: null },
          result.data.id
        );
        glossaryMutate();
        setLoading(false);
        setIsOpen(false);
        resetForm();
      } catch (e) {
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
    if (totalGlossaryResult?.length > 0) {
      const theUserGlossaries = totalGlossaryResult
        ?.filter((glossary: GlossaryData) => glossary.organization_id === name)
        .sort((a: any, b: any) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateB - dateA;
        });
      setCurrentGlossaries(theUserGlossaries);
    }
  }, [totalGlossaryResult]);

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
              Create and manage your glossaries
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
            <span>New Glossary</span>
          </a>
        </div>
        <SearchBar />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentGlossaries?.map((item: GlossaryData) => (
            <div
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
              <div className="p-4  ">
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
          <CreateOrUpdateGlossaryForm
            loading={loading}
            createFormik={createFormik}
            setIsOpen={setIsOpen}
          />
        </AnimatedModal>
        <AnimatedModal
          isOpen={isOpenGlossaryDetail}
          onClose={() => setIsOpenGlossaryDetail(false)}
        ></AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
