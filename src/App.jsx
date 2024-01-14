import { useState } from "react";
import FormFile from "./Components/Form";
import Overview from "./Components/Table";
import Header from "./ui/Header";
import Button from "./ui/Button";

function App() {
  const [result, setResult] = useState([]);

  return (
    <>
      <Header />

      {result.length > 0 && (
        <div className="max-w-xl mx-auto mb-5 flex justify-between items-center px-5">
          <h1 className="font-bold text-3xl text-stone-800">Detect Matches</h1>
          <Button onClick={() => setResult([])}>Start New</Button>
        </div>
      )}

      {result.length ? <Overview result={result} /> : <FormFile setResult={setResult} />}
    </>
  );
}

export default App;
