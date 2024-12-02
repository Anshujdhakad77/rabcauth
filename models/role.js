const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['Admin', 'Moderator', 'User'], // Add default roles
    },
    permissions: {
        type: [String], // Array of strings to store specific permissions
        default: [], // Default is no permissions
    },
});

// Predefine default roles if needed
RoleSchema.statics.initializeRoles = async function () {
    const defaultRoles = [
        { name: 'Admin', permissions: ['manage_users', 'view_reports', 'full_access'] },
        { name: 'Moderator', permissions: ['moderate_content', 'view_reports'] },
        { name: 'User', permissions: ['view_content'] },
    ];

    for (const role of defaultRoles) {
        const exists = await this.findOne({ name: role.name });
        if (!exists) {
            await this.create(role);
        }
    }
};

module.exports = mongoose.model('Role', RoleSchema);
