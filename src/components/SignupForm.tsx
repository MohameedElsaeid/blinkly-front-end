
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { fetchCSRFToken, signupUser } from '@/lib/auth-client';
import Navbar from './Navbar';
import Footer from './Footer';

// Import refactored components
import { formSchema, FormValues } from './signup/SignupFormSchema';
import SignupHeader from './signup/SignupHeader';
import PersonalInfoFields from './signup/PersonalInfoFields';
import PasswordFields from './signup/PasswordFields';
import ContactInfoFields from './signup/ContactInfoFields';
import SubmitButton from './signup/SubmitButton';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      country: '',
      countryCode: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const token = await fetchCSRFToken();
        setCsrfToken(token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize form security. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    getCSRFToken();
  }, [toast]);

  const onSubmit = async (values: FormValues) => {
    if (!csrfToken) {
      toast({
        title: 'Error',
        description: 'Security token missing. Please refresh the page and try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const formattedPhoneNumber = values.phoneNumber.startsWith('+') 
        ? values.phoneNumber 
        : `${values.countryCode}${values.phoneNumber.replace(/^0+/, '')}`;
      
      await signupUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        country: values.country,
        countryCode: values.countryCode,
        phoneNumber: formattedPhoneNumber,
        csrfToken
      });

      toast({
        title: 'Success!',
        description: 'Your account has been created successfully.',
      });
      
      // Navigate to dashboard after successful signup
      // We'll add a small delay to show the success message first
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      console.error('Signup failed:', error);
      toast({
        title: 'Signup Failed',
        description: error.message || 'An error occurred during signup. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 p-4 pt-24">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <SignupHeader />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <PersonalInfoFields control={form.control} />
              <ContactInfoFields control={form.control} setValue={form.setValue} />
              <PasswordFields control={form.control} />
              <SubmitButton isLoading={isLoading} />

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account? <Link to="/login" className="text-blinkly-blue hover:underline">Log in</Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupForm;
