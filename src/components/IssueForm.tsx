'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { reportIssue } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { IssueSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: { topic: string, description: string }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await reportIssue(data);
  swal('Success', 'Your problem has been reported', 'success', {
    timer: 2000,
  });
};

const IssueForm: React.FC = () => {
  const { status } = useSession();
  // console.log('IssueForm', status, session);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(IssueSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

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
                <Form.Group>
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
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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
