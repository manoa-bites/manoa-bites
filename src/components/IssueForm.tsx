'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation
import { reportIssue } from '@/lib/dbActions';
import { IssueSchema } from '@/lib/validationSchemas';

const IssueForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(IssueSchema),
  });

  const router = useRouter(); // Initialize useRouter for client-side navigation

  const onSubmit = async (data: { topic: string, name?: string, contactinfo?: string, description: string }) => {
    try {
      // Report the issue to the backend
      await reportIssue(data);
      swal('Success', 'Your problem has been reported', 'success', {
        timer: 5000,
      });

      // Redirect to the home page after the success message
      router.push('/'); // This redirects to the home page
    } catch (error) {
      swal('Error', 'There was an error submitting your issue', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Report A Problem</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Select Topic</Form.Label>
                  <select {...register('topic')} className={`form-control ${errors.topic ? 'is-invalid' : ''}`}>
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="wronginformation">Wrong Information</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="invalid-feedback">{errors.topic?.message}</div>
                </Form.Group>
                <Form.Group className="pt-3">
                  <Form.Label>Name (Optional)</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group className="pt-3">
                  <Form.Label>Email/Phone-Number (Optional)</Form.Label>
                  <input
                    type="text"
                    {...register('contactinfo')}
                    className={`form-control ${errors.contactinfo ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contactinfo?.message}</div>
                </Form.Group>
                <Form.Group className="pt-3">
                  <Form.Label>Brief Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default IssueForm;
