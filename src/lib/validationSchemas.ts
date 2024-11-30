import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddRestaurantSchema = Yup.object({
  name: Yup.string().required(),
  website: Yup.string().url().optional(),
  phone: Yup.string().optional(),
  menuLink: Yup.string().url().optional(),
  onlineOrderLink: Yup.string().url().optional(),
  image: Yup.string().optional(),
  latitude: Yup.number().optional(),
  longitude: Yup.number().optional(),
  postedById: Yup.number().required(),
  locationId: Yup.number().optional(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const IssueSchema = Yup.object({
  topic: Yup.string().oneOf(['bug', 'feature', 'wronginformation', 'other']).required(),
  name: Yup.string(),
  contactinfo: Yup.string(),
  description: Yup.string().required(),
});

export interface Restaurant {
  id: number;
  locationId: number;
  postedById: number;
  name: string;
  website: string | null;
  phone: string | null;
  menuLink: string | null;
  onlineOrderLink: string | null;
}
