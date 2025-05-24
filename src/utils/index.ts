import {IMenu} from "../types/api";
//get menu path
export function getMenuPath(list: IMenu[]): string[] {
   return list.reduce((res: string[], item: IMenu) => {
    return res.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children): item.path + '')
  }, [])
}