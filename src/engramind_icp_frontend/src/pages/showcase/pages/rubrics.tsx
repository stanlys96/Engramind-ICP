"use client";
import { useUser } from "../../../context/UserContext";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "../ShowcaseLayout";
import { useState } from "react";
import { useToast } from "../../../toast/toast";
import {
  SearchBar,
  AnimatedModal,
  UpdateRubricsForm,
} from "../../../components/ui";
import { useFormik } from "formik";
import { createRubricInitialValues, CreateRubricValues } from "../../../formik";
import axios from "axios";
import { API_BASE_URL, API_KEY, API_REQUEST_FROM } from "../../../utils/api";
import { CreateRubricForm } from "../../../components/ui/showcase/CreateRubricForm";
import { FinalRubric, RubricsResponse } from "../../../interface";

export type FlatFormValues = Record<string, any>;

export default function RubricsPage() {
  const { name } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditRubrics, setIsOpenEditRubrics] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rubricId, setRubricId] = useState("");
  const { addToast } = useToast();

  const [updateRubricsFormValues, setUpdateRubricsFormValues] =
    useState<FlatFormValues>({});

  const createFormik = useFormik<CreateRubricValues>({
    initialValues: createRubricInitialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/assessment/live/rubrics/create`,
          {
            name: values.name,
            persona_prompt: values.description,
          },
          {
            headers: {
              "X-AI_TOKEN": API_KEY,
              "X-REQUEST_FROM": API_REQUEST_FROM,
            },
          }
        );
        const result = response.data as RubricsResponse;
        const raw = result?.data?.final_rubric;
        const cleaned = raw
          .replace(/^"```json\\n/, "") // Remove leading "```json\n
          .replace(/\\n```"$/, "") // Remove trailing \n```"
          .replace(/\\"/g, '"') // Convert escaped quotes
          .replace(/\\n/g, "\n")
          .replaceAll("```json", "")
          .replaceAll("```", "")
          .trim();
        const finalRubricParsed = JSON.parse(cleaned) as FinalRubric;
        const finalResult = {
          ...finalRubricParsed,
          name: result?.data?.assessment?.name?.replace(
            "Assessment for Rubric: ",
            ""
          ),
        };
        setRubricId(result?.data?.assessment?.id);
        setUpdateRubricsFormValues(finalResult);
        addToast({ message: "Successfully created your rubrics!" });
        setLoading(false);
        setIsOpen(false);
        setIsOpenEditRubrics(true);
        resetForm();
      } catch (e) {
        console.log(e, "<<<< EEE");
        setLoading(false);
      }
    },
  });

  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {name}
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
      </div>
    </ShowcaseLayout>
  );
}
