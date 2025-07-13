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

interface Rubric {
  name: string;
  rubric_title: string;
  description: string;
  note: string;
  scoring_guide: Record<string, string>;
  performance_levels_summary: Record<string, string>;
  criteria: {
    criterion_name: string;
    weight: number;
    performance_levels: Record<string, string>;
  }[];
}

export type FlatFormValues = Record<string, any>;

const flattenRubricToFields = (rubric: Rubric): FlatFormValues => {
  const fields: FlatFormValues = {
    Beginning: {
      "Rubric Name": rubric.name,
      "Rubric Title": rubric.rubric_title,
      Description: rubric.description,
    },
    "Scoring Guide": {},
    "Performance Levels Summary": {},
    Criteria: [],
    End: {
      Note: rubric.note,
    },
  };

  // Scoring Guide
  Object.entries(rubric.scoring_guide).forEach(([key, value]) => {
    fields["Scoring Guide"][`${key}`] = value;
  });

  // Performance Level Summaries
  Object.entries(rubric.performance_levels_summary).forEach(([key, value]) => {
    fields["Performance Levels Summary"][`${key}`] = value;
  });

  // Criteria
  rubric.criteria.forEach((criterion) => {
    const label = criterion.criterion_name;
    const temp: FlatFormValues = {};
    temp[label] = {};
    temp[label]["weight"] = criterion.weight;

    Object.entries(criterion.performance_levels).forEach(([level, desc]) => {
      temp[label][`${level}`] = desc;
    });
    fields["Criteria"].push(temp);
  });
  return fields;
};

type FlatValues = Record<string, string>;

function flattenValues(obj: any, prefix = ""): FlatValues {
  let result: FlatValues = {};

  Object.entries(obj).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      result[path] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const subPath = `${path}[${index}]`;
        result = { ...result, ...flattenValues(item, subPath) };
      });
    } else if (typeof value === "object" && value !== null) {
      result = { ...result, ...flattenValues(value, path) };
    }
  });

  return result;
}

export default function RubricsPage() {
  const { name } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditRubrics, setIsOpenEditRubrics] = useState(false);
  const [loading, setLoading] = useState(false);
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
            loading={loading}
            setIsOpen={setIsOpenEditRubrics}
            updateRubricsFormValues={updateRubricsFormValues}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
