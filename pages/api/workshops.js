import {getWorkshopSections} from '../../lib/data'

export default async (req, res) => {
    res.json((await getWorkshopSections()))
}