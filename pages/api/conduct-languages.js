import { getAvailableConductLanguages } from '../../lib/data-server'

export default async function handler(req, res) {
  try {
    const languages = await getAvailableConductLanguages()
    res.status(200).json({ languages })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch languages' })
  }
} 