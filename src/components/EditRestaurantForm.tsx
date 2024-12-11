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
import { editRestaurant } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditRestaurantSchema } from '@/lib/validationSchemas';
import { Location } from '@prisma/client';
import { useState, ChangeEvent } from 'react';

type Props = {
  currentUserId: number | null;
  locations: Location[];
  restaurant: {
    id: number;
    name: string;
    latitude: number | null; // Updated type
    longitude: number | null; // Updated type
    website: string | null;
    phone: string | null;
    hours: string | null;
    description: string | null;
    menuLink: string | null;
    onlineOrderLink: string | null;
    image: string | null;
    postedById: number;
    locationId: number | null;
  };
};

const EditRestaurantForm: React.FC<Props> = ({
  currentUserId,
  locations,
  restaurant,
}) => {
  const [base64, setBase64] = useState<string>(restaurant.image || '');

  const session = useSession();
  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: {
    name: string;
    website?: string;
    phone?: string;
    hours?: string;
    description?: string;
    menuLink?: string;
    onlineOrderLink?: string;
    latitude?: number;
    longitude?: number;
    postedById: number;
    locationId?: number;
  }) => {
    console.log('Submitted Data:', data); // Add this line
    await editRestaurant({ ...data, id: restaurant.id, image: base64 });
    swal('Success', 'Your restaurant has been updated!', 'success', {
      timer: 2000,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Restaurant</h2>
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
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <select
                    {...register('locationId')}
                    className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                    defaultValue={
                      locations.find(
                        (location) => location.id === restaurant.locationId,
                      )?.id || ''
                    }
                  >
                    <option value={-1}>No location selected</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.locationId?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="form-control"
                  />
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
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Hours</Form.Label>
                  <input
                    type="text"
                    {...register('phone')}
                    className={`form-control ${errors.hours ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.hours || ''}
                  />
                  <div className="invalid-feedback">
                    {errors.hours?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.description || ''}
                  />
                  <div className="invalid-feedback">
                    {errors.description?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Menu Link</Form.Label>
                  <input
                    type="text"
                    {...register('menuLink')}
                    className={`form-control ${errors.menuLink ? 'is-invalid' : ''}`}
                    defaultValue={restaurant.menuLink || ''}
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
                  />
                  <div className="invalid-feedback">
                    {errors.onlineOrderLink?.message}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Latitude</Form.Label>
                  <input
                    // type="number"
                    {...register('latitude')}
                    className={`form-control ${errors.latitude ? 'is-invalid' : ''}`}
                    defaultValue={
                      restaurant.latitude ? Number(restaurant.latitude) : ''
                    }
                  />
                  <div className="invalid-feedback">
                    {errors.latitude?.message}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Longitude</Form.Label>
                  <input
                    // type="number"
                    {...register('longitude')}
                    className={`form-control ${errors.longitude ? 'is-invalid' : ''}`}
                    defaultValue={
                      restaurant.longitude ? Number(restaurant.longitude) : ''
                    }
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

export default EditRestaurantForm;
