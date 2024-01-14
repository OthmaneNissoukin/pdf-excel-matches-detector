import { useEffect, useRef, useState } from "react";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

export default function FormFile({ setResult }) {
  const [submitData, setSubmitData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const PDF_INPUT = useRef(null);
  const EXCEL_INPUT = useRef(null);

  useEffect(() => {
    async function sendData() {
      setIsLoading(true);
      const data = new FormData();
      data.append("PDF_FILE", PDF_INPUT.current.files[0]);
      data.append("EXCEL_FILE", EXCEL_INPUT.current.files[0]);

      try {
        const req = await fetch("https://matching-detector.000webhostapp.com/", {
          body: data,
          method: "POST",
        });
        const res = await req.json();

        const { status: type, message } = res;

        setFeedback({ type, message: message });

        if (type.toLowerCase() === "success") {
          setResult({ submitted: true, matches: res.payload });
        }
      } catch (error) {
        console.log(error);
        if (error instanceof TypeError && error.message.includes("Failed to parse URL")) {
          setFeedback({ type: "warning", message: "The service is not available!" });
        } else setFeedback({ type: "warning", message: "Error occured while submitting!" });
      } finally {
        setIsLoading(false);
      }
    }

    if (PDF_INPUT.current.files.length && EXCEL_INPUT.current.files.length) {
      sendData();
    } else if (submitData > 0) {
      setFeedback({ type: "error", message: "Blacklist and Client List are required!" });
    }
  }, [submitData, setResult]);

  return (
    <form className="max-w-xl mx-auto border-2 p-5" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <h2 className="text-3xl font-bold text-center mb-2 text-stone-800">Upload Files</h2>

      {feedback && <Alert type={feedback.type} message={feedback.message} />}

      <div id="fileUpload" className="max-w-md mb-5 m-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
          Upload PDF file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          ref={PDF_INPUT}
        />
      </div>
      <div id="fileUpload" className="max-w-md m-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
          Upload Excel file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          ref={EXCEL_INPUT}
        />
      </div>
      <div className="text-right">
        <Button className="mt-7" onClick={() => setSubmitData(submitData + 1)} disabled={isLoading} type="button">
          {isLoading ? "Scanning..." : "Scan List"}
        </Button>
      </div>
    </form>
  );
}
