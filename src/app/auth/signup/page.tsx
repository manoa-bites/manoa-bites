'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';
import { Role } from '@prisma/client'; // Import the Role enum from Prisma

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  signupKey?: string;
  role?: Role;
  // acceptTerms: boolean;
};

/** The sign up page. */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    // Default to 'USER' role (using Role enum)
    let role: Role = Role.USER;

    // Get the values of the Signup Keys from environment variables
    const adminKey = process.env.NEXT_PUBLIC_SIGNUP_KEY_ADMIN;
    const vendorKey = process.env.NEXT_PUBLIC_SIGNUP_KEY_VENDOR;

    // Check for the Signup Key and assign the correct role
    if (data.signupKey === adminKey) {
      role = Role.ADMIN; // Assign admin role
    } else if (data.signupKey === vendorKey) {
      role = Role.VENDOR; // Assign vendor role
    }

    // Pass the role to the user creation logic
    await createUser({ ...data, role });

    // After creating, sign in with redirect to the home page
    await signIn('credentials', { callbackUrl: 'src/app/page.tsx', ...data });
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign Up</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Signup Key (Optional)</Form.Label>
                    <input
                      type="text"
                      {...register('signupKey')}
                      className={`form-control ${errors.signupKey ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.signupKey?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Register
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                Already have an account?
                <a href="/auth/signin">Sign in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
