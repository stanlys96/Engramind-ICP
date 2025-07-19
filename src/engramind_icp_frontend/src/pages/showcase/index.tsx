"use client";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { useState } from "react";
import { useToast } from "../../toast/toast";
import { SearchBar, AnimatedModal, CategoryFilter } from "../../components/ui";
import { useFormik } from "formik";
import {
  createUpdateGlossaryInitialValues,
  CreateUpdateGlossaryValues,
} from "../../formik";
import axios from "axios";
import { API_BASE_URL, API_KEY, API_REQUEST_FROM } from "../../utils/api";
import Cookies from "js-cookie";
import { CreationMode } from "../../components/ui/showcase/CreationMode";
import { Category } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export type FlatFormValues = Record<string, any>;

export default function ScenariosPage() {
  const name = Cookies.get("principal");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const createFormik = useFormik<CreateUpdateGlossaryValues>({
    initialValues: createUpdateGlossaryInitialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/assessment/scenario-glossary`,
          {
            name: values.name,
            glossary: values.content,
          },
          {
            headers: {
              "X-AI_TOKEN": API_KEY,
              "X-REQUEST_FROM": API_REQUEST_FROM,
            },
          }
        );
        addToast({ message: "Successfully created your glossary!" });
        setLoading(false);
        setIsOpen(false);
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
              Welcome, {name?.slice(0, 12) + "..."}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create and manage your roleplay scenarios
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
            <span>New Roleplay</span>
          </a>
        </div>
        <SearchBar showRoleOption />
        <CategoryFilter />
        <AnimatedModal
          widthFitContainer
          isOpen={isOpen}
          onClose={() => {
            if (loading) return;
            setIsOpen(false);
          }}
        >
          <CreationMode
            onChooseMode={(mode: Category) => {
              if (mode === Category.Quick) {
                navigate("/showcase/roleplay/quick-create");
              } else if (mode === Category.Advanced) {
                navigate("/showcase/roleplay/advance-create");
              }
            }}
            onClose={() => setIsOpen(false)}
          />
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
