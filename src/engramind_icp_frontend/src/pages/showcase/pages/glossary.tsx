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
import { axiosElwyn, fetcherElwyn } from "../../../utils/api";
import Cookies from "js-cookie";
import { _SERVICE } from "../../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../../utils/IC";
import { Principal } from "@dfinity/principal";
import { GlossaryData, GlossaryResponse } from "../../../interface";
import useSWR from "swr";
import { toast } from "sonner";
import { GlossaryDetail } from "../../../components/ui/showcase/GlossaryDetail";
import { ItemType } from "../../../utils/helper";

export type FlatFormValues = Record<string, any>;

export default function GlossaryPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState<_SERVICE>();
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryData | null>(
    null
  );
  const [isOpenGlossaryDetail, setIsOpenGlossaryDetail] =
    useState<boolean>(false);

  const { data: totalGlossaryData, mutate: glossaryMutate } = useSWR(
    `/assessment/scenario-glossary`,
    fetcherElwyn
  );

  const totalGlossaryResult: GlossaryData[] = totalGlossaryData?.data?.data
    ?.filter((glossary: GlossaryData) => glossary.organization_id === name)
    ?.sort((a: any, b: any) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA;
    });

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

  const createFormik = useFormik<CreateUpdateGlossaryValues>({
    initialValues: createUpdateGlossaryInitialValues,
    validationSchema: createUpdateGlossarySchema,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading(
        `${
          values.createOrUpdate === "create" ? "Creating" : "Updating"
        } glossary...`,
        {
          id: "update-rubrics",
          duration: Infinity,
        }
      );
      try {
        setLoading(true);
        if (values.createOrUpdate === "create") {
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
        } else {
          await axiosElwyn.put(
            `/assessment/scenario-glossary/${selectedGlossary?.id}`,
            {
              name: values.name,
              glossary: values.content,
            }
          );
        }

        glossaryMutate();
        setLoading(false);
        setIsOpen(false);
        resetForm();
        toast.success(
          `Glossary ${
            values.createOrUpdate === "create" ? "created" : "updated"
          } successfully!`,
          {
            id: toastId,
            duration: 4000,
          }
        );
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
              Welcome, {name?.slice(0, 12) + "..."}
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
        <SearchBar />
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
