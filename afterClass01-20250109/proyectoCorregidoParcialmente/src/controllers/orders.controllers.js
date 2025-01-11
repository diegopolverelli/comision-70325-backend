import orderModel from '../models/order.model.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $match: { size: 'small' }, //Stage 1: Traeme solamente las pizzas medianas
      },
      {
        //$group: {_id: "$name", totalQuantity: {$sum: "$quantity"}} //Stage 2: Agrupo por nombre y por suma de cantidades
        $group: { _id: '$name', totalVentas: { $sum: '$price' } },
      },
      {
        $sort: { totalQuantity: 1 }, //-1 mayor a menor - 1 menor a mayor
      },
      {
        $group: { _id: 1, orders: { $push: '$$ROOT' } }, //Agrupo el resultado y $$ROOT guarda todo el contenido del array anterior
      },
      {
        $project: {
          _id: 0,
          orders: '$orders', //Guardo en una coleccion llamada orders el contenido y autogenero el id
        },
      },
      {
        $merge: {
          into: 'reports', //Guardame en la coleccion reports de mi BDD
        },
      },
    ]);
    console.log(orders);

    res.status(200).send('Reportes generados');
  } catch (e) {
    console.log(e);
    res.status(500).send('Error al consultar ordenes:');
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const respuesta = await orderModel.create(order);
    console.log(respuesta);
    res.status(201).send('Orden creada correctamente');
  } catch (e) {
    console.log(e);

    res.status(500).send('Error al crear Orden: ', e);
  }
};
