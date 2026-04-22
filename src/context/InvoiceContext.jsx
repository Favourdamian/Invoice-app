/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { mockData } from "../data/mockData";

const InvoiceContext = createContext();

// REDUCER logic - Intermediate pattern for clean state management
const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return action.payload;
    case "ADD_INVOICE":
      return [action.payload, ...state];
    case "UPDATE_INVOICE":
      return state.map((inv) =>
        inv.id === action.payload.id ? action.payload : inv,
      );
    case "DELETE_INVOICE":
      return state.filter((inv) => inv.id !== action.payload);
    case "MARK_PAID":
      return state.map((inv) =>
        inv.id === action.payload ? { ...inv, status: "paid" } : inv,
      );
    default:
      return state;
  }
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, dispatch] = useReducer(invoiceReducer, [], () => {
    try {
      const saved = localStorage.getItem("invoice-app-data");
      const parsed = saved ? JSON.parse(saved) : mockData;
      return Array.isArray(parsed) ? parsed : mockData;
    } catch {
      return mockData;
    }
  });

  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    localStorage.setItem("invoice-app-data", JSON.stringify(invoices));
  }, [invoices]);

  // Derived state (filtering)
  const filteredInvoices = invoices.filter((inv) =>
    filterStatus === "all" ? true : inv.status === filterStatus,
  );

  // Action Creators
  const actions = {
    addInvoice: (inv) => dispatch({ type: "ADD_INVOICE", payload: inv }),
    updateInvoice: (inv) => dispatch({ type: "UPDATE_INVOICE", payload: inv }),
    deleteInvoice: (id) => dispatch({ type: "DELETE_INVOICE", payload: id }),
    markAsPaid: (id) => dispatch({ type: "MARK_PAID", payload: id }),
    setFilterStatus: (status) => setFilterStatus(status),
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices: filteredInvoices,
        allInvoices: invoices,
        filterStatus,
        ...actions,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context)
    throw new Error("useInvoices must be used within an InvoiceProvider");
  return context;
};
