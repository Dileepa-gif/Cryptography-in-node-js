import Sequelize from 'sequelize';
import {
    sequelize
} from '../database/database'

const Product = sequelize.define('product', {
    
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false
});

export default Product;