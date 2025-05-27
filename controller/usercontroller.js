const user = require('../model/usermodel');

exports.Insert = async (req, res) => {

    try {
        var data = await user.create(req.body);
        res.status(201).json({
            message: 'User created successfully',
            data
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.Update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await user.findByIdAndUpdate(userId, updateData, {
            new: true,              // return the updated document
            runValidators: true     // run model validators
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...safeData } = updatedUser.toObject();

        return res.status(200).json({
            message: 'User updated successfully',
            data: safeData
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(400).json({ message: error.message });
    }
};

exports.Delete = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(400).json({ message: error.message });
    }
};