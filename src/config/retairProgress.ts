const retarirProgress = {
  1: {
    title: '1',
    description: ' El sistema aceptó la solicitud de retiro y está esperando ser procesado...',
  },
  2: {
    title: '2',
    description: 'El sistema ha procesado la solicitud de retiro y está esperando la asignación del canal de retiro...',
  },
  3: {
    title: '3',
    description: 'Se utilizó el canal de retiro VIP gratuito, se asignó el canal de retiro general y losretiros están en cola.',
    },
  4: {
    title: '4',
    description: 'El canal de retiro normal está en cola para procesar el retiro, lo que deberíatomar &&& horas.',
  },
  5: {
    title: '5',
    description: 'La cantidad de retiro del usuario excede los 3000.00 dólares, superando el límite gratuito del canal VIP. Se cobrará una tarifa del 5% por el retiro. Una vez recibido el pago en el canal VIP, se enviará la solicitud de remesa al banco central para su procesamiento.',
  },
  6: {
    title: '6',
    description: 'Procesamiento bancario anormal:este monto de retiro es un ingreso personal adicional.Según las regulaciones federales, se requiere un impuesto sobre la renta personal del 10% del monto del retiro.',
  },
  7: {
    title: '7',
    description: 'La solicitud de retiro ha sido enviada al Banco Central y el banco la está',
  },
}

export default retarirProgress;