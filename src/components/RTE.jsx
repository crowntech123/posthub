import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
//bcoz this component is going to be injected in another component it is necessary to take the refrence either I can use forwardref or I can use Controller to get the reference
//when i use this rte into the postform component the state is controlled by control to pass state data from rte to postform
function RTE({ label, name, control, defaultValue = "" }) {
  return (
    <>
      <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}
        <Controller
          name={name || "content"}
          control={control}
          //render will render the data inside it either it is input field or editor it will render whenever the change occur in the field
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </>
  );
}

export default RTE;
