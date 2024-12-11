'use client';

import { useSession } from 'next-auth/react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { deleteRestaurant } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditRestaurantSchema } from '@/lib/validationSchemas';
import { Location, Restaurant } from '@prisma/client';
import { useState } from 'react';

type Props = {
  currentUserId: number | null;
  locations: Location[];
  restaurant: Restaurant;
};

const DeleteRestaurantForm: React.FC<Props> = ({
  currentUserId,
  locations,
  restaurant,
}) => {
  const [base64] = useState<string>(restaurant.image || '');

  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditRestaurantSchema),
  });
  if (session.status === 'loading') {
    return <LoadingSpinner />;
  }
  if (session.status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (!currentUserId) {
    redirect('/');
  }

  const onSubmit = async () => {
    await deleteRestaurant({ id: restaurant.id });
    swal('Success', 'Your restaurant has been deleted', 'success', {
      timer: 2000,
    });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>{`Are you sure want to delete restaurant ${restaurant.name}?`}</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <input
                    type="hidden"
                    {...register('postedById')}
                    value={currentUserId}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="hidden"
                    {...register('id')}
                    value={restaurant.id}
                  />
                </FormGroup>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.name}
                    readOnly
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    {...register('locationId')}
                    className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                    defaultValue={
                      locations.find(
                        (location) => location.id === restaurant.locationId,
                      )?.id || ''
                    }
                    readOnly
                  />

                  <div className="invalid-feedback">
                    {errors.locationId?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <input
                    type="text"
                    value={base64}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    readOnly
                  />
                  <div className="invalid-feedback">
                    {errors.image?.message}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <input
                    type="text"
                    {...register('website')}
                    className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.website || ''}
                    readOnly
                  />
                  <div className="invalid-feedback">
                    {errors.website?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <input
                    type="text"
                    {...register('phone')}
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.phone || ''}
                    readOnly
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Menu Link</Form.Label>
                  <input
                    type="text"
                    {...register('menuLink')}
                    className={`form-control ${errors.menuLink ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.menuLink || ''}
                    readOnly
                  />
                  <div className="invalid-feedback">
                    {errors.menuLink?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Online Order Link</Form.Label>
                  <input
                    type="text"
                    {...register('onlineOrderLink')}
                    className={`form-control ${errors.onlineOrderLink ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.onlineOrderLink || ''}
                    readOnly
                  />
                  <div className="invalid-feedback">
                    {errors.onlineOrderLink?.message}
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="danger">
                        Delete
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

export default DeleteRestaurantForm;
