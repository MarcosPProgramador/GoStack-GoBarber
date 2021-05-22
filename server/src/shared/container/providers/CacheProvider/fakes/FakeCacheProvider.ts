import ICacheProvider from "../models/ICacheProvider";

interface ICacheData {
  [key: string]: string
}
export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {}
  async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value)
  }
  async recover<T = string>(key: string): Promise<T | undefined> {
    const data = this.cache[key]

    if(!data) return undefined

    const parsedDate = JSON.parse(data)

    return parsedDate as T
  }
  async invalidate(key: string): Promise<void> {
    delete this.cache[key]
  }
  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key => key.startsWith(prefix))

    keys.forEach(key => {
      delete this.cache[key]
    })
  }

}
new FakeCacheProvider()
