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
        duration: 800,
        success: {
          duration: 800,
        },
        error: {
          duration: 800,
        },
        style: {
          borderRadius: "12px",
          fontWeight: "600",
        },
      }}
    />
  );
}
