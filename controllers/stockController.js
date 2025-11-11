const db = require('../db/db')

const updateStock = async (productId, quantity, operation) => {
  try {
    const validOps = ['addition', 'subtraction'];
    if (!validOps.includes(operation)) return false;

    const product = await knex('products').where({ id: productId }).first();
    if (!product) return false;

    let newStock =
      operation === 'addition'
        ? product.stock + quantity
        : product.stock - quantity;

    // prevent negative stock
    if (newStock < 0) newStock = 0;

    await knex('products')
      .where({ id: productId })
      .update({ stock: newStock, updated_at: knex.fn.now() });

    return true;
  } catch (error) {
    console.error('Error updating stock:', error);
    return false;
  }
};

module.exports = updateStock;