// "use client";
// import { Toaster, toast } from "react-hot-toast";

// export default function ToasterProvider() {
//   return (
//     <Toaster
//       position="top-center"
//       reverseOrder={false}
//       toastOptions={{
//         duration: 9500,
//         style: {
//           borderRadius: "12px",
//           fontWeight: "600",
//         },
//       }}
//       containerStyle={{ top: 20 }}
//     />
//   );
// }
"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 1000,
        success: {
          duration: 1000,
        },
        error: {
          duration: 1000,
        },
        style: {
          borderRadius: "12px",
          fontWeight: "600",
        },
      }}
    />
  );
}
