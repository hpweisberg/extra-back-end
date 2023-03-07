const { Item } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    if (req.user.authorized) {
      const items = await Item.findAll({
        include: ['Profile'],
      })
      res.status(200).json(items)
    } else {
      throw new error('user not authorized')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function create(req, res) {
  try {
    req.body.profileId = req.user.profile.id
    const item = await Item.create(req.body)
    const returnItem = await Item.findByPk(item.id, {include: ['Profile']})
    res.status(200).json(returnItem)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function update(req, res) {
  try {
    if (req.user.authorized) {
      const item = await Item.findByPk(req.params.id, {include: ['Profule']})
      if (item.profileId === req.user.profile.id) {
        item.set(req.body)
        sample.save()
        res.status(200).json(item)
      } else {
        throw new Error('user not authorized')
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

async function deleteItem(req, res) {
  try {
    const item = await Item.findByPk(req.params.id)
    if (item.profileId === req.user.profileId) {
      await item.destroy()
      res.status(200).json(item)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}



async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = { 
  index, 
  addPhoto,
  create,
  update,
  delete: deleteItem
}
