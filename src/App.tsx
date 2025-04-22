
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectPage from "./pages/RedirectPage";
import Links from "./pages/Links";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import HelpCenter from "./pages/HelpCenter";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import SignupForm from "./components/SignupForm";
import SignupSuccessful from "./components/SignupSuccessful";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import CreateLink from "./pages/CreateLink";
import CreateDynamicLink from "./pages/CreateDynamicLink";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import LinkDetails from "./pages/LinkDetails";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <TooltipProvider>
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/features" element={<Features/>}/>
                        <Route path="/pricing" element={<Pricing/>}/>
                        <Route path="/help" element={<HelpCenter/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/terms" element={<Terms/>}/>
                        <Route path="/privacy" element={<Privacy/>}/>
                        <Route path="/signup" element={<SignupForm/>}/>
                        <Route path="/signup-successful" element={<SignupSuccessful/>}/>
                        <Route path="/login" element={<LoginForm/>}/>

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/links"
                            element={
                                <ProtectedRoute>
                                    <Links/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/dynamic-links"
                            element={
                                <ProtectedRoute>
                                    <CreateDynamicLink/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/create-link"
                            element={
                                <ProtectedRoute>
                                    <CreateLink/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/links/:id"
                            element={
                                <ProtectedRoute>
                                    <LinkDetails/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/account"
                            element={
                                <ProtectedRoute>
                                    <Account/>
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/blog" element={<Blog/>}/>
                        <Route path="/blog/:slug" element={<BlogPost/>}/>

                        <Route path="/:id" element={<RedirectPage/>}/>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    <Toaster/>
                    <Sonner/>
                </TooltipProvider>
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
);

export default App;
