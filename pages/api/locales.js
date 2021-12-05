const { getWorkshopFile, getWorkshopData } = require('../../lib/data')

export default async function handler(req, res) {
  const { slug } = req.query
  const md = await getWorkshopFile(slug)
  const { data } = await getWorkshopData(slug, md)
  if(data.locales === undefined){
    res.json({locales: false})
  }
  else{
    res.json({ locales: data.locales })
  }
}
