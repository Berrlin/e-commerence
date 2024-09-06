import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    material: { type: String, required: true },
    form: { type: String, required: true },
    design: { type: String, required: true },
    old_price: { type: Number, required: true },
    new_price: { type: Number, required: true },
    category: { type: String, required: true },
    color1: { type: String, required: true },
    quantitysizeMcl1: { type: Number, required: true },
    quantitysizeLcl1: { type: Number, required: true },
    quantitysizeXLcl1: { type: Number, required: true },
    color2: {
        type: String,
        validate: {
            validator: function(value) {
                // Check if color2 is present
                if (value) {
                    // Ensure all related size fields are also provided
                    return (
                        this.quantitysizeMcl2 != null &&
                        this.quantitysizeLcl2 != null &&
                        this.quantitysizeXLcl2 != null
                    );
                }
                // If color2 is not provided, related size fields should be null or not present
                return (
                    this.quantitysizeMcl2 == null &&
                    this.quantitysizeLcl2 == null &&
                    this.quantitysizeXLcl2 == null
                );
            },
            message: 'If color2 is provided, all related sizes must also be provided.'
        }
    },
    quantitysizeMcl2: {
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure quantitysizeMcl2 is only provided if color2 is present
                return this.color2 ? value != null : value == null;
            },
            message: 'Quantity size Mcl2 should only be provided if color2 is present.'
        }
    },
    quantitysizeLcl2: {
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure quantitysizeLcl2 is only provided if color2 is present
                return this.color2 ? value != null : value == null;
            },
            message: 'Quantity size Lcl2 should only be provided if color2 is present.'
        }
    },
    quantitysizeXLcl2: {
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure quantitysizeXLcl2 is only provided if color2 is present
                return this.color2 ? value != null : value == null;
            },
            message: 'Quantity size XLcl2 should only be provided if color2 is present.'
        }
    },
    color3: {
        type: String,
        validate: {
            validator: function(value) {
                // Check if color3 is present
                if (value) {
                    // Ensure all related size fields are also provided
                    return (
                        this.quantitysizeMcl3 != null &&
                        this.quantitysizeLcl3 != null &&
                        this.quantitysizeXLcl3 != null
                    );
                }
                // If color3 is not provided, related size fields should be null or not present
                return (
                    this.quantitysizeMcl3 == null &&
                    this.quantitysizeLcl3 == null &&
                    this.quantitysizeXLcl3 == null
                );
            },
            message: 'If color3 is provided, all related sizes must also be provided.'
        }
    },
    quantitysizeMcl3: {
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure quantitysizeMcl3 is only provided if color3 is present
                return this.color3 ? value != null : value == null;
            },
            message: 'Quantity size Mcl3 should only be provided if color3 is present.'
        }
    },
    quantitysizeLcl3: {
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure quantitysizeLcl3 is only provided if color3 is present
                return this.color3 ? value != null : value == null;
            },
            message: 'Quantity size Lcl3 should only be provided if color3 is present.'
        }
    },
    quantitysizeXLcl3: {
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure quantitysizeXLcl3 is only provided if color3 is present
                return this.color3 ? value != null : value == null;
            },
            message: 'Quantity size XLcl3 should only be provided if color3 is present.'
        }
    },
    imagemain: { type: String, required: true },
    imagelist1: { type: String, required: true },
    imagelist2: { type: String, required: true },
    imagelist3: { type: String, required: true },
    imagelist4: { type: String, required: true },
    imagelist5: { type: String, required: true },
    imagelist6: String,
    imagelist7: String,
    imageunder:{type: String},
});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
