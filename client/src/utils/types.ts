
type CardsList = {
  name: string,
  price: number,
  description: string,
  id: string | undefined,
  image: string,
  stock: number,
  discount: number | null,
  category?: string | string[],
}

export enum PagesList {
  HOME = 'home',
  CATEGORY = 'category',
  ABOUT = 'about',
  BLOG = 'blog',
  CONTACT = 'contact',
  PRODUCTS = 'products',
  PRODUCT = 'product'
}

export enum LocalStorageValues {
  LOGIN_USER = 'login_user'
}

export  type { CardsList }