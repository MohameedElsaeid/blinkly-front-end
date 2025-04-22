import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form} from "@/components/ui/form";
import {useToast} from "@/hooks/use-toast";
import {loginUser} from '@/lib/auth-client';
import {useAuth} from '@/contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

// Import refactored components
import {formSchema, FormValues} from './login/LoginFormSchema';
import LoginHeader from './login/LoginHeader';
import EmailField from './login/EmailField';
import PasswordField from './login/PasswordField';
import LoginButton from './login/LoginButton';
import ForgotPasswordLink from './login/ForgotPasswordLink';

const LoginForm = () => {
    const {toast} = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize the form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Determine where to redirect after login
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

    // Form submission handler
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);

        try {
            // Login the user with the auth system
            const response = await loginUser({
                email: values.email,
                password: values.password,
            });

            // Store user info in auth context
            login({
                email: response.user.email,
                firstName: response.user.firstName,
                lastName: response.user.lastName,
                token: response.user.token // Updated to use token from user object
            });

            toast({
                title: 'Success!',
                description: 'You have successfully logged in.',
            });

            // Navigate to the intended destination or dashboard after successful login
            navigate(from);
        } catch (error: any) {
            console.error('Login error:', error);
            toast({
                title: 'Login Failed',
                description: error.message || 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>

            <main className="flex-grow bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4 py-8 md:py-16 max-w-md">
                    <LoginHeader/>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <EmailField control={form.control}/>
                                <PasswordField control={form.control}/>
                                <ForgotPasswordLink/>
                                <LoginButton isSubmitting={isSubmitting}/>
                            </form>
                        </Form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blinkly-blue hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default LoginForm;
