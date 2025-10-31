const express = require('express');
const router = express.Router();
const Pack = require('../models/Pack');

// GET all packs
router.get('/', async (req, res) => {
  try {
    const packs = await Pack.find({ inStock: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: packs.length,
      data: packs
    });
  } catch (error) {
    console.error('Error fetching packs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching packs',
      error: error.message
    });
  }
});

// GET single pack by ID
router.get('/:id', async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    
    if (!pack) {
      return res.status(404).json({
        success: false,
        message: 'Pack not found'
      });
    }
    
    res.json({
      success: true,
      data: pack
    });
  } catch (error) {
    console.error('Error fetching pack:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pack',
      error: error.message
    });
  }
});

module.exports = router;

