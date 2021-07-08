import * as yup from 'yup';

export const validationSchema = yup.object({
  identity_number: yup.string().nullable(true),
  identity_type: yup.string().nullable(true),
  firstName: yup.string().nullable(true),
  lastName: yup.string().nullable(true),
  birthDate: yup.date().nullable(true),
  phone: yup.string().nullable(true),
  residence: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, 'No se permiten números o caracteres especiales')
    .nullable(true),
  nationality: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, 'No se permiten números o caracteres especiales')
    .nullable(true),
  education: yup.string().nullable(true),
  linkedin: yup
    .string()
    .nullable(true)
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Ingrese una URL válida!'
    ),
  habilities: yup.string().nullable(true),
  techo_experience: yup.boolean().nullable(true),
});
