import * as yup from 'yup';

export const validationSchema = yup.object({
  similar_experience: yup.string().required('(*) Campo requerido').nullable(),
  expected_salary: yup
    .number()
    .typeError('Caracter no válido!')
    .required('(*) Campo requerido')
    .nullable(),
});
