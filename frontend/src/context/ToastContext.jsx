import React, { createContext, useContext, useState, useCallback } from "react"; 
 
 export const ToastContext = createContext(); 
 
 export const ToastProvider = ({ children }) => { 
   const [toasts, setToasts] = useState([]); 
 
   const showToast = useCallback((message, type = "success") => { 
     const id = Date.now(); 
     setToasts((prev) => [...prev, { id, message, type }]); 
     setTimeout(() => { 
       setToasts((prev) => prev.filter((t) => t.id !== id)); 
     }, 3500); 
   }, []); 
 
   const removeToast = (id) => { 
     setToasts((prev) => prev.filter((t) => t.id !== id)); 
   }; 
 
   return ( 
     <ToastContext.Provider value={{ showToast }}> 
       {children} 
 
       {/* Toast Container — top-right */} 
       <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 items-end"> 
         {toasts.map((toast) => ( 
           <div 
             key={toast.id} 
             className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white text-sm font-medium min-w-[260px] max-w-xs 
               animate-slide-in 
               ${toast.type === "success" ? "bg-green-600" : "bg-red-500"} 
             `} 
           > 
             <span className="text-lg"> 
               {toast.type === "success" ? "✅" : "❌"} 
             </span> 
             <span className="flex-1">{toast.message}</span> 
             <button 
               onClick={() => removeToast(toast.id)} 
               className="text-white/70 hover:text-white text-lg leading-none ml-1" 
             > 
               &times; 
             </button> 
           </div> 
         ))} 
       </div> 
     </ToastContext.Provider> 
   ); 
 }; 
 
 export const useToast = () => useContext(ToastContext); 
