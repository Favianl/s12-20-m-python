import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLand } from '../../context/LandContext';
import PurchaseSummary from '../PurchaseSummary/PurchaseSummary';
import styles from './ShoppingCar.module.css';
import { useNavigate } from 'react-router-dom';

const ShoppingCar = () => {
  const { purchase } = useLand();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // Aquí puedes manejar los datos del formulario
    console.log(data);
    navigate('/success');
  };

  return (
    <div className={styles.shoppingContainer}>
      
      <div className={styles.shoppingLeft}>
        <h4>Medio de Pago</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name='cardNumber'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  id='cardNumber'
                  placeholder='Número de Tarjeta'
                  maxLength='16' // Establecer la longitud máxima del número de tarjeta
                  pattern='[0-9]*' // Solo permite dígitos
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
              )}
            />
          </div>

          <div className={styles.cardData}>
            <div>
              <Controller
                name='cardHolder'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  pattern: /^[A-Za-z\s]+$/, // Permite solo letras y espacios
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='cardHolder'
                    placeholder='Titular de Tarjeta'
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^A-Za-z\s]/g,
                        '',
                      );
                    }}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name='expirationDate'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, // Acepta formato 'mm/aa'
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='expirationDate'
                    placeholder='Vencimiento mm/aa'
                    maxLength='5' // Limita la longitud a 5 caracteres
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9/]/g, ''); // Permite solo números y '/'
                    }}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name='ccv'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  pattern: /^\d{3}$/, // Acepta solo 3 números
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='ccv'
                    placeholder='CCV'
                    maxLength='3' // Limita la longitud a 3 caracteres
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.cardDni}>
            <div>
            <Controller
              name='dni'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                pattern: /^[A-Za-z0-9]{9}$/, // Acepta 9 caracteres alfanuméricos
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  id='dni'
                  placeholder='DNI'
                  maxLength='9' // Limita la longitud a 9 caracteres
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(
                      /[^A-Za-z0-9]/g,
                      '',
                    ); // Permite solo letras y números
                  }}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='documentType'
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value='dni'>DNI</option>
                  <option value='pasaporte'>Pasaporte</option>
                  {/* Agrega más opciones según sea necesario */}
                </select>
              )}
            />
          </div>
          </div>
          

          <button type='submit' onClick={onSubmit}>Enviar</button>
        </form>
      </div>

      <div className={styles.shoppingRight}>
        <PurchaseSummary purchase={purchase} />
      </div>
    </div>
  );
};

export default ShoppingCar;
