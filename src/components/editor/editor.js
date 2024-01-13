import React, { useMemo, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";
function preparePaste(jodit) {
  jodit.e.on(
    "paste",
    (e) => {
      jodit.e.stopPropagation("paste");
      jodit.s.insertHTML(
        Jodit.modules.Helpers.getDataTransfer(e)
          .getData(Jodit.constants.TEXT_HTML)
          .replace(/<[^>]*>/g, " ")
      );
    },
    { top: true }
  );
}
Jodit.plugins.add("preparePaste", preparePaste);
const EdiorJodit = (props) => {
  const { onChange, data, placeholder } = props;

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: placeholder || "Description",
      minHeight: 400,
      buttons: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "fontsize",
        "paragraph",
        "underline",
        "hr",
      ],
      buttonsLG: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "fontsize",
        "paragraph",
        "underline",
        "hr",
      ],
      buttonsMD: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "fontsize",
        "paragraph",
        "underline",
        "hr",
      ],
      buttonsSM: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "fontsize",
        "paragraph",
        "underline",
        "hr",
      ],
      buttonsXS: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "fontsize",
        "paragraph",
        "underline",
        "hr",
      ],

      // toolbarAdaptive: true,
      // allowResizeX: false,
      // allowResizeY: false,
      // buttons: [
      // 'source', '|',
      // 'bold',
      // 'strikethrough',
      // 'italic', '|',
      // 'ul',
      // 'ol', '|',
      // 'outdent', 'indent',  '|',
      // 'font',
      // 'fontsize',
      // 'paragraph', '|',
      // 'table',
      // 'align', 'undo', 'redo', '|',
      // 'fullsize',
      // 'brush',
      // 'underline',
      // 'image',
      // 'video',
      // 'link', '|',
      // 'hr',
      // 'eraser',
      // 'copyformat', '|',
      // 'symbol',
      // 'print',
      // 'about'
      // ],
    };
  }, [placeholder]);
  return (
    <>
      <JoditEditor
        ref={editor}
        value={data}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => onChange(newContent)}
        onChange={(newContent) => console.log(newContent)}
      />
    </>
  );
};

export default EdiorJodit;
