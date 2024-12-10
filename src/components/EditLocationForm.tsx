'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { EditLocationSchema } from '@/lib/validationSchemas';
import { editLocation } from '@/lib/dbActions';
import { Location } from '@prisma/client';

// Define props type
type Props = {
  location: Location;
};

const EditLocationForm: React.FC<Props> = ({ location }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(EditLocationSchema),
    defaultValues: {
      name: location.name,
    },
  });

  // Handle form submission
  const onSubmit = async (data: { name: string }) => {
    try {
      await editLocation({
        id: location.id,
        name: data.name,
      });
      swal('Success', 'Location updated successfully', 'success');
      reset(); // Reset the form after submission
    } catch (error) {
      swal('Error', 'Failed to save changes', 'error');
    }
  };

  return (
    <Card className="my-3">
      <Card.Header className="text-center">
        <h4>Edit Location</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Location Name</Form.Label>
            <Form.Control
              type="text"
              {...register('name')}
              className={errors.name ? 'is-invalid' : ''}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name?.message}</div>
            )}
          </Form.Group>
          <Row className="pt-3">
            <Col>
              <Button type="submit" variant="success" className="w-100">
                Save Changes
              </Button>
            </Col>
            <Col>
              <Button
                type="button"
                onClick={() => reset()}
                variant="secondary"
                className="w-100"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditLocationForm;
