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
import { addRestaurant } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddRestaurantSchema } from '@/lib/validationSchemas';
import { Location } from '@prisma/client';

type Props = {
  currentUserId: number | null;
  locations: Location[];
};

const onSubmit = async (data: {
  name: string;
  website?: string;
  phone?: string;
  menuLink?: string;
  onlineOrderLink?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  postedById: number;
  locationId?: number;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addRestaurant(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddRestaurantForm: React.FC<Props> = ({ currentUserId, locations }) => {
  const session = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRestaurantSchema),
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

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Restaurant</h2>
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
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <select
                    {...register('locationId')}
                    className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                  >
                    {locations.map((location) => (
                      <option value={location.id}>{location.name}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.locationId?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <input
                    type="text"
                    {...register('website')}
                    className={`form-control ${errors.website ? 'is-invalid' : ''}`}
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
                  />
                  <div className="invalid-feedback">
                    {errors.website?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Menu Link</Form.Label>
                  <input
                    type="text"
                    {...register('menuLink')}
                    className={`form-control ${errors.menuLink ? 'is-invalid' : ''}`}
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
                  />
                  <div className="invalid-feedback">
                    {errors.onlineOrderLink?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.image?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Latitude</Form.Label>
                  <input
                    type="number"
                    {...register('latitude')}
                    className={`form-control ${errors.latitude ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.latitude?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Longitude</Form.Label>
                  <input
                    type="number"
                    {...register('longitude')}
                    className={`form-control ${errors.longitude ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.longitude?.message}
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        onClick={() => reset()}
                        variant="warning"
                        className="float-right"
                      >
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

export default AddRestaurantForm;
