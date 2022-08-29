import CoinPage from "@pages/CoinPage/CoinPage";

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllCoinsPage from "@pages/AllCoinsPage/AllCoinsPage";

function App(): JSX.Element {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllCoinsPage />} />
          <Route path="/coin">
            <Route path=":id" element={<CoinPage vsCurrency="usd" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
