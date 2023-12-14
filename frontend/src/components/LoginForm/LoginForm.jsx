import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useUser } from '../../context/UserContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const { loginReq, loading, error, user } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    // await loginReq(data);
    await loginReq(data);

    // reset();
  });

  const submitButtonClass = isValid
    ? styles.submitButtonValid
    : styles.submitButton;

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h3>Iniciar sesión</h3>

      {loading && <div>Accediendo...</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {user && <div>Login Exitoso!</div>}

      <label htmlFor='username'>
        <input
          id='username'
          type='text'
          name='username'
          placeholder='Nombre de Usuario'
          {...register('username', {
            validate: {
              required: (value) =>
                value !== '' || 'Nombre de Usuario es requerido',
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>

      {/* <label htmlFor='email'>
        <input
          id='email'
          type='email'
          name='email'
          placeholder='Correo electrónico'
          {...register('email', {
            validate: {
              required: (value) => value !== '' || 'Campo email es requerido',
              pattern: (value) =>
                /^[\w-.]+@[a-zA-Z0-9]+(?:\.[a-zA-Z]{2,4})$/.test(value) ||
                'Email no valido',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </label> */}

      <label htmlFor='password'>
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Contraseña'
          {...register('password', {
            validate: {
              required: (value) => value !== '' || 'La contraseña es requerida',
              pattern: (value) =>
                /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,64}$/.test(
                  value,
                ) || 'Contraseña no valida',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <p className={styles.forget}>Olvidé mi contraseña</p>
      <input
        type='submit'
        value={'Iniciar sesión'}
        className={submitButtonClass}
      />
      <p className={styles.goToRegister}>
        ¿Sos un usuario nuevo? <Link to={'/register'}>Registrate</Link>
      </p>
    </form>
  );
};

export default LoginForm;
