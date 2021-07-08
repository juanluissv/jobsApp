import * as yup from 'yup';

export const validationSchema = yup.object({
  identity_number: yup.string().required('(*) Campo requerido').nullable(),
  identity_type: yup.string().required('(*) Campo requerido').nullable(),
  firstName: yup.string().required('(*) Campo requerido').nullable(),
  lastName: yup.string().required('(*) Campo requerido').nullable(),
  birthDate: yup
    .date()
    .required('(*) Campo requerido')
    .nullable()
    .max(new Date(Date.now() - 568080000000), 'Debés ser mayor de 18 años'),
  phone: yup.string().required('(*) Campo requerido').nullable(),
  residence: yup
    .string()
    .required('(*) Campo requerido')
    .nullable()
    .matches(/^[aA-zZ\s]+$/, 'No se permiten números o caracteres especiales')
    .nullable(true),
  nationality: yup
    .string()
    .required('(*) Campo requerido')
    .nullable()
    .matches(/^[aA-zZ\s]+$/, 'No se permiten números o caracteres especiales')
    .nullable(true),
  education: yup.string().required('(*) Campo requerido').nullable(),
  linkedin: yup
    .string()
    .nullable(true)
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Ingrese una URL válida!'
    ),
  habilities: yup.string().required('(*) Campo requerido').nullable(),
  techo_experience: yup.boolean().nullable(true),
});
