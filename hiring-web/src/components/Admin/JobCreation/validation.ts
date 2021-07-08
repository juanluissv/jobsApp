import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('(*) Campo requerido').nullable(),
  requirements: yup.string().required('(*) Campo requerido').nullable(),
  benefits: yup.string().required('(*) Campo requerido').nullable(),
  objectives: yup.string().required('(*) Campo requerido').nullable(),
  responsibilities: yup.string().required('(*) Campo requerido').nullable(),
  presency: yup.string().required('(*) Campo requerido'),
  full_time: yup.boolean().required('(*) Campo requerido'),
  start_date: yup
    .date()
    .required('(*) Campo requerido')
    .nullable()
    .min(
      new Date(Date.now() - 86400000),
      'la Fecha de incio debe ser posterior al día corriente'
    ),
  end_date: yup
    .date()
    .when(
      'start_date',
      (start_date, yup) =>
        start_date &&
        yup.min(
          start_date,
          'La fecha de finalización no puede ser anterior a la de inicio'
        )
    )
    .required('(*) Campo requerido')
    .nullable(),
  salary_range_low: yup
    .number()
    .typeError('Caracter no válido!')
    .required('(*) Campo requerido'),
  salary_range_high: yup
    .number()
    .typeError('Caracter no válido!')
    .required('(*) Campo requerido'),
  condition: yup.string().required('(*) Campo requerido').nullable(),
  countryId: yup.number().required('(*) Campo requerido'),
});
