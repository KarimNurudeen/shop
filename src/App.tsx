import { Route, Routes } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import { Home } from "./pages/Home";
import { HouseDetail } from "./pages/HouseDetail";
import { GadgetDetail } from "./pages/GadgetDetail";
import { OrderForm } from "./pages/OrderForm";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<HouseDetail />} />
        <Route path="/gadget/:id" element={<GadgetDetail />} />
        <Route path="/order/:id" element={<OrderForm />} />
        <Route path="/order/:id/confirmation" element={<OrderConfirmation />} />
      </Routes>
      <Footer />
    </OrderProvider>
  );
}
