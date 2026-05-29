// types/service.ts
export interface SanityService {
    _id:          string
    id:           string
    title:        { es: string; en: string }
    description:  { es: string; en: string }
    icon:         string
    order:        number
    featured:     boolean
    price:        number
    features:     { es: string[]; en: string[] }
    gradientFrom: string
    gradientTo:   string
    image?: {
      url:      string
      width:    number
      height:   number
      blurUrl?: string
      alt?:     string
    }
  }