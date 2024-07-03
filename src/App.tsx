import AppRoutes from "./Routes/AppRoutes";



import { ThemeProvider } from "@/components/theme-provider";



import NavBar from "@/components/NavBar/NavBar";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <NavBar />
      <AppRoutes />
    </ThemeProvider>
  );
}



//footer
// <Card>
//         <CardHeader>
//           <CardTitle>About</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <CardDescription>
//             <p>
//               This is a simple website built with Vite, React, and Tailwind CSS.
//             </p>
//           </CardDescription>
//         </CardContent>
//         <CardFooter>
//           <p>© 2021</p>
//         </CardFooter>
//       </Card>
