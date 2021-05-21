import { trim, curry, cloneDeep, isEmpty, toLower } from 'lodash'

export const filter = curry((originalData, setData, searchString) => {
  searchString = toLower(trim(searchString))
  const includes = (base, target = searchString) =>
    toLower(base).includes(target)

  let data = cloneDeep(originalData)

  if (searchString) {
    data = data.filter((baseEle, idx) => {
      let bool = false,
        temp = false

      if (includes(baseEle.title) || includes(baseEle.description)) return true

      data[idx].workshops = baseEle.workshops.filter(workshop => {
        temp = false

        if (includes(workshop.name) || includes(workshop.description))
          (bool = true), (temp = true)

        // name and description don't have a match for target
        if (!temp) {
          const filtered = workshop.tags.filter(tag => includes(tag))

          if (filtered.length) (bool = true), (temp = true)
        }
        return temp
      })

      // only required if bool is true
      if (bool) {
        data[idx].slugs = baseEle.slugs.filter(slug => {
          temp = false
          data[idx].workshops.forEach(workshop => {
            if (slug == workshop.slug) temp = true
          })
          return temp
        })
      }

      return bool
    })
  }

  setData(isEmpty(data) ? fallBack : data)
})

const fallBack = [
  {
    title: 'No Workshops found :(',
    description: "We couldn't find a workshop for the provided search query. ",
    slugs: [],
    workshops: []
  }
]
